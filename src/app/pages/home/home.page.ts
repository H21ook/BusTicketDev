import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AlertController, PopoverController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  selectedCity: any = {
    name: "Ulaanbaatar",
    mn_name: "Улаанбаатар"
  };
  weatherData: any;
  constructor(
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private afAuth: AngularFireAuth,
    private weatherService: WeatherService,
    private navCtrl: NavController
  ) {
    this.sourceStops = this.dataService.sourceStops;
    if(!this.afAuth.auth.currentUser) {
      navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    this.getWeather();
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

  async openModalWeather(event) {
    this.navCtrl.navigateForward('/weather');
  }

  getWeather() {
    this.weatherService.getWeater(this.selectedCity.name).subscribe(data => {
      this.weatherData = data.json();
    });
  }


}
