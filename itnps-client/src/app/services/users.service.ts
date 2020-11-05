import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: any  = {
    "firstName": "nicholas",
    "lastName": "kirwa",
    "userLevel": "Manager"
  };

  getUserFullName(): string{
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  getUserAuthLevel(): string {
    return this.user.userLevel;
  }
  
  constructor() { }
}
