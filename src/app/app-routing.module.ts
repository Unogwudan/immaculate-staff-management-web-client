import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivisionComponent } from './navdetail/division/division.component';
import { AppraisalComponent } from './navdetail/appraisal/appraisal.component';
import { DepartmentComponent } from './navdetail/department/department.component';
import { ProfileComponent } from './navdetail/profile/profile.component';
import { SettingsComponent } from './navdetail/settings/settings.component';
import { NavdetailComponent } from './navdetail/navdetail.component';
import { EmployeeComponent } from './navdetail/employee/employee.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './navdetail/dashboard/dashboard.component';
import { TeamComponent } from './navdetail/team/team.component';
import { TeamMemberComponent } from './navdetail/teammembers/teammember.component';


const routes: Routes = [
  { path: 'teams', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'teams/:id', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'teammembers', component: TeamMemberComponent, canActivate: [AuthGuard] },
  { path: 'teammembers/:id', component: TeamMemberComponent, canActivate: [AuthGuard] },
  { path: 'divisions', component: DivisionComponent, canActivate: [AuthGuard] },
  { path: 'divisions/:id', component: DivisionComponent, canActivate: [AuthGuard]},
  { path: 'appraisal', component: AppraisalComponent, canActivate: [AuthGuard]},
  { path: 'departments', component: DepartmentComponent, canActivate: [AuthGuard]},
  { path: 'departments/:id', component: DepartmentComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employees/:id', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'app', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'navdetail', component: NavdetailComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

//canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [NavdetailComponent, TeamComponent, TeamMemberComponent, DivisionComponent,
  AppraisalComponent, LoginComponent,
  DepartmentComponent, ProfileComponent,
  SettingsComponent, EmployeeComponent, DashboardComponent];
