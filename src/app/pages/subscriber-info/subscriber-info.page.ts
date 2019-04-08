import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber.model';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-subscriber-info',
  templateUrl: './subscriber-info.page.html',
  styleUrls: ['./subscriber-info.page.scss'],
})
export class SubscriberInfoPage implements OnInit {

  subscriber: Subscriber = new Subscriber();
  orderData: Order;
  required = [];
  error: any;
  nextAgree: boolean = false;
  
  constructor(
    private passData: PassingDataService,
    private nav: NavController,
    private validator: ValidatorService
  ) { }

  ngOnInit() {
    this.orderData = this.passData.getOrderData();
    console.log(this.orderData);
  }

  changeName(index) {
    var res = this.validator.validateName(this.subscriber.name);
    if (res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  changeRegister(index) {
    var res = this.validator.validateRegister(this.subscriber.register);
    if (res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  changePhone() {
    var res = this.validator.validatePhoneNumber(this.subscriber.phoneNumber);
    if (res == true) {
      this.required[2] = true;
    } else {
      this.required[2] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  goToNextPage() {
    if(this.validator.checkRequired(this.required)) {
      this.passData.setSubscriber(this.subscriber);
      this.nav.navigateForward("/warning-info");
    }
  }

  closeErrorMsg() {
    this.error = "";
  }
}
