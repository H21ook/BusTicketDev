import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { UserMethodsPage } from '../user-methods/user-methods.page';
import { PassingDataService } from 'src/app/services/passing-data/passing-data.service';
import { Order } from 'src/app/models/order.model';
import { Passenger } from 'src/app/models/passenger.model';
import { trigger, animate, keyframes, transition, style } from '@angular/animations';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
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
export class PaymentPage implements OnInit {
  directionInfo : any = {};
  orderData: Order;
  leaveDate: string;
  peopleNum: any = {
    child: 0,
    people: 0
  };
  orderNum: any;
  qrCode: any = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAXq0lEQVR4Xu1de8w9VXVdaDU+aBWMWkvRAiGCb43Io6W1DZr4TG1QJAEToyaIIZqof6g1lVYjsU2q0FiDLa2YiGjUYH2ENqnQaotG8a1gROMDQQSpCJGGGpr1u9+Pme98e82cPffMvff7fWv/OXfPmZk1Z919zp79OAjA3dgdcg6Av2twq68AcGEwzocBvCg4/kwAlze4rhrifwHcr9H43wFwdDDW8QC+EBz/NwCnNLp2NMxbAbw5+IHv8vwZr9ts6INMkHuwNEGaTat7BjJB2mMqR7QFGQfbFmQco5SGLUgHly1IaupUKduCVMHURskWZBxHW5BxjFIatiC2IN6kD1BmiCAPBvCLFN3aKL8fwBnC8xF5sWjG3xTo/w2A1wfHs14s9VT0DF3V5pHlKPRu0cu1rNCDdVwwCD109GSVwuXmqQK7f1j2ZgAoLxbf/UsajJ8dgnP91ugkE2TcgpggHQL8czFBtvCwBRn+H7IFyf5Pd/q2INOxg5dYHXheYi0xkRKneonVA8t7kA4M70EWWJggJog36QMWpSlBfgDgkQnzpVSfD+Bfgh+zS6wGtzI4RDYWi98iHh2M+NsAbgiOT4nF+imAhyUevFUs1ro26ZwrlyWeV6ly7v5e8KMJsgS4Jsj6vVgmSG8C24KMs9kWZByjSMMWZBpuXmJV4uYlVg8o9R3Ee5Dh2eQ9yDjbst9BvMTyEmt8VvU0vMRKwXWP8p5cYr0MwJnT8Np21mcAnBuMozbp3wZwdqD/kK1Yo/Kn+wI4MenF+lcAPK+UkwDcJzhOHH4cHOfS6LDg+MUAvpfA7lrhiUsMsU/VFqQCsVZuXhWsWHEL21Sy+SAMAKT7tBS6eK9JXHzIzcvfIoKo4XltLvFKyQYrJm5/kqoJUgGbCbIAyQTpJouK5vUepEeorJvXFqQDzxZk+J95T+5BTBATpGLBsk/FBKlFKtDzHmQJ8JKneg9SAVirPcgRAB4VXO80AGcFxz8JgNmGpdwE4FvB8UMAPDE4fhuAq4Pj9xeb90MBfCTQZ12y/xB4/SEAJrWV8mciA44Tj160Ut4L4Prg+FfFOG8B8PSKdzimQi/ZRYGSCTKGHIBWBFGXYrrtO4IfmRFHt+eqRQUrTrkPjsVvIaVkizaoa6uU2+y9ZquaeJPeQ9gEyU63Tt8EmYbdntyD2IJ0CNiCDBPHBOnh4yVWB4bKB/ESa4HAnswHMUFMkPIPYCUW5IRG1ci/DuCW4C8s+6FQxWIdDuDIxCadXht6b2qFHq8oFkudz5ARxlC1kNcBODgY6AKBqYrFUvfyIeHRU/qvFJXxW23S6Zl7fAPg7hS1zJpakAb3OThEliDZD4XKi8XWB5cmHk7FYiWGmKyqonmzX9LVDRALerJqhW7z1wbKrQhSex9T9UyQHnImyPg0MkG2MDqQKyuqaWCCmCAlArYgtiBh2R8vsRYImCAmiAkyYDgnEeSzAH49bo2baxwD4OHBqKo/iNqkc8P9nmCcp2yFuZQ/fVNsTJ8K4K+DcdQmnd4zOhpK+TkAxlCVQu8WMwcjeQaAu4IfWm3S6Q37UjD+CwE8NjhOHBjLVkqrTTqfK5Ns1mry/QaA348GOxD6g8zd/kCl3GYzCvnyGSJSCuvv/kq8aVWbtxVBWpUebUWQVhO+2TgmSAfl3OHuJkiHtbvcNqPwdlDX0UDHFqR7B6ouli3IDBM+O2R2D9Kqw5QJYoJk5+pa9E2QDnbvQVY0BbkHycQfrei2wst8CgA3xqX8CQBm3tUKvVjPC5QZW5UJr2D9qagdmSr7s4o9CJegUXwbl0a/EzwzvW2Zuli1GO/XuxIA642V8jQAz84Otg79KJ1zHfcxxzVVNG/2WmxyyWVWrayTILX3OKanQk34h8Dg0FKIdZTGPHadjf/dBBl/RSZIh5EJMj5fdo2GLcj0V2ULsoWdLcj4JLIFsQUZnyW7UMMWZPpLswXpWZB1ebE+IAotv0DUocq+bmbvMZapFNayinojMvbo1EA/a0FUdffbxUZ2KNSEYTRRPBxjqB4Y3GsrL5bKKGQlGnoBS2Es2X8Fx+ldpJexlM8D+HRwnPXH+P5LYVX5S4LjrIf20uD4jSIOj0GJrwn0mWl4XjTB1hlqki37kyWI0s/mg2QJkr3PIYJkx8pmFKpYrOx1lf6bAfylIDK/a5XyEgDvC47zD43zpZQ/AnBFcPxr4k+WDTy/H+j/YivkfcdPJkgHiUq5NUGm08UEmY5durLiEpfadqotSAeHLcgCC1uQHkVMEBOk/LM1QUyQMKPQFqTCgmS9WPQCPKjBeodeiahdWIOhD5gh/hzAvYOnYVjHHbvgKenF+uPgPhlTp7xYf9pgk864tyiblF6sVwfjs8uX9GJlcW7VBlpdl56MKGU1e59Kn4F7FwY/ZhOmWt3PlBZsrYpX0wFxSqsHmXGcrBer2a1M+ZJugjSDf99AJsg4niZIDyNbkA4M1eXWFmSBkfoOMk65Sg1bkA4oL7EqJ80a1GxBbEHCaWcLsoBlrQRRXqy3b62PyzdHLxa9AbXCWJlH1ioD+BgAhgqUks0o/BwAbkJLyW7SjwJwZjDOYQBenngupcpYK8Zc7Wahu/jE4AHYe1FlFD4r0Od75/svRcViZZdY/N7xzgzQq6jNS5BOztyU0F1XTrq6dTaluarBcw0Nsa66WNnHalXVRPUoVPeTJYjqDyKf1wTpoFF7EBNknC4myDhGUsMWZDp4tiDD2NmC9PDxEqsDY+6yP1lK24JkEevp24JMB88WZIMtyHMbxfu8C8ATguf8hqjhpCDhOJGHI1u8+jkAmI5bCr0t5wbHDxHJN8cCeHegz0LUUf0uVnGPPD13A+CfSCSquvtHARwanHAGANbrKoX3c1xwXFV3V++A3qQbgh/Zo/C04PjFAC4KjjNrMIqJuhwAvae1wgxEzotSmG3JqvylqE06q7v/QXTRTUyYqgVnv16WINnxVelRNQ4DMJnZVwq/fkeTayjUJHuvSl8RJDu+qs2bHWdufRLnKwmCTOoPMvdDqJTb7HVNkHHETJAFRk3bQI/DvpyGCbLAzxZkuXkUnW0L0kPFFmR8gtmC2ILsmCWq/cH4dNqu4T1Ih4f3INnZ09P/YtLrpepiZW9BVXdXsVhq/JsAsMJ7KYogvwTAGlul3AwgavRDr9NHAv2hJRYz8u6VAIT1pqJ2bsqCMPbp1sT4qkdhYohJqqw19vjEmexxSc9aKayX9eLg+MEAPhGN39KLxXVfFGSonosRmnQlLyssLRMF+2UrK2bD3bM9CtVzTkmYUmNtWl2sZd/t/vO5X70sMZiqi5UYYqFqgnSQmSDp6bOyE0yQJaC2BenAswVZYGEL0iOUCWKClP+vJogJEtpcW5ANsCBMEuLGspS/B8Ao01K+vFXasTyuNunXiHHUKuzfRSwTY4POCk5iuEdUj0vFYjGmJ2ovRo/X2cH4h4uyRSoW666BFm+si8U4oVq5YKBHITMgS2Gs1Jw9Cmvve0yPxD89UGJ9ticFx69rlO05aZPOCtn8ZB+ZtcgVx5j9KBhPESRb1UR9KFSgq9KjYy9p2d9VLNbQuCqaV51D4h8d/MjsxyiA0nWxRt7qFC+WCTKNKibINNx41lqLNjDcOiMmSAatTtcEmYabCVLg5iVWB4iXWAssbEF6JDFBTJDS1qyVIFELK94gM6yiyuKMZYm8Vf8I4MjAijJzLApBoVciSixitlwmZIWN7ZlJVytqk/5QAOxTWCu3iVgsdT5jsfhsGfkr0aOQcWb0fpXCsjn0opVCbx69g6XQOxdl3j0GAPEohU6AKOlLPRN7CHJJXsr1AL4bHGcM1THBcUWQbEYhva+pUk1DpUdZZOu3Mm8zqbtbehSqx1KxWEkYBtWzlRVbXZthN1FD02w079wt2NTzZvNBJG4mSAeN6lFognQImCC92WALMvx/bAsybq9sQcYxkhpeYo2D5yXWAiO1B/ESa3wOpTWyTTy9xPISK5wDXmJ5iVUi4D1IxR5kt3xJVznpqv2BogPjlZh2Wyt0XUcuVbrG+TW9FH4MjNJkqZf9UFh7j/v1VCwWHRb0ZJVC60u3+lySre7eaok1WBdLXURZEBNkeHqYINPpY4L0sJs7mtcWZHyi2oIsMLIF6c0VL7E6MEwQE2TH36gJYoKUk8IWxBYkXG/ZgixhQdQKltmEmaacKqNQjc+NWib4cHylvZxG1ou13NW2n60+FKprOCd9gUzTog3ZF2qCZBGbrm+CLLBba12s7OszQbKITdc3QUyQHbPHS6wOEhPEBDFBBgyMCWKCmCAmyOgadK17EFXVhL5hhpvUCj0HmRL1alyVk86WAq8KTlKlR2vve0wv2x9kbLzy95YdpvZaXaws1gyT+n7mpKG6WCbIAkkTJDOj5tHN5oOouzBBZng/JsgMoCaHNEF6gHmJlZw9PXUvsYaxswWZPrfkmbYgM4CaHNIWxBYkOWVidVuQDbAg6kt6tkehepTsh8K5G+io+2TF9FQRMjFQSy9WlmXZ6u57MuU26+Y1QRbT0AQZp+MBUfbHBFm8aNXE0xakQ8AWpDcb1HcQWxBbkHHbsdCwBekh5T1I7bTZruc9SIcHXfzvC2DMerGa1ub1EstLrFpq78kl1tMFOv8pSu9nl1jvAkBG10q2/QFja6KeiWwDcFTtRQHcBICNOUtRTTx/E8BTAv0fAeA/Ya2wSSebdUbyDNHmoHbsMT3lxXoLgCuDkxk0GD0zG7heGuiz/cERwfEfi/YHyoLcAuAbwThfAfCa4HhTCzIGYvl7liBs4Hly4iLZBjqJoSepZj8U8ltE1PdEXfxAKBz3etEJOAu4Iogah3OLKd2lmCBZ5JfQN0E68FRlRROkN8FsQYbZZgsy/d/IFqQCOy+xOpB2S21eWxBbkApqL1RsQaqh2qG4qyzIJwAcHDzr34pMw1cCYBPGUv5JeJkUjC9Ier3YPJTxW6WcBoD3VAqfi3V7a0XtQb4N4OxgkIcAOKd2cAD3GnBicBOa7WOfuDQuBvC94IRvAvhZcJzOh0cEx68DQO/dssL5c2wwyEkA3hYcZ8YrPVml3AjgPcHxO7Pxc1N6FLaq7q7AnDtYUTXQUfejCKJasKnq7stOnjnO57PR1bvpstacdAXO3O0PTJD1T0sTZOQd2IKMT1JbkHGM5tawBekh7CXW3NOtG98WxBZkBwLeg5gg1X9BXGJdIbTfDoCRpqUw9oWh8KUwZumBwXF6GaL6Wm8A8N+B/jGil596qGws1k+2XLG1IB0ivGq3Abg6GOT+W8lUteO31KP1/d1gQHrzor6JXwVwa6DPWCwVo9fyfmvHuhbAJbXKAG4H8MVAnz0iP5gYB1PqYmWLV6v7UX3SM/dv3e0IZHPSFX5MHjt1g8DNhrurW19JVRMTZINmTnErJsjwuzFBNnfuruTOTBATZCUTbbdexAQxQXbr3F3JfZsgG0CQEwAwyrQUxkQdmZgGapP+xq2C0bVDqVis2vP369FrQ+9NrTD7MIrFUucfCoDZkhnJZhQ+DcADggt8CcAvg+OMSaP3sZQPiexKde/0kr0o8WAfA3B+Qv9mkVHIxChmrNbK/wB4Z60y9aZ4sdT42fYHiiCtPhRmcKAuX3CUNqrGUbFYSp8uxhuSN7Vp4e7q9km01yaeja0sMgGdamhmE6rPFNE5dDBxo14tJkgHlQmyHQu6emvFBKlAyhZkGCRbkA4fW5AKQnmJNQ6Sl1jDGHmJNT6H9lXve2uF3piKl1heYu2YI1P2ICoWi56MhwWz8J9FRuEHRExUNqNQTfzPJZOBFEGYcRdlLLK2EwMfS8lmFLIu1pvEQ7SyICz4dlhwjTOF55H7j6hG2MdF/JnagzAj8jNj/0wz/M7MxLOCcRkTOLsXKxtqQjNIoOYSWo9ogvGlsZhArSiCMOOOYeG1ojIKfyqCMFdRF4set+NqH2BAT1VWVAThu6GFL4UerIybV91Sti5WGoIpFsQEGYbZBOnwMUEqKGkLsgDJFqSbLLYgPeKYICaIl1gDlsQEMUFMkK06RFxGlKLqYp2eLPJcsZrbptLKi5XdpLf0YnEN/+vEg18AgJXQS1GbdHrnorpYiUvuU6UT48TgJOXFYszYs7IXCfS5H6aXtFaYCfvqQJmZs+dFg7TcpGcb6DBL7Lm1TzagN/d3kCxB1K1O+ZKehYcOAkb01hIkW7RBFa/O3ufc+ozqiFpuqIQpun+jNPJJwYrZ4tUKDBOk/TQxQRaYmiC9uWUL0oFhgpggO/52TRATpJwUtiC2IOH6zBZkBguisuiydbHYpy7yYqmV9rq8WOyxx0hiC2R19xcCeGwAEHF7cgK4VrFYJP6LE9flPIyqu0/yYiWuu5Gq2VgsxhNdGDwJA/SitNFsCzYFkvqS3hLUTctJV6Em2WfO1ubNji/1h4pXN7vIzAOZIB3AJkjjyWaCdIDagmzHokVlRVuQxoSdMpwtiC3IlHlTdY4tiC1INFFa1eY9ICxIphZUFetmUvoUAMYUlZK1IMqLxb58USWPowAw864UZui9PPGsd4jeiP/XKGWYt8IwcsaCzSVZL5YiCGOxnh3cJKvNs2ZWKWqTrmKxVpJROBfIU8fly2c1jGUJMvX65XnHZxtCigszUC4qxNfqPjlONqOQ3rzozyIbi5VNmGLwJDvd1hIkm1HYtC5WyxfUYiwTZDqKJsgCOxOkN4eyOenZ6WcLMo6YLcg4Rs00bEGmQ2kLYguyY/bYgnSQmCAzEOSzyWy26f9v289kj0J6IUpRFuRlwsvEXnRRPM4jRCbjTaIWlOpReCyAdwf3+SvhbVP4DHmxrgRwd3DiSQDumwBc1cV6AgA+Xylqk84ySs8J9Onpi3ojqiUWa59FmX2XA2AMYCnKi5XdpDPcJxPTNSlhKvFeJqmq6u6KINmLzB2LxXAPBtfVypS6WHzRUZE+dU3ulyIXObMlT0kQRI2frYtVi81+vVYEyV7XBOkh1irUxATpQJ37Q2HWgpggFQjYgnQg2YKMTJgpRRsq5uBSKl5idfCp2rxeYi0wsgXpUc17kA4ME2SDCaJ6FGbNxtdFDaesBTkCwKOCi/9Q1HxqtcRiz7+rg+uyn14UEqPwoTeK3ptImKx1V/ADex1G3iduxOlFK+W9AK4PjjPGjB6oUv4CAD1otaI26XyXF9UOMqBHr93bgt8Zu8VuA6XQC8puA6XQItNhUQprj9Fru0OmLLGyxavVc2cb6LT6UNiKIKpHoSpe3WCejA4xd066uoFsC7bRB1lSYSOLNmSfyQTJIjaub4IsMDJBenMlG+5uC9KBl62saAvSQ4AVIFiSsRQvsRaIeInVzQwvsXosMUFMkPJP0wTZwwR5qsgEZA+/swMLe7joaTi+g1heQ1V3V7FYFyeru18L4IbgNukxOm3525cjMEvycYnxrxPZniwgfkkwDrM9w0Lq9mJ1aKlQk8R7WbtqtuyP+pKuHkT1KJz7wddaFyuKFuUDew8y92tvP74J0hhTWxBbkCia1xZkCwETxAQxQQasjgligpgge5Qgl4qMQmbEvS7A5AoA5yaWsLeJWCw1BGOuGFPUQth/MYrRYuwTvWilnAXgmuB4dpNOd+4nWzxAcgxGCLAbQCkPAvCkxFgssXRVQn9SwtRu+Q6SwWGKrvpQqMZq2aOQY2VaTah7yhJkCk4tzmG7vqhlBTso84+tVpqW/dntXqxa0KbqmSBTkcufZ4L0MMuGu6tYrPxryJ1hguTwWkbbBDFBUvPHS6wFXF5i9aZNNh8kNeMmKNuCTABt4im2ILYgqaljC7LBFiT1Jicot9qDZCsrslgaXcOl0NPDvIlaaZlRqIo2qHtRoSa19z5VjwXliHetcDVwfqC8q6q7Ky9WLQhT9UyQDjkTZIFFq8JxK3HzTp34teeZICZIOVdMkBn2IF5i1f4lLa/nJdbyGFaPYAtiC2ILMkAXE8QE2RUEqf7LX5Fi9juIWmKpqibqMbJeLDVOy1gsdY1NK/vTqni1el71oXAlZX9WNO+rL2OCjENlgiwwMkF6c6VVXSxbkHECKo25+4PYglS8G1uQcZBsQWxBdswSW5AOEhPEBDFBBgyJCdKYIP8P/qkRrnfV6tsAAAAASUVORK5CYII=";

