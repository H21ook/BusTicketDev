import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // private apiKey = 'a38fec97bda64fb6af1120457182110'; //apixu
  private apiKey = 'b41f1fd8127b041b263e668f04e9a3d4'; // openweather
  private url: string;
  headers: any;

  constructor(public http: Http) {
    this.url = 'http://api.openweathermap.org/data/2.5/'; // openweather
    // this.url = 'https://api.apixu.com/v1/forecast.json?key='+ this.apiKey +'&q='; //apixu

    

    // this.headers = new HttpHeaders({
    //   'Content-Type':'application/json',
    //   'Accept':'application/json',
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Methods':'GET'
    // });

    // this.headerOption = this.headerOption.append('Authorization','Bearer '+this.token);
  }

  getWeater(city) {
    // return this.http.get(this.url+city+'&days=5').map(res => res); //apixu
    try {
      const response = this.http.get(this.url + 'weather?q=' + city + ',mn&units=metric&appid=' + this.apiKey); // openweather
      const params = {};
      const headers = {};
      
      response.subscribe(data => {
        console.log(data.status);
        console.log(data); // JSON data returned by server
        console.log(data.headers);
      });

      return response;
    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }
  }

  getForecastWeater(city) {
    return this.http.get(this.url + 'forecast?q=' + city + ',mn&units=metric&appid=' + this.apiKey); // openweather
  }
}
// https://api.apixu.com/v1/forecast.json?key=a38fec97bda64fb6af1120457182110&q=mecherfeh-hims-syria-2338880 //apixu
// http://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar,mn&appid=b41f1fd8127b041b263e668f04e9a3d4 // openweather