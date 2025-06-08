import { Iexam } from '../../../models/iexam';
import { Iquestion } from '../../../models/iquestion';
import { ManageQuestionComponent } from '../manage-question/manage-question.component';
import { UpdateExamComponent } from '../update-exam/update-exam.component';
import { ExamsService } from './../../../services/exams.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams-admin',
  imports: [UpdateExamComponent,ManageQuestionComponent],
  templateUrl: './exams-admin.component.html',
  styleUrl: './exams-admin.component.css'
})
export class ExamsAdminComponent implements OnInit {
  exams:Iexam[]=[]
  selectedExam!:Iexam;
  questions:Iquestion[]=[];
  constructor(private _ExamsService : ExamsService){}
  ngOnInit(): void {
    this._ExamsService.exams$.subscribe((data) => {
      this.exams = data;
    });
    this._ExamsService.getAllExams()
  }
  openEditModal(exam:Iexam){
    this.selectedExam=exam;
    this.questions= this.selectedExam.questions;
  }
  onExamUpdated(updatedExam: Iexam) {
  const index = this.exams.findIndex(e => e.id === updatedExam.id);
  if (index > -1) {
    this.exams[index] = { ...updatedExam };
  }
  }
  openManageModal(exam: Iexam) {
    this.selectedExam = { ...exam };
  }
}
