import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validateEmail(mail : string) : any {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return true;
    return "Имэйл хаягийн бүтэц буруу байна!";
  }

  validatePassword(pass : string) : any  {
    if(/^\w{8,35}$/.test(pass))
      return true;
    return "Нууц үгийн урт 8-35 тэмдэгт байх ёстой!";
  }

  matchPassword(pass : string, pass2 : string) : any {
    if(pass == pass2)
      return true;
    return "Давтах нууц үг таарахгүй байна!";
  }

  checkRequired(controls: Array<boolean>) {
    for(let i = 0; i < controls.length; i++) {
      if(controls[i] != true)
        return false;
    }
    return true;
  }
}
