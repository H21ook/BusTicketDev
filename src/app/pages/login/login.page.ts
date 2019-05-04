import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user.model';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { trigger, animate, keyframes, transition, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('btn', [
      transition('true <=> false', [
        style({
          height: '{{height}}', 
          opacity: 0, 
          width: '{{width}}', 
          left: '{{left}}',
          top: '{{top}}'
        }),
        animate(300, keyframes([
          style({ opacity: 1, transform: ' scale(0)', offset: 0 }),
          style({ opacity: 1, transform: ' scale(1.5)', offset: 0.6 }),
          style({ opacity: 0, transform: ' scale(2.5)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class LoginPage implements OnInit {

  user: User = {
    email: "",
    password: ""
  };
  
  loginError: any = '';
  required = [];


  private rippleData: any = {}
  ripple: boolean = true;

  @ViewChild('errMsg', {read: ElementRef}) private errMsg: ElementRef;

  constructor(
    private navController: NavController,
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService,
    private validator: ValidatorService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

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

  async login(e) {
    this.rippleData = this.rippleEffect(e);
    this.ripple = !this.ripple;
      const loading = await this.loadingController.create({
        spinner: 'bubbles',
        translucent: false,
        message: ''
      });
      await loading.present();
    // if (this.validator.checkRequired(this.required)) {
      this.loginError = '';
      this.user = { email: "tbeta40@gmail.com", password: "H21ook97" };
      this.authService.login(this.user).then(() => {

        if(this.afAuth.auth.currentUser.emailVerified) {
          this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe(profile => {
            if (profile.state == "new")
              this.navController.navigateRoot('/profile/new');
            else {
              this.navController.navigateRoot('/home');
              loading.dismiss();
            }
          },err => {
            loading.dismiss();
            this.loginError = err;
          });
        } else {
          loading.dismiss();
          this.loginError = "Таны мэйл хаяг баталгаажаагүй байна! Мэйл хаягаа шалгана уу"
          this.authService.logOut();
        }
        
      }, error => {
        loading.dismiss();
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

  rippleEffect(e) {
    var x = Math.max(e.target.clientWidth - e.offsetX, e.offsetX);
    var y = Math.max(e.target.clientHeight - e.offsetY, e.offsetY);
    var l = Math.max(x, y);
    let param = {
      width: l +'px',
      height: l +'px',
      left: (e.offsetX - l/2) + "px",
      top: (e.offsetY - l/2) + "px"
    };
    return param;
  }
}
