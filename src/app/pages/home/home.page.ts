import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { DataService } from '../../services/data.service';
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sourceStops: any = [];
  aimagData: any = []
  model: any = {};
  constructor(
    private popover: PopoverController,
    private dataService: DataService,
    private functionsService: FunctionsService
  ) {
    this.sourceStops = this.dataService.sourceStops;
  }

  ngOnInit() {
    this.aimagData = this.functionsService.groupBy(this.sourceStops, "ss_A_id");
  }

  async openPopover(ev: Event) {
    const popover = await this.popover.create({
      component: UserMethodsPage,
      componentProps: {
        ev: ev
      },
      event: ev,
      mode: 'ios'
    });

    await popover.present();
  }


}
