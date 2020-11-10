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
    this.responsesService.getResponses().subscribe(response => {
      console.log(response)
      this.responses=response.body
    }
    )

  }

}
