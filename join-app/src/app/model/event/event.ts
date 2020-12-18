export class Event {

    constructor(public id_event?: number, public titulo?:string, public lugar?:string, public fecha?:Date, public hora?:string,public description?:string, public creator?:string,  
        public imagen?:string, public total_asistentes?:number, public max_assist?:number){

    }
}
