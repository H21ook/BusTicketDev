import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerColumn, PickerColumnOption, PickerOptions } from '@ionic/core';
import { DataService } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  startDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any = [];
  aimagData: any = []
  model: any = {};

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService
  ) { 
    this.sourceStops = this.dataService.sourceStops;
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    console.log(this.aimagData);
    this.getDefaultValue();
  }

  getDefaultValue() {
    let now = new Date();
    this.startDate = now.toISOString();
    this.minDate = now.toISOString();

    now.setDate(now.getDate() + 7);
    this.maxDate = now.toISOString();
  }
}

