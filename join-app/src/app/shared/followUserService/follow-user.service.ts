import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class FollowUserService {

  url = "http://localhost:3000/usuario/favorito";

  constructor(private http: HttpClient) { }

  followUser(followUser: User) 
  {
    return this.http.post(this.url, followUser)
  }
}
