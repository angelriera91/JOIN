import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { Event } from 'src/app/model/event/event';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileServiceService } from 'src/app/shared/profile-service.service';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public event: Event = new Event
  public mostrar:boolean = true;
  public user:User = new User();
  public mostrarError = false;

  constructor(private modalService: NgbModal, private profileservice:ProfileServiceService, private router: Router) {
    this.event;
    this.user;
  }


//16-12-20 -MG
onLogin(email:string,password:string){
  let usuario = new User("","",email,password);

  this.profileservice.loginUser(usuario).subscribe(data => {
    console.log(data);

    if(data[0] != undefined){
      this.profileservice.user = data[0];
      this.user = data[0];
      this.onSubmit("");
      this.mostrar = false;
      this.router.navigate(["/**"]);
    }
    else{
      this.mostrarError = true;
    }
  
  },
  error => console.log(error)

  )


}

onSubmit(loginForm){
  console.log(loginForm);
  this.modalService.dismissAll('Dismissed after saving data');

}












// create - event

public open(content) {
  this.modalService.open(content, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
};


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
