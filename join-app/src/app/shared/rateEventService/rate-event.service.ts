import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class RateEventService {

  urlevent = "http://localhost:3000/evento/puntuacion";

  constructor(private http: HttpClient) { }

  rateEvent(id_event: number, puntuacion) 
  {
    return this.http.put(this.urlevent, id_event, puntuacion)
  }
}