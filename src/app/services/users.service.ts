import { Iuser } from './../models/iuser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _HttpClient : HttpClient) {}
  getAllUsers() : Observable<Iuser[]>{
   return this._HttpClient.get<Iuser[]>(`${environment.appUrl}/users`);
  }
}
