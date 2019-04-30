import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.page.html',
  styleUrls: ['./stop-list.page.scss'],
})
export class StopListPage implements OnInit {

  stop_name: string;
  sourceStops: any;
  result: any;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.sourceStops = this.dataService.sourceStops;
    this.result = this.dataService.sourceStops;
  }

  onInput (e) {
    var search = e.target.value;
    if (!search) {
      this.result = this.sourceStops;
    } else {
      this.result = [];
      this.sourceStops.filter(data => {
        if (data.stop_name.trim().toLowerCase().includes(search.trim().toLowerCase())) {
          this.result.push(data);
        }
      });
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
}