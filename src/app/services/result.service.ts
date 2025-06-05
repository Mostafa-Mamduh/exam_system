import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Iresult } from '../models/iresult';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _HttpClient: HttpClient) {}
  addResult(examId:number|undefined, score:number):Observable<any>{
      const currentDate = new Date().toISOString();
  const studentId = JSON.parse(localStorage.getItem('user') || '{}')?.id;

  const result = { examId, score, submittedAt: currentDate, studentId };

  return this._HttpClient.post(`${environment.appUrl}/results`, result);
  }
  getAllResults():Observable<Iresult[]>{
    return this._HttpClient.get<Iresult[]>(`${environment.appUrl}/results`)
  }
}
