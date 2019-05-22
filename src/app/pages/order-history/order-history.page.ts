import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  
  orders: Order[];
  private statusColor: any = [];

  constructor(
    private orderHistoryService: OrderHistoryService,
    private loadingController: LoadingController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.loadingData();
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: false,
      message: '',
    });
    await loading.present();

    this.orderHistoryService.getOrders().subscribe(data => {
      this.orders = data;
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

  goToUser() {
    this.nav.navigateForward('/profile/old');
  }

  selectItem(item) {
    console.log("itme", item);
    this.nav.navigateForward('/payment/'+ item.orderNumber);
  }

  getCreatedTime(i) {
    return this.orders[i].createdTime.substring(0, 10);
  }
}
