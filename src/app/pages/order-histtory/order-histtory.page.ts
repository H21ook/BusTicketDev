import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-histtory',
  templateUrl: './order-histtory.page.html',
  styleUrls: ['./order-histtory.page.scss'],
})
export class OrderHisttoryPage implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParamMap.get('id');
   }

  ngOnInit() {
  }

}
