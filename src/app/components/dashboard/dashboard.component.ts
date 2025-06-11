import { Component, OnInit } from '@angular/core';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ExamsAdminComponent } from './exams-admin/exams-admin.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { Iexam } from '../../models/iexam';
import { Iresult } from '../../models/iresult';
import { ResultService } from '../../services/result.service';
import { ExamsService } from '../../services/exams.service';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CreateExamComponent,
    ExamsAdminComponent,
    UpdateExamComponent,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  selectedExam: Iexam | null = null;
  results: Iresult[] = [];
  exams: Iexam[] = [];

  constructor(
    private _ResultService: ResultService,
    private _ExamsService: ExamsService
  ) {}

  handleExamUpdated(exam: Iexam) {
    this.selectedExam = exam;
  }

  ngOnInit(): void {
    this._ExamsService.getAllExams();

    // استخدام forkJoin لجلب النتائج فقط، ثم الاشتراك في exams$
    forkJoin({
      results: this._ResultService.getAllResults(),
    }).subscribe({
      next: ({ results }) => {
        this.results = results || [];
        console.log('Raw Results:', results);
        console.log('Processed Results:', this.results);

        // الاشتراك في exams$ للحصول على البيانات الحالية أو الجديدة
        this._ExamsService.exams$.subscribe(exams => {
          this.exams = exams || [];
          console.log('Raw Exams:', exams);
          console.log('Processed Exams:', this.exams);
        });
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  getExamTitle(examId: any | null): string {
    const exam = this.exams.find((e) => e.id == examId);
    return exam ? exam.title : 'Unknown Exam';
  }

  getTotalQuestions(examId: any | null): number {
    const exam = this.exams.find((e) => e.id == examId);
    return exam?.questions?.length || 0;
  }

  getPercentage(result: Iresult): number {
    const exam = this.exams.find((e) => e.id == result.examId);
    if (!exam || !exam.questions || exam.questions.length === 0) return 0;
    const totalQuestions = exam.questions.length;
    const percentage = (result.score / totalQuestions) * 100;
    return Number.isFinite(percentage) ? Math.round(percentage) : 0;
  }
}
