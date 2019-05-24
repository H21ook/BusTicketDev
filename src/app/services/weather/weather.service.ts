import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // private apiKey = 'a38fec97bda64fb6af1120457182110'; //apixu
  private apiKey = 'b41f1fd8127b041b263e668f04e9a3d4'; // openweather
  private url: string;
  headers: any;

  constructor(public http: Http,
    private http1:HTTP,) {
    this.url = 'http://samples.openweathermap.org/data/2.5/'; // openweather
    // this.url = 'https://api.apixu.com/v1/forecast.json?key='+ this.apiKey +'&q='; //apixu
  }

  getWeater(city) {
    // return this.http.get(this.url+city+'&days=5').map(res => res); //apixu
    try {             
      const response = this.http1.get(this.url + 'weather?q=' + city + ',mn&appid=' + this.apiKey, {}, {}); // openweather
      // const response = this.http.get(this.url + city + '&days=5');
      const params = {};
      const headers = {};

      return response;
    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }
  }

  getForecastWeater(city) {
    return this.http1.get(this.url + 'forecast?q=' + city + ',mn&appid=' + this.apiKey, {}, {}); // openweather
  }

  getForecastHourly(city) {
    return this.http1.get(this.url + 'forecast/hourly?q=' + city + ',mn&appid=' + this.apiKey, {}, {}); // openweather
  }
}
// https://api.apixu.com/v1/forecast.json?key=a38fec97bda64fb6af1120457182110&q=mecherfeh-hims-syria-2338880 //apixu
// http://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar,mn&appid=b41f1fd8127b041b263e668f04e9a3d4 // openweather