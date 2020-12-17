import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  private url = "http://localhost:3000/login"

  public user:User;
  constructor(private http: HttpClient) { }

  loginUser(usuario:User){
    return this.http.post(this.url, usuario);
  }
}
