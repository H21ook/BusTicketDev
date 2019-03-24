import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PassengerInfoPage } from './passenger-info.page';

const routes: Routes = [
  {
    path: '',
    component: PassengerInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PassengerInfoPage]
})
export class PassengerInfoPageModule {}
