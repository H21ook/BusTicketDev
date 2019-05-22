import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, LoadingController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Network } from '@ionic-native/network/ngx';
import { FunctionsService } from './services/functions.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  
  public appPages = [
    {
      title: 'Нүүр',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Тээврийн хуваарийн жагсаалт',
      url: '/time-table',
      icon: 'list-alt'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private nav: NavController,
    private network: Network,
    private functionsService: FunctionsService
  ) {
    this.initializeApp();
    this.menuCtrl.enable(false);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#2286dd");
      this.statusBar.show();
      this.splashScreen.show();
    });
  }

  ngOnInit(): void {
    // this.network.onConnect().subscribe(() => {
    //   this.functionsService.newtork.next(true);
    // });
    // this.network.onDisconnect().subscribe(() => {
    //   this.functionsService.newtork.next(false);
    // });
  }

  logOut() {
    this.logOutLoading();
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
        this.nav.navigateRoot('/login');
      });
    }, err => {
      loading.dismiss();
    }); 
  }
}
