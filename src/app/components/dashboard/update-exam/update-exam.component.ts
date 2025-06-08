import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iexam } from '../../../models/iexam';
import { FormsModule } from '@angular/forms';
import { ExamsService } from '../../../services/exams.service';

@Component({
  selector: 'app-update-exam',
  imports: [FormsModule],
  templateUrl: './update-exam.component.html',
  styleUrl: './update-exam.component.css'
})
export class UpdateExamComponent {
  @Input() exam!:Iexam;
  @Output() examUpdated = new EventEmitter<Iexam>();

  constructor(private _ExamsService:ExamsService){}
    updateExam() {
    this._ExamsService.updateExam(this.exam).subscribe({
      next: (res) => {
        console.log('Updated:', res);
        this.examUpdated.emit(this.exam);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
