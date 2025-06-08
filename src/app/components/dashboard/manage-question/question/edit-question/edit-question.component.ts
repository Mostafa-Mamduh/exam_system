import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Iquestion } from '../../../../../models/iquestion';
import { FormsModule } from '@angular/forms';
// import { IQuestion } from '../models/question.model';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-question',
  imports: [FormsModule],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent implements OnChanges {
  @Input() question!: Iquestion;

  @ViewChild('editModal') editModalRef!: ElementRef;

  modalInstance: any;

  questionText = '';
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';
  correctAnswer = '1';

  ngOnChanges() {
    if (this.question) {
      this.questionText = this.question.questionText;
      this.option1 = this.question.options[0];
      this.option2 = this.question.options[1];
      this.option3 = this.question.options[2];
      this.option4 = this.question.options[3];
      this.correctAnswer = this.question.correctAnswer.toString();

      setTimeout(() => {
        this.openModal();
      }, 0);
    }
  }

  openModal() {
    if (this.editModalRef) {
      this.modalInstance = new bootstrap.Modal(this.editModalRef.nativeElement);
      this.modalInstance.show();
    }
  }

  save() {
    console.log('Saving...', {
      questionText: this.questionText,
      options: [this.option1, this.option2, this.option3, this.option4],
      correctAnswer: this.correctAnswer
    });

    this.modalInstance.hide();
  }
}
