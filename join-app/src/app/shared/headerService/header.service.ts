import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private urlUserTotFavs = "http://localhost:3000/user/totFavs";
  private urlLogin = "http://localhost:3000/login";
  private urlRegister = "http://localhost:3000/register";
  
  public totFavs:number;
  public user:User;
  constructor(private http: HttpClient) { }

  getTotFavs(id:any){
    console.log(id);

    return this.http.get(this.urlUserTotFavs + "/" + id);
  }

  loginUser(usuario:User){
    return this.http.post(this.urlLogin, usuario);
  }
  registerUser(usuario:User){
    return this.http.post(this.urlRegister, usuario);
  }
}
