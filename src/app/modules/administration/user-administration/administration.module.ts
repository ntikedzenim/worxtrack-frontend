import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { PmteDpwSupervisorComponent } from './pmte-dpw-supervisor/pmte-dpw-supervisor.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { UpdateMilestonesComponent } from './update-milestones/update-milestones.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProcurementMilestonesComponent } from './procurement-milestones/procurement-milestones.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ImplementationMilestonesComponent } from './implementation-milestones/implementation-milestones.component';
import { ViewClosedComponent } from './completed-projects/view-closed/view-closed.component';
import { ViewCompletedComponent } from './closed-projects/view-completed/view-completed.component';
import { EditClosedComponent } from './closed-projects/edit-closed/edit-closed.component';
import { ReportComponent } from './report/report.component';
import { ViewMilestoneDashboardComponent } from './view-milestone-dashboard/view-milestone-dashboard.component';
import { ViewMilestonesComponent } from './view-milestone-dashboard/view-milestones/view-milestones.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [UpdateProfileComponent, CreateProfileComponent, SupervisorComponent, PmteDpwSupervisorComponent, AddProjectComponent, CompletedProjectsComponent, ClosedProjectsComponent, UpdateMilestonesComponent, SearchDialogComponent, ViewProjectComponent, EditProjectComponent, ProcurementMilestonesComponent, ChallengesComponent, ImplementationMilestonesComponent, ViewClosedComponent, ViewCompletedComponent, EditClosedComponent, ReportComponent, ViewMilestoneDashboardComponent, ViewMilestonesComponent, ConfirmDeleteComponent, UploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
