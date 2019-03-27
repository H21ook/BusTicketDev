import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeatsSelectPage } from './seats-select.page';
import { BusComponentsModule } from '../../components/bus-components/bus-components.module';

const routes: Routes = [
  {
    path: '',
    component: SeatsSelectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BusComponentsModule
  ],
  declarations: [SeatsSelectPage]
})
export class SeatsSelectPageModule {}
