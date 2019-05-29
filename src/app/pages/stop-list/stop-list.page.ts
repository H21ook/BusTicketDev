import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.page.html',
  styleUrls: ['./stop-list.page.scss'],
})
export class StopListPage implements OnInit {

  stop_name: string;
  sourceStops: any;
  result: any;
  displayList: any;

  readTarif: boolean = false;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private functionsService: FunctionsService,
    private loadingController: LoadingController,
    private apiService: ApiService,
    private modal: ModalController
  ) { 
    
  }

  ngOnInit() {
    this.sourceStops = this.functionsService.checkSourceStops(this.dataService.sourceStops);
    this.result = this.sourceStops;
    this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    if(this.readTarif) {
    } else {
      this.modal.dismiss();
    }
    
    this.apiService.readTarif.subscribe(data => {
        this.readTarif = data;
    });
  }


  onInput (e) {
    var search = e.target.value;
    if (!search) {
      this.result = this.sourceStops;
      this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    } else {
      this.result = [];
      this.sourceStops.filter(data => {
        if (data.stop_name.trim().toLowerCase().includes(search.trim().toLowerCase())) {
          this.result.push(data);
        }
      });
      this.displayList = Object.values(this.functionsService.groupByArray(this.result, "aimag_id"));
    }
  } 
  
  onClose (e) {
  } 

  selectItem(item) {
    this.modalCtrl.dismiss(item);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  
  // async loadingList() {
  //   const loading = await this.loadingController.create({
  //     spinner: 'bubbles',
  //     translucent: true,
  //     message: '',
  //     duration: 1000
  //   });
  //   await loading.present();
  // }
}
