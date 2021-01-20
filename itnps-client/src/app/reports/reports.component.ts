import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Filter } from '../models/filter';
import { DashboardService } from '../services/dashboard.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ResponsesService } from '../services/responses.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  userId:         any;
  responses:      any;
  startDate:      any;
  endDate:        any;
  dashboardStats: any;
  page: number         = 1;
  count: number        = 0;
  tableSize:  number   = 7;
  tableSizes: number[] = [10, 25, 50, 100];
  searchModel: any = new Filter('','');

  constructor(
    private dashboardService: DashboardService,
    private responseService: ResponsesService,
    private tokenStorageService: TokenStorageService
  ) { }

  filterDashboardStats(model: any): any {
    this.userId    = this.tokenStorageService.getUser().id;
    this.startDate = model.startDate ? model.startDate : environment.DEFAULT_FILTER_START_DATE;
    this.endDate   = model.endDate   ? model.endDate   : environment.DEFAULT_FILTER_END_DATE;
    this.dashboardService.getDashboardStats(this.userId,this.startDate,this.endDate).subscribe((data)=>{
      this.dashboardStats =  data.body.scores;
    });
  }

  ngOnInit(): void {
    this.filterDashboardStats(this.searchModel);
    this.userId = this.tokenStorageService.getUser().id;
    this.fetchResponses();
  }

  fetchResponses(): void {
    this.responseService.getRawResponses(this.userId).subscribe((data) => {
      this.responses = data.body;
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.fetchResponses();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchResponses();
  }  

}
