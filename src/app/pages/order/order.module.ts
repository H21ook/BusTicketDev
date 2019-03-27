import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { OrderPage } from './order.page';
import { BusComponentsModule } from '../../components/bus-components/bus-components.module';

@NgModule({
  imports: [
    BusComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderPage
      }
    ])
  ],
  declarations: [OrderPage]
})
export class OrderPageModule { }
