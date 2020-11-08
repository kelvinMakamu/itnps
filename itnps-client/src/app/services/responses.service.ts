import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  responses: any = {
    timestamp: new Date(),
    username: "NNJAMBI",
    phone: "0722000000",
    nps: 9,
    resolution: 2,
    satisfaction: 3,
    verbatim: "very Good",
  }

  getResponses(): any{
    return this.responses.responses;
  }

  // getTimeStamp(): Date {
  //   return this.responses.timestamp;
  // }

  // getUsername(): string {
  //   return this.responses.username
  // }

  // getPhone(): string {
  //   return this.responses.Phone;
  // }

  // getNps(): number {
  //   return this.responses.nps;
  // }


  // getResolution(): number {
  //   return this.responses.resolution;
  // }

  // getSatisfaction(): number {
  //   return this.responses.satisfaction;
  // }

  // getVerbatim(): string {
  //   return this.responses.verbatim;
  // }
  constructor() { }
  
}