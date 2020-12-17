import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user/user';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public user:User;
  public users:User[];
  public header:HeaderComponent;

  constructor(private modalService: NgbModal, public profileService: ProfileService, public headerService:HeaderService) {
    this.user = headerService.user;
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

  ngOnInit(): void {
  }

}
 