  private rippleData: any = {}
  ripple: boolean = true;


  constructor(
    private nav: NavController,
    private popover: PopoverController,
    private dataPass: PassingDataService,
    private platform: Platform,
    private localNotify: LocalNotifications,
    private apiService: ApiService
  ) { 
    this.platform.ready().then(() => {
      this.localNotify.on('click').subscribe(notif => {
        if(notif.data) {
          this.nav.navigateForward(notif.data.page, {queryParams: {id: notif.data.id}});
        }
      });
    })
  }
    
  
  ngOnInit() {
    this.directionInfo = this.dataPass.dispatcher;
    this.orderData = this.dataPass.orderData;
    if(this.directionInfo.leave_date) {
      let tempDate = new Date(this.directionInfo.leave_date[0]);
      this.leaveDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() < 10 ? "0" : "") + tempDate.getMonth() + "-" + (tempDate.getDate() < 10 ? "0" : "") + tempDate.getDate() + " " + (tempDate.getHours() < 10 ? "0" : "") + tempDate.getHours() + ":" + (tempDate.getMinutes() < 10 ? "0" : "") + tempDate.getMinutes();
      
      let date = new Date();
      this.orderNum = date.getFullYear() + "" + (date.getMonth() < 10 ? "0" : "") + date.getMonth() + "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "" + (date.getHours() < 10 ? "0" : "") + date.getHours() + "" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + "" + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    }
    if(this.orderData)
      if(this.orderData.passengers)
        this.peopleNum = this.countOfChild(this.orderData.passengers);

    this.dataPass.orderData.subscriberId = 400;
    this.dataPass.orderData.bigCount = this.peopleNum.people;
    this.dataPass.orderData.childCount = this.peopleNum.child;
    this.dataPass.orderData.orderNumber = this.orderNum;
    this.dataPass.orderData.dispatcherId = this.dataPass.dispatcher.id[0];
    this.dataPass.orderData.expired = new Date(Date.now() + 60*33*1000).toISOString();

    this.apiService.setOrderSeat(this.dataPass.orderData);
    // console.log("1", this.dataPass.dispatcher);
    // console.log("2", this.dataPass.orderData);
    // console.log("3", this.dataPass.fromStop);
    // console.log("4", this.dataPass.selectedSeats);
    // console.log("5", this.dataPass.toStop);
  }

  finish(e) {
    // this.nav.navigateRoot('/home');
    this.rippleData = this.rippleEffect(e);
    this.ripple = !this.ripple;

    this.localNotify.schedule({
      title: 'Bus Ticket',
      text: 'Таны захиалга амжилттай боллоо',
      foreground: true,
      data: {
        page: "/order-history", 
        id: 1
      }
    });
  }

  countOfChild(passengers: Passenger[]) {
    let child = 0, people = 0;
    for(let i =0; i< passengers.length; i++) {
      if(passengers[i].age == '1') {
        people++;
      } else {
        child++;
      }
    }
    return {child: child, people: people};
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
