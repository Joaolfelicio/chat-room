import { linkAddMessage, linkGetMessage } from './../../../settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    return this.http.get<any>(linkGetMessage);
  }

  sendMessage(hash: string, message: string): Observable<any> {
    const data = {
      hash: hash,
      message: message
    };
    return this.http.post<any>(linkAddMessage, data);
  }
}
