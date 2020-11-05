import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  userFullName  : string;
  currentLevel  : string;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
      this.userFullName   = this.userService.getUserFullName();
      this.currentLevel   = this.userService.getUserAuthLevel();
  }

}
