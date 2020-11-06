import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DashboardService } from '../services/dashboard.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userId: any;
  startDate: any;
  endDate: any;
  dashboardStats: any;
  /* Trends Data Arrays */
  monthData: any;
  npsData: any;
  promotersData: any;
  detractorsData: any;
   /* Chart Data Arrays */
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartColors: Color[];
  lineChartType: string;

  exportResponse(): void {
    alert("Download Button clicked");
  }

  constructor(
    private dashboardService: DashboardService,
    private tokenStorageService: TokenStorageService
  ){}
  
  ngOnInit(): void {
    this.userId    = this.tokenStorageService.getUser().id;
    this.startDate = '2020-11-09';
    this.endDate   = '2020-11-30';
    this.dashboardService.getDashboardStats(this.userId,this.startDate,this.endDate).subscribe((data)=>{
      this.dashboardStats =  data.body.scores;
      this.monthData      =  data.body.scores.trend.map((mth:any)=>{return mth.NPSMonth;});
      this.npsData        =  data.body.scores.trend.map((score: any)=>{return score.NPSScore;});
      this.promotersData  =  data.body.scores.trend.map((promoter:any)=>{return promoter.promoters;});
      this.detractorsData =  data.body.scores.trend.map((detractor: any)=>{return detractor.detractors;});
      this.lineChartData  = [
        { data: this.npsData,label:'Net Promoter Score',fill:false,borderWidth:2,pointRadius:2 },
        { data: this.promotersData,label:'Promoters',fill:false,borderWidth:2,pointRadius:2 },
        { data: this.detractorsData,label:'Detractors',fill:false,borderWidth:2,pointRadius:2 },
      ];
      this.lineChartLabels = this.monthData;
      this.lineChartType   = 'line';
      this.lineChartColors = [
        { borderColor: '#43b02a', backgroundColor: '#43b02a' },
        { borderColor: '#f98436', backgroundColor: '#f98436' },
        { borderColor: '#e4002b', backgroundColor: '#e4002b' },
      ];
    });
  }
}
