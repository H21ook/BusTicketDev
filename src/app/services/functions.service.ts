import { Injectable } from '@angular/core';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

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
}
