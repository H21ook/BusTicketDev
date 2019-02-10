import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goToSignUp() {
    this.navController.navigateForward('/sign-up');
  }
}
