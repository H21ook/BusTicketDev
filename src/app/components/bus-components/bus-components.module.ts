import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BusSeatCheckboxComponent } from '../bus-seat/bus-seat-checkbox.component';
import { BusComponent } from '../bus/bus.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BusSeatCheckboxComponent, BusComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BusSeatCheckboxComponent, BusComponent]
})
export class BusComponentsModule { }
