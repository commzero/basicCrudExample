import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  // to login it passes username and password and returns observable
  onLogin(username, password) {
    return this.http.get(`${environment.apiUrl}user?name=${username}&password=${password}`);
  }
}