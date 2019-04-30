import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistinationStopListPage } from './distination-stop-list.page';

const routes: Routes = [
  {
    path: '',
    component: DistinationStopListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistinationStopListPage]
})
export class DistinationStopListPageModule {}
