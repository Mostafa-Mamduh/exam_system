import { RouterLink } from '@angular/router';
import { ExamsService } from './../../services/exams.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-exams',
  imports: [RouterLink],
  templateUrl: './student-exams.component.html',
  styleUrl: './student-exams.component.css'
})
export class StudentExamsComponent implements OnInit {
  exams!:any[];
  constructor(private _ExamsService : ExamsService){}
  ngOnInit(): void {
    this._ExamsService.getAllExams().subscribe({
      next : (res) =>{
        this.exams=res;
      }
    })
  }
}
