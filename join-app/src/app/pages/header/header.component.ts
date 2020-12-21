import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public event:Event = new Event();
  public mostrar:boolean = true;
  public user:User = new User();
  public mostrarError = false;
  

  constructor(private modalService: NgbModal, private headerService:HeaderService, private router: Router) {
    this.event;
    this.user;
  }


//16-12-20 -MG
onLogin(email:string,password:string){
  let usuario = new User(0,"","","","",email,password);

  this.headerService.loginUser(usuario).subscribe(data => {
    console.log(data);

    if(data[0] != undefined){
      if (data[0].id_usuario != null){
      this.headerService.user = data[0];
      this.user = data[0];
      this.onSubmit("");
      this.mostrar = false;
      this.router.navigate(["/**"]);
    }

    else{
      this.mostrarError = true;
    }
    
    }
    else{
      this.mostrarError = true;
    }
    
  
  },
  error => console.log(error)

  )


}

// create - event

crearEvento (titulo: string, lugar:string, fecha:string, hora:string, description:string, categoria:string, imagen: string, max_assist:number){
  
  

  let evento = {"titulo": titulo, "lugar":lugar, "fecha":fecha, "hora":hora, "descripcion":description, "categoria":categoria, "imagen":imagen, "id_creador":this.user.id_usuario, "max_assist": max_assist}
  
  this.headerService.crearEvento(evento).subscribe(data =>{

    
      if (this.user.id_usuario != null){
      this.headerService.event = data;      
      this.event = data;
      this.onSubmit2("");
      this.router.navigate(["/**"]);

      console.log("Evento Creado")
      }

      else{
      this.mostrarError = true;
      }
    
    })  

    // let id = {"id_creador": this.user.id_usuario}

    // this.headerService.recuperarEvent(id).subscribe(data =>{
    
    //   let event2 = data
  
    //   console.log(event2)
  
    
  
  // })
}

  


  

alerta(){
  alert("Hola")
  this.onSubmit2("");
  this.router.navigate(["/**"]);
}

onSubmit(loginForm){
  console.log(loginForm);
  this.modalService.dismissAll('Dismissed after saving data');

}

onSubmit2(createForm){
  console.log(createForm);
  this.modalService.dismissAll('Dismissed after saving data');

}


public open(content) {
  this.modalService.open(content, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
};


private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  
ngOnInit(): void {
}

}
