import { Component, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { EventService } from 'src/app/shared/event.service';
import { PublicProfileService } from 'src/app/shared/publicProfile/public-profile.service';
import { FollowUserService } from '../../shared/followUserService/follow-user.service';
import { UnfollowUserService } from '../../shared/unfollowUserService/unfollow-user.service';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { ProfileComponent } from '../profile/profile.component';
import { forEach } from '@angular-devkit/schematics';




@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  public user:User;
  public users:User[];
  public userLog: User;
  public creado:boolean;
  public noEvents:boolean = false;
  public show: boolean;
  public mostrar: boolean;

  constructor(public profileService: ProfileService, public publicProfileService:PublicProfileService, public eventService:EventService, private followUserService: FollowUserService, private unfollowUserService: UnfollowUserService, public headerService:HeaderService) {
    this.user = publicProfileService.userSelected;
    this.userLog = headerService.user;
    this.show = this.publicProfileService.show;
    this.mostrar = eventService.mostrar;
    this.profileService = this.profileService;
    //this.users = profile.users;
   } 
   ngOnInit(): void {
    let user_id = this.headerService.user.id_usuario;
    let followed = false;
    this.profileService.getdatosUserFav(user_id).subscribe((data:any) => {
      this.profileService.users = data;
      this.users = this.profileService.users;
      for (let i = 0; i < this.users.length; i++)
      {
        if (this.users[i].id_usuario === this.user.id_usuario)
        {
          followed = true;
        }
      }
      if (followed)
      {
        this.show = true;
      } else
      {
        this.show = false;
      }
    });    
   }

  // this.profileService.getdatosUserFav(this.userLog.id_usuario).subscribe(
  //   res => {
  //     if (res[0] != null)
  //     {
  //       this.show = true;
  //     }
  //  }

  follow() {


    this.followUserService.followUser(this.userLog.id_usuario, this.user.id_usuario).subscribe(
      res => {
        console.log(res);
        this.show = true;
      },
      err => console.error(err)
    );


  }

  unfollow() {


    this.unfollowUserService.unfollowUser(this.userLog.id_usuario, this.user.id_usuario).subscribe(
      res => {
        console.log(res);
        this.show = false;
      },
      err => console.error(err)
    );
    

  }


}
