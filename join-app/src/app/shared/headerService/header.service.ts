import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';
import { Event } from '../../model/event/event'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private urlUserTotFavs = "http://localhost:3000/user/totFavs";
  private urlLogin = "http://localhost:3000/login";
  private urlRegister = "http://localhost:3000/register";  
  private create_event = "http://localhost:3000/create/event"
  private recuperar_event = "http://localhost:3000/get/lastevent/" 
  private create_assist = "http://localhost:3000/create/assist"
  public totFavs:number;
  public user:User;
  public event;
  public last_event;

  constructor(private http: HttpClient) { }

  getTotFavs(id:any){
    console.log(id);

    return this.http.get(this.urlUserTotFavs + "/" + id);
  }
//servicios -MG
  loginUser(usuario:User){
    return this.http.post(this.urlLogin, usuario);
  }
  
  registerUser(usuario:User){
    return this.http.post(this.urlRegister, usuario);
  }
    
  crearEvento(evento:Event){
    return this.http.post(this.create_event, evento)
  }

  recuperarEvent(id:any){
    return this.http.get(this.recuperar_event + id)
  }

 createAssist(datos: UsuarioEvento){

  return this.http.post(this.create_assist, datos)

 }
  
}
