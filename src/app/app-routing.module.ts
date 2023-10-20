import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'access-denied', component: AccessDeniedComponent, canActivate: [AuthGuard] },
      { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
      {
        path: '', loadChildren: () => import('./modules/dashboard/app-dashboard/app-dashboard.module').then(m => m.AppDashboardModule),
        data: { roles: ['System_Admin', 'End_User'] }
      },

      {
        path: 'project',
        loadChildren: () => import('./modules/administration/user-administration/administration.module')
          .then(mod => mod.AdministrationModule), canActivate: [AuthGuard], data: {
            roles: ['System_Admin']
          }
      },


      

    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
