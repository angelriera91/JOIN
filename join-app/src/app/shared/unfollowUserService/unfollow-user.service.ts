import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UnfollowUserService {

  url = "http://localhost:3000/usuario/favorito";

  constructor(private http: HttpClient) { }

  unfollowUser(id_usuario:number)
  {
    return this.http.delete(this.url + "?id=" + id_usuario)
  }
}