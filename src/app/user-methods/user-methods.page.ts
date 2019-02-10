import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController, LoadingController, Events } from '@ionic/angular';

@Component({
  selector: 'app-user-methods',
  templateUrl: './user-methods.page.html',
  styleUrls: ['./user-methods.page.scss'],
})
export class UserMethodsPage implements OnInit {
  constructor(private navPrm: NavParams,
    private popover: PopoverController,
    private nav: NavController,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  logOut() {
    this.popover.dismiss();
    this.logOutLoading();
  }

  async logOutLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: 'Түр хүлээнэ үү!',
      duration: 2000
    });
    await loading.present();

    await loading.onDidDismiss().then(() => {
      this.nav.navigateRoot('/login');
    });
  }
}
