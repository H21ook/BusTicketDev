import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  cities: any;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
    ) { 
    this.cities = this.dataService.cities;
  }

  ngOnInit() {
  }

  selectItem(name : string) {
    this.modalCtrl.dismiss(name);
  }
} 
