import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, Platform, LoadingController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { Order } from 'src/app/models/order.model';
import { Passenger } from 'src/app/models/passenger.model';
import { trigger, animate, keyframes, transition, style } from '@angular/animations';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiService } from 'src/app/services/api.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  animations: [
    trigger('btn', [
      transition('true <=> false', [
        style({
          height: '{{height}}', 
          opacity: 0, 
          width: '{{width}}', 
          left: '{{left}}',
          top: '{{top}}'
        }),
        animate(300, keyframes([
          style({ opacity: 1, transform: ' scale(0)', offset: 0 }),
          style({ opacity: 1, transform: ' scale(1.5)', offset: 0.6 }),
          style({ opacity: 0, transform: ' scale(2.5)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class PaymentPage implements OnInit {
  private rippleData: any = {}
  ripple: boolean = true;


  order: Order;
  timeLimit = 1200*1000;
  time: {
    zoruu: number,
    min: number,
    sec: number,
    isEnd: boolean
  }

  constructor(
    private nav: NavController,
    private popover: PopoverController,
    private dataPass: PassingDataService,
    private platform: Platform,
    private localNotify: LocalNotifications,
    private orderHistoryService: OrderHistoryService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private apiService: ApiService
    
  ) { 
    this.order.orderNumber = this.route.snapshot.queryParamMap.get('id');
    this.platform.ready().then(() => {
      this.localNotify.on('click').subscribe(notif => {
        if(notif.data) {
          this.nav.navigateForward(notif.data.page, {queryParams: {id: notif.data.id}});
        }
      });
    })
  }
    
  
  ngOnInit() {
    if(this.time) {
      if(this.time.min > 0) {
        var mytimer = timer(3000, 1000);
        var tsub = mytimer.subscribe(x => {
          if(this.time.min >= 0) {
            if(this.time.sec == 0 && this.time.min == 0) {
              tsub.unsubscribe();
            } else {
              if(this.time.sec == 0) {
                this.time.min--;
                this.time.sec = 60;
              } 
              this.time.sec--;
            }
          }
        });
      }
    }
    
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: false,
      message: '',
    });
    await loading.present();

    this.orderHistoryService.getOrder(this.order.orderNumber).subscribe(data => {
      this.order = data;
      switch(this.order.status) {
        case 'N':
          this.order.status = 'W';
          this.order.expired = new Date(Date.now() + 60*20*1000).toISOString();
          this.order.createdTime = new Date().toISOString();
          this.time.min = (this.timeLimit/1000)/60;
          this.time.sec = (this.timeLimit/1000)%60;
          this.apiService.setOrderSeat(this.dataPass.orderData).then(data => {
            this.order.seatRequest = data;
            console.log("req", data);
            this.orderHistoryService.updateOrder(this.order).then(() => {
              console.log('OK');
            });
          });
          break;
        case 'W':
          this.time.zoruu = Date.now() - new Date(this.order.createdTime).getTime();

          if(this.time.zoruu > this.timeLimit) {
            this.time.isEnd = true;
          }
          else if(this.time.zoruu < 0) {
            this.time.min = (this.timeLimit/1000)/60;
            this.time.sec = (this.timeLimit/1000)%60;
          } else {
            this.time.min = ((this.timeLimit - this.time.zoruu)/1000)/60;
            this.time.sec = ((this.timeLimit - this.time.zoruu)/1000)%60;
          }
          break;
        case 'C':

          break;
        case 'S':

          break;
        default: 
          break;
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }
  finish(e) {
    // this.nav.navigateRoot('/home');
    this.rippleData = this.rippleEffect(e);
    this.ripple = !this.ripple;

    this.localNotify.schedule({
      title: 'Bus Ticket',
      text: 'Таны захиалга амжилттай боллоо',
      foreground: true,
      data: {
        page: "/order-history", 
        id: 1
      }
    });
  }
  
  async openPopover(ev: Event) {
    const popover = await this.popover.create({
      component: UserMethodsPage,
      componentProps: {
        ev: ev
      },
      event: ev,
      mode: 'ios'
    });

    await popover.present();
  }

  rippleEffect(e) {
    var x = Math.max(e.target.clientWidth - e.offsetX, e.offsetX);
    var y = Math.max(e.target.clientHeight - e.offsetY, e.offsetY);
    var l = Math.max(x, y);
    let param = {
      width: l +'px',
      height: l +'px',
      left: (e.offsetX - l/2) + "px",
      top: (e.offsetY - l/2) + "px"
    };
    return param;
  }
}
