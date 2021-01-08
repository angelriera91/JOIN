export class Event {

    constructor(public id_event?: number, public titulo?:string, public lugar?:string, public fecha?:string, public hora?:string,public description?:string, public categoria?:string,
        public nickname?:string, public id_creador?: number, public imagen?:string, public total_asistentes?:number, public max_assist?:number){

    }
}
