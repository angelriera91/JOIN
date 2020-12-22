import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {
  
  public userSelected:User;
  public creadosPublic:boolean = false;

  constructor() { }
}
