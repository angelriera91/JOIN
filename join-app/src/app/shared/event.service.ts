import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/event/event';
import { User } from '../model/user/user';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public event : Event;
  public eventPaPuntuacion: Event;
  public events : Event[];  
  public creados:boolean = false;
  public paraAsistir:boolean = false;
  public terminados:boolean = false;
  public creadosPublic:boolean = false;

  private get_creados = "http://localhost:3000/eventos/creados"
  private get_asistir = "http://localhost:3000/eventos/asistir"
  private get_terminados = "http://localhost:3000/eventos/terminados"
  private get_events = "http://localhost:3000/eventos"
  private delete_event = "http://localhost:3000/delete/event"
  private edit_Event = "http://localhost:3000/put/event"
  private get_user = "http://localhost:3000/user"

  constructor(private http: HttpClient) { }

  getEventsCreados(id_creador:any){
    return this.http.get(this.get_creados + "/" + id_creador);
  }

  getEventsParaAsistir(id_usuario:any){
    return this.http.get(this.get_asistir + "/" + id_usuario);
  }

  getEventsTerminados(id_usuario:any){
    return this.http.get(this.get_terminados + "/" + id_usuario);
  }


  getEvents(){
    return this.http.get(this.get_events)
  }

  deleteEvent(id_event:any){

    return this.http.delete(this.delete_event + "/" + id_event)

  }

  editEvent(evento: Event){

    return this.http.put(this.edit_Event, evento)

  }

  getUsuario(id_creador:number){


    return this.http.get(this.get_user + "/" + id_creador)

  }



}
