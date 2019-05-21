import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import * as xml2js  from 'xml2js'
import { FunctionsService } from './functions.service';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderHistoryService } from './order-history.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  dateByDispatcherData: any = [];
  readTarif: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readAllStop: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private http:HTTP,
    private dataService: DataService,
    private functionsService: FunctionsService,
    private orderHistoryService: OrderHistoryService
  ) { 
    this.getTarifData().then(() => {
      this.readTarif.next(true);
    });
    this.getAllStopsData().then(() => {
      this.readAllStop.next(true);
    });
  }

  getToday(dir) {
    let date = new Date("2018/12/01");
    let start = date.toISOString().toString().substring(0,10);
    let date2 = new Date("2018/12/01");
    date2.setDate(date.getDate() + 2);
    let end = date2.toISOString().toString().substring(0,10);

    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_Date_by_Dispatchers?id_direction=" + dir + "&start=" + start + "&end=" + end;
    return this.http.get(url, {}, {});
  }

  getWeek(dir, start, end) {
    // let date = new Date("2018/12/01");
    // let start = date.toISOString().toString().substring(0,10);
    // let date2 = new  Date("2018/12/01");
    // date2.setDate(date.getDate() + 8);
    // let end = date2.toISOString().toString().substring(0,10);
    let param = {};
    let headers = {};
    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_Date_by_Dispatchers?id_direction=" + dir + "&start=" + start + "&end=" + end;
    return this.http.get(url, {}, {});
  }

  async getTodayTimeTable(dirs) {
    let array:any = [];
    let result;
    let response;

    for(let j = 0; j < dirs.length; j++) {
      response = await this.getToday(dirs[j]).then(data => {

        xml2js.parseString(data.data, function (err, res) {
          if(res.DataTable["diffgr:diffgram"][0]) {
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]) {
                result = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_Date_by_Dispatchers"];
                array = array.concat(result);
              }
            }
          }
        });

        return new Promise((resolve, reject) => {
          resolve(array);
        });
      });
    }
    return response;
  }

  async getWeekTimeTable(dirs, start, end) {
    let array:any = [];
    let result;
    let response;

    for(let j = 0; j < dirs.length; j++) {
      response = await this.getWeek(dirs[j], start, end).then(data => {

        xml2js.parseString(data.data, function (err, res) {
          if(res.DataTable["diffgr:diffgram"][0]) {
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]) {
                result = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_Date_by_Dispatchers"];
                array = array.concat(result);
              }
            }
          }
        });
        return new Promise((resolve, reject) => {
          resolve(array);
        });
      });
    }
    return response;
  }
  
  async getDateDispatcherToday(directions, end_id) {
    return this.getTodayTimeTable(directions).then(data => {

      let result = []; 
      for(let j = 0; j < directions.length; j++) {
        for(let i = 0; i < data.length; i++) {
          if(directions[j] == data[i].direction_id[0] && end_id == data[i].direction_end_stop_id[0]) {
            result.push(data[i]);
          }
        }
      }
      this.dataService.dateByDispatcherData = result;
    });
  }

  async getDateDispatcherWeek(directions, end_id, startDate, endDate) {
    return this.getWeekTimeTable(directions, startDate, endDate).then(data => {
      let result = []; 
      for(let j = 0; j < directions.length; j++) {
        for(let i = 0; i < data.length; i++) {
          if(directions[j] == data[i].direction_id[0] && end_id == data[i].direction_end_stop_id[0]) {
            result.push(data[i]);
          }
        }
      }
      this.dataService.dateByDispatcherData = result;
    });
  }

  getDistData(dists) {
    let directions: any = [];
    let distSourceStop:any = [];
    
    if(dists && dists.length >= 1) {
      for(let i = 0; i < dists.length; i++) {
        let tempData = {
          aimag_id: dists[i].end_stop_aimag_id[0], 
          stop_id: dists[i].end_stop_id[0],
          stop_name: dists[i].end_stop_name[0],
          stop_data: dists[i],
          dispatcher: null
        }
        if(i == 0){
          distSourceStop.push(tempData);
          directions.push(dists[i].direction_id[0]);
        } else {
          let check = false;
          for(let j = 0; j < distSourceStop.length; j++) {
            if(distSourceStop[j].stop_id == dists[i].end_stop_id[0] ) {
              check = false;

              let checkDir = false;
              for(let k = 0; k < directions.length; k++) {
                if(directions[k] == dists[i].direction_id[0]) {
                  checkDir = true;
                  break;
                }
              }
              if(!checkDir) {
                directions.push(dists[i].direction_id[0]);
              }
              
              break;
            } else{
              check = true;
            }
          }
          if(check)
            distSourceStop.push(tempData);
        }
        
      }
    }

    this.dataService.distSourceStops = distSourceStop;
    
    return directions;
  }


  async getEmptySeats(dispatcher_id) {
    return this.getSeat(dispatcher_id).then(data => {
      let result;
      xml2js.parseString(data.data, function (err, res) {
        if(res.DataTable["diffgr:diffgram"][0]) {
          if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              result = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_Empty_Seat"];
          }
        }
      });

      this.dataService.emptySeats = result;
    });
  }

  getSeat(dispatcher_id) {
    let param = {};
    let headers = {};
    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_Empty_Seat?id_dispatcher=" + dispatcher_id;
    return this.http.get(url, {}, {});
  }

  getAllStops() {
    let param = {};
    let headers = {};
    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_all_stop";
    return this.http.get(url, {}, {});
  }

  getTarif() {
    let param = {};
    let headers = {};
    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_Tariff_to_Country";
    return this.http.get(url, {}, {});
  }
  
  async getAllStopsData() {
    await this.getAllStops().then(data => {
      let arrData: any[];
      xml2js.parseString(data.data, function (err, res) {
        if(res.DataTable["diffgr:diffgram"][0]) {
          if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]){
              arrData = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_all_stop"];
            }
          }
        }
      });
      this.dataService.sourceStops =  this.functionsService.uniqueAllStops(arrData);
      // console.log(this.functionsService.uniqueAllStops1(arrData));
    });
  }

  async getTarifData() {
    await this.getTarif().then(data => {
      let arrData: any[];
      xml2js.parseString(data.data, function (err, res) {
        if(res.DataTable["diffgr:diffgram"][0]) {
          if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]){
              arrData = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_Tariff_to_Country"];
            }
          }
        }
      });
      this.dataService.getTarif = arrData;
    });
  }

  async setOrderSeat(order: Order) {
    var array = [];
    var response;
    for(let item of order.passengers) {
      var body = {
        "dispatcher_id": order.dispatcher.id[0], 
        "seat_no": item.seat_no, 
        "zahialagch_id": order.subscriberId, 
        "expired": order.expired
      };
      const apiUrl = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/set_Order_Seat?"+'dispatcher_id='+ body.dispatcher_id + '&seat_no=' + body.seat_no + '&zahialagch_id=' + body.zahialagch_id + '&expired=' + body.expired;

      console.log("POST mae", body);
      response = await this.http.get(apiUrl, {}, {}).then(data => {
        let arrData: any[];
        xml2js.parseString(data.data, function (err, res) {
          if(res.DataTable["diffgr:diffgram"][0]) {
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]){
                arrData = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["set_Order_Seat"];
                array.push(arrData[0]);
              }
            }
          }
        });
        return new Promise((resolve, reject) => {
          resolve(array);
        });
      });
    }
    return response;
  }
}