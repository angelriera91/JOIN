import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { EventService } from 'src/app/shared/event.service';
import { NgForm } from '@angular/forms';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public event: Event = new Event();
  public mostrar: boolean = true;
  public user: User = new User();
  public usuario_evento: UsuarioEvento = new UsuarioEvento();
  public mostrarError = false;
  public hasError: boolean = true;
  public hasError2: boolean = false;


  constructor(private modalService: NgbModal, private headerService: HeaderService, private profileService: ProfileService, private eventService: EventService, private publicProfileService: PublicProfileService, private router: Router) {
    this.event;
    this.user;
    this.usuario_evento

  }

  //18-12-2020 -JP
  home() {
    this.eventService.creados = false;
    this.eventService.paraAsistir = false;
    this.eventService.terminados = false;
    this.publicProfileService.creadosPublic = false;
    this.hasError = true;
    this.hasError2 = false;
  }


  //funcion para hacer login -MG
  onLogin(email: string, password: string) {
    let usuario = new User(0, "", "", "", "", email, password);

    this.headerService.loginUser(usuario).subscribe(data => {
      console.log(data);

      if (data[0] != undefined) {
        if (data[0].id_usuario != null) {
          this.headerService.user = data[0];
          this.profileService.user = data[0];
          this.user = data[0];
          this.onSubmit("");
          this.mostrar = false;
          this.router.navigate(["/**"]);

          //llamada a bbdd para capturar numero favs --- by JP
          let user_id = this.headerService.user.id_usuario;
          this.headerService.getTotFavs(user_id).subscribe((data: any) => {
            this.headerService.totFavs = data[0].favoritos;
          })

        }
        else {
          this.mostrarError = true;
        }
      }
      else {
        this.mostrarError = true;
      }
    },
      error => console.log(error)
    )
  }

  //funcion para registrarse
  register(nombre: string, apellido: string, ciudad: string, nickname: string, correo: string, password: string) {
    let usuario = new User(0, nombre, apellido, ciudad, nickname, correo, password);
    console.log(usuario);

    this.headerService.registerUser(usuario).subscribe((data: any) => {
      console.log(data);
    },
      (error) => {
        console.log("erroooorrr", error)
      }

    );
  }

  //funcion salir
  salir() {
    this.hasError = false;
    this.hasError2 = true;
  }

  // create - event

  crearEvento(titulo: string, lugar: string, fecha: string, hora: string, description: string, categoria: string, imagen: string, max_assist: number) {

    let evento = { "titulo": titulo, "lugar": lugar, "fecha": fecha, "hora": hora, "descripcion": description, "categoria": categoria, "imagen": imagen, "id_creador": this.user.id_usuario, "max_assist": max_assist }

    this.headerService.crearEvento(evento).subscribe(data => {

      if (this.user.id_usuario != null) {
        this.headerService.event = data;
        this.event = data;
        this.onSubmit2("");
        this.router.navigate(["/**"]);

        let id = this.user.id_usuario

        this.headerService.recuperarEvent(id).subscribe(data => {

          let event2 = data[0].id_event
          this.usuario_evento.id_usuario = id
          this.usuario_evento.id_evento = event2

          this.headerService.createAssist(this.usuario_evento).subscribe

        })

        console.log("Evento Creado")
      }

      else {
        this.mostrarError = true;
      }

    })

  }








  onSubmit(loginForm) {
    console.log(loginForm);
    this.modalService.dismissAll('Dismissed after saving data');

  }

  onSubmit2(createForm) {
    console.log(createForm);
    this.modalService.dismissAll('Dismissed after saving data');

  }

  // create - event -AR

  public open(createEvent) {
    this.modalService.open(createEvent, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
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
