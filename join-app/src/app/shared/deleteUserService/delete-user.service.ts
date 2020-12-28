import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  urluser = "http://localhost:3000/usuario";

  constructor(private http: HttpClient) { }

  deleteUser(usuario)
  {
    return this.http.delete(this.urluser + "/" + usuario);
  }
}
