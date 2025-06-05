import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ExamsService } from '../../services/exams.service';
import { ResultService } from '../../services/result.service';
import { Iresult } from '../../models/iresult';
import { Iexam } from '../../models/iexam';

@Component({
  selector: 'app-results',
  imports: [JsonPipe,DecimalPipe,DatePipe,NgClass,NgIf,NgFor],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Iresult[] = [];
  exams: Iexam[] = [];

  constructor(
    private _ResultService: ResultService,
    private _ExamsService: ExamsService
  ) {}

  ngOnInit(): void {
    const student = JSON.parse(localStorage.getItem('user') || '{}');
    const studentId = student.id;

    // Fetch all results and filter by studentId
    this._ResultService.getAllResults().subscribe({
      next: (results) => {
        this.results = results.filter((res) => res.studentId === studentId);

        // Fetch exams for each result's examId
        const examObservables = this.results.map((result) =>
          this._ExamsService.getExamById(result.examId)
        );

        // Use forkJoin to handle all exam requests in parallel
        forkJoin(examObservables).subscribe({
          next: (exams) => {
            this.exams = exams;
            console.log(this.exams, 'exams');
          },
          error: (err) => {
            console.error('Error fetching exams:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching results:', err);
      }
    });
  }
}
