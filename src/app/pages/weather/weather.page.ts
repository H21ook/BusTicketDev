import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, IonSlides, PopoverController, NavController, LoadingController } from '@ionic/angular';
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
export class WeatherPage implements OnInit {

  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile: Profile;
  avatarImage: any;
  cities: any;
  selectedCity: any = "Ulaanbaatar";
  private weather: any;
  private forecastdays: any = [];
  private forecastPreData: any = [];
  private weekday = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
  show: boolean = false;

  @ViewChild('mySlider') slider: IonSlides;

  constructor(
    private popover: PopoverController,
    private weatherService: WeatherService,
    private dataService: DataService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private loadingController: LoadingController
    // private modalCtrl: ModalController
  ) {
    if (!this.afAuth.auth.currentUser) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.cities = this.dataService.cities;
      
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
    this.show = false;
    this.loadingData(this.selectedCity);
  }

  selectItem() {
    this.loadingData(this.selectedCity);
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

      date = new Date(datas[i][0].dt_txt);

      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      if (i == 0 && this.weather) {
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: this.weather.weather,
          temp: Math.round(this.weather.main.temp),
          humidity: Math.round(this.weather.main.humidity),
          windSpeed: Math.round(this.weather.wind.speed),
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp) < this.weather.main.temp ? this.weather.main.temp : Math.round(maxTemp),
        };
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
        };
      }

      this.forecastPreData.push(param);
      
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

  gotoUser() {
    this.navCtrl.navigateForward('/profile/old');
  }

  async loadingData(name: string) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    this.forecastdays = [];
    this.weatherService.getWeater(name).subscribe(data => {
      this.weather = data.json();
      this.weather.main.temp = Math.round(this.weather.main.temp);

      this.weatherService.getForecastWeater(name).subscribe(data => {
        let weatherForecast: any = data.json();

        let forecastday = [], dt, dtTemp, k = -1;

        dt = new Date();

        for (let i = 0; i < weatherForecast.list.length; i++) {
          dtTemp = new Date(weatherForecast.list[i].dt_txt);
          if (dt.getDate() == dtTemp.getDate() && k == -1) {
            k = 0;
          }
          if (k < 6 && k > -1)
            if (dt.getDate() == dtTemp.getDate()) {
              forecastday.push(weatherForecast.list[i]);
            }
            else {
              this.forecastdays.push(forecastday.slice());
              forecastday = [];
              k++;

              dt = new Date(weatherForecast.list[i].dt_txt);
              forecastday.push(weatherForecast.list[i]);
            }
        }

        forecastday = [];
        this.getPrepareData(this.forecastdays);
        loading.dismiss();
        this.show = true;
      },err => loading.dismiss());
    },err => loading.dismiss());

    // this.network.onDisconnect().subscribe(() => {
    //   this.presentToast({message:'network was disconnected :-(', duration: 2000, position: 'top'});
    //   console.log('network was disconnected :-(');
    // });

    // this.network.onConnect().subscribe(() => {
    //   this.presentToast({message:'Network connected!', duration: 2000, position: 'top'});
    //   console.log('Network connected!');
    // });
  }




  slidesOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    zoom: false,
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
} 
