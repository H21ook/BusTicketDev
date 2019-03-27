import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(
    private navController: NavController,
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService,
    private validator: ValidatorService) { }

  ngOnInit() {
  }

  goToSignUp() {
    this.navController.navigateForward('/sign-up');
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  changeEmail() {
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
    if (this.validator.checkRequired(this.required)) {
      this.loginError = '';
      // this.user={ email: "tbeta40@gmail.com", password:"12345678"};
      this.authService.login(this.user)
        .then(() => {
          this.profileAFObser = this.profileService.getProfile(this.afAuth.auth.currentUser.uid);
          this.profileObser = this.profileAFObser.valueChanges();

          this.profileObser.subscribe((profile) => {
            if (profile.state == "new")
              this.navController.navigateRoot('/home');
            else
              this.navController.navigateRoot('/home');
          });
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
    }
  }
}
