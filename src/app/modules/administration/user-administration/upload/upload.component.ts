import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusinessCase } from 'src/app/model/business.model';
import { CurrentUser } from 'src/app/model/currentuser';
import { ProjectDetails } from 'src/app/model/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  // documentUploaded: boolean = false;
  project: ProjectDetails;

  file: File | null = null;
  BusinessCase: any;

  selectedFiles: any;

  documentUrl: string = '';

  documentUploaded = true;

  currentDate = moment().format('YYYY-MM-DD'); 
  status = "Approved";
  statusChange = "Procurement in Progress";

  businessCase: BusinessCase = {
    businessCaseId: 0,
    businessCaseStatus: '',
    businessCaseDate: '',
    ptsRef: '',
    projectTitle: ''
  }

  currentUser: CurrentUser;
  currentUserSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngOnInit(): void {
    // Retrieve 'ptsRef' from route parameters
    const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef');
    this.getBusinessCase();
    this.getProject(ptsRef); 
  }

  // Start Supporting Documents
businessCaseFileName: any;
onFilechange(event: any) {
  console.log(event.target.files[0]);
  this.file = event.target.files[0];
  this.businessCaseFileName = event.target.files[0].name;
  this.documentUploaded = event.target.files.length === 0;
}

  uploadBusinessCase() {
    this.documentUploaded = true;
    
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
        this.openSnackBar('Error adding business case');
      },
      complete: () => {
        console.log('Business Case added successfully.');
        this.openSnackBar('File uploaded successfully');
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
          // this.openSnackBar('File uploaded successfully');
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
    console.log('Fetching project for ptsRef:', ptsRef); 
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

  editProject(project: ProjectDetails) {
    this.router.navigate(['/project/edit/projectDetails', project.ptsRef]);
    console.log('edit project:', project);
  }



  
  deleteFile(fileId: string) {
    const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef');
  
    // Find the index of the file to be deleted
    const fileIndex = this.BusinessCase.findIndex((file) => file.fileId === fileId);
  
    if (fileIndex !== -1) {
      // Remove the file from the array
      this.BusinessCase.splice(fileIndex, 1);
  
      // Show a notification
      this.snackBar.open('File deletion in progress...', 'Dismiss', {
        duration: 3000, // Show the message for 3 seconds
      });
  
      this.projectService.deleteFile(fileId).subscribe(
        (response) => {
          if (response === 'File deleted successfully.') {
            console.log('File deleted successfully.');
            this.snackBar.open('File deleted successfully.', 'Dismiss', {
              duration: 3000,
            });
  
            this.getBusinessCase();
            this.getProject(ptsRef);
          } else {
            console.error('Unexpected response:', response);
          }
        },
        (error) => {
          console.error('Error deleting file:', error);
          this.getBusinessCase();
          this.getProject(ptsRef);
        }
      );
    }
  }
  
  
  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

  previewDocument(fileId: string) {
    console.log(this.documentUrl);
    this.documentUrl = `http://localhost:8080/get-document/${fileId}`;
  }


  
}
