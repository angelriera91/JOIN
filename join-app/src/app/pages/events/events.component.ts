import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../model/event/event'
import { EventService} from '../../shared/event.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  closeResult = '';
  public events : Event[];
  
  constructor(private modalService: NgbModal, private eventService: EventService) {
    this.cargaEventos();
  }

  public cargaEventos(){

    
    this.eventService.getEvents().subscribe((data:any) => {
      console.log(data);
      this.events = data
      this.eventService.events = data
    })
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
