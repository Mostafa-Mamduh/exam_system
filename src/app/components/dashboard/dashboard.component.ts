import { Component } from '@angular/core';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ExamsAdminComponent } from './exams-admin/exams-admin.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { Iexam } from '../../models/iexam';

@Component({
  selector: 'app-dashboard',
  imports: [CreateExamComponent,ExamsAdminComponent,UpdateExamComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
selectedExam: Iexam | null = null;
handleExamUpdated(exam:Iexam){
    this.selectedExam = exam;
}
}
