import { Injectable } from '@angular/core';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  private url = "http://localhost/"

  public user:User;
  constructor() { }
}
