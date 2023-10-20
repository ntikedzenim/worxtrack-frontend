import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BusinessCase } from 'src/app/model/business.model';
import { ProjectDetails } from 'src/app/model/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-closed',
  templateUrl: './view-closed.component.html',
  styleUrls: ['./view-closed.component.scss']
})
export class ViewClosedComponent implements OnInit {

  selectedFile!: File;
  ptsRef!: string;

  // fileUrl: SafeUrl | undefined;
  fileName: string = '';

  Uploaded: any;
  


  file: File | null = null;
  BusinessCase: any;

  currentDate = moment().format('YYYY-MM-DD'); 
  status = "Approved";
  statusChange = "Procurement in Progress";

  project: ProjectDetails = {
    projectTitle: '',
    projectDescription: '',
    estimatedValue: '',
    startDate: '',
    endDate: '',
    status: '',
    projectManager: '',
    projectManagerEmail: '',
    technicalLeader: '',
    technicalLeaderEmail: '',
    unit: '',
    projectCategory: '',
    inHouse: '',
    comments: '',
    ptsRef: '',
    id: 0,
    dateCreated: '',
    otherUnit: '',
    outSourced: '',
    archived: '',
    completed: ''
  }

  businessCase: BusinessCase = {
    businessCaseId: 0,
    businessCaseStatus: '',
    businessCaseDate: '',
    ptsRef: '',
    projectTitle: ''
  }
  

  constructor(private projectService: ProjectService, private router: Router, private activeRoute: ActivatedRoute, 
    public authenticationService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef')!.toString();
   
    this.getBusinessCase();
    this.getProject(ptsRef);

  }


// Start Supporting Documents
businessCaseFileName: any;
onFilechange(event: any) {
  console.log(event.target.files[0]);
  this.file = event.target.files[0];
  this.businessCaseFileName = event.target.files[0].name;
}

uploadBusinessCase() {
  this.businessCase.businessCaseDate = this.currentDate;
  this.businessCase.businessCaseStatus = this.status;
  this.businessCase.projectTitle = this.project.projectTitle;
  this.businessCase.ptsRef = this.project.ptsRef;

  this.project.status = this.statusChange;

  this.projectService.addBusinessCase(this.businessCase).subscribe({
    next: (response: BusinessCase) => {
      this.updateProjectDetails();
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error adding business case:', error);
    },
    complete: () => {
      console.log('Business Case added successfully.');
    },
  });
}

updateProjectDetails() {
  const updatedProject = { ...this.project }; // Create a copy of the project object

  this.projectService.updateProject(updatedProject.ptsRef, updatedProject).subscribe({
    next: (response: ProjectDetails) => {
      this.uploadFile();
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error updating project details:', error);
    },
    complete: () => {
      console.log('Project Details updated successfully.');
    },
  });
}


uploadFile() {
  const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef')!.toString();
  if (this.file) {
    this.projectService.uploadfile(this.file, ptsRef,this.project.projectTitle).subscribe({
      next: (resp) => {
        console.log('File uploaded successfully.');
        this.openSnackBar('File uploaded successfully');
        this.getBusinessCase();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error uploading file:', error);
      },
    });
  } else {
    alert('Please select a file first.');
  }
}



  getBusinessCase(){
    const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef')!.toString();

    this.projectService.getBusinessCase(ptsRef).subscribe(data =>{
      this.BusinessCase = data
      console.error(this.BusinessCase);
    });
 
  }

  downloadBusinessCase(fileId:string){
    console.log(fileId)
    var url = `${environment.urlWorxtrack}/files/download/${fileId}`
   window.open(url)
  }


  public getProject(ptsRef: string) {
    this.projectService.getProjectById(ptsRef).subscribe({
      next: (response: ProjectDetails) => {
        this.project = response;
        console.log("Response received:", response);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      complete: () => {
        console.log("Request completed");
      },
    });
  }

  // editProject(project: ProjectDetails) {
  //   this.router.navigate(['/editArchived/projectDetails', project.ptsRef]);
  //   console.log('edit project:', project);
  // }


 

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }
}