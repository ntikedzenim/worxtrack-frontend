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
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {

  showActionButtons: boolean = false;
  daysBetween: any;

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


  displayedColumns: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'action'];
  // dataSource: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();
  dataSource = new MatTableDataSource<ProjectDetails>();

  displayedColumns1: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'view'];
  // dataSource1: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();
  dataSource1 = new MatTableDataSource<ProjectDetails>();

  displayedColumns2: string[] = ['projectTitle', 'dateCreated', 'daysSinceCreation', 'status', 'view'];
  // dataSource2: MatTableDataSource<ProjectDetails> = new MatTableDataSource<ProjectDetails>();
  dataSource2 = new MatTableDataSource<ProjectDetails>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild('paginator2') paginator2: MatPaginator;
  

  constructor(private projectService: ProjectService, public authenticationService: AuthenticationService, private router: Router,) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(currentUuser => {
      this.currentUser = currentUuser;
    });
    this.filterValue = '';
  }

  ngOnInit(): void {
    this.getALLProProject();
    this.countProjects();
    this.getALLProject();
    this.getAllTechProject();
  }

  getALLProject() {
    this.projectService.getALLProject().subscribe({
      next: (response: ProjectDetails[] | ProjectDetails) => {
        if (Array.isArray(response)) {
          // this.dataSource1 = new MatTableDataSource(response);
          this.dataSource1.data = response as unknown as ProjectDetails[];
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
    this.projectService.getProjectsByCurrentUser(this.currentUser.email_address).subscribe({
      next: (response: ProjectDetails[] | ProjectDetails) => {
        if (Array.isArray(response)) {

          this.dataSource.data = response as unknown as ProjectDetails[];
          // this.dataSource = new MatTableDataSource(response);
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

  getAllTechProject() {
      this.projectService.getProjectsByTechnicalUser(this.currentUser.email_address).subscribe(
        (response: ProjectDetails[]) => {
          // this.dataSource2 = new MatTableDataSource(response);
          this.dataSource2.data = response as unknown as ProjectDetails[];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = this.filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = this.filterValue.trim().toLowerCase();
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
    this.dataSource1.filter = this.filterValue.trim().toLowerCase();
    this.dataSource2.filter = this.filterValue.trim().toLowerCase();
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

    // This function calculates the project progress percentage
    getProjectProgress(row) {
      const projectStartDate = new Date(row.startDate); // Replace with the actual start date field in your data
      const projectEndDate = new Date(row.endDate); // Replace with the actual end date field in your data
      const currentDate = new Date();
  
      // Calculate the total duration of the project in milliseconds
      const totalDuration = projectEndDate.getTime() - projectStartDate.getTime();
  
      // Calculate the elapsed duration of the project in milliseconds
      const elapsedDuration = currentDate.getTime() - projectStartDate.getTime();
  
      // Calculate the progress percentage
      const progressPercentage = (elapsedDuration / totalDuration) * 100;
  
      // Ensure the progress percentage doesn't go below 0 or above 100
      return Math.min(Math.max(progressPercentage, 0), 100);
    }
   
  

  // public getCalculateMonthsBetween(project: ProjectDetails): number {
  //   const startDate = new Date(project.startDate);
  //   const endDate = new Date(project.endDate);
    
  //   const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  //   const monthDiff = endDate.getMonth() - startDate.getMonth();
    
  //   const monthsBetween = yearDiff * 12 + monthDiff;
    
  //   return monthsBetween;
  // }
  

  // public getCalculateDaysBetween(project: ProjectDetails): { months: number, days: number } {
  //   const startDate = new Date(project.startDate);
  //   const endDate = new Date(project.endDate);
  
  //   const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  //   const monthDiff = endDate.getMonth() - startDate.getMonth();
  //   const dayDiff = endDate.getDate() - startDate.getDate();
  
  //   const monthsBetween = yearDiff * 12 + monthDiff;
  
  //   return { months: monthsBetween, days: dayDiff };
  // }
  
  
  public shouldFlashStatus(project: ProjectDetails): boolean {
    // Ensure the project has a startDate property
    if (!project.startDate) {
      return false; // Cannot calculate totalDays without startDate
    }
  
    // Calculate the difference between startDate and today in milliseconds
    const startDate = new Date(project.startDate).getTime();
    const today = new Date().getTime();
    const totalMilliseconds = today - startDate;
  
    // Calculate the total days
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the percentage of days passed
    const percentage = (totalDays / this.getCalculateDaysBetween(project)) * 100;
  
    // Check if the project is not completed and the percentage is 75% or less
    return project.status !== 'Completed' && project.status !== 'On Hold' && percentage >= 80;
  }

  public businessCaseFlash(project: ProjectDetails): boolean {
    // Ensure the project has a startDate property
    if (!project.startDate) {
      return false; // Cannot calculate totalDays without startDate
    }
  
    // Calculate the difference between startDate and today in milliseconds
    const startDate = new Date(project.startDate).getTime();
    const today = new Date().getTime();
    const totalMilliseconds = today - startDate;
  
    // Calculate the total days
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the percentage of days passed
    const percentage = (totalDays / this.getCalculateDaysBetween(project)) * 100;
  
    // Check if the project is not completed and the percentage is 75% or less
    return project.status == 'Waiting for Business Case' && percentage >= 20;
  }

  public procurementFlash(project: ProjectDetails): boolean {
    // Ensure the project has a startDate property
    if (!project.startDate) {
      return false; // Cannot calculate totalDays without startDate
    }
  
    // Calculate the difference between startDate and today in milliseconds
    const startDate = new Date(project.startDate).getTime();
    const today = new Date().getTime();
    const totalMilliseconds = today - startDate;
  
    // Calculate the total days
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the percentage of days passed
    const percentage = (totalDays / this.getCalculateDaysBetween(project)) * 100;
  
    // Check if the project is not completed and the percentage is 75% or less
    return project.status == 'Procurement in Progress' && percentage >= 45;
  }

  public implementationFlash(project: ProjectDetails): boolean {
    // Ensure the project has a startDate property
    if (!project.startDate) {
      return false; // Cannot calculate totalDays without startDate
    }
  
    // Calculate the difference between startDate and today in milliseconds
    const startDate = new Date(project.startDate).getTime();
    const today = new Date().getTime();
    const totalMilliseconds = today - startDate;
  
    // Calculate the total days
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the percentage of days passed
    const percentage = (totalDays / this.getCalculateDaysBetween(project)) * 100;
  
    // Check if the project is not completed and the percentage is 75% or less
    return project.status == 'Implementation in Progress' && percentage >= 70;
  }
  
  
  

  viewProject(project: ProjectDetails) {
    if (project && project.ptsRef) {
      this.router.navigate(['/project/view-project', project.ptsRef]);
      console.log('View project:', project);
    } else {
      console.error('Invalid project:', project);
    }
    this.showActionButtons = !this.showActionButtons;
  }

  editProject(project: ProjectDetails) {
    this.router.navigate(['/project/edit/projectDetails', project.ptsRef]);
    console.log('edit project:', project);
    this.showActionButtons = !this.showActionButtons;
  }

  uploadFile(project: ProjectDetails) {
    this.router.navigate(['/project/upload', project.ptsRef]);
    console.log('Upload business case:', project);
    this.showActionButtons = !this.showActionButtons;
  }

  toggleActionButtons() {
    this.showActionButtons = !this.showActionButtons;
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

    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;

    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;
  }

}









