import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ADdetails } from 'src/app/model/ad-details.model';
import { CurrentUser } from 'src/app/model/currentuser';
import { ProjectDetails } from 'src/app/model/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {


  isLoadingResults = false; 
  currentUser: CurrentUser;
  currentUserSubscription: Subscription; 

  project: ProjectDetails;
  adDetails: ADdetails[] = [];

  projectForm: FormGroup;

  startDate: Date;
  endDate: Date;

  projectManager: any;
  projectManagerEmail: any;

  selectedUnit: string = ''; 

  constructor(private projectService: ProjectService, public authenticationService: AuthenticationService, private router: Router,
    private dialog: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.startDate = new Date();
    this.endDate = new Date();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
      this.currentUser = currentUuser;
    });

    this.projectManager = this.currentUser.username,
    this.projectManagerEmail = this.currentUser.email_address

    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      estimatedValue: ['', [Validators.required, (control) => {
        if (isNaN(control.value) || control.value === null || control.value === '') {
          return { 'notANumber': true };
        }
        return null;
      }]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [''],
      projectManager: [''],
      projectManagerEmail: [''],
      technicalLeader: ['', Validators.required],
      technicalLeaderEmail: [''],
      unit: ['', Validators.required],
      projectCategory: ['', Validators.required],
      inHouse: ['', Validators.required], 
      outSourced: ['', Validators.required],
      comments: [''],
      ptsRef: [''],
      id: [''],
      dateCreated: [''],
      otherUnit: [''],
      archived: [''],
      completed: ['']
    });
  }


  

  searchUsersByName(fullName: string) {
    this.projectService.searchUsersByName(fullName).subscribe({
      next: (response: ADdetails[]) => {
        this.adDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error occurred while searching users by name:', error);
      }
    });
  }

  
  linkAdDetails(user: any): void {
    // Set the values in the form controls
    this.projectForm.get('technicalLeader')?.setValue(user.displayName);
    this.projectForm.get('technicalLeaderEmail')?.setValue(user.email);
  }
  

  setStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value ?? new Date();
  }
  
  setEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value ?? new Date();
  }



  addProject() {
    // Serialize the FormGroup data into JSON
    const projectData = this.projectForm.value;
  
    // Assign the project manager and email from currentUser
    projectData.projectManager = this.currentUser.username;
    projectData.projectManagerEmail = this.currentUser.email_address;
  
    // Call the service to make the POST request
    this.projectService.addProject(projectData).subscribe(
      (response) => {
        // Handle success response here
        console.log('Project added successfully:', response);
        this.openSnackBar('Project Added successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle error response here
        console.error('Error adding project:', error);
      }
    );
  }
  
  
  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '500px',
      data: { adDetails: this.adDetails }
    });
  
    dialogRef.componentInstance.userSelected.subscribe((selectedUser: any) => {
      if (selectedUser) {
        // Call linkAdDetails to update the form controls
        this.linkAdDetails(selectedUser);
      }
    });
  }
    

  disableOutsourced(inHouseValue: string) {
    if (inHouseValue === 'Yes') {
      this.projectForm.get('outSourced')?.setValue('No');
    }
    if (inHouseValue === 'No') {
      this.projectForm.get('outSourced')?.setValue('Yes');
    }
  }
  
  disableInHouse(outSourcedValue: string) {
    if (outSourcedValue === 'Yes') {
      this.projectForm.get('inHouse')?.setValue('No');
    }
    if (outSourcedValue === 'No') {
      this.projectForm.get('inHouse')?.setValue('Yes');
    }
  }


  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }
  
}
