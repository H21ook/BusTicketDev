import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  newtork: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
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

  groupByArray(array, key) {
    return array.reduce(function(element, x) {
      (element[x[key]] = element[x[key]] || []).push(x);
      return element;
    }, {});
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
      if (parseInt(array[j].seat_no) != i) {
        result.push({ seat_no: ""+i, checked: true, status: 1, disabled: true});
      } else {
        result.push({ seat_no: ""+array[j].seat_no, checked: false, status: 0, disabled: false});
        j++;
      }
    }
    return result;
  }

  sortByArray(array, property) {
    return array.slice(0).sort(function(a,b) {
        return (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : 0;
      });
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

  checkSourceStops(stops) {
    let result = []; 
    for(let stop of stops) {
      for(let tarifInfo of this.dataService.getTarif) {
        if(stop.stop_id == tarifInfo.start_stop_id) {
          result.push(stop);
          break;
        }
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
    var keys = Object.keys(array[0]);
    let result = Array.from(new Set(array.map(element => element.stop_id)))
    .map(stop_id => {

      let res: any = {};
      for(let key of keys) {
        res[key] = array.find(data => data.stop_id == stop_id)[key];
      }

      return res;
    });
    return result;
  }
  // uniqueAllStops1(array: any[]) {
  //   let result = Array.from(new Set(array.map(element => element.direction_id[0])))
  //   .map(direction_id => {
  //     return {
  //       "stop_id": direction_id,
  //       "stop_name": array.find(data => data.direction_id == direction_id).stop_name[0],
  //       "aimag_id": array.find(data => data.direction_id == direction_id).aimag_id[0],
  //       // "aimag_name": array.find(data => data.stop_id == stop_id).aimag_name,
  //       "stop_data": array.find(data => data.direction_id == direction_id)
  //     }
  //   });
  //   return result;
  // }



  convertDateByDispatcher(datas) {
    var dispatchers: any = [];
    for(let data of datas) {
      var dispatcher: any = {};

      if(!Array.isArray(data.id)) dispatcher.id = data.id;
      else dispatcher.id = data.id[0];

      if(!Array.isArray(data.distribution_id)) dispatcher.distribution_id = data.distribution_id;
      else dispatcher.distribution_id = data.distribution_id[0];

      if(!Array.isArray(data.direction_id)) dispatcher.direction_id = data.direction_id;
      else dispatcher.direction_id = data.direction_id[0];

      if(!Array.isArray(data.direction_name)) dispatcher.direction_name = data.direction_name;
      else dispatcher.direction_name = data.direction_name[0];
      
      if(!Array.isArray(data.direction_start_stop_id)) dispatcher.direction_start_stop_id = data.direction_start_stop_id;
      else dispatcher.direction_start_stop_id = data.direction_start_stop_id[0];

      if(!Array.isArray(data.direction_end_stop_id)) dispatcher.direction_end_stop_id = data.direction_end_stop_id;
      else dispatcher.direction_end_stop_id = data.direction_end_stop_id[0];

      if(!Array.isArray(data.company_id)) dispatcher.company_id = data.company_id;
      else dispatcher.company_id = data.company_id[0];

      if(!Array.isArray(data.company_name)) dispatcher.company_name = data.company_name;
      else dispatcher.company_name = data.company_name[0];

      if(!Array.isArray(data.car_id)) dispatcher.car_id = data.car_id;
      else dispatcher.car_id = data.car_id[0];

      if(!Array.isArray(data.car_number)) dispatcher.car_number = data.car_number;
      else dispatcher.car_number = data.car_number[0];

      if(!Array.isArray(data.car_type_id)) dispatcher.car_type_id = data.car_type_id;
      else dispatcher.car_type_id = data.car_type_id[0];

      if(!Array.isArray(data.car_type_name)) dispatcher.car_type_name = data.car_type_name;
      else dispatcher.car_type_name = data.car_type_name[0];

      if(!Array.isArray(data.driver_id)) dispatcher.driver_id = data.driver_id;
      else dispatcher.driver_id = data.driver_id[0];

      if(!Array.isArray(data.leave_date)) dispatcher.leave_date = data.leave_date;
      else dispatcher.leave_date = data.leave_date[0];

      if(!Array.isArray(data.is_rtrn)) dispatcher.is_rtrn = data.is_rtrn;
      else dispatcher.is_rtrn = data.is_rtrn[0];

      if(!Array.isArray(data.from_country)) dispatcher.from_country = data.from_country;
      else dispatcher.from_country = data.from_country[0];

      if(!Array.isArray(data.link_id)) dispatcher.link_id = data.link_id;
      else dispatcher.link_id = data.link_id[0];

      if(!Array.isArray(data.is_closed)) dispatcher.is_closed = data.is_closed;
      else dispatcher.is_closed = data.is_closed[0];

      if(!Array.isArray(data.is_actived)) dispatcher.is_actived = data.is_actived;
      else dispatcher.is_actived = data.is_actived[0];

      if(!Array.isArray(data.created_by)) dispatcher.created_by = data.created_by;
      else dispatcher.created_by = data.created_by[0];

      if(!Array.isArray(data.created_branch_id)) dispatcher.created_branch_id = data.created_branch_id;
      else dispatcher.created_branch_id = data.created_branch_id[0];

      if(!Array.isArray(data.created_firstname)) dispatcher.created_firstname = data.created_firstname;
      else dispatcher.created_firstname = data.created_firstname[0];

      if(!Array.isArray(data.created_at)) dispatcher.created_at = data.created_at;
      else dispatcher.created_at = data.created_at[0];

      if(!Array.isArray(data.company_is_country)) dispatcher.company_is_country = data.company_is_country;
      else dispatcher.company_is_country = data.company_is_country[0];

      if(!Array.isArray(data.is_added)) dispatcher.is_added = data.is_added;
      else dispatcher.is_added = data.is_added[0];

      if(!Array.isArray(data.direction_start_stop_name)) dispatcher.direction_start_stop_name = data.direction_start_stop_name;
      else dispatcher.direction_start_stop_name = data.direction_start_stop_name[0];

      if(!Array.isArray(data.direction_end_stop_name)) dispatcher.direction_end_stop_name = data.direction_end_stop_name;
      else dispatcher.direction_end_stop_name = data.direction_end_stop_name[0];

      if(!Array.isArray(data.sitcount)) dispatcher.sitcount = data.sitcount;
      else dispatcher.sitcount = data.sitcount[0];

      if(!Array.isArray(data.driver_name)) dispatcher.driver_name = data.driver_name;
      else dispatcher.driver_name = data.driver_name[0];

      if(!Array.isArray(data.model_name)) dispatcher.model_name = data.model_name;
      else dispatcher.model_name = data.model_name[0];

      if(!Array.isArray(data.register)) dispatcher.register = data.register;
      else dispatcher.register = data.register[0];

      if(!Array.isArray(data.aimag_id)) dispatcher.aimag_id = data.aimag_id;
      else dispatcher.aimag_id = data.aimag_id[0];

      if(!Array.isArray(data.phone)) dispatcher.phone = data.phone;
      else dispatcher.phone = data.phone[0];

      if(!Array.isArray(data.is_active)) dispatcher.is_active = data.is_active;
      else dispatcher.is_active = data.is_active[0];

      if(!Array.isArray(data.empty_seat_count)) dispatcher.empty_seat_count = data.empty_seat_count;
      else dispatcher.empty_seat_count = data.empty_seat_count[0];

      dispatchers.push(dispatcher);
    }
    return dispatchers;
  }

  convertAllStop(datas) {
    var stops: any = [];
    for(let data of datas) {
      var stop: any = {};

      if(!Array.isArray(data.id)) stop.id = data.id;
      else stop.id = data.id[0];

      if(!Array.isArray(data.direction_id)) stop.direction_id = data.direction_id;
      else stop.direction_id = data.direction_id[0];

      if(!Array.isArray(data.direction_name)) stop.direction_name = data.direction_name;
      else stop.direction_name = data.direction_name[0];
      
      if(!Array.isArray(data.direction_UX_eseh)) stop.direction_UX_eseh = data.direction_UX_eseh;
      else stop.direction_UX_eseh = data.direction_UX_eseh[0];

      if(!Array.isArray(data.stop_id)) stop.stop_id = data.stop_id;
      else stop.stop_id = data.stop_id[0];

      if(!Array.isArray(data.stop_name)) stop.stop_name = data.stop_name;
      else stop.stop_name = data.stop_name[0];

      if(!Array.isArray(data.stop_sequence)) stop.stop_sequence = data.stop_sequence;
      else stop.stop_sequence = data.stop_sequence[0];

      if(!Array.isArray(data.distance)) stop.distance = data.distance;
      else stop.distance = data.distance[0];

      if(!Array.isArray(data.big_move_time)) stop.big_move_time = data.big_move_time;
      else stop.big_move_time = data.big_move_time[0];

      if(!Array.isArray(data.big_stop_time)) stop.big_stop_time = data.big_stop_time;
      else stop.big_stop_time = data.big_stop_time[0];

      if(!Array.isArray(data.mid_move_time)) stop.mid_move_time = data.mid_move_time;
      else stop.mid_move_time = data.mid_move_time[0];

      if(!Array.isArray(data.mid_stop_time)) stop.mid_stop_time = data.mid_stop_time;
      else stop.mid_stop_time = data.mid_stop_time[0];

      if(!Array.isArray(data.lit_move_time)) stop.lit_move_time = data.lit_move_time;
      else stop.lit_move_time = data.lit_move_time[0];

      if(!Array.isArray(data.lit_stop_time)) stop.lit_stop_time = data.lit_stop_time;
      else stop.lit_stop_time = data.lit_stop_time[0];

      if(!Array.isArray(data.sit_move_time)) stop.sit_move_time = data.sit_move_time;
      else stop.sit_move_time = data.sit_move_time[0];

      if(!Array.isArray(data.sit_stop_time)) stop.sit_stop_time = data.sit_stop_time;
      else stop.sit_stop_time = data.sit_stop_time[0];

      if(!Array.isArray(data.is_motion)) stop.is_motion = data.is_motion;
      else stop.is_motion = data.is_motion[0];

      if(!Array.isArray(data.is_rtrn)) stop.is_rtrn = data.is_rtrn;
      else stop.is_rtrn = data.is_rtrn[0];

      if(!Array.isArray(data.aimag_id)) stop.aimag_id = data.aimag_id;
      else stop.aimag_id = data.aimag_id[0];

      if(!Array.isArray(data.lat)) stop.lat = data.lat;
      else stop.lat = data.lat[0];

      if(!Array.isArray(data.lon)) stop.lon = data.lon;
      else stop.lon = data.lon[0];

      stops.push(stop);
    }
    return stops;
  }

  convertTarif(datas) {
    var tarifs: any = [];
    for(let data of datas) {
      var tarif: any = {};

      if(!Array.isArray(data.id)) tarif.id = data.id;
      else tarif.id = data.id[0];

      if(!Array.isArray(data.direction_id)) tarif.direction_id = data.direction_id;
      else tarif.direction_id = data.direction_id[0];

      if(!Array.isArray(data.direction_name)) tarif.direction_name = data.direction_name;
      else tarif.direction_name = data.direction_name[0];
      
      if(!Array.isArray(data.direction_UX_eseh)) tarif.direction_UX_eseh = data.direction_UX_eseh;
      else tarif.direction_UX_eseh = data.direction_UX_eseh[0];

      if(!Array.isArray(data.start_stop_id)) tarif.start_stop_id = data.start_stop_id;
      else tarif.start_stop_id = data.start_stop_id[0];

      if(!Array.isArray(data.start_stop_name)) tarif.start_stop_name = data.start_stop_name;
      else tarif.start_stop_name = data.start_stop_name[0];

      if(!Array.isArray(data.end_stop_id)) tarif.end_stop_id = data.end_stop_id;
      else tarif.end_stop_id = data.end_stop_id[0];

      if(!Array.isArray(data.end_stop_name)) tarif.end_stop_name = data.end_stop_name;
      else tarif.end_stop_name = data.end_stop_name[0];

      if(!Array.isArray(data.big_price)) tarif.big_price = data.big_price;
      else tarif.big_price = data.big_price[0];

      if(!Array.isArray(data.big_childprice)) tarif.big_childprice = data.big_childprice;
      else tarif.big_childprice = data.big_childprice[0];

      if(!Array.isArray(data.big_insurance)) tarif.big_insurance = data.big_insurance;
      else tarif.big_insurance = data.big_insurance[0];

      if(!Array.isArray(data.big_childinsurance)) tarif.big_childinsurance = data.big_childinsurance;
      else tarif.big_childinsurance = data.big_childinsurance[0];

      if(!Array.isArray(data.is_rtrn)) tarif.is_rtrn = data.is_rtrn;
      else tarif.is_rtrn = data.is_rtrn[0];

      if(!Array.isArray(data.start_stop_sequence)) tarif.start_stop_sequence = data.start_stop_sequence;
      else tarif.start_stop_sequence = data.start_stop_sequence[0];

      if(!Array.isArray(data.end_stop_sequence)) tarif.end_stop_sequence = data.end_stop_sequence;
      else tarif.end_stop_sequence = data.end_stop_sequence[0];

      if(!Array.isArray(data.ticket_type_id)) tarif.ticket_type_id = data.ticket_type_id;
      else tarif.ticket_type_id = data.ticket_type_id[0];

      if(!Array.isArray(data.end_i_com_id)) tarif.end_i_com_id = data.end_i_com_id;
      else tarif.end_i_com_id = data.end_i_com_id[0];

      if(!Array.isArray(data.end_i_com_name)) tarif.end_i_com_name = data.end_i_com_name;
      else tarif.end_i_com_name = data.end_i_com_name[0];

      if(!Array.isArray(data.end_i_com_reg)) tarif.end_i_com_reg = data.end_i_com_reg;
      else tarif.end_i_com_reg = data.end_i_com_reg[0];

      if(!Array.isArray(data.end_stop_lat)) tarif.end_stop_lat = data.end_stop_lat;
      else tarif.end_stop_lat = data.end_stop_lat[0];

      if(!Array.isArray(data.end_stop_lon)) tarif.end_stop_lon = data.end_stop_lon;
      else tarif.end_stop_lon = data.end_stop_lon[0];

      if(!Array.isArray(data.start_stop_lat)) tarif.start_stop_lat = data.start_stop_lat;
      else tarif.start_stop_lat = data.start_stop_lat[0];

      if(!Array.isArray(data.start_stop_lon)) tarif.start_stop_lon = data.start_stop_lon;
      else tarif.start_stop_lon = data.start_stop_lon[0];

      if(!Array.isArray(data.aimag_id)) tarif.aimag_id = data.aimag_id;
      else tarif.aimag_id = data.aimag_id[0];

      if(!Array.isArray(data.start_stop_aimag_name)) tarif.start_stop_aimag_name = data.start_stop_aimag_name;
      else tarif.start_stop_aimag_name = data.start_stop_aimag_name[0];

      if(!Array.isArray(data.end_stop_aimag_id)) tarif.end_stop_aimag_id = data.end_stop_aimag_id;
      else tarif.end_stop_aimag_id = data.end_stop_aimag_id[0];

      if(!Array.isArray(data.end_stop_aimag_name)) tarif.end_stop_aimag_name = data.end_stop_aimag_name;
      else tarif.end_stop_aimag_name = data.end_stop_aimag_name[0];

      if(!Array.isArray(data.big_price_percent)) tarif.big_price_percent = data.big_price_percent;
      else tarif.big_price_percent = data.big_price_percent[0];

      if(!Array.isArray(data.mid_price_percent)) tarif.mid_price_percent = data.mid_price_percent;
      else tarif.mid_price_percent = data.mid_price_percent[0];

      if(!Array.isArray(data.lit_price_percent)) tarif.lit_price_percent = data.lit_price_percent;
      else tarif.lit_price_percent = data.lit_price_percent[0];

      if(!Array.isArray(data.sit_price_percent)) tarif.sit_price_percent = data.sit_price_percent;
      else tarif.sit_price_percent = data.sit_price_percent[0];

      if(!Array.isArray(data.Expr1)) tarif.Expr1 = data.Expr1;
      else tarif.Expr1 = data.Expr1[0];
      
      tarifs.push(tarif);
    }
    return tarifs;
  }

  convertSeat(datas) {
    var seats: any = [];
    for(let data of datas) {
      var seat: any = {};

      if(!Array.isArray(data.seat_no)) seat.seat_no = data.seat_no;
      else seat.seat_no = data.seat_no[0];

      seats.push(seat);
    }
    return seats;
  }
}
