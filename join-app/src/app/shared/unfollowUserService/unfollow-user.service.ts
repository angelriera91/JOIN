import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UnfollowUserService {

  urluser = "http://localhost:3000/usuario/favorito";

  constructor(private http: HttpClient) { }

  unfollowUser(usuario)
  {
    return this.http.delete(this.urluser + "/" + usuario);
  }
}