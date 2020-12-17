import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/event/event';


@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  public evento : Event

  constructor(private http: HttpClient) { }

  private get_events = "http://localhost:3000/eventos"


  getEvents(events:[Event]){

    return this.http.get(this.get_events)

  }

}
