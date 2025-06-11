import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { StudentExamsComponent } from './components/student-exams/student-exams.component';
import { ExamDetailsComponent } from './components/student-exams/exam-details/exam-details.component';

import { ResultsComponent } from './components/results/results.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {path : "" , component : LoginComponent},
  {path : "login" , component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "exams" , component : StudentExamsComponent, canActivate:[AuthGuard]},
  {path : "exams/:id" , component : ExamDetailsComponent, canActivate:[AuthGuard]},
  {path : "dashboard" , component : DashboardComponent, canActivate:[AuthGuard,AdminGuard]},
  {path : "results" , component : ResultsComponent, canActivate:[AuthGuard]},
  // {path : "create" , component : CreateExamComponent},
];
