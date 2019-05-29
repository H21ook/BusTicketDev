import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { LoadingController, NavController, MenuController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  orders: Order[];
  private statusColor: any = [];
  private profile: Profile;
  avatarImage: any;

  constructor(
    private orderHistoryService: OrderHistoryService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private profileService: ProfileService,
    private nav: NavController
  ) {
    if (!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      nav.navigateRoot('/login');
    } else {
      this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe(profile => {
        this.profile = profile;
        if (this.profile.image != null)
          this.loadImage(this.profile.image)
      });
    }
  }

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }
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

    this.orderHistoryService.getOrders(this.afAuth.auth.currentUser.uid).subscribe(data => {
      this.orders = data;
      console.log("O", this.orders);
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

  goToUser() {
    this.nav.navigateForward('/profile/old');
  }

  selectItem(item) {
    this.nav.navigateForward('/payment/' + item.orderNumber);
  }

  getCreatedTime(i) {
    return this.orders[i].createdTime.substring(0, 10);
  }
}
