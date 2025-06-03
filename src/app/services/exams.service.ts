import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Iexam } from '../models/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  constructor(private _Httpclient : HttpClient) { }
  getAllExams() : Observable<any>{
    return this._Httpclient.get<any[]>(`${environment.appUrl}/exams`);
  }
  getExamById(id:number) : Observable<any> {
    return this._Httpclient.get<any>(`${environment.appUrl}/exams/${id}`);
  }
}
