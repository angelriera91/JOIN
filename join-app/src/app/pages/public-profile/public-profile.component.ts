import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { EventService } from 'src/app/shared/event.service';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  public user:User;
  public creado:boolean;
  public noEvents:boolean = false;

  constructor(public publicProfileService:PublicProfileService, public eventService:EventService) {
    this.user = publicProfileService.userSelected;
   }

  ngOnInit(): void {
  }

}
