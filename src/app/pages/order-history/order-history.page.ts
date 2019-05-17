import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParamMap.get('id');
   }

  ngOnInit() {
  }

}
