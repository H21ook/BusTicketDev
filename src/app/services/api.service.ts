import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http) { }

  getSourceStops() {
    this.http.get("http://rest.transdep.mn:7879/Mobile/Service.asmx/get_Login?username=test&password=99002911").subscribe(data => {
      console.log(data);
    })
  }
}
