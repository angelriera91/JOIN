import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import  Swal  from 'sweetalert2';
import { Event } from 'src/app/model/event/event';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public event: Event = new Event
  constructor(private modalService: NgbModal) {
    this.event
  }

  public mostrar:boolean = false;

  
public async iniciarSesion(){

  this.mostrar = true;

  const { value: email } = await Swal.fire({
    imageUrl: '../../../assets/logoNegro.png',
    imageWidth: 100,
    imageHeight: 50,
    title: 'Iniciar sesión',
    input: 'email',
    inputPlaceholder: 'Introducir email'
  })


  const { value: password } = await Swal.fire({
    imageUrl: '../../../assets/logoNegro.png',
    imageWidth: 125,
    imageHeight: 50,
    title: 'Iniciar sesión',
    input: 'password',
    inputPlaceholder: 'Introducir contraseña',
    }
  )    
}


public async registrarse(){
  const { value: formValues } = await Swal.fire({
  imageUrl: '../../../assets/logoNegro.png',
  imageWidth: 125,
  imageHeight: 50,
  title: 'Registrarse',
  html:
    '<input id="swal-input1" class="swal2-input" placeholder="Nickname">' +
    '<input id="swal-input2" class="swal2-input" placeholder="Nombre">'+
    '<input id="swal-input3" class="swal2-input" placeholder="Apellidos">'+
    '<input id="swal-input4" class="swal2-input" placeholder="Ciudad">'+'<br>'+
    '<input id="swal-input5" class="swal2-input" placeholder="Correo electrónico">'+
    '<input id="swal-input6" class="swal2-input" placeholder="Contraseña">'+
    '<input id="swal-input7" class="swal2-input" placeholder="Repetir contraseña">',
  })

}

// create - event

public open(content) {
  this.modalService.open(content, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

;

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  
ngOnInit(): void {
}

}
