import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CurrentUser } from 'src/app/model/currentuser';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProjectDetails } from 'src/app/model/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})
export class ClosedProjectsComponent implements OnInit {
  filterValue: string;

  totalProjectsCount: number = 0;
  waitingProjectsCount: number = 0;
  procurementProjectsCount: number = 0;
  implementationProjectsCount: number = 0;
  completedProjectsCount: number = 0;
  countHoldProjects: number = 0;
  countCancelledProjects: number = 0;

  technical: number = 0;
  owner: number = 0;

  
  countAllOwner: number = 0;
  countBusinessOwner: number = 0;
  countProcurementOwner: number = 0;
  countImplementationOwner: number = 0;
  countCompletedOwner: number = 0;
  countHoldOwner: number = 0;
  countCancelledOwner: number = 0;

  countAllTechnical: number = 0;
  countBusinessTechnical: number = 0;
  countProcurementTechnical: number = 0;
  countImplementationTechnical: number = 0;
  countCompletedTechnical: number = 0;
  countHoldTechnical: number = 0;
  countCancelledTechnical: number = 0;

  isLoadingResults = false; 
  currentUser: CurrentUser;
  currentUserSubscription: Subscription; 

  displayedColumns: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'view'];
  dataSource: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  displayedColumns1: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'view'];
  dataSource1: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  displayedColumns2: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'view'];
  dataSource2: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private projectService: ProjectService, public authenticationService: AuthenticationService,private router: Router) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
      this.currentUser = currentUuser;
    });
    this.filterValue = '';
  }

  ngOnInit(): void {
    this.getALLProProject();
    this.countProjects();
    this.getALLProject();
    this.getALLTechProject();
  }

  getALLProject() {
    this.projectService.getAllClosedProjects().subscribe({
      next: (response: ProjectDetails[] | ProjectDetails) => {
        if (Array.isArray(response)) {
          this.dataSource1 = new MatTableDataSource(response);
        } else {
          this.dataSource1 = new MatTableDataSource([response]);
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

  getALLProProject() {
    this.projectService.getProjectsByCurrentUserArchived(this.currentUser.email_address).subscribe({
      next: (response: ProjectDetails[] | ProjectDetails) => {
        if (Array.isArray(response)) {
          this.dataSource = new MatTableDataSource(response);
        } else {
          this.dataSource = new MatTableDataSource([response]);
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

  getALLTechProject() {
    this.projectService.getProjectsByTechArchived(this.currentUser.email_address).subscribe({
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

  viewProject(project: ProjectDetails) {
    this.router.navigate(['/project/view-closed', project.ptsRef]);
    console.log('View project:', project);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  

  applyFilterByCard(filterType: string) {
    switch (filterType) {
      case 'all':
        this.filterValue = '';
        break;
      case 'business':
        this.filterValue = 'Waiting for Business Case';
        break;
      case 'procurement':
        this.filterValue = 'Procurement in Progress';
        break;
      case 'implementation':
        this.filterValue = 'Implementation in Progress';
        break;
      case 'completed':
        this.filterValue = 'Completed';
        break;
      case 'hold':
        this.filterValue = 'On Hold';
        break;
      case 'cancelled':
        this.filterValue = 'Cancelled';
        break;
    }
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  public getDaysSinceCreation(project: ProjectDetails): number {
    const daysSinceCreation = Math.floor((Date.now() - new Date(project.dateCreated).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceCreation;
  }

  public getCalculateDaysBetween(project: ProjectDetails): number {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysBetween;
  }

  public getCalculateMonthsAndDaysBetween(project: ProjectDetails): { months: number, days: number } {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    let dayDiff = endDate.getDate() - startDate.getDate(); // Initialize dayDiff
  
    // Calculate the total number of months
    let monthsBetween = yearDiff * 12 + monthDiff;
    
    // Check if the days are more than 15, and if so, add one month
    if (dayDiff > 15) {
      monthsBetween += 1;
      dayDiff = 0; // Reset days to zero
    }
    
    return { months: monthsBetween, days: dayDiff };
  }

  countProjects() {
    this.projectService.countTotalProjects().subscribe(count => {
      this.totalProjectsCount = count;
    });
    this.projectService.countWaitingProjects().subscribe(count => {
      this.waitingProjectsCount = count;
    });

    this.projectService.countProcurementProjects().subscribe(count => {
      this.procurementProjectsCount = count;
    });
    this.projectService.countImplementationProjects().subscribe(count => {
      this.implementationProjectsCount = count;
    });
    this.projectService.countCompletedProjects().subscribe(count => {
      this.completedProjectsCount = count;
    });
    this.projectService.countHoldProjects().subscribe(count => {
      this.countHoldProjects = count;
    });
    this.projectService.countCancelledProjects().subscribe(count => {
      this.countCancelledProjects = count;
    });

    this.projectService.countAllOwner(this.currentUser.email_address).subscribe(count => {
      this.countAllOwner = count;
    });
    this.projectService.countBusinessOwner(this.currentUser.email_address).subscribe(count => {
      this.countBusinessOwner = count;
    });
    this.projectService.countProcurementOwner(this.currentUser.email_address).subscribe(count => {
      this.countProcurementOwner = count;
    });
    this.projectService.countImplementationOwner(this.currentUser.email_address).subscribe(count => {
      this.countImplementationOwner = count;
    });
    this.projectService.countCompletedOwner(this.currentUser.email_address).subscribe(count => {
      this.countCompletedOwner = count;
    });
    this.projectService.countHoldOwner(this.currentUser.email_address).subscribe(count => {
      this.countHoldOwner = count;
    });
    this.projectService.countCancelledOwner(this.currentUser.email_address).subscribe(count => {
      this.countCancelledOwner = count;
    });

    this.projectService.countAllTechnical(this.currentUser.email_address).subscribe(count => {
      this.countAllTechnical = count;
    });
    this.projectService.countBusinessTechnical(this.currentUser.email_address).subscribe(count => {
      this.countBusinessTechnical = count;
    });
    this.projectService.countProcurementTechnical(this.currentUser.email_address).subscribe(count => {
      this.countProcurementTechnical = count;
    });
    this.projectService.countImplementationTechnical(this.currentUser.email_address).subscribe(count => {
      this.countImplementationTechnical = count;
    });
    this.projectService.countCompletedTechnical(this.currentUser.email_address).subscribe(count => {
      this.countCompletedTechnical = count;
    });
    this.projectService.countHoldTechnical(this.currentUser.email_address).subscribe(count => {
      this.countHoldTechnical = count;
    });
    this.projectService.countCancelledTechnical(this.currentUser.email_address).subscribe(count => {
      this.countCancelledTechnical = count;
    });

  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks   
    this.currentUserSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}








