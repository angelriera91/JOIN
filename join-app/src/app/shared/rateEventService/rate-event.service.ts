import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';

@Injectable({
  providedIn: 'root'
})
export class RateEventService {

  urlevent = "http://localhost:3000/evento/puntuacion";

  constructor(private http: HttpClient) { }

  rateEvent(puntuacion: UsuarioEvento) 
  {
    return this.http.put(this.urlevent, puntuacion)
  }
}