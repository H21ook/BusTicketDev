import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-distination-stop-list',
  templateUrl: './distination-stop-list.page.html',
  styleUrls: ['./distination-stop-list.page.scss'],
})
export class DistinationStopListPage implements OnInit {
  stop_name: string;
  distSourceStops: any;
  result: any;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.distSourceStops = this.dataService.distSourceStops;
    this.result = this.dataService.distSourceStops;
  }

  onInput (e) {
    var search = e.target.value;
    if (!search) {
      this.result = this.distSourceStops;
    } else {
      this.result = [];
      this.distSourceStops.filter(data => {
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
