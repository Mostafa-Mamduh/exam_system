import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { StudentExamsComponent } from './components/student-exams/student-exams.component';
import { ExamDetailsComponent } from './components/student-exams/exam-details/exam-details.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  {path : "" , component : LoginComponent},
  {path : "login" , component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "exams" , component : StudentExamsComponent},
  {path : "results" , component : ResultsComponent},
  {path : "exams/:id" , component : ExamDetailsComponent}
];
