import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AppDashboardComponent } from './app-dashboard.component';

const routes: Routes = [{
  path: '', component: AppDashboardComponent, canActivate: [AuthGuard], data: { roles: ['System_Admin','Project_Manager','Technical_Leader','Management'] }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDashboardRoutingModule { } 
