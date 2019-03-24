import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'time-table', loadChildren: './time-table/time-table.module#TimeTablePageModule' },  { path: 'seats-select', loadChildren: './seats-select/seats-select.module#SeatsSelectPageModule' },
  { path: 'passenger-info', loadChildren: './passenger-info/passenger-info.module#PassengerInfoPageModule' },
  { path: 'subscriber-info', loadChildren: './subscriber-info/subscriber-info.module#SubscriberInfoPageModule' },
  { path: 'warning-info', loadChildren: './warning-info/warning-info.module#WarningInfoPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
