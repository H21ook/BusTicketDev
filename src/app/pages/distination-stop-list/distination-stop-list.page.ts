import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-distination-stop-list',
  templateUrl: './distination-stop-list.page.html',
  styleUrls: ['./distination-stop-list.page.scss'],
})
export class DistinationStopListPage implements OnInit {
  stop_name: string;
  distSourceStops: any;
  result: any;
  displayList: any;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private functionsService: FunctionsService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.distSourceStops = this.dataService.distSourceStops;
    this.result = this.distSourceStops;
    this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    this.loadingList();
  }

  onInput (e) {
    var search = e.target.value;
    if (!search) {
      this.result = this.distSourceStops;
      this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    } else {
      this.result = [];
      this.distSourceStops.filter(data => {
        if (data.stop_name.trim().toLowerCase().includes(search.trim().toLowerCase())) {
          this.result.push(data);
        }
      });
      this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    }
  } 
  
  onClose (e) {
    console.log("CLOSE", e);
  } 

  selectItem(item) {
    this.modalCtrl.dismiss(item);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async loadingList() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
      duration: 1000
    });
    await loading.present();
  }
}
