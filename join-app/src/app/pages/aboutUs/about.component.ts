import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public hasError: boolean = true;
  public hasError2:boolean = false;


  constructor() { }



  ngOnInit(): void {
  }
  

  linkJuan(){
    window.open("https://www.linkedin.com/in/juan-pablo-carpio-guzman-1bb332182/", "_blank");
  }
  linkMarilyn(){
    window.open("https://www.linkedin.com/in/marilyn-gutierrez/", "_blank");
  }
  linkAngel(){
    window.open("https://www.linkedin.com/in/angel-riera-sola/", "_blank");
  }
  linkLilia(){
    window.open("https://www.linkedin.com/in/lili-a/", "_blank");
  }

}
