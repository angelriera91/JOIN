import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public event: Event = new Event
  public mostrar:boolean = true;
  public user:User = new User();
  public mostrarError = false;

  constructor(private modalService: NgbModal, private headerService:HeaderService, private profileService:ProfileService, private eventService:EventService, private router: Router) {
    this.event;
    this.user;
  }

//18-12-2020 -JP
home(){
  this.eventService.creados = false;
  this.eventService.paraAsistir = false;
  this.eventService.terminados = false;
}


//16-12-20 -MG
onLogin(email:string,password:string){
  let usuario = new User(0,"","","","",email,password);

  this.headerService.loginUser(usuario).subscribe(data => {
    console.log(data);

    if(data[0] != undefined){
      if (data[0].id_usuario != null){
      this.headerService.user = data[0];
      this.profileService.user = data[0];
      this.user = data[0];
      this.onSubmit("");
      this.mostrar = false;
      this.router.navigate(["/**"]);

      //llamada a bbdd para capturar numero favs --- by JP
      let user_id = this.headerService.user.id_usuario;
      this.headerService.getTotFavs(user_id).subscribe((data:any) => {
        this.headerService.totFavs = data[0].favoritos;
      })
      
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

onSubmit(loginForm){
  console.log(loginForm);
  this.modalService.dismissAll('Dismissed after saving data');

}












// create - event

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
