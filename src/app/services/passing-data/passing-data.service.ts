import { Injectable } from '@angular/core';
import { Seat } from 'src/app/models/seat.model';
import { Passenger } from 'src/app/models/passenger.model';
import { Subscriber } from 'src/app/models/subscriber.model';
import { Order } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PassingDataService {

  selectedSeats: Seat[];
  orderData: Order;

  constructor() { }

  setSelectedSeats(data: Seat[]) {
    this.selectedSeats = data;
  }

  getSelectedSeats() : Seat[] {
    return this.selectedSeats;
  }

  setPassengerAndTotal(passengers: Passenger[], totalAmount: number) {
    this.orderData = {
      passengers : passengers,
      totalAmount : totalAmount
    }
  }

  setSubscriber(subscriber: Subscriber) {
    this.orderData.subscriber = subscriber;
  }

  setIsAgree(data: boolean) {
    this.orderData.isAgree = data;
  }
  getOrderData() {
    return this.orderData;
  }
}
