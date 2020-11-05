import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  userFullName  : string;
  currentLevel  : string;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
      this.userFullName   = this.userService.getUserFullName();
      this.currentLevel   = this.userService.getUserAuthLevel();
  }

}
