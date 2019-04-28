import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';
import { ApiService } from '../../services/api.service';
import { PopoverController, NavController, LoadingController, MenuController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})
export class TimeTablePage implements OnInit {

  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile : Profile;
  avatarImage: any;
  startDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  id: string;
  slideConfig: any = {
    centeredSiles: true, 
    slidesPerView: 3,
    effect: 'slide'
  };
  show: boolean = false;
  dat: any;

  constructor(
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private apiService: ApiService,
    private profileService: ProfileService,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private menuCtrl: MenuController
  ) { 
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot('/login');
    } else {
      this.sourceStops = this.dataService.sourceStops;
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
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    // this.getDefaultValue();
    this.apiService.getWeekTimeTable(82).then(data => {
      this.dat = data;
      loading.dismiss();
    })
    .catch(error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      this.dat = "error" + error.error;
      console.log(error.headers);
      loading.dismiss();
    });
    
    this.show = true;
  }

  // getDefaultValue() {
  //   let now = new Date();
  //   this.startDate = now.toISOString();
  //   this.minDate = now.toISOString();

  //   now.setDate(now.getDate() + 7);
  //   this.maxDate = now.toISOString();
  // }

  changeFromAimag(e) {
    this.model.fromStop = null;
  }

  changeToAimag(e) {
    this.model.toStop = null;
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

