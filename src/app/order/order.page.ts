import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {
  private seatsData: any = this.dataService.emptySeats;
  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {

  }
}
