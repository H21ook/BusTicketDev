import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private latinLetters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  private mnLetters = "ФЦУЖЭНГШҮЗКЪЕЩЙЫБӨАХРОЛДПЯЧЁСМИТЬВЮфцужэнгшүзкъещйыбөахролдпячёсмитьвю";
  private nameSymbol = ".-";
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

  checkRequired(controls: any, is2D?:boolean) {
    if(is2D){
      for(let i = 0; i < controls.length; i++) {
        for(let j = 0; j < controls[i].length; j++) {
          if(controls[i][j] != true || controls[i][j] == null || controls[i][j] == undefined)
            return false;
        }
      }
    } else {
      for(let i = 0; i < controls.length; i++) {
        if(controls[i] != true)
          return false;
      }
    }
    return true;
  }

  validateName(name : string) : any  {
    let errIndex = -1;
    let errMsg = '';
    if(name.length > 1 && name.length < 36) {
      for(let j = 0; j < name.length; j++) {
        let step1 = false, step2 = false, step3 = false;
        for(let i = 0; i < this.latinLetters.length; i++) {
          if(name[j] == this.latinLetters[i]) {
            step1 = true;
          } else {
            step1 = false;
            break;
          }
        }
        // if(step1 == false) {
        //   errMsg = "Зөвхөн крилл үсэг хэрэглэнэ үү!";
        //   break;
        // }
        for(let i = 0; i < this.mnLetters.length; i++) {
          if(name[j] == this.mnLetters[i]) {
            step2 = true;
            break;
          }
        }
        if(step2 == true) {
          continue;
        }
        for(let i = 0; i < this.nameSymbol.length; i++) {
          if(name[j] == this.nameSymbol[i]) {
            step3 = true;
            break;
          }
        }
        if(step3 == false) {
          errIndex = j;
          break;
        }
      }
      if(errIndex > -1) {
        if(name[errIndex] == ' ') 
          errMsg = "Нэрэнд хоосон зай ашиглаж болохгүй";
        else
          errMsg = "Нэрэнд \"" +name[errIndex]+ "\" тэмдэгт ашиглаж болохгүй";
      }
    } else {
      errMsg = "Нэрний урт 2-35 тэмдэгт байх ёстой!"
    }
    return errMsg ? errMsg : true;
  } 
  
  validateRegister(register : string) : any  {
    if(register.length == 10)
      return true;
    return "Регистерын урт 10 тэмдэгт байх ёстой!";
  }

  validatePhoneNumber(phone : string) : any  {
    let result: any;
    if(phone.toString().length < 9 && phone.toString().length > 5) {
      if(/^[0-9]{6,8}$/.test(phone))
        result = true;
      else
        result = "Утасны дугаарт зөвхөн тоо ашиглана уу!";
    } else {
      result = "Утасны дугаарын урт 6-8 тэмдэгт байх ёстой!";
    }
    return result;
  }
}
