import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AlertController, PopoverController, LoadingController, ModalController, NavController, MenuController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile : Profile;
  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  avatarImage: any;
  selectedCity: any = {
    name: "Ulaanbaatar",
    mn_name: "Улаанбаатар"
  };
  weatherData: any;
  show: boolean = false;
  
  constructor(
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private afAuth: AngularFireAuth,
    private weatherService: WeatherService,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private loadingController: LoadingController,
    private menuCtrl: MenuController
  ) {
    this.sourceStops = this.dataService.sourceStops;
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      navCtrl.navigateRoot('/login');
    } else {
      this.profileAFObser = this.profileService.getProfile(this.afAuth.auth.currentUser.uid);
      this.profileObser = this.profileAFObser.valueChanges();
      this.getPro();
    }
  }

  ngOnInit() {
    this.loadingData();
  }
  
  getPro() {
    this.profileObser.subscribe((profile) => {
      this.profile = profile;
      if (this.profile.image != null)
        this.loadImage(this.profile.image)
    });
  }
  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
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

  async openModalWeather(event) {
    this.navCtrl.navigateForward('/weather');
  }

  getWeather() {
    
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    this.weatherService.getWeater(this.selectedCity.name).subscribe(data => {
      this.weatherData = data.json();
      this.menuCtrl.enable(true);
      loading.dismiss();
      this.show = true;
    }, err => loading.dismiss());
  };
}
