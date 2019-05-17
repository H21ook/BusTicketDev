import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSlides, LoadingController } from '@ionic/angular';
import { FunctionsService } from '../../services/functions.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: 'order-detail.page.html',
  styleUrls: ['order-detail.page.scss']
})
export class OrderDetailPage implements OnInit {
  private seatsData: any = this.dataService.emptySeats;
  @ViewChild('sliderMain') sliderMain: IonSlides;

  startDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  id: string;
  show:boolean = false;

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService,
    private apiService: ApiService,
    private loadingController: LoadingController
  ) { 
    this.sourceStops = this.dataService.sourceStops;
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    this.getDefaultValue();
    this.show = true;
  }

  ngOnInit() {
    this.loadingData();
  }

  getDefaultValue() {
    let now = new Date();
    this.startDate = now.toISOString();
    this.minDate = now.toISOString();

    now.setDate(now.getDate() + 7);
    this.maxDate = now.toISOString();
  }

  changeFromAimag(e) {
    this.model.fromStop = null;
  }

  changeToAimag(e) {
    this.model.toStop = null;
  }

  changeSliderMain() {
    this.sliderMain.getActiveIndex().then(index => {
      console.log(index);
    });
  }
}
