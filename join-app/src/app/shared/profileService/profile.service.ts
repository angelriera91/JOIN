import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user:User;


  private urlEvent = "http://localhost:3000/event"
  private urlLogin  = "http://localhost:3000/login"

  constructor(private http: HttpClient) {
    this.user;
   }

/*   getdatosUser(datos:any){
    console.log(datos);

    return this.http.post(this.urlLogin, datos)
  } */

  
}
