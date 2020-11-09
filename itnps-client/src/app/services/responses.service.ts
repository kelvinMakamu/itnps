import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http: HttpClient) { }

  getRawResponses(userId: any): Observable<any>{
    return this.http.post(`${environment.API_URL}responses/users`,{ userId });
  }
}
