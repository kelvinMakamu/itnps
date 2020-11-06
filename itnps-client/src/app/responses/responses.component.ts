import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

}
