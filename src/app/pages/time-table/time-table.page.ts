import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';
import { ApiService } from '../../services/api.service';
import { PopoverController, NavController, ModalController, LoadingController, MenuController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';
import { StopListPage } from '../stop-list/stop-list.page';
import { DistinationStopListPage } from '../distination-stop-list/distination-stop-list.page';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  private profile : Profile;
  avatarImage: any;
  startDate: string;
  endDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any = [];
  distData: any = [];
  timeTableData: any = null;
  fromStop: any;
  toStop: any;
  dists: any;
  directions: any;
  
  id: string;
  show: boolean = false;
  test: any;

  constructor(
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private apiService: ApiService,
    private profileService: ProfileService,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
	private modalCtrl: ModalController,
	private passData: PassingDataService
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

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }

  ngOnInit() {
    this.loadingData();
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    
    this.sourceStops = this.dataService.sourceStops;
    this.getDefaultValue();
    this.show = true;
	  loading.dismiss();
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
              tempData[i].leave_date_time = new Date(tempData[i].leave_date[0]).toTimeString().substring(0, 5);
              tempData[i].leave_date_text = new Date(tempData[i].leave_date[0]).toISOString().substring(0, 10);
              resultArray.push(tempData[i]);
            // }
          }
          if(resultArray.length > 0) {
            this.timeTableData = this.functionsService.sortByArray(resultArray, "leave_date_text");
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

  getDefaultValue() {
    let now = new Date();
    this.startDate = now.toISOString();
    this.endDate = now.toISOString();
    // this.minDate = now.toISOString();

    // now.setDate(now.getDate() + 7);
    // this.maxDate = now.toISOString();
  }

  changeEndDate() {
    
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
}

