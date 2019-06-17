import { linkCreateUser, linkLoginUser } from './../../../settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  createAccount(username: string, pass: string): Observable<any> {
    const data = {
      login: username,
      password: pass
    };
    return this.http.post<any>(linkCreateUser, data);
  }

  loginAccount(username: string, pass: string): Observable<any> {
    const data = {
      login: username,
      password: pass
    };
    return this.http.post<any>(linkLoginUser, data);
  }
}
