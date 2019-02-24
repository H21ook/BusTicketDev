import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerColumn, PickerColumnOption, PickerOptions } from '@ionic/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  startDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.sourceStops = this.dataService.sourceStops;
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

