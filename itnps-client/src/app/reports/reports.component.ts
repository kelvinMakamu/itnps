import { Component, OnInit } from '@angular/core';
import { Responses } from '../responses';
import { ResponsesService } from '../responses.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  responses: Responses[];
  constructor(private AllResponses: ResponsesService) {}

  ngOnInit(): void {
    this.AllResponses.responsesRequest();
    this.responses = this.AllResponses.responses;
  }
}
