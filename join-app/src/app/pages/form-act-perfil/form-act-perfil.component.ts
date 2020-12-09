import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-form-act-perfil',
  templateUrl: './form-act-perfil.component.html',
  styleUrls: ['./form-act-perfil.component.css']
})
export class FormActPerfilComponent implements OnInit {
  
  public user:User = new User();

  constructor() {
    this.user;
  }

  onSubmit(form:any){
    console.log(form.value);
  }

  ngOnInit(): void {
  }

}
