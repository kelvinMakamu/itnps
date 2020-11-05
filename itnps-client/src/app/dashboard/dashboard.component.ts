import { Component, OnInit } from '@angular/core';
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

  constructor(private dashboardService: DashboardService, private userService: UsersService) { }

  ngOnInit(): void {
    this.userFullName   = this.userService.getUserFullName();
    this.currentLevel   = this.userService.getUserAuthLevel();
    this.dashboardStats = this.dashboardService.getUserDashboardStatistics();
  }

}
