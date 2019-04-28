import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber.model';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

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
  show: boolean = false;
  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile : Profile;
  
  constructor(
    private passData: PassingDataService,
    private nav: NavController,
    private validator: ValidatorService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService,
    private menuCtrl: MenuController
  ) { 
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      this.nav.navigateRoot('/login');
    }
  }

  ngOnInit() {
    this.loadingData();
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    this.orderData = this.passData.getOrderData();
    this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe(profile => {
      this.profile = profile;
      this.subscriber.email = profile.email;
      this.subscriber.name = profile.firstName[0]+"."+profile.lastName;
      this.subscriber.register = profile.registerNumber;
      this.subscriber.phoneNumber = profile.phoneNumber ? profile.phoneNumber : '';
      this.changeName();
      this.changeRegister();
      this.changePhone();
    });
    loading.dismiss();
    this.show = true;
  }

  changeName() {
    var res = this.validator.validateName(this.subscriber.name);
    if (res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required) ? true : false;
  }

  changeRegister() {
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
  cancel() {
    this.nav.navigateBack("/time-table");
  }
}
