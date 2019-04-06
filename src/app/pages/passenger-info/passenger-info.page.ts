import { Component, OnInit } from '@angular/core';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { Passenger } from 'src/app/models/passenger.model';
import { NavController } from '@ionic/angular';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.page.html',
  styleUrls: ['./passenger-info.page.scss'],
})
export class PassengerInfoPage implements OnInit {

  passengersData: Passenger[] = [];
  totalAmount = 0;
  required = [];
  error: any;
  nextAgree: boolean = false;

  constructor(
    private passData: PassingDataService,
    private nav: NavController,
    private validator: ValidatorService
  ) { }

  ngOnInit() {
    this.preparePassengers();
  }

  preparePassengers() {
    let selectedSeats : any = this.passData.getSelectedSeats();
    if(selectedSeats) {
      for(let i = 0; i < selectedSeats.length;  i++) {
        this.passengersData.push({seat_no: selectedSeats[i].seat_no, age: '1', name: '', register: '', incur: false, amount: 0}); 
        this.calcAmountAge(i);
      }
    } else {
      this.nav.navigateBack('/seats-select');
    }
  }

  calcAmountAge(i) {
    if(this.passengersData[i].age == "0") {
      this.passengersData[i].amount = 25000;
    } else {
      this.passengersData[i].amount = 50000;
    }
    this.passengersData[i].amount += this.passengersData[i].incur ? 400 : 0; 
    this.calcTotalAmout();
  }
  
  calcTotalAmout() {
    let total = 0;
    for(let i = 0; i < this.passengersData.length;  i++) {
      total += this.passengersData[i].amount;
    }
    this.totalAmount = total;
  }
  
  changeName(index) {
    var res = this.validator.validateName(this.passengersData[index].name);
    if (res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  changeRegistger(index) {
    var res = this.validator.validateRegister(this.passengersData[index].register);
    if (res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  goToNextPage() {
    if (this.validator.checkRequired(this.required)) {
      this.passData.setPassengerAndTotal(this.passengersData, this.totalAmount);
      this.nav.navigateForward("/subscriber-info");
    }
  }
}
