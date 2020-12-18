import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private urlLogin = "http://localhost:3000/login";
  private urlRegister = "http://localhost:3000/register";
  
  public user:User;
  constructor(private http: HttpClient) { }

  loginUser(usuario:User){
    return this.http.post(this.urlLogin, usuario);
  }
  registerUser(usuario:User){
    return this.http.post(this.urlRegister, usuario);
  }
}
