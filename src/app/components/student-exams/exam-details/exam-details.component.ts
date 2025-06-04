import { ResultService } from './../../../services/result.service';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from './../../../services/exams.service';
import { Component, OnInit } from '@angular/core';
import { Iexam } from '../../../models/iexam';
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-exam-details',
  imports: [TimerComponent],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css',
})
export class ExamDetailsComponent implements OnInit {
  examId: number | undefined;
  currentExam: Iexam | undefined;
  result: number = 20;
  finalResult: number = 0;
  userAnswers: string[] = [];
  constructor(
    private _ExamsService: ExamsService,
    private _ActivatedRoute: ActivatedRoute,
    private _ResultService : ResultService
  ) {}
  ngOnInit(): void {
    this.examId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._ExamsService.getExamById(this.examId).subscribe({
      next: () => console.log('Result sent successfully'),
      error: (err) => console.error('Error sending result:', err)
    });
  }
  calcResult() {
    let score = 0;

    this.currentExam?.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    });

    const total = this.currentExam?.questions.length ?? 0;
     this._ResultService.addResult(this.examId ,score).subscribe({
      next:(value)=>{
        console.log(value);
        console.log('asd');
      }
    })
    alert(`Your score is ${score} out of ${total}`);

    console.log(this.userAnswers);
  }
}
