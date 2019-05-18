import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  private seatData: any;
  @Input() seats = {};
  @Input() busType = 1;
  @Output() valueChange = new EventEmitter();

  constructor(
    private functionsService: FunctionsService
  ) { }

  ngOnInit() {
    this.fillSeatData();
  }

  toggleChanged(e) { 
    this.seatChecked(e.name);
    let selectedSeats = this.getSelectedSeats();
    this.valueChange.emit({selectedSeats: selectedSeats});
  }

  fillSeatData() {
    let length = 0;
    if(this.busType == 1)
      length = 45;
    else if(this.busType == 2) {
      length = 25;
    }
    this.seatData = this.functionsService.seatArrayFill(this.seats, length);
  }

  getSelectedSeats() : Seat[] {
    let result: Seat[] = [];
    for(let i = 0; i < this.seatData.length; i++) {
      if(this.seatData[i].checked && !this.seatData[i].disabled) {
        result.push({seat_no: this.seatData[i].seat_no, checked: this.seatData[i].checked, disabled: this.seatData[i].disabled});
      }
    }
    return result;
  }

  seatChecked(seat_no) {
    for(let i = 0; i < this.seatData.length; i++) {
      if(this.seatData[i].seat_no == seat_no) {
          this.seatData[i].checked = !this.seatData[i].checked;
        break;
      }
    }
  }
}
