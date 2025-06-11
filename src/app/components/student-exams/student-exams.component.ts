import { RouterLink } from '@angular/router';
import { ExamsService } from './../../services/exams.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-student-exams',
  imports: [RouterLink, NavbarComponent],
  templateUrl: './student-exams.component.html',
  styleUrl: './student-exams.component.css',
})
export class StudentExamsComponent implements OnInit {
  exams!: any[];
  submittedExamIds!: any[];
  constructor(
    private _ExamsService: ExamsService,
    private _ResultService: ResultService
  ) {
  }
  ngOnInit(): void {
    let student = JSON.parse(localStorage.getItem('user') || '{}')
    let studentId = student.id;
    console.log(student , 'student Id');
    this._ExamsService.exams$.subscribe({
      next: (res) => {
        this.exams = res;
        this._ResultService.getAllResults().subscribe({
          next: (results) => {
            console.log(results);
            this.submittedExamIds = results
              .filter((result) => result.studentId == studentId)
              .map((result) => result.examId);
          },
        });
      },
    });
    this._ExamsService.getAllExams()
  }
}
