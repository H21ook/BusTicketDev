import { Injectable } from '@angular/core';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { DataService } from './data.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private dataService: DataService,
    private apiService: ApiService
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
      if (array[j].seat_no != i) {
        result.push({ seat_no: i, checked: true, status: 1});
      } else {
        result.push({ seat_no: array[j].seat_no, checked: false, status: 0});
        j++;
      }
    }
    return result;
  }

  searchDistinations(start_stop) {
    let result = [];
    for(let tarifInfo of this.dataService.getTarif) {
      if(start_stop == tarifInfo.start_stop_id) {
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

  getTimeTableToday(dir_id) {
    let result = [];
    let date = new Date(); 
    for(let stop of this.apiService.getAllStop1) {
      let tmpBig, tmpLit, tmpMid;

      if(stop.big_move_time)
        tmpBig = new Date(stop.big_move_time);
      if(stop.lit_move_time)
        tmpLit = new Date(stop.big_move_time);
      if(stop.mid_move_time)
        tmpMid = new Date(stop.big_move_time);

      if(stop.direction_id == dir_id) {
        if(stop.big_move_time && (tmpBig.getDate() == date.getDate())) {
          result.push(stop);
        }
        if(stop.mid_move_time && (tmpMid.getDate() == date.getDate())) {
          result.push(stop);
        }
        if(stop.lit_move_time && (tmpLit.getDate() == date.getDate())) {
          result.push(stop);
        }
      }
    }
    for(let stop of this.apiService.getAllStop2) {
      let tmpBig, tmpLit, tmpMid;

      if(stop.big_move_time)
        tmpBig = new Date(stop.big_move_time);
      if(stop.lit_move_time)
        tmpLit = new Date(stop.big_move_time);
      if(stop.mid_move_time)
        tmpMid = new Date(stop.big_move_time);

      if(stop.direction_id == dir_id) {
        if(stop.big_move_time && (tmpBig.getDate() == date.getDate())) {
          result.push(stop);
        }
        if(stop.mid_move_time && (tmpMid.getDate() == date.getDate())) {
          result.push(stop);
        }
        if(stop.lit_move_time && (tmpLit.getDate() == date.getDate())) {
          result.push(stop);
        }
      }
    }
    return result;
  }

  getTimeTableWeek(dir_id) {
    let result = [];
    let date = new Date(); 
    for(let stop of this.apiService.getAllStop1) {
      let tmpBig, tmpLit, tmpMid;

      if(stop.big_move_time)
        tmpBig = new Date(stop.big_move_time);
      if(stop.lit_move_time)
        tmpLit = new Date(stop.big_move_time);
      if(stop.mid_move_time)
        tmpMid = new Date(stop.big_move_time);

      if(stop.direction_id == dir_id) {
        if(stop.big_move_time && (tmpBig.getDate() >= date.getDate() && tmpBig.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
        if(stop.mid_move_time && (tmpMid.getDate() >= date.getDate() && tmpMid.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
        if(stop.lit_move_time && (tmpLit.getDate() >= date.getDate() && tmpLit.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
      }
    }
    for(let stop of this.apiService.getAllStop2) {
      let tmpBig, tmpLit, tmpMid;

      if(stop.big_move_time)
        tmpBig = new Date(stop.big_move_time);
      if(stop.lit_move_time)
        tmpLit = new Date(stop.big_move_time);
      if(stop.mid_move_time)
        tmpMid = new Date(stop.big_move_time);

      if(stop.direction_id == dir_id) {
        if(stop.big_move_time && (tmpBig.getDate() >= date.getDate() && tmpBig.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
        if(stop.mid_move_time && (tmpMid.getDate() >= date.getDate() && tmpMid.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
        if(stop.lit_move_time && (tmpLit.getDate() >= date.getDate() && tmpLit.getDate() <= date.getDate() + 7)) {
          result.push(stop);
        }
      }
    }
    return result;
  }
}
