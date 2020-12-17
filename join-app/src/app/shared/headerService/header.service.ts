import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private url = "http://localhost:3000/login"

  public user:User;
  constructor(private http: HttpClient) { }

  loginUser(usuario:User){
    return this.http.post(this.url, usuario);
  }
  
}
