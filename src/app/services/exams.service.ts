import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Iexam } from '../models/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  examsSubject = new BehaviorSubject<Iexam[]>([]);
  public exams$ = this.examsSubject.asObservable();
  constructor(private _Httpclient : HttpClient) {}

  getAllExams(){
    // return this._Httpclient.get<any[]>(`${environment.appUrl}/exams`);
     this._Httpclient.get<Iexam[]>(`${environment.appUrl}/exams`)
      .subscribe(exams => this.examsSubject.next(exams));
  }

  getExamById(id:any) : Observable<any> {
    return this._Httpclient.get<any>(`${environment.appUrl}/exams/${id}`);
  }

  addExam(examData: Iexam): Observable<any> {
    return this._Httpclient.post<any>(`${environment.appUrl}/exams`, examData).pipe(
      tap((newExam) => {
        let current = this.examsSubject.getValue();
        this.examsSubject.next([...current,newExam]);
      })
    );
  }

  updateExam(updatedExam: Iexam): Observable<Iexam> {
    return this._Httpclient.put<Iexam>(`${environment.appUrl}/exams/${updatedExam.id}`, updatedExam).pipe(
      tap((res) => {
        const currentExams = this.examsSubject.getValue();
        const updatedExams = currentExams.map(exam =>
          exam.id === updatedExam.id ? res : exam
        );
        this.examsSubject.next(updatedExams);
      })
    );
  }
}
