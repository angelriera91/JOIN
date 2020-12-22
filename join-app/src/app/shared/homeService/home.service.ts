import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from '../event.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public categoria:string;

  private url = "http://localhost:3000/categoria"


  constructor(private http: HttpClient) { }

  filterSelect(categoria:string){
    return this.http.get(this.url + "/" + categoria);
  }

}
