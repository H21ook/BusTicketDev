import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController, ModalController, NavController, MenuController, Platform } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';
import { ApiService } from 'src/app/services/api.service';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';

import * as xml2js  from 'xml2js'
import { StopListPage } from '../stop-list/stop-list.page';
import { DistinationStopListPage } from '../distination-stop-list/distination-stop-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private profile : Profile;

  sourceStops: any = [];
  aimagData: any = [];
  distData: any = [];
  timeTableData: any = null;
  fromStop: any = {};
  toStop: any = {};

  model: any = {
    fromAimag: null,
    fromStop: null,
    toAimag: null,
    toStop: null
  };

  avatarImage: any;
  selectedCity: any = {
    name: "Ulaanbaatar",
    mn_name: "Улаанбаатар"
  };
  weatherData: any;
  show: boolean = false;
  dists: any;
  directions: any;
  
  constructor(
    private platform: Platform,
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private afAuth: AngularFireAuth,
    private weatherService: WeatherService,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private passData: PassingDataService,
    private modalCtrl: ModalController
  ) {
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      navCtrl.navigateRoot('/login');
    } else {
      this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe(profile => {
        this.profile = profile;
        if (this.profile.image != null)
          this.loadImage(this.profile.image)
      });

    }
  }
  
  ngOnInit() {
    this.loadingData();
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
      mode: 'ios',
      cssClass: 'pop-over-style'
    });
    await popover.present();
  }

  openWeather(event) {
    this.navCtrl.navigateForward('/weather');
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: false,
      message: '',
    });
    await loading.present();

    this.weatherService.getWeater(this.selectedCity.name).subscribe(data => {
      this.weatherData = data.json();
      this.menuCtrl.enable(true);
	  
		this.apiService.getAllStopsData().then(() => {
		  this.show = true; 
		  this.sourceStops = this.dataService.sourceStops;
		  loading.dismiss();
		});
    }, err => loading.dismiss());
  };

  async changeFromStop() {
    const listModal = await this.modalCtrl.create({
      component: StopListPage,
      componentProps: {
      }
    });
    listModal.present(); 

    listModal.onDidDismiss().then(data => {
      if(data.data){
        this.fromStop = data.data;
        this.toStop = {};
        this.timeTableData = null;
        this.distData = [];
        this.dists = this.functionsService.searchDistinations(this.fromStop.stop_id);
        this.directions = this.apiService.getDistData(this.dists);

        this.passData.fromStop = this.fromStop;
      }
    });
  }

  async changeToStop() {
    const listModal = await this.modalCtrl.create({
      component: DistinationStopListPage,
      componentProps: {
      }
    });
    listModal.present(); 

    listModal.onDidDismiss().then(data => {
      if(data.data){
        this.toStop = data.data;

        this.apiService.getDateDispatcherToday(this.directions, this.toStop.stop_id).then(() => {
          let resultArray = [];
          let tempData: any = this.dataService.dateByDispatcherData;
          let dataNow = new Date();
          for(let i = 0; i < tempData.length; i++) {
            let leaveDate = new Date(tempData[i].leave_date[0]);
            if(dataNow.getTime() < leaveDate.getTime()) {
              tempData[i].leave_date_time = new Date(tempData[i].leave_date[0]).toTimeString().substring(0, 5);
              tempData[i].leave_date_text = new Date(tempData[i].leave_date[0]).toISOString().substring(0, 10);
              resultArray.push(tempData[i]);
            }
          }
          if(resultArray.length > 0) {
            this.timeTableData = resultArray;
          }
        });

        this.passData.toStop = this.toStop;
      }  
    });
  }

  clickItem(item) {
    this.passData.dispatcher = item;
    this.navCtrl.navigateForward('/seats-select');
  }

  fromStopChange(e) {
    console.log(e);
  }
}
