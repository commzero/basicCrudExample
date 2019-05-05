import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
   constructor(private http: HttpClient) { }
   // to get all users list, it returns observable
   onGetUsers(slice) {
      return this.http.get(`${environment.apiUrl}users?_limit=${slice}`);
   }
   // to add user to json file
   onAddUsers(body: any) {
      return this.http.post(`${environment.apiUrl}users`, body);
   }
   // to edit user with the same id
   onEditUsers(id: number, body: any) {
      return this.http.put(`${environment.apiUrl}users/${id}`, body);
   }
   // to delete user with the same id
   onDeleteUsers(id: number) {
      return this.http.delete(`${environment.apiUrl}users/${id}`);
   }
}