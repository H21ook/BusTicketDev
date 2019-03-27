import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSlides } from '@ionic/angular';
import { FunctionsService } from '../../services/functions.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {
  private seatsData: any = this.dataService.emptySeats;
  @ViewChild('sliderMain') sliderMain: IonSlides;

  startDate: string;
  minDate: string;
  maxDate: string;
  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  id: string;

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService,
    private apiService: ApiService
  ) { 
    this.sourceStops = this.dataService.sourceStops;
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
    console.log(this.aimagData);
    this.getDefaultValue();
    this.apiService.getSourceStops();
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
