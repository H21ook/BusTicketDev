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
  private displaySeats: any = [];
  private endRow: any = [];
  private height = 44;
  @Input() seats = {};
  @Input() busType = 1;
  @Input() seatCount = 45;
  @Output() valueChange = new EventEmitter();

  constructor(
    private functionsService: FunctionsService
  ) { }

  ngOnInit() {
    this.fillSeatData();
    this.prepareDrawSeats();
  }

  toggleChanged(e) { 
    this.seatChecked(e.name);
    let selectedSeats = this.getSelectedSeats();
    this.valueChange.emit({selectedSeats: selectedSeats});
  }

  fillSeatData() {
    let length = 0;
    if(this.busType == 1)
      length = this.seatCount;
    else if(this.busType == 2) {
      length = this.seatCount;
    }
    this.seatData = this.functionsService.seatArrayFill(this.seats, length);
  }

  prepareDrawSeats() {
    var row = Math.floor(this.seatCount/4);
    var latestRow = this.seatCount%4;
    if(latestRow + 4 <= 5) {
      row--;
      latestRow+=4;
    }
    this.height += (row+1)*38;
    var startIndex = 1;
    for(let i = 0; i < row; i++) {
      var temp: any = [];
      temp = this.seatData.slice(startIndex, startIndex + 4);
      this.displaySeats.push(temp);
      startIndex += 4;
    }
    this.endRow = this.seatData.slice(this.seatData.length - latestRow, this.seatData.length);
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
