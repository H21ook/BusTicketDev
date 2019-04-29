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
import { ApiService } from 'src/app/services/api.service';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';

import * as xml2js  from 'xml2js'
import { StopListPage } from '../stop-list/stop-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private profile : Profile;

  sourceStops: any = [];
  aimagData: any = [];
  distSourceStop: any = [];
  distData: any = [];
  timeTableData: any = [];
  fromStop: any = {};
  toStop: any;

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
  directions: any = [];
  testData: any;
  
  constructor(
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
      this.loadingController.dismiss();
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
      mode: 'ios'
    });

    await popover.present();
  }

  async openModalWeather(event) {
    this.navCtrl.navigateForward('/weather');
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: false,
      message: '',
    });
    await loading.present();
    // this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id"); 

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

  async openModalList() {
    const listModal = await this.modalCtrl.create({
      component: StopListPage,
      componentProps: {
      },
      animated: true
    });
    listModal.present(); 

    listModal.onDidDismiss().then(data => {
      if(data.data){
        this.fromStop = data.data;
      } 
      console.log("RETURN:", data);
    });
  }

  changeFromStop() {
    if(this.model.fromStop != null && this.model.fromStop != undefined) {
      this.fromStop = this.aimagData[this.model.fromAimag].data[this.model.fromStop];
      this.toStop = null;
      this.timeTableData = [];
      this.distSourceStop = [];
      this.distData = [];
      this.model.toAimag = null;
      this.model.toStop = null;
      // this.dists = this.functionsService.searchDistinations(this.fromStop.ss_id);

      let result: any = this.apiService.getDistData(this.dists);
      this.distSourceStop = result.distSourceStop;
      this.directions = result.directions;

      this.distData = this.functionsService.groupBy(this.distSourceStop, "ss_A_id");
    }
  }

  changeFromAimag() {
    if(this.model.fromAimag != null && this.model.fromAimag != undefined) {
      this.model.fromStop = null;
      this.model.toAimag = null;
      this.model.toStop = null;
      this.timeTableData = [];
      this.distSourceStop = [];
      this.distData = [];
    }
  }

  changeToStop() {
	  this.toStop = this.distData[this.model.toAimag].data[this.model.toStop];
    this.timeTableData = [];
    let tempData;
    this.apiService.getTodayTimeTable(this.directions).then(data => {

      this.apiService.dateByDispatcherData = data;
      tempData = this.apiService.getDateDispatcher(this.directions, this.toStop.ss_id);

      for(let i = 0; i < tempData.length; i++) {
        tempData[i].leave_date_time = new Date(tempData[i].leave_date).toTimeString().substring(0, 5);
        tempData[i].leave_date_text = new Date(tempData[i].leave_date).toISOString().substring(0, 10);
      }
      this.timeTableData = this.timeTableData.concat(tempData);
      console.log(this.timeTableData);  
    });
  }

  clickItem(item) {
    this.passData.setDirectionInfo(item);
    this.navCtrl.navigateForward('/seats-select');
  }

  fromStopChange(e) {
    console.log(e);
  }
}
