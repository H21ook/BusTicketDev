import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private popover: PopoverController) {

  }

  ngOnInit() {
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

  aimag: any = [
    {
      id: 1,
      name: "Архангай"
    },
    {
      id: 2,
      name: "Булган"
    },
    {
      id: 3,
      name: "Говь-Алтай"
    },
    {
      id: 4,
      name: "Дорнод"
    },
    {
      id: 5,
      name: "Зүүн хараа"
    },
    {
      id: 6,
      name: "Булган"
    },
    {
      id: 7,
      name: "Орхон"
    },
    {
      id: 8,
      name: "Өмнө-Говь"
    }
  ]
}
