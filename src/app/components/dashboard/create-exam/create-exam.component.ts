import { Iquestion } from './../../../models/iquestion';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExamsService } from '../../../services/exams.service';
import { Iexam } from '../../../models/iexam';

@Component({
  selector: 'app-create-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {
  exam = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    duration:new FormControl(0)
  })
  constructor(private _ExamsService: ExamsService){}
  get title(){
    return this.exam.get('title');
  }
  get description(){
    return this.exam.get('description');
  }
  get duration(){
    return this.exam.get('duration')
  }
  saveExam(){
    // this._ExamsService.getAllExams().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   }
    // })
    let exam: Iexam = {
    title: this.exam.value.title || '',
    description: this.exam.value.description || '',
    duration: this.exam.value.duration || 0,
    questions: []
  };
    this._ExamsService.addExam(exam).subscribe({
      next:(res)=>{
        console.log('Exam saved successfully!', res);
        this.exam.reset();
      }
    })
  }
}
