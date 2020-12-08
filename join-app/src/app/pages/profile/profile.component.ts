import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  popUpFav(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  mouseOver() {
    document.getElementById("fav").style.color = "red";
  }
  
  mouseOut() {
    document.getElementById("fav").style.color = "black";
  }

  ngOnInit(): void {
  }

}
