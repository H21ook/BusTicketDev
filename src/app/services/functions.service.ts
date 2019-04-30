import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private dataService: DataService
  ) { }

  groupBy(array, prop) {
    var arr = this.groupByStep1(array, prop);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = {
        id: arr[i][0].ss_A_id,
        name: arr[i][0].ss_A_name,
        data: arr[i]
      }
    }
    return arr;
  }

  groupByStep1(array, prop) {
    return Object.values(array.reduce(function (groups, currentValue) {
      const val = currentValue[prop]
      groups[val] = groups[val] || []
      groups[val].push(currentValue)
      return groups
    }, {}));
  }

  seatArrayFill(array, length) {
    let result: any = [];
    result.push({ seat_no: null, checked: null });
    let j = 0;
    for (let i = 1; i <= length; i++) {
      if (array[j].seat_no[0] != i) {
        result.push({ seat_no: i, checked: true, status: 1});
      } else {
        result.push({ seat_no: array[j].seat_no[0], checked: false, status: 0});
        j++;
      }
    }
    return result;
  }

  searchDistinations(start_stop) {
    let result = [];
    for(let tarifInfo of this.dataService.getTarif) {
      if(start_stop == tarifInfo.start_stop_id[0]) {
        result.push(tarifInfo);
      }
    }
    return result;
  }

  findDirection(start_stop, end_stop, stops) {
    for(let stop of stops) {
      if(start_stop == stop.start_stop_id && end_stop == stop.end_stop_id) {
        return stop;
      }
    }
  }

  uniqueAllStops(array: any[]) {
    let result = Array.from(new Set(array.map(element => element.stop_id[0])))
    .map(stop_id => {
      return {
        "stop_id": stop_id,
        "stop_name": array.find(data => data.stop_id == stop_id).stop_name[0],
        "aimag_id": array.find(data => data.stop_id == stop_id).aimag_id[0],
        // "aimag_name": array.find(data => data.stop_id == stop_id).aimag_name,
        "stop_data": array.find(data => data.stop_id == stop_id)
      }
    });
    return result;
  }
}
