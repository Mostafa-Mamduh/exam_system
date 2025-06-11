import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Iquestion } from '../../../models/iquestion';
import { Iexam } from '../../../models/iexam';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamsService } from '../../../services/exams.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-question',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css'],
})
export class ManageQuestionComponent implements OnChanges {
  @Input() examId: any | null = null;
  exam: Iexam | null = null;
  questions: Iquestion[] = [];
  selectedQuestion: Iquestion | null = null;

  addQuestionForm = new FormGroup({
    questionText: new FormControl('', [Validators.required]),
    options: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
    correctAnswer: new FormControl('', [Validators.required]),
  });

  constructor(
    private _ExamsService: ExamsService,
    public modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['examId'] && this.examId !== null) {
      this._ExamsService.getExamById(this.examId).subscribe({
        next: (exam) => {
          this.exam = exam;
          this.questions = exam.questions || [];
          console.log('Exam and Questions:', this.exam, this.questions);
        },
        error: (err) => console.error('Error fetching exam:', err),
      });
    }
  }

  openManageModal(content: any): void {
    if (this.examId) {
      this.modalService.open(content, { ariaLabelledBy: 'manageQuestionsModalLabel' });
    }
  }

  openEditQuestionModal(content: any, question: Iquestion): void {
    this.selectedQuestion = { ...question };
    console.log('Selected Question for Edit:', this.selectedQuestion);
    this.modalService
      .open(content, { ariaLabelledBy: 'editQuestionModalLabel' })
      .result.then(
        () => console.log('Modal closed'),
        () => {
          console.log('Modal dismissed');
          this.selectedQuestion = null;
        }
      );
  }

  updateQuestion(): void {
    if (this.selectedQuestion && this.exam) {
      const index = this.exam.questions.findIndex((q) => q.id === this.selectedQuestion!.id);
      if (index !== -1) {
        this.exam.questions[index] = { ...this.selectedQuestion };
        this._ExamsService.updateExam(this.exam).subscribe({
          next: (res) => {
            console.log('Question Updated:', res);
            this.questions = res.questions;
            this.modalService.dismissAll();
          },
          error: (err) => console.error('Update Error:', err),
        });
      }
    }
  }

  deleteQuestion(id: any): void {
    if (this.exam) {
      this.exam.questions = this.exam.questions.filter((q) => q.id !== id);
      this._ExamsService.updateExam(this.exam).subscribe({
        next: (res) => {
          console.log('Question Deleted:', res);
          this.questions = res.questions;
        },
        error: (err) => console.error('Delete Error:', err),
      });
    }
  }

  addQuestion(): void {
    if (this.addQuestionForm.valid && this.exam) {
      const newQuestion: Iquestion = {
        examId: this.exam.id!,
        questionText: this.addQuestionForm.value.questionText || '',
        options: (this.addQuestionForm.value.options || []).filter((opt): opt is string => opt !== null),
        correctAnswer: this.addQuestionForm.value.correctAnswer || '',
      };
      this.exam.questions.push(newQuestion);
      this._ExamsService.updateExam(this.exam).subscribe({
        next: (res) => {
          console.log('Question Added:', res);
          this.questions = res.questions;
          this.addQuestionForm.reset({
            questionText: '',
            options: ['', '','',''],
            correctAnswer: '',
          });
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Add Error:', err),
      });
    }
  }

  get optionsControls() {
    return (this.addQuestionForm.get('options') as FormArray).controls;
  }
}
