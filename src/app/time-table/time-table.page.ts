import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  startDate: string;
  minDate: string;
  maxDate: string;

  constructor() { }

  ngOnInit() {
    let now = new Date();
    this.startDate = now.toISOString();
    this.minDate = now.toISOString();

    now.setDate(now.getDate() + 7);
    this.maxDate = now.toISOString();
  }

  aimag: any = [
    {
      id: 1,
      name: "Архангай"
    },
    {
      id: 2,
      name: "Булган"
    },
    {
      id: 3,
      name: "Говь-Алтай"
    },
    {
      id: 4,
      name: "Дорнод"
    },
    {
      id: 5,
      name: "Зүүн хараа"
    },
    {
      id: 6,
      name: "Булган"
    },
    {
      id: 7,
      name: "Орхон"
    },
    {
      id: 8,
      name: "Өмнө-Говь"
    }
  ]
}
