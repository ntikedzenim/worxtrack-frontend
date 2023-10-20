import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusinessCase } from 'src/app/model/business.model';
import { CurrentUser } from 'src/app/model/currentuser';
import { ProjectDetails } from 'src/app/model/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-milestones',
  templateUrl: './update-milestones.component.html',
  styleUrls: ['./update-milestones.component.scss']
})
export class UpdateMilestonesComponent implements OnInit {

  project: ProjectDetails;

  isLoadingResults = false; 
  currentUser: CurrentUser;
  currentUserSubscription: Subscription;


  displayedColumns: string[] = ['ptsRef', 'projectTitle', 'update'];
  dataSource: MatTableDataSource<BusinessCase> = new MatTableDataSource<BusinessCase>();

  dataSource2: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();
  dataSource3: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  constructor(private projectService: ProjectService, private router: Router, 
    public authenticationService: AuthenticationService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
        this.currentUser = currentUuser;
      });
    }

  ngOnInit(): void {

    this.getProjectsInProcurementInProgress();
    this.getProjectsInImplementationInProgress();
  }


  getProjectsInProcurementInProgress() {
  this.projectService.getProjectsInProcurementInProgress(this.currentUser.email_address).subscribe({
    next: (response: ProjectDetails[] | ProjectDetails) => {
      if (Array.isArray(response)) {
        this.dataSource3 = new MatTableDataSource(response);
      } else {
        this.dataSource3 = new MatTableDataSource([response]);
      }
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

getProjectsInImplementationInProgress() {
  this.projectService.getProjectsInImplementationInProgress(this.currentUser.email_address).subscribe({
    next: (response: ProjectDetails[] | ProjectDetails) => {
      if (Array.isArray(response)) {
        this.dataSource2 = new MatTableDataSource(response);
      } else {
        this.dataSource2 = new MatTableDataSource([response]);
      }
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


updateMilestone(project: ProjectDetails) {
  this.router.navigate(['/project/procurement', project.ptsRef]);
  console.log('View project:', project);
}

updateImplementation(project: ProjectDetails) {
  this.router.navigate(['/project/implementation', project.ptsRef]);
  console.log('View project:', project);
}

  
}
