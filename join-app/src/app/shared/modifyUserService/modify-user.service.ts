import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ModifyUserService {

  urluser = "http://localhost:3000/usuario";

  constructor(private http: HttpClient) { }

  putUser(usuario: User) 
  {
    console.log(usuario)
    return this.http.put(this.urluser, usuario)
  
  }
}
