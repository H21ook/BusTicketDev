import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-seats-select',
  templateUrl: './seats-select.page.html',
  styleUrls: ['./seats-select.page.scss'],
})
export class SeatsSelectPage implements OnInit {

  sourceStops: any = [];
  aimagData: any = []
  model: any = {};

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService
  ) { 
    this.sourceStops = this.dataService.sourceStops;
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
  }

}
