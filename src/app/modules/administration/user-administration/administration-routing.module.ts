import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';
import { ClosedProjectsComponent } from './closed-projects/closed-projects.component';
import { UpdateMilestonesComponent } from './update-milestones/update-milestones.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProcurementMilestonesComponent } from './procurement-milestones/procurement-milestones.component';
import { ImplementationMilestonesComponent } from './implementation-milestones/implementation-milestones.component';
import { ViewClosedComponent } from './completed-projects/view-closed/view-closed.component';
import { ViewCompletedComponent } from './closed-projects/view-completed/view-completed.component';
import { EditClosedComponent } from './closed-projects/edit-closed/edit-closed.component';
import { ReportComponent } from './report/report.component';
import { ViewMilestoneDashboardComponent } from './view-milestone-dashboard/view-milestone-dashboard.component';
import { ViewMilestonesComponent } from './view-milestone-dashboard/view-milestones/view-milestones.component';
import { AppDashboardComponent } from '../../dashboard/app-dashboard/app-dashboard.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin'] } },
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin'] } },
  { path: 'upload/:ptsRef', component: UploadComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader'] } },
  { path: 'new-project', component: AddProjectComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager'] } },
  { path: 'completed', component: CompletedProjectsComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'closed', component: ClosedProjectsComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'update-milestone', component: UpdateMilestonesComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager'] } },
  { path: 'view-project/:ptsRef', component: ViewProjectComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'edit/projectDetails/:ptsRef', component: EditProjectComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager'] } },
  { path: 'procurement/:ptsRef', component: ProcurementMilestonesComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager'] } },
  { path: 'implementation/:ptsRef', component: ImplementationMilestonesComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'view-completed/:ptsRef', component: ViewClosedComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'view-closed/:ptsRef', component: ViewCompletedComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'edit-closed/:ptsRef', component: EditClosedComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager'] } },
  { path: 'view-milestones', component: ViewMilestoneDashboardComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'milestones/:ptsRef', component: ViewMilestonesComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } },

  {
    path: 'scm-practitioner',
    component: ProcurementMilestonesComponent, // Replace with the appropriate component for SCM Practitioner
  },
  {
    path: 'bsc-formation/:ptsRef',
    component: ProcurementMilestonesComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] } // Replace with the appropriate component for BSC Formation
  },
  {
    path: 'bsc-meeting',
    component: ProcurementMilestonesComponent, // Replace with the appropriate component for BSC Meeting
  },
  {
    path: 'tor-endorsed',
    component: ProcurementMilestonesComponent, // Replace with the appropriate component for TOR Endorsed
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
