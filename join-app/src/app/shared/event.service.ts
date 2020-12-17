import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/event/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public event : Event;
  public events : Event[];

  private get_events = "http://localhost:3000/eventos"

  constructor(private http: HttpClient) { }

  


  getEvents(){

    return this.http.get(this.get_events)

  }

}
