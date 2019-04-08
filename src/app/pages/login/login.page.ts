import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Profile } from 'src/app/models/profile.model';
import { ValidatorService } from 'src/app/services/validator/validator.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  profileAFObser: AngularFireObject<Profile>;
  profileObser: Observable<Profile>;
  loginError: any = '';
  required = [];

  @ViewChild('errMsg', {read: ElementRef}) private errMsg: ElementRef;

  constructor(
    private navController: NavController,
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService,
    private validator: ValidatorService,
	private alertController: AlertController) { }

  ngOnInit() {
  }

  goToSignUp() {
    this.navController.navigateForward('/sign-up');
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  changeEmail() {
    console.log(this.user);
    var res = this.validator.validateEmail(this.user.email);
    if (res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.loginError = res;
    }
  }

  changePassword() {
    var res = this.validator.validatePassword(this.user.password);
    if (res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.loginError = res;
    }
  }

  closeErrorMsg() {
    this.loginError = "";
  }

  login() {
    // if (this.validator.checkRequired(this.required)) {
      this.loginError = '';
      this.user = {email: "tbeta40@gmail.com", password: "boomboom"};
      this.authService.login(this.user)
        .then(() => {
		  if(this.afAuth.auth.currentUser.emailVerified) {
			  this.profileAFObser = this.profileService.getProfile(this.afAuth.auth.currentUser.uid);
			  this.profileObser = this.profileAFObser.valueChanges();

			  this.profileObser.subscribe((profile) => {
				if (profile.state == "new")
				  this.navController.navigateRoot('/profile/new');
				else
          this.navController.navigateRoot('/home');
			  });
		  } else {
			  this.loginError = "Таны мэйл хаяг баталгаажаагүй байна! Мэйл хаягаа шалгана уу"
			  this.authService.logOut();
		  }
        }, error => {
          if (error === 'The email address is badly formatted.')
            this.loginError = "Имэйл хаяг буруу бүтэцтэй байна!";
          else if (error === 'There is no user record corresponding to this identifier. The user may have been deleted.')
            this.loginError = "Бүртгэлгүй хаяг байна!";
          else if (error === 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.')
            this.loginError = "Интернэт холболт салсан байна";
          else if (error === 'The password is invalid or the user does not have a password.' || 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later')
            this.loginError = "Нууц үг буруу байна!";
          else
            this.loginError = error;
        });
    // }
  }
  
  resetPassword() {
    this.changeEmail();
	  if(this.required[0]) {
		  this.loginError = '';
		  this.authService.resetPassword(this.user.email)
		  .then((data) => {
			  this.presentAlert("Таны " +this.user.email+  " хаягруу нууц үг сэргээх холбоосыг илгээсэн!","Нууц үг сэргээх");
			  console.log(data);
		  }, err => {
			  this.loginError = err;
		  });
	  }
  }
  
  async presentAlert(massage: string, header?:string, buttons?: string) {
    const alert = await this.alertController.create({
      header: header,
      message: massage,
      buttons: [buttons ? buttons : 'ХААХ']
    });

    await alert.present();
  }
}
