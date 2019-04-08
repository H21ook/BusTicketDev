import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user = {} as User;
  profile = {} as Profile;
  password2: any;
  required = [];
  error: any; 

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
  }

  changeEmail() {
    var res =  this.validator.validateEmail(this.user.email);
    if(res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
    console.log("email", res);
  }

  changePassword() {
    var res =  this.validator.validatePassword(this.user.password);
    if(res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.error = res;
    }
    console.log("passwords", this.error);
    console.log("password", res);
  }

  changePassword2() {
    var res =  this.validator.matchPassword(this.user.password, this.password2);
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

  register() {
    if(this.validator.checkRequired(this.required)) {
      this.error = "";
      this.authService.register(this.user)
      .then(() =>{
		this.verificationEmail();
        this.profile.email = this.user.email;
        this.profile.sex = '1';
        this.profile.state = 'new';
        this.profileService.setProfile(this.profile);
        console.log("Amjilttai");
      },
      error=>{
        console.log(error);
      });
      this.navCtrl.navigateRoot('/login');
    }
  }
  
  verificationEmail() {
	  if(this.required[0]) {
		  this.error = '';
		  this.authService.login(this.user)
		  .then((data) => {
			  console.log(data);
			  this.authService.verificationEmail().then((data1) => {
				  console.log(data1);
				this.presentAlert("Таны " +this.user.email+  " хаягруу бүртгэл баталгаажуулах холбоос илгээсэн. Таны бүртгэл баталгаажсан үед нэвтрэх эрх нээгдэхийг анхаарна уу!","Бүртгэл баталгаажуулах");
				
				this.authService.logOut().then(() => {
					this.navCtrl.navigateRoot('/login');
				}); 
			  },err => {
				var uid = this.afAuth.auth.currentUser;
				this.authService.deleteUser().then(() => {
					
				});
			  });
		  }, err => {
			  this.error = err;
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
