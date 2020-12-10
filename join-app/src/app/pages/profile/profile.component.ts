import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user:User = new User();

  constructor(private modalService: NgbModal) {
    this.user;
  }

  open(content) {
    this.modalService.open(content);
  }

  openFav(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  onSubmit(form:any){
    console.log(form.value);
  }

  ngOnInit(): void {
  }

}
