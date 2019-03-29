import { Component, OnInit } from '@angular/core';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';

@Component({
  selector: 'app-warning-info',
  templateUrl: './warning-info.page.html',
  styleUrls: ['./warning-info.page.scss'],
})
export class WarningInfoPage implements OnInit {

  isAgree: boolean = false;
  constructor(
    private passData: PassingDataService
  ) { }

  ngOnInit() {
    console.log(this.passData.getOrderData());
  }

}
