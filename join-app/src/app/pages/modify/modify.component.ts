import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  public user:User = new User();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(form.value);
  }


}
