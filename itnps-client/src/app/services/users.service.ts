import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }
  
  getUser(): Observable<any>{
    let userID = `5fa0712740b9d1349974ad8f`;
    return this.httpClient.get<any>(`${environment.API_URL}/users/${userID}`);
  }

  determineUserLevel(level: number): string {
    switch(level){
      case 0:
      return 'Admin';
      break;

      case 1:
      return 'Manager';
      break;

      case 2:
      return 'Agent';
      break;
    }
  }
  
  
}
