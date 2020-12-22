import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user:User;
  public users:User[];

  private urlEvent = "http://localhost:3000/event";
  private urlLogin  = "http://localhost:3000/login";
  private urlUserFav = "http://localhost:3000/user/favoritos";
  private urlMediaEventUser = "http://localhost:3000/user/mediaEvents"

  constructor(private http: HttpClient) {
    this.user;
   }

  getdatosUserFav(id:number){
    console.log(id);

    return this.http.get(this.urlUserFav + "/" + id);
  }

  getMediaEventUser(id:number){
    return this.http.get(this.urlMediaEventUser + "/" + id);
  }

  
}