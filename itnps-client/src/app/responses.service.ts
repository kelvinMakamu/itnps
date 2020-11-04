import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Responses } from './responses';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  responses: Responses[];
  response: Responses;
  constructor(private http: HttpClient) {
    this.response = new Responses(new Date(), '', '', 0, 0, 0, '');
    this.responses = [];
  }

  //Get My Repo using Promise
  responsesRequest() {
    interface ReposApi {
      timestamp: Date;
      username: String;
      phone: String;
      nps: number;
      resolution: number;
      satisfaction: number;
      verbatim: String;
    }
    //The Repos Promise
    let responsesPromise = new Promise((success, failed) => {
      this.http
        .get<ReposApi[]>(environment.responsesApiEndpoint)
        .toPromise()
        .then(
          (response) => {
            response.forEach((element) => {
              this.response.timestamp = element.timestamp;
              this.response.username = element.username;
              this.response.phone = element.phone;
              this.response.nps = element.nps;
              this.response.resolution = element.resolution;
              this.response.satisfaction = element.satisfaction;
              this.response.verbatim = element.verbatim;
              console.log('Current: ');
              this.responses.push(this.response);
            });
            success();
          },
          (error) => {
            this.responses = null;
            failed(error);
          }
        );
    });
    return responsesPromise;
  }
}
