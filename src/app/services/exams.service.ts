import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private _Httpclient : HttpClient) { }
  // getAllExams(){
  //   this._Httpclient.get()
  // }

}
