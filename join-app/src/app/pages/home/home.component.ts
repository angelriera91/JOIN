import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { HomeService } from 'src/app/shared/homeService/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categorias:string[]= ["Categoria","Conocimiento","Idiomas","Salir","Deportes"];
  public mostrarDatoBuscado:boolean = false;

  constructor(private homeService: HomeService, public eventService:EventService) {
    homeService.mostrarDatoBuscado = this.eventService.mostrar;
   }


  //busqueda por el select
  filtroSelect(input:string){
    if(input != null){
      console.log("ANTES VALIDACION INPUT")
      if(input === ""){
        console.log(input)
        this.homeService.input = null;
      }else{
        console.log(input);
        this.homeService.input = input;
      }
      if (this.homeService.mostrarDatoBuscado == false) {
        console.log("primer event")
        this.homeService.mostrarDatoBuscado = true;
        this.mostrarDatoBuscado = true;
      } else {
        console.log("segundo event")
        this.homeService.mostrarDatoBuscado = false;
        this.mostrarDatoBuscado = false;
      }
  
      
    }

  }

  cambio(categoria:string){
    if(categoria == "Categoria"){
      this.homeService.categoria = null;
      console.log(categoria)  
    }else{
      this.homeService.categoria = categoria;
      console.log(categoria)
    }
  }

  ngOnInit(): void {
  }

}
