import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber.model';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-subscriber-info',
  templateUrl: './subscriber-info.page.html',
  styleUrls: ['./subscriber-info.page.scss'],
})
export class SubscriberInfoPage implements OnInit {

  subscriber: Subscriber = new Subscriber();
  orderData: Order;
  
  constructor(
    private passData: PassingDataService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.orderData = this.passData.getOrderData();
    console.log(this.orderData);
  }

  goToNextPage() {
    this.passData.setSubscriber(this.subscriber);
    this.nav.navigateForward("/warning-info");
  }
}
