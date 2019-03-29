import { Component, OnInit } from '@angular/core';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { Passenger } from 'src/app/models/passenger.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.page.html',
  styleUrls: ['./passenger-info.page.scss'],
})
export class PassengerInfoPage implements OnInit {

  passengersData: Passenger[] = [];
  totalAmount = 0;

  constructor(
    private passData: PassingDataService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.preparePassengers();
  }

  preparePassengers() {
    let selectedSeats : any = this.passData.getSelectedSeats();

    for(let i = 0; i < selectedSeats.length;  i++) {
      this.passengersData.push({seat_no: selectedSeats[i].seat_no, age: '1', name: '', register: '', incur: false, amount: 0}); 
      this.calcAmountAge(i);
    }
  }

  calcAmountAge(i) {
    if(this.passengersData[i].age == "0") {
      this.passengersData[i].amount = 25000;
    } else {
      this.passengersData[i].amount = 50000;
    }
    this.calcTotalAmout();
  }
  
  calcTotalAmout() {
    let total = 0;
    for(let i = 0; i < this.passengersData.length;  i++) {
      total += this.passengersData[i].amount;
      total += this.passengersData[i].incur ? 400 : 0; 
    }
    this.totalAmount = total;
  }
  
  goToNextPage() {
    this.passData.setPassengerAndTotal(this.passengersData, this.totalAmount);
    this.nav.navigateForward("/subscriber-info");
  }
}
