import { Component, OnInit } from '@angular/core';
import { UsuarioEvento } from 'src/app/model/usuario_evento/usuario-evento';
import { User } from 'src/app/model/user/user';
import { RateEventService } from '../../shared/rateEventService/rate-event.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
import { EventService} from '../../shared/event.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {


  constructor() { }




  ngOnInit(): void {
  }

}
