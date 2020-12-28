import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { DeleteUserService } from '../../shared/deleteUserService/delete-user.service';
import { ModifyUserService } from '../../shared/modifyUserService/modify-user.service';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from 'src/app/shared/headerService/header.service';
import { HeaderComponent } from '../header/header.component';
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

  

  constructor(private deleteUserService: DeleteUserService, private modifyUserService: ModifyUserService, private modalService: NgbModal, private router: Router, public headerService:HeaderService) {
    this.user = headerService.user
   }


  eliminateUser(id_usuario: string) {
    this.deleteUserService.deleteUser(this.headerService.user.id_usuario).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );

  }

  modifyUser(nombre: string, apellido: string, ciudad: string, nickname: string, correo: string, password: string, imagen: string, descripcion: string) {

    let usuario = new User(this.headerService.user.id_usuario, nombre, apellido, ciudad, nickname, correo, password, imagen, descripcion);
    console.log(usuario)

    this.modifyUserService.putUser(usuario).subscribe(
      res => {
        console.log(res);
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
