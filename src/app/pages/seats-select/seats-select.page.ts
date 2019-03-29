import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { DataService } from '../../services/data.service';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { NavController } from '@ionic/angular';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'app-seats-select',
  templateUrl: './seats-select.page.html',
  styleUrls: ['./seats-select.page.scss'],
})
export class SeatsSelectPage implements OnInit {

  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  selectedSeats: Seat[];

  constructor(
    private dataService: DataService,
    private functionsService: FunctionsService,
    private nav: NavController,
    private passData: PassingDataService
  ) { 
    this.sourceStops = this.dataService.sourceStops;
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
  }

  changeBusSeat(e) {
    this.selectedSeats = e.selectedSeats;
  }

  goToNextPage() {
    this.passData.setSelectedSeats(this.selectedSeats);
    this.nav.navigateForward("/passenger-info");
  }
}
