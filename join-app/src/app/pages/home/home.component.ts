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
  

  constructor(private homeService: HomeService) {
   }


  //busqueda por el select
  filtroSelect(categoria:string){
    console.log(categoria);

    this.homeService.categoria = categoria;

    this.homeService.filterSelect(categoria).subscribe((data:any) => {
      console.log(data);
    });
  
  }


  ngOnInit(): void {
  }

}
