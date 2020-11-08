import { Component, OnInit, Output } from '@angular/core';
import { ResponsesService } from '../services/responses.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  providers: [ResponsesService]
})
export class ResponsesComponent implements OnInit {
responses: any;
  userFullName: string;
  currentLevel: string;
  // timestamp: Date;
  // username: String;
  // phone: String;
  // nps: number;
  // resolution: number;
  // satisfaction: number;
  // verbatim: String

  constructor(private userService: UsersService, private responsesService: ResponsesService) { }

  ngOnInit(): void {
    this.userFullName = this.userService.getUserFullName();
    this.currentLevel = this.userService.getUserAuthLevel();
    this.responses = this.responsesService.getResponses()
  
    
    // this.username = this.responsesService.getUsername();
    // this.phone = this.responsesService.getPhone();
    // this.nps = this.responsesService.getNps();
    // this.resolution = this.responsesService.getResolution();
    // this.satisfaction = this.responsesService.getSatisfaction();
    // this.verbatim = this.responsesService.getVerbatim();
  }

}
