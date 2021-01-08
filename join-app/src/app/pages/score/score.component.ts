import { Component, OnInit } from '@angular/core';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { RateEventService } from '../../shared/rateEventService/rate-event.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
import { EventService} from '../../shared/event.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public event: Event;
  public user: User;
  

  constructor(private rateEventService: RateEventService, private modalService: NgbModal, private headerService: HeaderService, private eventService: EventService, private router: Router) {
    this.user = headerService.user;
    this.event = eventService.event;


  }

  rate(stars: number){

    let puntuacion = new UsuarioEvento(this.eventService.event.id_event, this.user.id_usuario, stars);
    console.log(puntuacion)

    let exists = false;

    this.rateEventService.getRate(this.eventService.event.id_event,this.user.id_usuario).subscribe(
      res => {
        if (res[0] != null)
        {
          exists = true;
        } else 
        {
          exists = false;
        }

        if (exists==true)
          {
          this.rateEventService.changeRate (puntuacion).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          );

          } 
        else 
          {
            this.rateEventService.rateEvent(puntuacion).subscribe(
              res => {
                console.log(res);
              },
              err => console.error(err)
            );
          } 

      },
      err => console.error(err)
    );

  };




  ngOnInit(): void {
  }

}
