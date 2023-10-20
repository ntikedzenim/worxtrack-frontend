import { Component, OnInit } from '@angular/core';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { ProjectDetails } from 'src/app/model/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ADdetails } from 'src/app/model/ad-details.model';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  adDetails: ADdetails[] = [];

  currentDate = moment().format('YYYY-MM-DD');

  statusChange = "Procurement in Progress";

  project: ProjectDetails;

  constructor(
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const ptsRef = this.activeRoute.snapshot.paramMap.get('ptsRef')!.toString();

    this.getProject(ptsRef);

    // this.getProject(ptsRef);  
  }

  onSubmit(form: any) {
    if (form.invalid) {
      return;
    }

    const updatedProject = { ...this.project, ...form.value };

    this.projectService.updateProject(updatedProject.ptsRef, updatedProject).subscribe({
      next: (response: ProjectDetails) => {

      },
      error: (error: HttpErrorResponse) => {
        console.log('Error updating project details:', error);
        this.openSnackBar('Error updating the project');
      },
      complete: () => {
        console.log('Project Details updated successfully.');
        this.openSnackBar('Project Edited successful');
        this.router.navigate(['/dashboard']);
      },
    });
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

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '500px',
      data: { adDetails: this.adDetails }
    });

    dialogRef.componentInstance.userSelected.subscribe((selectedUser: any) => {
      if (selectedUser) {
        this.project.technicalLeader = selectedUser.displayName;
        this.project.technicalLeaderEmail = selectedUser.email;
      }
    });
  }

  disableOutsourced(inHouseValue: string) {
    if (inHouseValue === 'Yes') {
      this.project.outSourced = 'No';
    }
    if (inHouseValue === 'No') {
      this.project.outSourced = 'Yes';
    }
  }
  
  disableInHouse(outSourcedValue: string) {
    if (outSourcedValue === 'Yes') {
      this.project.inHouse = 'No';
    }
    if (outSourcedValue === 'No') {
      this.project.inHouse = 'Yes';
    }
  }
  

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

}
