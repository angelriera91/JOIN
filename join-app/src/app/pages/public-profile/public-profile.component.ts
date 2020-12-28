import { Component, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { User } from 'src/app/model/user/user';
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

  public user: User;


  public mostrar: boolean = true;

  constructor(private followUserService: FollowUserService, private unfollowUserService: UnfollowUserService, public headerService:HeaderService) {
    this.user = headerService.user
   }

   ngOnInit(): void {

  }

  follow(id_usuario: number, id_seguidor: number) {

    //  FALTA servicio para id_usuario público

    this.followUserService.followUser(1, this.headerService.user.id_usuario).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );


  }

  unfollow(id_usuario: string) {

    //  FALTA servicio para id_usuario público

    this.unfollowUserService.unfollowUser(1).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );


  }


}
