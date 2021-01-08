import { Component, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { EventService } from 'src/app/shared/event.service';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';
import { FollowUserService } from '../../shared/followUserService/follow-user.service';
import { UnfollowUserService } from '../../shared/unfollowUserService/unfollow-user.service';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';




@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  public user:User;
  public user2: User;
  public creado:boolean;
  public noEvents:boolean = false;
  public show: boolean;

  constructor(public publicProfileService:PublicProfileService, public eventService:EventService, private followUserService: FollowUserService, private unfollowUserService: UnfollowUserService, public headerService:HeaderService) {
    this.user = publicProfileService.userSelected;
    this.user2 = headerService.user;
    this.show = this.publicProfileService.show;


   }

  

 
   ngOnInit(): void {

  }

  follow() {


    this.followUserService.followUser(this.user2.id_usuario, this.user.id_usuario).subscribe(
      res => {
        console.log(res);
        this.show = false;
      },
      err => console.error(err)
    );
    this.show = false;


  }

  unfollow() {


    this.unfollowUserService.unfollowUser(this.user2.id_usuario, this.user.id_usuario).subscribe(
      res => {
        console.log(res);
        this.show = true;
      },
      err => console.error(err)
    );
    

  }


}
