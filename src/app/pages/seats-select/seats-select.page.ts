import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { DataService } from '../../services/data.service';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { Seat } from 'src/app/models/seat.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-seats-select',
  templateUrl: './seats-select.page.html',
  styleUrls: ['./seats-select.page.scss'],
})
export class SeatsSelectPage implements OnInit {

  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  selectedSeats: Seat[];
  nextAgree: boolean = false;
  show: boolean = false;

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService,
    private nav: NavController,
    private passData: PassingDataService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private apiService: ApiService
  ) { 
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      this.nav.navigateRoot('/login');
    } else 
      this.sourceStops = this.dataService.sourceStops;
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
    // this.dataService.emptySeats = this.apiService.getEmptySeats(this.passData.directionInfo.id).then(data => {
    //   console.log(data);
    // });
    loading.dismiss();
    this.show = true;
  }
  changeBusSeat(e) {
    this.selectedSeats = e.selectedSeats;
    if(this.selectedSeats) {
      this.nextAgree = true;
    } else {
      this.nextAgree = false;
    }
  }

  goToNextPage() {
    this.passData.setSelectedSeats(this.selectedSeats);
    this.nav.navigateForward("/passenger-info");
  }

  cancel() {
    this.nav.navigateBack("/time-table");
  }
}
