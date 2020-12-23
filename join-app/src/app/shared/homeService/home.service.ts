import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from '../event.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public categoria:string;
  public input:string;
  public mostrarDatoBuscado:boolean;

  private urlCategoria = "http://localhost:3000/categoria/filtrar";
  private urlInput = "http://localhost:3000/eventos/filtrar";
  private urlSelectInput = "http://localhost:3000/eventos/filtrarSelect"

  constructor(private http: HttpClient) { }

  filterSelect(categoria:string){
    return this.http.get(this.urlCategoria + "/" + categoria);
  }

  filterInput(input:string){
    console.log(input)
    return this.http.get(this.urlInput + "/" + input);
  }
  filterSelectInput(array:string[]){
    console.log("prueba2")
    return this.http.get(this.urlSelectInput + "?input=" + array[1] + "&categoria=" + array[0]);
  }


}
