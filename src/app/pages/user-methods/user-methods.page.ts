import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController, LoadingController, Events, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-methods',
  templateUrl: './user-methods.page.html',
  styleUrls: ['./user-methods.page.scss'],
})
export class UserMethodsPage implements OnInit {
  constructor(
    private popover: PopoverController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  logOut() {
    this.popover.dismiss();
    this.logOutLoading();
  }

  goToProfile() {
    this.popover.dismiss();
    this.navCtrl.navigateForward('/profile/old');
  }

  async logOutLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: 'Түр хүлээнэ үү!',
    });
    await loading.present();
    this.authService.logOut().then((data) => {
      loading.dismiss().then(() => {
        this.menuCtrl.enable(false);
        this.navCtrl.navigateRoot('/login');
      });
    }, err => {
      loading.dismiss();
    }); 
  }
}
