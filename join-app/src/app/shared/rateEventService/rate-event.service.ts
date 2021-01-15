import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';

@Injectable({
  providedIn: 'root'
})
export class RateEventService {

  urlevent = "http://localhost:3000/evento/puntuacion";

  public usuario_evento: UsuarioEvento;
  public evento: Event;

  constructor(private http: HttpClient) { }

  getRate(id_evento : number, id_usuario : number) 
  {

    return this.http.get(this.urlevent + "/" + id_evento + "/" + id_usuario);
  }

  rateEvent(puntuacion: UsuarioEvento) 
  {
    return this.http.post(this.urlevent, puntuacion)
  }

  changeEvent(evento: any) 
  {
    return this.http.put(this.urlevent + "/evento", evento)
  }

  changeRate(puntuacion: UsuarioEvento) 
  {
    return this.http.put(this.urlevent, puntuacion)
  }
}