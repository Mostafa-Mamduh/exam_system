import { Iexam } from '../../../models/iexam';
import { ExamsService } from './../../../services/exams.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams-admin',
  imports: [],
  templateUrl: './exams-admin.component.html',
  styleUrl: './exams-admin.component.css'
})
export class ExamsAdminComponent implements OnInit {
  exams:Iexam[]=[]
  selectedExam!:Iexam;
  constructor(private _ExamsService : ExamsService){}
  ngOnInit(): void {
    this._ExamsService.exams$.subscribe((data) => {
      this.exams = data;
    });
    this._ExamsService.getAllExams()
  }
  openEditModal(exam:Iexam){
    this.selectedExam={...exam};
  }
}
