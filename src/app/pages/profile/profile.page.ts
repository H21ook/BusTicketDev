import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NavController, PopoverController, LoadingController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import * as firebase from 'firebase';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { ActivatedRoute } from '@angular/router';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile : Profile;
  private avatarImage = null;
  private cameraOptions: CameraOptions;

  checkPhoto = false;
  required = [];
  error: any;
  status: string;
  isNew: boolean = false;
  editable: boolean = false;
  show: boolean = false;

  constructor(
    private popover: PopoverController,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private camera: Camera,
    private validator: ValidatorService,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private menuCtrl: MenuController
  ) {
    if(!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      navCtrl.navigateRoot('/login');
    } else {
      this.status = this.route.snapshot.paramMap.get('id');
      this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe(profile => {
        this.profile = profile;
      });
      this.loadingData();
    }

    this.cameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();

    if(!this.isNew) {
      this.changeFN();
      this.changeLN();
      this.changeRegN();
    } else {
      this.menuCtrl.enable(false);
    }
    if (this.profile.image != null)
      this.loadImage(this.profile.image)

    loading.dismiss();
    this.show = true;
  }

  ngOnInit() {
    if(this.status == "new") {
      this.isNew = true;
      this.editable = true;
    } else {
      this.isNew = false;
    }
  }

  changeFN() {
    var res = this.validator.validateName(this.profile.firstName);
    if (res == true) {
      this.required[0] = true;
    } else {
      this.required[0] = false;
      this.error = res;
    }
  }

  changeLN() {
    var res = this.validator.validateName(this.profile.lastName);
    if (res == true) {
      this.required[1] = true;
    } else {
      this.required[1] = false;
      this.error = res;
    }
  }

  changeRegN() {
    var res = this.validator.validateRegister(this.profile.registerNumber);
    if (res == true) {
      this.required[2] = true;
    } else {
      this.required[2] = false;
      this.error = res;
    }
  }

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }

  selectPhoto() {
    this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.avatarImage = 'data:image/jpeg;base64,' + imageData;
      this.checkPhoto = true;
    }, (err) => {
      console.log(err.message);
    });
  }

  takePhoto() {
    this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.avatarImage = 'data:image/jpeg;base64,' + imageData;
      this.checkPhoto = true;
    }, (err) => {
      console.log(err.message);
    });
  }

  saveProfileData() {
    if(this.editable) {
      if (this.validator.checkRequired(this.required)) {
        if (this.checkPhoto) {
          const picture = firebase.storage().ref('avatar/image' + this.afAuth.auth.currentUser.uid);
          picture.putString(this.avatarImage, 'data_url');
          this.profile.image = 'avatar/image' + this.afAuth.auth.currentUser.uid;
        }
        if(this.isNew) {
          try {
            this.profile.state = "old";
            this.profileService.updateProfile(this.profile);
            this.navCtrl.navigateRoot('/home');
          } catch(error){
            console.error(error);
          } 
        } else {
          try {
            this.profileService.updateProfile(this.profile);
          } catch(error){
            console.error(error);
            this.navCtrl.navigateRoot('/home');
          } 
          this.editable = false;
        } 
      }
    } else {
      this.editable = !this.editable;
    }
  }

  async openPopover(ev: Event) {
    const popover = await this.popover.create({
      component: UserMethodsPage,
      componentProps: {
        ev: ev
      },
      event: ev,
      mode: 'ios'
    });

    await popover.present();
  }

  logout() {
    this.authService.logOut().then((data) => {
        this.navCtrl.navigateRoot('/login');
      }, err => {
      console.log(err);
    }); 
  }
}
