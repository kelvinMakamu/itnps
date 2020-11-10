import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  // responses: any = [{
  //   timestamp: new Date(),
  //   username: "NNJAMBI",
  //   phone: "0722000000",
  //   nps: 9,
  //   resolution: 2,
  //   satisfaction: 3,
  //   verbatim: "very Good",
  
  // }, {
  //   timestamp: new Date(),
  //   username: "NNJAMBI",
  //   phone: "0722000000",
  //   nps: 9,
  //   resolution: 2,
  //   satisfaction: 3,
  //   verbatim: "very Good",
  // }];
    

  constructor(private http: HttpClient) {
  }
  getResponses(): any{
    return this.http.get("http://localhost:8185/api/v1/responses");
  }
}