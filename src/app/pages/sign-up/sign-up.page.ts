import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { trigger, animate, keyframes, transition, style } from '@angular/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
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
export class SignUpPage implements OnInit {

  user: User = {
    email: "",
    password: ""
  };
  profile: Profile = {};

  required = [];
  error: any; 

  private rippleData: any = {}
  ripple: boolean = true;

  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private validator: ValidatorService,
    private alertController: AlertController,
    private afAuth: AngularFireAuth
  ) { 
  }

  ngOnInit() {
    this.user.email = "";
    this.user.password = "";
  }

  changeEmail() {
    var res =  this.validator.validateEmail(this.user.email);
    if(res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
  }

  changePassword() {
    var res =  this.validator.validatePassword(this.user.password);
    if(res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.error = res;
    }
  }

  changePassword2() {
    var res =  this.validator.matchPassword(this.user.password, this.user.password2);
    if(res == true) {
      this.required[2] = true;
    } else {
      this.required[2] = false;
      this.error = res;
    }
    console.log("password match", res);
  }

  closeErrorMsg() {
    this.error = "";
  }

  register(e) {
    this.rippleData = this.rippleEffect(e);
    this.ripple = !this.ripple;
    if(this.validator.checkRequired(this.required)) {
      this.error = "";
      this.authService.register(this.user)
      .then(() => {
        this.profile.id = this.afAuth.auth.currentUser.uid;
        this.profile.email = this.user.email;
        this.profile.sex = '1';
        this.profile.state = 'new';
        this.profileService.createProfile(this.profile);
		    this.verificationEmail();
      },
      error=>{
        console.log(error);
      });
    }
  }
  
  verificationEmail() {
    if (this.required[0]) {
      this.error = '';
      this.required = [];
      this.authService.verificationEmail().then(() => {
        this.presentAlert("Таны " + this.user.email + " хаягруу бүртгэл баталгаажуулах холбоос илгээсэн. Таны бүртгэл баталгаажсан үед нэвтрэх эрх нээгдэхийг анхаарна уу!", "Бүртгэл баталгаажуулах");
        this.user = null;
      }, err => {
        this.authService.deleteUser().then(() => {
          this.profileService.deleteProfile(this.afAuth.auth.currentUser.uid);
        });
      });
    }
  }
  
  async presentAlert(massage: string, header?:string, buttons?: string) {
    const alert = await this.alertController.create({
      header: header,
      message: massage,
      buttons: [ 
        {
          text: buttons ? buttons : 'ХААХ',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
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
