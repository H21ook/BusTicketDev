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
import { NullTemplateVisitor } from '@angular/compiler';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';

import * as xml2js  from 'xml2js'

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
  aimagData: any = [];
  distSourceStop: any = [];
  distData: any = [];
  timeTableData: any = [];
  fromStop: any;
  toStop: any;
  test1:any;
  test2:any;
  test3:any;
  test4:any;

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
    private passData: PassingDataService
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

  getPro() {
    this.profileObser.subscribe((profile) => {
      this.profile = profile;
      if (this.profile.image != null)
        this.loadImage(this.profile.image)
    });
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

  changeFromStop() {
    if(this.model.fromStop != null && this.model.fromStop != undefined) {
      this.fromStop = this.aimagData[this.model.fromAimag].data[this.model.fromStop];
      this.toStop = null;
      this.timeTableData = [];
      this.distSourceStop = [];
      this.distData = [];
      this.model.toAimag = null;
      this.model.toStop = null;
      this.dists = this.functionsService.searchDistinations(this.fromStop.ss_id);

      let result: any = this.apiService.getDistData(this.dists);
      this.distSourceStop = result.distSourceStop;
      this.directions = result.directions;

      this.distData = this.functionsService.groupBy(this.distSourceStop, "ss_A_id");
      
      console.log(this.distData);
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
    this.getTodayTimeTable(this.directions).then(data => {
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

  getTodayTimeTable(dirs) {
    let array:any = [];
    let result;
    let response;
    // for(let j = 0; j < dirs.length; j++) {
      response = this.apiService.getToday(dirs[0]).then(data => {
        this.test1 = data.data;
        xml2js.parseString(data.data, function (err, res) {
          result = res.DataTable["diffgr:diffgram"][0].DocumentElement[0].get_Date_by_Dispatchers;
          array = array.concat(result);
          return new Promise((resolve, reject) => {
            resolve(array);
          });
        });
      });
    // }
    return response;
  }

  clickItem(item) {
    this.passData.setDirectionInfo(item);
    this.navCtrl.navigateForward('/seats-select');
  }

  // getTimeTable() {
  //   let resp;
  //   resp = this.functionsService.findDirection(this.model.fromStop, this.model.toStop,  this.dists);
  //   this.apiService.getTodayTimeTable(resp.direction_id).then(data => {
  //     this.timeTableData = {
  //       data : data,
  //       time : new Date(this.timeTableData.leave_date).toTimeString().toString().substring(0,5)
  //     };
  //   });
  // }
}
