import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderHisttoryPage } from './order-histtory.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHisttoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderHisttoryPage]
})
export class OrderHisttoryPageModule {}
