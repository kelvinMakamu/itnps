import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DashboardService } from '../services/dashboard.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  userFullName  : string;
  currentLevel  : string;
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

  constructor(private dashboardService: DashboardService, private userService: UsersService){ }
  
  ngOnInit(): void {
    this.userFullName   = this.userService.getUserFullName();
    this.currentLevel   = this.userService.getUserAuthLevel();
    this.dashboardStats = this.dashboardService.getUserDashboardStatistics();
    this.monthData = this.dashboardStats.trend.map((mth:any)=>{return mth.NPSMonth;});
    this.npsData   = this.dashboardStats.trend.map((score: any)=>{return score.NPSScore;});
    this.promotersData  = this.dashboardStats.trend.map((promoter:any)=>{return promoter.promoters;});
    this.detractorsData = this.dashboardStats.trend.map((detractor: any)=>{return detractor.detractors;});
    this.lineChartData  = [
      { data: this.npsData, label: 'Net Promoter Score' , fill:false  },
      { data: this.promotersData, label: 'Promoters',     fill: false },
      { data: this.detractorsData, label: 'Detractors',   fill: false },
    ];
    this.lineChartType   = 'line';
    this.lineChartLabels = this.monthData;
    this.lineChartColors = [
      { borderColor: '#43b02a', backgroundColor: '#43b02a' },
      { borderColor: '#f98436', backgroundColor: '#f98436' },
      { borderColor: '#e4002b', backgroundColor: '#e4002b' },
    ];
  }
}
