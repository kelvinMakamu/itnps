import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from '../models/filter';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  
  readonly DELIMITER = '-';
  
  model = new Filter('','');

  @Output() filterDashboard = new EventEmitter<any>();

  filterDashboardData(){
    this.model.startDate = this.toModel(this.model.startDate);
    this.model.endDate = this.toModel(this.model.endDate);
    this.filterDashboard.emit(this.model);
  }

  constructor(){}
  
  ngOnInit(){}

  toModel(date: any): string {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : '';
  }

}