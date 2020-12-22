import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { DeleteUserService } from '../../shared/deleteUserService/delete-user.service';
import { ModifyUserService } from '../../shared/modifyUserService/modify-user.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  public user:User = new User();

  constructor(private deleteUserService: DeleteUserService, private modifyUserService: ModifyUserService) { }

  ngOnInit(): void {
  }

  eliminateUser() {
    this.deleteUserService.deleteUser(this.user.id_usuario).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );

  }

  // modifyUser() {
  //   this.modifyUserService.putUser(this.user).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => console.error(err)
  //   );

  // }

  onSubmit(form:any){
    console.log(form.value);
  }


}
