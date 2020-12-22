import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from 'src/app/shared/homeService/home.service';
import { ProfileService } from 'src/app/shared/profileService/profile.service';
import { Event } from '../../model/event/event'
import { EventService} from '../../shared/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  closeResult = '';
  public events : Event[];
  public categoria:string;

  
  constructor(private modalService: NgbModal, private eventService: EventService, private profileService:ProfileService, private homeService:HomeService) { 
    this.cargaEventos();
  }

/*   public cargaEventos(){

    
    this.eventService.getEvents().subscribe((data:any) => {
      console.log(data);
      this.events = data
      this.eventService.events = data
    })
  } */

  public cargaEventos(){

    let categoria = this.homeService.categoria;

    if (this.profileService.user != undefined) {

      if (this.profileService.user.id_usuario != null && this.eventService.creados == true) {
        console.log('creados');

        this.eventService.getEventsCreados(this.profileService.user.id_usuario).subscribe((data:any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        });
  
      } else if(this.eventService.paraAsistir == true) {
        console.log('assist');
  
        this.eventService.getEventsParaAsistir(this.profileService.user.id_usuario).subscribe((data:any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        });
  
      } else if(this.profileService.user.id_usuario != null && this.eventService.terminados == true) {
        console.log('terminados');
  
        this.eventService.getEventsTerminados(this.profileService.user.id_usuario).subscribe((data:any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        });

      }else{
        
        
        console.log('todos');

        this.eventService.getEvents().subscribe((data:any) => {
          console.log(data);
          this.events = data;
          this.eventService.events = data;
        });
  
      }
    
    } else{
      console.log('todos2');

      this.eventService.getEvents().subscribe((data:any) => {
        console.log(data);
        this.events = data;
        this.eventService.events = data;
      });

    }
  }




  public open(eventmodal) {

    

    this.modalService.open(eventmodal, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  ngOnInit(): void {
  }

}
