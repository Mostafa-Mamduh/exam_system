import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Iquestion } from '../../../models/iquestion';
import { Iexam } from '../../../models/iexam';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExamsService } from '../../../services/exams.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css'],
})
export class ManageQuestionComponent implements OnChanges {
  @Input() examId: any | null = null; // Accept examId
  exam: Iexam | null = null; // Store the exam based on ID
  questions: Iquestion[] = [];
  selectedQuestion: Iquestion | null = null;

  constructor(private _ExamsService: ExamsService, public modalService: NgbModal) {}

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

  deleteQuestion(id: number): void {
    console.log('Delete question ID:', id);
  }
}
