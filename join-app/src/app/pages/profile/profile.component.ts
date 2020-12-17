import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user/user';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public user:User;
  public header:HeaderComponent;

  constructor(private modalService: NgbModal, public profileService: ProfileService) {
    this.user = new User();
    this.mostrarDatosUser();
  }

  openFav(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  mostrarDatosUser(){

    //this.user = this.header.user;

    //this.user = new User(1, "Juan Pablo", "Carpio Guzman", "Madrid", "Jfaramir", "emmaaaaail", "contraseña", "imagen.jpg o url", "yo tengo un moco, lo saco poco a poco, lo redondeo, lo miro con deseo, luego lo como y si me sabe a poco, saco otro moco y volvemos a empezar",9,4);

    let user:User = new User(0,"Juanan","Karas","Madrid","Jfaramor","jpcarpio233@gmail.com","12345678","asdsad.png","sasdasd",3,3.3);

    this.profileService.getdatosUser(user).subscribe((data:any) => {
      this.user = data[0];
      this.profileService.user = data[0]
      console.log(this.user.id_usuario);
      console.log(this.profileService.user.id_usuario);
    });

  }

  ngOnInit(): void {
  }

}
 