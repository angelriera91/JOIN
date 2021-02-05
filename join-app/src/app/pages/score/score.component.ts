import { Component, OnInit } from '@angular/core';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { RateEventService } from '../../shared/rateEventService/rate-event.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
import { EventService } from '../../shared/event.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {


  starRating = 0;
  public event: Event;
  public eventPaPuntuacion: Event;
  public user: User;


  constructor(private rateEventService: RateEventService, private modalService: NgbModal, private headerService: HeaderService, private eventService: EventService, private router: Router) {
    this.user = headerService.user;
    this.event = eventService.event;

  }

  rate() {

    let puntuacion: UsuarioEvento = this.rateEventService.usuario_evento;
    let puntuacion2: UsuarioEvento;
    let evento: Event = this.eventService.eventPaPuntuacion;

    if (evento.total_valoracion == undefined) {
      evento.total_valoracion = 0;
    }
    if (evento.numero_valoracion == undefined) {
      evento.numero_valoracion = 0;
    }

    puntuacion.puntuacion = this.starRating;

    console.log(puntuacion)

    this.rateEventService.getRate(puntuacion.id_evento, puntuacion.id_usuario).subscribe(
      res => {

        if (res[0].puntuacion == 0) {
          evento.total_valoracion = evento.total_valoracion + puntuacion.puntuacion;
          evento.numero_valoracion = evento.numero_valoracion + 1;

          this.rateEventService.changeRate(puntuacion).subscribe(
            res => {
              console.log(res);

              this.rateEventService.changeEvent(evento).subscribe((data) => {
                console.log(data);

                this.router.navigate(["/perfil"])
              })

            },
            err => console.error(err)
          );

        } else {
          
          Swal.fire({
            html: 'No puede puntuar dos veces un mismo evento',
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })

        }

      },
      err => console.error(err)
    );

  };




  ngOnInit(): void {
  }

}
