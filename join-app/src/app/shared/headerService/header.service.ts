import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Event } from '../../model/event/event'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private login = "http://localhost:3000/login"
  private create_event = "http://localhost:3000/create/event"
  private recuperar_event = "http://localhost:3000/get/lastevent/" 
  private create_assist = "http://localhost:3000/create/assist"
  public user:User;
  public event;
  public last_event;
  constructor(private http: HttpClient) { }

  loginUser(usuario:User){
    return this.http.post(this.login, usuario);
  }

  crearEvento(evento:Event){
    return this.http.post(this.create_event, evento)
  }

  recuperarEvent(id){
    return this.http.get(this.recuperar_event, id)
  }

 createAssist(datos: any){

  return this.http.post(this.create_assist, datos)

 }
  
}
