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
import { BehaviorSubject } from 'rxjs';

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
  fromStop: any;
  toStop: any;
  startDate: string;
  endDate: string;

  avatarImage: any;
  selectedCity: any = {
    name: "Ulaanbaatar",
    mn_name: "Улаанбаатар"
  };
  weatherData: any;
  show: boolean = false;
  dists: any;
  directions: any;

  readAllStop: boolean;
  readTarif: boolean;
  readData: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
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
      this.loadingData();
    }
  }
  
  ngOnInit() {
    this.apiService.readAllStop.subscribe(data => {
      this.readAllStop = data;
      if(this.readAllStop && this.readTarif)
        this.readData.next(true);
    });
    this.apiService.readTarif.subscribe(data => {
      this.readTarif = data;
      if(this.readAllStop && this.readTarif)
        this.readData.next(true);
    });
    this.readData.subscribe(data => {
      if(data) {
        // this.weatherService.getWeater(this.selectedCity.name).then(data => {
        //   this.weatherData = data.data;
          this.menuCtrl.enable(true);
        
          // this.apiService.getAllStopsData().then(() => {
          this.show = true; 
          this.loadingController.dismiss();
          // });
      //   }, err => this.loadingController.dismiss());
      }
    });
  }
  
  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }

  goToUser() {
    this.navCtrl.navigateForward('/profile/old');
  }

  openWeather(event) {
    this.navCtrl.navigateForward('/weather');
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
  
    this.getDefaultValue();
  }

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
        this.toStop = null;
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
        var date = new Date(this.startDate);
        var date2 = new Date(this.endDate);
        this.apiService.getDateDispatcherWeek(this.directions, this.toStop.stop_id, date.toISOString().toString().substring(0,10), date2.toISOString().toString().substring(0,10)).then(() => {
          let resultArray = [];
          let tempData: any = this.dataService.dateByDispatcherData;
          let dataNow = new Date();
          for(let i = 0; i < tempData.length; i++) {
            // orig heregleen deer ashiglana
            // let leaveDate = new Date(tempData[i].leave_date[0]);
            // if(dataNow.getTime() < leaveDate.getTime()) {
              tempData[i].leave_date_time = new Date(tempData[i].leave_date).toTimeString().substring(0, 5);
              tempData[i].leave_date_text = new Date(tempData[i].leave_date).toISOString().substring(0, 10);
              resultArray.push(tempData[i]);
            // }
          }
          if(resultArray.length > 0) {
            this.timeTableData = this.functionsService.sortByArray(resultArray, "leave_date_text");
          }
        });
        for(var i = 0; i < this.dataService.dispatchers.length; i++){
      
          if(this.toStop.stop_id == this.dataService.dispatchers[i].end_stop_id) {
            this.passData.toStop = this.dataService.dispatchers[i];
          }
        }
      }  
    });
  }

  getDefaultValue() {
    let now = new Date();
    this.startDate = now.toISOString();
    this.endDate = now.toISOString();
  }

  clickItem(item) {
    console.log("SELECTED item", item);
    console.log("DD", this.dataService.dispatchers);
    this.passData.dispatcher = item;
    // for(var i = 0; i < this.dataService.dispatchers.length; i++){
      
    //   if(item.direction_end_stop_id == this.dataService.dispatchers[i].end_stop_id) {
    //     this.passData.dispatcher = this.dataService.dispatchers[i];
    //   }
    // }
    
    this.navCtrl.navigateForward('/seats-select');
  }

  changeEndDate() {
    
  }

}
