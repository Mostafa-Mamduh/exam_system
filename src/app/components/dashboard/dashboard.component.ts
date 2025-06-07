import { Component } from '@angular/core';
import { CreateExamComponent } from '../admin-dashboard/create-exam/create-exam.component';
import { ExamsAdminComponent } from '../admin-dashboard/exams-admin/exams-admin.component';

@Component({
  selector: 'app-dashboard',
  imports: [CreateExamComponent,ExamsAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
