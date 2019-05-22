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
import { timer, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

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

  sTimer = new BehaviorSubject({});
  order: Order = {};
  timeLimit = 1200*1000;
  time: any = {};
  showTime: boolean = false;
  styleMessage: any = {};
  styleCircle: any = {};
  showAlert: boolean = false;
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
    
    this.platform.ready().then(() => {
      this.localNotify.on('click').subscribe(notif => {
        if(notif.data) {
          this.nav.navigateForward(notif.data.page, {queryParams: {id: notif.data.id}});
        }
      });
    })
  }
    
  
  ngOnInit() {
    this.order.orderNumber = this.route.snapshot.paramMap.get('id');
    
    this.sTimer.subscribe(data => {
      this.time = data;
      console.log("time", this.time);
      if(this.time) {
          var mytimer = timer(0, 1000);
          var tsub = mytimer.subscribe(x => {
            if(this.time.min >= 0) {
              this.showTime = true;
              if(this.time.sec == 0 && this.time.min == 0) {
                tsub.unsubscribe();
                this.showTime = false;
                this.order.status = "C";
                this.showAlert = true;
                this.orderHistoryService.updateOrder(this.order).then(() => {
                });
              } else {
                if(this.time.sec == 0) {
                  this.time.min--;
                  this.time.sec = 60;
                } 
                this.time.sec--;
              }
            } else{
              tsub.unsubscribe();
              this.showAlert = true;
              this.showTime = false;
            }
          });
      }
    }) 
    this.loadingData();
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
      console.log("aaa", this.order);
      switch(this.order.status) {
        case 'N':
          this.order.status = 'W';
          this.order.expired = new Date(Date.now() + this.timeLimit).toISOString();
          this.order.createdTime = new Date().toISOString();
          this.sTimer.next({ min: (this.timeLimit/1000)/60, sec: (this.timeLimit/1000)%60, zoruu: 0, isEnd: false});
          this.sTimer.complete();
          this.apiService.setOrderSeat(this.order).then(data => {
            this.order.seatRequest = data;
            this.orderHistoryService.updateOrder(this.order).then(() => {
            });
          });
          break;
        case 'W':
          var zoruu = Date.now() - new Date(this.order.createdTime).getTime();

          if(zoruu > this.timeLimit) {
            this.order.status = "C";
            this.showAlert = true;
            this.orderHistoryService.updateOrder(this.order).then(() => {
            });
          }
          else if(zoruu < 0) {
            this.sTimer.next({ min: (this.timeLimit/1000)/60, sec: (this.timeLimit/1000)%60, zoruu: 0, isEnd: false});
          } else {
            this.sTimer.next({ min: Math.floor(((this.timeLimit - zoruu)/1000)/60), sec: Math.floor(((this.timeLimit - zoruu)/1000)%60), zoruu: 0, isEnd: true});
          }
          break;
        case 'C':
          this.showAlert = true;
          // this.styleCircle = {
          //   'border-radius': '50px',
          //   'height': '60px', 
          //   'width': '100%',
          //   'background-color': '#f04141',
          //   'text-align': 'center',
          //   'margin': '0 auto',
          //   'padding-top': '15px'
          // };
          // this.styleMessage = {
          //   'font-size': '32px !important',
          //   'font-weight': 'bold',
          //   'margin': '0 auto'
          // };
          break;
        case 'S':
          this.showAlert = true;
          // this.styleCircle = {
          //   'border-radius': '50px',
          //   'background-color': '#10dc60', 
          //   'height': '60px', 
          //   'width': '100%',
          //   'text-align': 'center',
          //   'margin': '0 auto'
          // };
          // this.styleMessage = {
          //   'font-size': '32px !important',
          //   'font-weight': 'bold',
          //   'margin': '0 auto'
          // };
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
  
  goToUser() {
    this.nav.navigateForward('/profile/old');
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
