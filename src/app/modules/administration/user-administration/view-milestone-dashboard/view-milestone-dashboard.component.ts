import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/model/currentuser';
import { ProjectDetails } from 'src/app/model/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProcurementService } from 'src/app/services/procurement.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-milestone-dashboard',
  templateUrl: './view-milestone-dashboard.component.html',
  styleUrls: ['./view-milestone-dashboard.component.scss']
})
export class ViewMilestoneDashboardComponent implements OnInit {

  currentUser: CurrentUser;
  currentUserSubscription: Subscription;


  displayedColumns: string[] = ['ptsRef','projectTitle', 'dateCreated', 'status', 'view'];
  dataSource: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  displayedColumns1: string[] = ['ptsRef','projectTitle', 'dateCreated', 'status', 'view'];
  dataSource1: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  displayedColumns2: string[] = ['ptsRef','projectTitle', 'dateCreated', 'status', 'view'];
  dataSource2: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  displayedColumns3: string[] = ['ptsRef','projectTitle', 'dateCreated', 'status', 'view'];
  dataSource3: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService, private router: Router, public authenticationService: AuthenticationService,  
    private activeRoute: ActivatedRoute, private procurementService: ProcurementService) { 
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
        this.currentUser = currentUuser;
      });
    }

  ngOnInit(): void {

    this.getAllProcurement();
    this.getAllImplementation();
    this.getAllCompleted();
    this.getAllHold();

    this.getProcurement();
    this.getImplementation();
    this.getCompleted();
    this.getHold();

    this.getProcurementTech();
    this.getImplementationTech();
    this.getCompletedTech();
    this.getHoldTech();
  }

  getAllProcurement() {
    if (this.authenticationService.roleMatch(['Management'])) {
    this.projectService.viewAllMilestoneProcurement().subscribe(
      (response: ProjectDetails[]) => {
        this.dataSource1 = new MatTableDataSource(response);
        console.log("Response received:", response);
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      () => {
        console.log("Request completed");
      }
    );
    }
  }

  getAllImplementation() {
    if (this.authenticationService.roleMatch(['Management'])) {
    this.projectService.viewAllMilestoneImplementation().subscribe(
      (response: ProjectDetails[]) => {
        this.dataSource = new MatTableDataSource(response);
        console.log("Response received:", response);
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      () => {
        console.log("Request completed");
      }
    );
  }
  }

  getAllCompleted() {
    if (this.authenticationService.roleMatch(['Management'])) {
      this.projectService.viewAllMilestoneCompleted().subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource2 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }

  getAllHold() {
    if (this.authenticationService.roleMatch(['Management'])) {
      this.projectService.viewAllMilestoneHold().subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource3 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }

  getProcurement() {
    if (this.authenticationService.roleMatch(['Project_Manager'])) {
    this.projectService.viewMilestoneProcurement(this.currentUser.email_address).subscribe(
      (response: ProjectDetails[]) => {
        this.dataSource1 = new MatTableDataSource(response);
        console.log("Response received:", response);
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      () => {
        console.log("Request completed");
      }
    );
    }
  }

  getImplementation() {
    if (this.authenticationService.roleMatch(['Project_Manager'])) {
    this.projectService.viewMilestoneImplementation(this.currentUser.email_address).subscribe(
      (response: ProjectDetails[]) => {
        this.dataSource = new MatTableDataSource(response);
        console.log("Response received:", response);
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
      },
      () => {
        console.log("Request completed");
      }
    );
    }
  }

  getCompleted() {
    if (this.authenticationService.roleMatch(['Project_Manager'])) {
      this.projectService.viewMilestoneCompleted(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource2 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }

  getHold() {
    if (this.authenticationService.roleMatch(['Project_Manager'])) {
      this.projectService.viewMilestoneHold(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource3 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }

  getProcurementTech() {
    if (this.authenticationService.roleMatch(['Technical_Leadder'])) {
      this.projectService.viewTechMilestoneProcurement(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource1 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }
  
  getImplementationTech() {
    if (this.authenticationService.roleMatch(['Technical_Leadder'])) {
      this.projectService.viewTechMilestoneImplementation(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }
  
  getCompletedTech() {
    if (this.authenticationService.roleMatch(['Technical_Leadder'])) {
      this.projectService.viewTechMilestoneCompleted(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource2 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }

  getHoldTech() {
    if (this.authenticationService.roleMatch(['Technical_Leadder'])) {
      this.projectService.viewTechMilestoneHold(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          this.dataSource3 = new MatTableDataSource(response);
          console.log("Response received:", response);
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
        },
        () => {
          console.log("Request completed");
        }
      );
    }
  }


  viewMilestone(project: ProjectDetails) {
    this.router.navigate(['/project/milestones', project.ptsRef]);
    console.log('View project:', project);
  }

}
