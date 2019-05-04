import { Component, OnInit } from '@angular/core';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { Passenger } from 'src/app/models/passenger.model';
import { NavController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.page.html',
  styleUrls: ['./passenger-info.page.scss'],
})
export class PassengerInfoPage implements OnInit {

  passengersData: Passenger[] = [];
  totalAmount = 0;
  required: any =[];
  error: any;
  nextAgree: boolean = false;
  show: boolean = false;

  private profile: Profile;

  constructor(
    private passData: PassingDataService,
    private nav: NavController,
    private validator: ValidatorService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private profileService: ProfileService,
    private menuCtrl: MenuController
  ) {
    if (!this.afAuth.auth.currentUser) {
      this.menuCtrl.enable(false);
      this.nav.navigateRoot('/login');
    }
  }

  ngOnInit() {
    this.loadingData();
  }

  async loadingData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      translucent: true,
      message: '',
    });
    await loading.present();
    this.preparePassengers();
    loading.dismiss();
    this.show = true;
    this.useUserConfirm("Та өөрөө зорчих уу?", "Хувийн мэдээлэл хэрэглэх");
  }

  preparePassengers() {
    let selectedSeats: any = this.passData.getSelectedSeats();
    if (selectedSeats) {
      for (let i = 0; i < selectedSeats.length; i++) {
        this.required.push([]);
        this.passengersData.push({ seat_no: selectedSeats[i].seat_no, age: '1', name: '', register: '', incur: true });
      }
    } else {
      this.nav.navigateBack('/seats-select');
    }
  }

  calcAmountAge(i) {
    this.passengersData[i].totalAmount = 0;
    if (this.passengersData[i].age == "0") {
      //huuhed 0
      this.passengersData[i].amount = Number(this.passData.toStop.stop_data.big_childprice[0]);
      this.passengersData[i].incurAmount = Number(this.passData.toStop.stop_data.big_childinsurance[0]);
    } else {
      //tom hun 1
      this.passengersData[i].amount = Number(this.passData.toStop.stop_data.big_price[0]);
      this.passengersData[i].incurAmount = Number(this.passData.toStop.stop_data.big_insurance[0]);
    }
    this.passengersData[i].totalAmount += this.passengersData[i].amount;
    this.passengersData[i].totalAmount += this.passengersData[i].incur ? this.passengersData[i].incurAmount : 0;
    this.calcTotalAmout();
  }

  calcTotalAmout() {
    let total = 0;
    for (let i = 0; i < this.passengersData.length; i++) {
      total += this.passengersData[i].totalAmount;
    }
    this.totalAmount = total;
  }

  changeName(index) {
    var res = this.validator.validateName(this.passengersData[index].name);
    if (res == true) {
      this.required[index][0] = true;
    } else {
      this.required[index][0] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required, true) ? true : false;
  }

  changeRegister(index) {
    var res = this.validator.validateRegister(this.passengersData[index].register);
    if (res == true) {
      this.required[index][1] = true;
    } else {
      this.required[index][1] = false;
      this.error = res;
    }
    this.nextAgree = this.validator.checkRequired(this.required, true) ? true : false;
  }

  goToNextPage() {
    if (this.validator.checkRequired(this.required, true)) {
      this.passData.setPassengerAndTotal(this.passengersData, this.totalAmount);
      this.nav.navigateForward("/subscriber-info");
    }
  }

  closeErrorMsg() {
    this.error = "";
  }

  cancel() {
    this.nav.navigateBack("/time-table");
  }

  async useUserConfirm(massage: string, header?: string) {
    const alert = await this.alertController.create({
      header: header,
      message: massage,
      buttons: [
        {
          text: 'Үгүй',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Тийм',
          handler: () => {

            this.profileService.getProfile(this.afAuth.auth.currentUser.uid).subscribe((profile) => {
              this.profile = profile;
              this.passengersData[0].name = profile.firstName[0] + "." + profile.lastName;
              this.passengersData[0].register = profile.registerNumber;
              this.calcAmountAge(0);
              this.changeName(0);
              this.changeRegister(0);
            });

          }
        }
      ]
    });

    await alert.present();
  }
}
