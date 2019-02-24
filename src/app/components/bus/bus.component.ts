import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  private seatData: any;
  @Input() seats = {};
  @Input() busType = 1;

  constructor(
    private functionsService: FunctionsService
  ) { }

  ngOnInit() {
    this.fillDate();
  }

  fillDate() {
    this.seatData = this.functionsService.seatArrayFill(this.seats, 45);
    console.log(this.seatData);
  }

}
