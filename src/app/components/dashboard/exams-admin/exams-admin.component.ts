import { Component, OnInit } from '@angular/core';
// import { ExamsService } from '../../services/exams.service';
// import { Iexam } from '../../models/iexam';
import { CommonModule } from '@angular/common';
import { UpdateExamComponent } from '../update-exam/update-exam.component';
import { ManageQuestionComponent } from '../manage-question/manage-question.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamsService } from '../../../services/exams.service';
import { Iexam } from '../../../models/iexam';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-exams-admin',
  standalone: true,
  imports: [CommonModule, UpdateExamComponent, ManageQuestionComponent,FormsModule],
  templateUrl: './exams-admin.component.html',
  styleUrls: ['./exams-admin.component.css']
})
export class ExamsAdminComponent implements OnInit {
  exams: Iexam[] = [];
  selectedExam: Iexam | null = null;

  constructor(private _ExamsService: ExamsService, public modalService: NgbModal) {}

 ngOnInit(): void {
  this._ExamsService.exams$.subscribe({
    next: (res) => {
      this.exams = res;
      console.log('Exams:', this.exams);
    },
    error: (err) => console.error('Error fetching exams:', err),
  });
  this._ExamsService.getAllExams();

}

  openEditModal(content: any, exam: Iexam): void {
    this.selectedExam = { ...exam };
    this.modalService.open(content, { ariaLabelledBy: 'editExamModalLabel' });
  }

  openManageModal(content: any, examId: any): void {
    this.selectedExam = this.exams.find(exam => exam.id === examId) || null; // Set based on ID
    this.modalService.open(content, { ariaLabelledBy: 'manageQuestionsModalLabel' });
  }
updateExam(): void {
    if (this.selectedExam && this.selectedExam.id !== undefined) {
      this._ExamsService.updateExam(this.selectedExam).subscribe({
        next: (res) => {
          console.log('Exam Updated:', res);
          const index = this.exams.findIndex(e => e.id === res.id);
          if (index !== -1) {
            this.exams[index] = res;
          }
          this.selectedExam = null;
        },
        error: (err) => console.error('Update Error:', err),
      });
    }
  }
  onExamUpdated(updatedExam: Iexam): void {
    const index = this.exams.findIndex((e) => e.id === updatedExam.id);
    if (index !== -1) {
      this.exams[index] = updatedExam;
    }
    this.selectedExam = null;
  }
  deleteExam(exam:Iexam){
   if(confirm("Are you Sure to Delete")){
     this._ExamsService.deleteExam(exam).subscribe({
      next : (res)=>{
        console.log(res);
      }
    })
   }
  }
}
