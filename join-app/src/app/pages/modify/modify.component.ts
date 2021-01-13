import { DOCUMENT } from '@angular/common';

import { Component, OnInit, HostBinding, ɵɵqueryRefresh, Inject } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { DeleteUserService } from '../../shared/deleteUserService/delete-user.service';
import { ModifyUserService } from '../../shared/modifyUserService/modify-user.service';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
// import { homedir } from 'os';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  public user: User;

  // user: User = {
  //   // id_usuario:0,
  //   nombre:'',
  //   apellido: '',
  //   ciudad: '',
  //   nickname: '',
  //   correo: '',
  //   password: '',
  //   imagen: '',
  //   descripcion: ''

  // };

  closeResult = '';
  public mostrar:boolean = true;
  public mostrarError = false;
  public nick: string = "";


  

  constructor(@Inject(DOCUMENT) private _document: Document, private profileService: ProfileService, private deleteUserService: DeleteUserService, private modifyUserService: ModifyUserService, private modalService: NgbModal, private router: Router, public headerService:HeaderService) {
    this.user = headerService.user
    this.nick = headerService.user.nickname
    console.log(this.user)
  }

  refresh():void {
    this._document.defaultView.location.reload();
  }

  eliminateUser(id_usuario: string) {
    this.deleteUserService.deleteUser(this.user.id_usuario).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
    this.router.navigate(["/**"]);
  }

  modifyUser(nickname: string, nombre: string, apellido: string, ciudad: string, correo: string, password: string, imagen: string, descripcion: string) {
 
   
    imagen = imagen.slice(12);
    console.log(imagen);
    if (imagen == null || imagen == undefined || imagen == "") {
      imagen = this.headerService.user.imagen;
    }
    else {
      imagen = "../../../assets/" + imagen;
    }
   
    console.log(imagen);
    let usuario = new User(this.headerService.user.id_usuario, nickname, nombre, apellido, ciudad, correo, password, imagen, descripcion);

    console.log(usuario)

    this.modifyUserService.putUser(usuario).subscribe(
      res => {
        console.log(res);



        this.headerService.loginUser(usuario).subscribe((data) => {

          this.headerService.user = data[0];
          this.profileService.user = data[0];
          this.user.nickname = nickname;

          this.headerService.getTotFavs(this.profileService.user.id_usuario).subscribe((data:any) => {
            console.log(data[0])
            if (data.length == 0) {
              this.profileService.user.favoritos = 0;
            }else{
              if (data[0].favoritos == null || data[0].favoritos == undefined) {
                this.profileService.user.favoritos = 0;
              }else {
                this.profileService.user.favoritos = data[0].favoritos;
              }
            }
          })

          this.profileService.getMediaEventUser(this.profileService.user.id_usuario).subscribe((data:any) => {
            if (data.length == 0) {
              this.profileService.user.media = 0;
            }else{
              if (data[0].media == null) {
                this.profileService.user.media = 0;
              }else {
                this.profileService.user.media = data[0].media;
              }
            }

          });
        })

      },
      err => console.error(err)
    );

  }

  onSubmit(form:any){
    console.log(form.value);
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

  public open(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  };

  ngOnInit(): void {
  }


}