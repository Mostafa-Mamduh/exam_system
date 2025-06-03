import { ActivatedRoute } from '@angular/router';
import { ExamsService } from './../../../services/exams.service';
import { Component, OnInit } from '@angular/core';
import { Iexam } from '../../../models/iexam';

@Component({
  selector: 'app-exam-details',
  imports: [],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit{
  examId: number | undefined;
  currentExam: Iexam | undefined;
  constructor(private _ExamsService: ExamsService , private _ActivatedRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.examId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._ExamsService.getExamById(this.examId).subscribe({
      next : (res)=> {
        this.currentExam = res;
        console.log(this.currentExam)

      }
    })
  }


}
