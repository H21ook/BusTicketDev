import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import * as xml2js  from 'xml2js'
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  dateByDispatcherData: any = [];
  
  constructor(
    private http:HTTP,
    private functionsService: FunctionsService
  ) { }

  getToday(dir) {
    let date = new Date();
    let start = date.toISOString().toString().substring(0,10);
    let date2 = new  Date();
    date2.setDate(date.getDate() + 1);
    let end = date2.toISOString().toString().substring(0,10);

    let param = {};
    let headers = {};
    let url = "http://rest.transdep.mn:7879/GeregeTest/Web_service.asmx/get_Date_by_Dispatchers?id_direction=" + dir + "&start=" + start + "&end=" + end;
    return this.http.get(url, {}, {});
  }

  getWeek(dir) {
    let date = new Date();
    let start = date.toISOString().toString().substring(0,10);
    let date2 = new  Date();
    date2.setDate(date.getDate() + 7);
    let end = date2.toISOString().toString().substring(0,10);
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
          console.log("ARR LEN:", array.length);
        });

        return new Promise((resolve, reject) => {
          resolve(array);
        });
      });
    }
    return response;
  }

  async getWeekTimeTable(dirs) {
    let array:any = [];
    let result;
    let response;

    for(let j = 0; j < dirs.length; j++) {
      response = await this.getWeek(dirs[j]).then(data => {

        xml2js.parseString(data.data, function (err, res) {
          if(res.DataTable["diffgr:diffgram"][0]) {
            if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]) {
                result = res.DataTable["diffgr:diffgram"][0]["DocumentElement"][0]["get_Date_by_Dispatchers"];
                array = array.concat(result);
              }
            }
          }
          console.log("ARR LEN:", array.length);
        });

        return new Promise((resolve, reject) => {
          resolve(array);
        });
      });
    }
    return response;
  }
  
  getDateDispatcher(directions, end_id) {
    let result = [];  
    for(let j = 0; j < directions.length; j++) {
      for(let i = 0; i < this.dateByDispatcherData.length; i++) {
        if(directions[j] == this.dateByDispatcherData[i].direction_id && end_id == this.dateByDispatcherData[i].direction_end_stop_id) {
          result.push(this.dateByDispatcherData[i]);
        }
      }
    }
    return result;
  }

  getDistData(dists) {
    let result: any = {};
    let directions: any = [];
    let distSourceStop:any = [];
    if(dists && dists.length >= 1) {
      for(let i = 0; i < dists.length; i++) {
        let tempData = {
          ss_A_id: dists[i].end_stop_aimag_id, 
          ss_A_name: dists[i].end_stop_aimag_name,
          ss_id: dists[i].end_stop_id,
          ss_name: dists[i].end_stop_name,
          orig_data: dists[i],
          dispatcher: null
        }
        if(i == 0){
          distSourceStop.push(tempData);
          directions.push(dists[i].direction_id);
        } else {
          let check = false;
          for(let j = 0; j < distSourceStop.length; j++) {
            if(distSourceStop[j].ss_id == dists[i].end_stop_id ) {
              check = false;
              if(distSourceStop[j].orig_data.direction_id != dists[i].directio_id) {
                directions.push(dists[i].direction_id);
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
    result.directions = directions;
    result.distSourceStop = distSourceStop;
    console.log(result);
    return result;
  }


  async getEmptySeats(dispatcher_id) {
    let array:any = [];
    let result;
    let response;

    response = await this.getSeat(dispatcher_id).then(data => {

      xml2js.parseString(data.data, function (err, res) {
        if(res.DataTable["diffgr:diffgram"][0]) {
          if(res.DataTable["diffgr:diffgram"][0]["DocumentElement"]){
              result = res.DataTable["diffgr:diffgram"][0]["DocumentElement"];
              array = array.concat(result);
          }
        }
        console.log("ARR LEN:", array.length);
      });

      return new Promise((resolve, reject) => {
        resolve(array);
      });
    });
    return response;
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
  
  getAllStopsData() {
    return this.getAllStops().then(data => {
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
      return new Promise((resolve, reject) => {
        resolve(this.functionsService.uniqueAllStops(arrData));
      });
    })
  }
}