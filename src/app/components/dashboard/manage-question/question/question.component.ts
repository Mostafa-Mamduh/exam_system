import { Component, Input, OnInit } from '@angular/core';
import { Iquestion } from '../../../../models/iquestion';
import { EditQuestionComponent } from './edit-question/edit-question.component';

@Component({
  selector: 'app-question',
  imports: [EditQuestionComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent  {

  @Input() question!:Iquestion;
  selectedQuestion!: Iquestion;
editQuestion(question: Iquestion) {
  this.selectedQuestion = { ...question };
}
}
