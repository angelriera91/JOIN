import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user/user';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HomeService } from 'src/app/shared/homeService/home.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';
import { RateEventService } from 'src/app/shared/rateEventService/rate-event.service';
import { Event } from '../../model/event/event'
import { EventService } from '../../shared/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  closeResult = '';
  public events: Event[];
  public event: Event;
  public user: User;

  public mostrar1: boolean = false;
  public mostrar2: boolean = false;
  public mostrar3: boolean = false;
  public mostrar4: boolean = false;

  constructor (private rateEventService: RateEventService, private modalService: NgbModal, private eventService: EventService, private profileService: ProfileService, private publicProfileService: PublicProfileService, private homeService: HomeService, public headerService: HeaderService, public route:Router) {
    this.cargaEventos();
    this.user = headerService.user;
    

  }

  public cargaEventos(callback?) {

    let categoria = this.homeService.categoria;
    let input = this.homeService.input;

    if (this.profileService.user != undefined) {

      if (this.profileService.user.id_usuario != null && this.eventService.creados == true) {
        console.log('creados');

        this.eventService.getEventsCreados(this.profileService.user.id_usuario).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
          callback();
        });

      } else if (this.eventService.paraAsistir == true) {
        console.log('assist');

        this.eventService.getEventsParaAsistir(this.profileService.user.id_usuario).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        });

      } else if (this.profileService.user.id_usuario != null && this.eventService.terminados == true) {
        console.log('terminados');

        this.eventService.getEventsTerminados(this.profileService.user.id_usuario).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;

        });

      } else if (this.publicProfileService.userSelected != undefined) {
        if (this.publicProfileService.userSelected.id_usuario != null && this.eventService.creadosPublic == true) {
          console.log("creados del perfil publico");

          this.eventService.getEventsCreados(this.publicProfileService.userSelected.id_usuario).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          });
        }
      } else if (this.homeService.mostrarDatoBuscado == true) {
        console.log("aqui entra")
        if (this.homeService.categoria != null && this.homeService.input != null) {
          console.log("input select")

          this.eventService.getEvents().subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else if (this.homeService.categoria != null) {
          console.log(" select")
          this.homeService.filterSelect(categoria).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else if (this.homeService.input != null) {
          console.log("input ")
          this.homeService.filterInput(input).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else {
          console.log('todos');

          this.eventService.getEvents().subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;


          });
        }
      } else if (this.homeService.mostrarDatoBuscado == false) {
        console.log("aqui entra")
        if (this.homeService.categoria != null && this.homeService.input != null) {
          console.log("input select")

          let array: string[] = [this.homeService.categoria, this.homeService.input]
          this.homeService.filterSelectInput(array).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else if (this.homeService.categoria != null) {
          console.log(" select")
          this.homeService.filterSelect(this.homeService.categoria).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else if (this.homeService.input != null) {
          console.log("input ")
          this.homeService.filterInput(this.homeService.input).subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;
          })
        }
        else {
          console.log('todos');

          this.eventService.getEvents().subscribe((data: any) => {
            console.log(data);
            this.events = data;
            this.eventService.events = data;


          });
        }
      }


    } else if (this.homeService.mostrarDatoBuscado == true) {
      console.log("aqui entra")
      if (this.homeService.categoria != null && this.homeService.input != null) {
        console.log("input select")

        let array: string[] = [this.homeService.categoria, this.homeService.input]
        this.homeService.filterSelectInput(array).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else if (this.homeService.categoria != null) {
        console.log("select")
        this.homeService.filterSelect(this.homeService.categoria).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else if (this.homeService.input != null) {
        console.log("input ")
        this.homeService.filterInput(this.homeService.input).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else {
        console.log('todos');

        this.eventService.getEvents().subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;


        });
      }
    } else if (this.homeService.mostrarDatoBuscado == false) {
      console.log("aqui entra")
      if (this.homeService.categoria != null && this.homeService.input != null) {
        console.log("input select")

        let array: string[] = [this.homeService.categoria, this.homeService.input]
        this.homeService.filterSelectInput(array).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else if (this.homeService.categoria != null) {
        this.homeService.filterSelect(this.homeService.categoria).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else if (this.homeService.input != null) {
        this.homeService.filterInput(this.homeService.input).subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        })
      }
      else {
        console.log('todos');

        this.eventService.getEvents().subscribe((data: any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;


        });
      }
    }
    else {
      console.log('todos2');

      this.eventService.getEvents().subscribe((data: any) => {
        console.log(data);
        this.events = data;
        this.eventService.events = data;
      });

    }
  }


  public delete(indice: any) {

    let id_event = this.events[indice].id_event
    console.log(id_event)

    this.eventService.deleteEvent(id_event).subscribe((data: any) => {

      console.log("evento borrado")
      console.log(data)

      this.modalService.dismissAll('Dismissed after saving data');

    })
  };


  public open(eventmodal, indice) {

    this.event = this.eventService.events[indice]

    this.rellenarPublic()

    if (this.profileService.user != undefined) {

      console.log(this.profileService.user.id_usuario)

      if (this.eventService.terminados == false) {


        if (this.eventService.creados == true) {
          this.mostrar1 = true
          this.mostrar2 = false
          this.mostrar3 = true
          this.mostrar4 = false

          this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

        }
        else if (this.eventService.paraAsistir == true) {

          this.mostrar1 = false
          this.mostrar2 = true
          this.mostrar3 = false
          this.mostrar4 = false

          this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

        }
        else if (this.profileService.user.id_usuario == this.events[indice].id_creador) {



          this.mostrar1 = true
          this.mostrar2 = false
          this.mostrar3 = true
          this.mostrar4 = false

          this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }

        else {

          this.mostrar1 = false
          this.mostrar2 = true
          this.mostrar3 = false
          this.mostrar4 = false

          this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

        }

      }

      else {

        this.mostrar1 = false
        this.mostrar2 = false
        this.mostrar3 = false
        this.mostrar4 = true

        this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      }
    }


    else {

      this.mostrar1 = false
      this.mostrar2 = false
      this.mostrar3 = false
      this.mostrar4 = false

      this.modalService.open(eventmodal, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }


  public assist(indice: any) {

    if (this.events[indice].id_event !== null || this.events[indice].id_event !== undefined) {

      let datos = new UsuarioEvento(this.events[indice].id_event, this.profileService.user.id_usuario);

      this.headerService.createAssist(datos).subscribe()

      console.log("assist created")

      this.modalService.dismissAll('Dismissed after saving data');
    }


  }

  public puntuar(indice: any) {
    if (this.events[indice].id_event !== null || this.events[indice].id_event !== undefined) {

      let datos = new UsuarioEvento(this.events[indice].id_event, this.profileService.user.id_usuario);

      this.eventService.event = this.events[indice];

      this.rateEventService.usuario_evento = datos;

      console.log("Datos recogidos")
      this.modalService.dismissAll('Dismissed after saving data');

    }
  }

  public editarEvento(titulo: string, lugar: string, fecha: string, hora: string, description: string, categoria: string, imagen: string, max_assist: number, indice: number) {


    console.log(titulo)

    let evento = { "titulo": titulo, "lugar": lugar, "fecha": fecha, "hora": hora, "descripcion": description, "categoria": categoria, "imagen": imagen, "id_creador": this.event.id_creador, "max_assist": max_assist, "id_event": this.event.id_event }

    this.eventService.editEvent(evento).subscribe(data => {
      this.event = data;

      console.log(this.event)
      if (this.event != null) {

        this.event = data;
        this.eventService.creados = true

        this.cargaEventos(this.navegar())
        
        

        console.log("Evento Editado")
        console.log(this.event)

        this.modalService.dismissAll('Dismissed after saving data');
      }

      else {

        console.log("no se ha podido editar")
      }

    })

  }

  rellenarPublic(){

    console.log("esta entrando?")

    this.eventService.getUsuario(this.event.id_creador).subscribe((data:any) => {
      
      this.user = data

    console.log(this.user)
    this.publicProfileService.userSelected = this.user;
    console.log(this.publicProfileService.userSelected)
    this.eventService.creados = false;
    this.eventService.paraAsistir = false;
    this.eventService.terminados = false;
    this.eventService.creadosPublic = true;
    this.publicProfileService.show = false;

    this.headerService.getTotFavs(this.publicProfileService.userSelected.id_usuario).subscribe((data:any) => {
      console.log(data[0])
      if (data[0].favoritos == null || data[0].favoritos == undefined ||data[0] == undefined) {
        this.publicProfileService.userSelected.favoritos = 0;
      }else {
        this.publicProfileService.userSelected.favoritos = data[0].favoritos;
      }
    })
    this.profileService.getMediaEventUser(this.publicProfileService.userSelected.id_usuario).subscribe((data:any) => {
      if (data[0].media == null || data[0] == undefined) {
        this.publicProfileService.userSelected.media = 0;
      }else {
        this.publicProfileService.userSelected.media = data[0];
      }
    });

    
      
    })


    
  }

  private navegar(){
    this.route.navigate(["perfil"])
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  private dismis(){

    this.modalService.dismissAll('Dismissed after saving data');
    
  }

  ngOnInit(): void {
  }

}
