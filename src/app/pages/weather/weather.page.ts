import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, IonSlides, PopoverController, NavController  } from '@ionic/angular';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit{

  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile : Profile;
  avatarImage: any;
  cities: any;
  selectedCity: any = "Ulaanbaatar";
  private weather: any;
  private forecastdays: any = [];
  private forecastPreData: any = [];
  private weekday = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

  @ViewChild('mySlider') slider: IonSlides;
  
  constructor(
    private popover: PopoverController,
    private weatherService: WeatherService,
    private dataService: DataService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private profileService: ProfileService
    // private modalCtrl: ModalController
  ) {
    if(!this.afAuth.auth.currentUser) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.cities = this.dataService.cities;
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
  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }


  ngOnInit() {
    this.dataLoad(this.selectedCity);
  }

  selectItem() {
    this.dataLoad(this.selectedCity);
  }


  dataLoad(name: string) {
    
    this.forecastdays = [];

    this.weatherService.getWeater(name).subscribe(data => {
      this.weather = null;
      this.weather = data.json();
    });

    this.weatherService.getForecastWeater(name).subscribe(data => {
      let weatherForecast: any = data.json();
      console.log(weatherForecast);
      let forecastday = [], dt, dtTemp, k = -1;

      dt = new Date();

      for (let i = 0; i < weatherForecast.list.length; i++) {
        // dtTemp = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000)); //tsagiin zoruutei uyd ashiglana
        dtTemp = new Date(weatherForecast.list[i].dt * 1000);
        if (dt.getDate() == dtTemp.getDate() && k == -1) {
          k = 0;
        }
        if (k < 5 && k > -1)
          if (dt.getDate() == dtTemp.getDate()) {
            forecastday.push(weatherForecast.list[i]);
          }
          else {
            this.forecastdays.push(forecastday.slice());
            forecastday = [];
            k++;

            // dt = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000)); //tsagiin zoruutei uyd ashiglana
            dt = new Date(weatherForecast.list[i].dt * 1000);
            forecastday.push(weatherForecast.list[i]);
          }
      }

      forecastday = [];
      this.getPrepareData(this.forecastdays);
    });

    // this.network.onDisconnect().subscribe(() => {
    //   this.presentToast({message:'network was disconnected :-(', duration: 2000, position: 'top'});
    //   console.log('network was disconnected :-(');
    // });

    // this.network.onConnect().subscribe(() => {
    //   this.presentToast({message:'Network connected!', duration: 2000, position: 'top'});
    //   console.log('Network connected!');
    // }); 
  }

  getPrepareData(datas) {
    this.forecastPreData = [];

    let date;
    let param: any = {};
    let totalTemp = 0, totalHumidity = 0, totalWindSpeed = 0;
    let minTemp: any, maxTemp: any;

    for (let i = 0; i < datas.length; i++) {
      minTemp = datas[i][0].main.temp;
      maxTemp = datas[i][0].main.temp;

      for (let j = 0; j < datas[i].length; j++) {
        totalTemp += datas[i][j].main.temp;
        totalHumidity += datas[i][j].main.humidity;
        totalWindSpeed += datas[i][j].wind.speed;

        if (minTemp > datas[i][j].main.temp)
          minTemp = datas[i][j].main.temp;
        if (maxTemp < datas[i][j].main.temp)
          maxTemp = datas[i][j].main.temp;
      }

      date = new Date((datas[i][0].dt * 1000) - (8 * 60 * 60 * 1000));
      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      if (i == 0 && this.weather) {
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: this.weather.weather ? this.weather.weather : null,
          temp: this.weather.main.temp ? this.weather.main.temp : null,
          humidity: this.weather.main.humidity ? this.weather.main.humidity : null,
          windSpeed: this.weather.wind.speed ? this.weather.wind.speed : null,
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp),
        }
      }
      else {
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: datas[i][3].weather,
          temp: Math.round(totalTemp / datas[i].length),
          humidity: Math.round(totalHumidity / datas[i].length),
          windSpeed: Math.round(totalWindSpeed / datas[i].length),
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp)
        }
      }

      this.forecastPreData.push(param);
      console.log(this.forecastPreData);
      totalTemp = 0;
      totalHumidity = 0;
      totalWindSpeed = 0;
      minTemp = 0;
      maxTemp = 0;
      param = {};
    }

  }
  changeDay(e: number) {
    this.slider.getActiveIndex().then(i => {
      if (e != i) {
        this.slider.slideTo(e, 300);
      }
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
} 
