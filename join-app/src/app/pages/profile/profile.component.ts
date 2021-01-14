import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/model/user/user';
import { EventService } from 'src/app/shared/event.service';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public user:User;
  public users:User[];
  public events:Event[];
  public header:HeaderComponent;
  public creados:boolean;
  public paraAsistir:boolean;
  public terminados:boolean;
  public creadosPublic:boolean;
  public claseCreado:string;
  public claseCreadoActivo:string;
  public claseParaAsistir:string;
  public claseParaAsistirActivo:string;
  public claseTerminado:string;
  public claseTerminadoActivo:string;
  public indice:number;
  public mostrar:boolean;

  constructor(private modalService: NgbModal, public eventService:EventService, public profileService: ProfileService, public headerService:HeaderService, public publicProfileService:PublicProfileService, public route:Router) {
    this.user = headerService.user;
    this.eventService.creados = true;
    this.creados = true;
    this.eventService.paraAsistir = false;
    this.paraAsistir = false;
    this.eventService.terminados = false;
    this.terminados = false;
    this.eventService.creadosPublic = false;
    this.mostrar = this.eventService.mostrar;

    this.claseCreado = "tab-pane fade show active";
    this.claseCreadoActivo = "nav-link active";
    this.claseParaAsistir = "tab-pane fade";
    this.claseParaAsistirActivo = "nav-link";
    this.claseTerminado = "tab-pane fade";
    this.claseTerminadoActivo = "nav-link";
  }

  creado(){
    this.eventService.creados = true;
    this.eventService.paraAsistir = false;
    this.eventService.terminados = false;
    this.eventService.creadosPublic = false;
    
    console.log("creados");

    this.creados = true;
    this.paraAsistir = false;
    this.terminados = false;
    this.creadosPublic = false;

    this.claseCreado = "tab-pane fade show active";
    this.claseCreadoActivo = "nav-link active";
    this.claseParaAsistir = "tab-pane fade";
    this.claseParaAsistirActivo = "nav-link";
    this.claseTerminado = "tab-pane fade";
    this.claseTerminadoActivo = "nav-link";

  }

  asistir(){
    this.eventService.creados = false;
    this.eventService.paraAsistir = true;
    this.eventService.terminados = false;
    this.eventService.creadosPublic = false;

    console.log("Asistiraaaaaaaaaaaaaaaaaaaaaaaaa");

    this.creados = false;
    this.paraAsistir = true;
    this.terminados = false;
    this.creadosPublic = false;

    this.claseCreado = "tab-pane fade";
    this.claseCreadoActivo = "nav-link";
    this.claseParaAsistir = "tab-pane fade show active";
    this.claseParaAsistirActivo = "nav-link active";
    this.claseTerminado = "tab-pane fade";
    this.claseTerminadoActivo = "nav-link";
    
  }

  terminado(){
    this.eventService.creados = false;
    this.eventService.paraAsistir = false;
    this.eventService.terminados = true;
    this.eventService.creadosPublic = false;

    console.log("terminados");
    
    this.creados = false;
    this.paraAsistir = false;
    this.terminados = true;
    this.creadosPublic = false;

    this.claseCreado = "tab-pane fade";
    this.claseCreadoActivo = "nav-link";
    this.claseParaAsistir = "tab-pane fade";
    this.claseParaAsistirActivo = "nav-link";
    this.claseTerminado = "tab-pane fade show active";
    this.claseTerminadoActivo = "nav-link active"; 

  }

  openFav(content) {
    this.mostrarDatosUser();
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  mostrarDatosUser(){
    let user_id = this.headerService.user.id_usuario;

    this.profileService.getdatosUserFav(user_id).subscribe((data:any) => {
      this.profileService.users = data;
      this.users = this.profileService.users;

      console.log(this.users);
    });
  }

  rellenarPublic(id:any){

    console.log("esta es la id del array: " + id)

    this.publicProfileService.userSelected = this.users[id];
    
    this.eventService.creados = false;
    this.eventService.paraAsistir = false;
    this.eventService.terminados = false;
    this.eventService.creadosPublic = true;
    if (this.eventService.mostrar == true) {
      this.eventService.mostrar = false;
    } else {
      this.eventService.mostrar = true;
    }
    this.publicProfileService.show = false;

    this.headerService.getTotFavs(this.publicProfileService.userSelected.id_usuario).subscribe((data:any) => {
      console.log(data[0])
      
      if (data.length == 0) {
        this.publicProfileService.userSelected.favoritos = 0;
      }else{
        if (data[0].favoritos === null || data[0].favoritos === undefined || data.length === 0) {
          this.publicProfileService.userSelected.favoritos = 0;
        }else {
          this.publicProfileService.userSelected.favoritos = data[0].favoritos;
        }
      }
    })

    this.profileService.getMediaEventUser(this.publicProfileService.userSelected.id_usuario).subscribe((data2:any) => {
      if (data2[0].media === null) {
        this.publicProfileService.userSelected.media = 0;
      }else {
        this.publicProfileService.userSelected.media = data2[0].media;
      }

      this.route.navigate(["perfil/public"])
    });

    this.modalService.dismissAll('Dismissed after saving data');
  }

  ngOnInit(): void {
  }

}
 