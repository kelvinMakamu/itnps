import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  model = new Filter('','');

  @Output() filterDashboard = new EventEmitter<any>();

  filterDashboardData(){
    this.filterDashboard.emit(this.model);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
