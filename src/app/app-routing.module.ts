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
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'time-table', loadChildren: './pages/time-table/time-table.module#TimeTablePageModule' },
  { path: 'seats-select', loadChildren: './pages/seats-select/seats-select.module#SeatsSelectPageModule' },
  { path: 'passenger-info', loadChildren: './pages/passenger-info/passenger-info.module#PassengerInfoPageModule' },
  { path: 'subscriber-info', loadChildren: './pages/subscriber-info/subscriber-info.module#SubscriberInfoPageModule' },
  { path: 'warning-info', loadChildren: './pages/warning-info/warning-info.module#WarningInfoPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
