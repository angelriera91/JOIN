import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UnfollowUserService {

  urluser = "http://localhost:3000/usuario/favorito";

  constructor(private http: HttpClient) { }

  unfollowUser(id_usuario, id_seguidor)
  {

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
     })
     let options = ({
       headers:headers,
       body: {
         id_usuario: id_usuario, 
        id_seguidor: id_seguidor
      }
     })

    return this.http.delete(this.urluser,options);
  }

}