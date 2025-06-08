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
  @Input() exam: Iexam | null = null;
  questions: Iquestion[] = [];
  selectedQuestion: Iquestion | null = null;

  constructor(
    private _ExamsService: ExamsService,
    public modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exam'] && this.exam) {
      this.questions = this.exam.questions || [];
      console.log('Questions:', this.questions);
    }
  }

  openEditQuestionModal(content: any, question: Iquestion): void {
    this.selectedQuestion = { ...question }; // Deep copy
    console.log('Selected Question for Edit:', this.selectedQuestion);
    this.modalService
      .open(content, { ariaLabelledBy: 'editQuestionModalLabel' })
      .result.then(
        () => console.log('Modal closed'),
        () => {
          console.log('Modal dismissed');
          this.selectedQuestion = null; // Reset on dismiss
        }
      );
  }

  updateQuestion(): void {
    if (this.selectedQuestion && this.exam) {
      const index = this.exam.questions.findIndex(
        (q) => q.id === this.selectedQuestion!.id
      );
      if (index !== -1) {
        this.exam.questions[index] = { ...this.selectedQuestion };
        this._ExamsService.updateExam(this.exam).subscribe({
          next: (res) => {
            console.log('Question Updated:', res);
            this.questions = res.questions; // Update local questions
            this.modalService.dismissAll(); // Close all open modals
          },
          error: (err) => console.error('Update Error:', err),
        });
      }
    }
  }

  deleteQuestion(id: number): void {
    console.log('Delete question ID:', id);
    // Implement delete logic if needed
  }
}
