import { Component, OnInit } from '@angular/core';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-warning-info',
  templateUrl: './warning-info.page.html',
  styleUrls: ['./warning-info.page.scss'],
})
export class WarningInfoPage implements OnInit {

  isAgree: boolean = false;
  constructor(
    private passData: PassingDataService,
    private afAuth: AngularFireAuth,
    private nav: NavController,
    private menuCtrl: MenuController
  ) {
    if (!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      this.nav.navigateRoot('/login');
    }
  }

  ngOnInit() {
  }

  cancel() {
    this.nav.navigateBack("/home");
  }

  goToPayment() {
    this.passData.setIsAgree(true);
    this.nav.navigateForward("/payment");
  }
}
