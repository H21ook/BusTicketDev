import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderCollection: AngularFirestoreCollection<Order>;
  orders = new BehaviorSubject([]);


  constructor(
    private afs: AngularFirestore,
  ) { 
    this.orderCollection = this.afs.collection<Order>('order');
  }

  getOrders() {
    return this.orderCollection.valueChanges();
  }

  getOrder(orderNumber: string): Observable<Order> {
    return this.orderCollection.doc<Order>(orderNumber).valueChanges().pipe(
      take(1),
      map(order => {
        order.orderNumber = orderNumber;
        return order;
      })
    );
  }

  createOrder(order: Order) {
    var torder;
    // torder.passengers = order.passengers.map((obj)=> {return Object.assign({}, obj)});
    // torder.subsriber = Object.assign({}, order.subscriber);
    // torder.orderNumber = order.orderNumber;
    // torder.dispatcher  = Object.assign({}, order.dispatcher);
    // torder.totalAmount  = order.totalAmount
    // torder.subscriberId  = order.subscriberId
    // torder.isAgree = order.isAgree
    // torder.expired  = order.expired
    // torder.bigCount  = order.bigCount
    // torder.childCount = order.childCount
    // torder.qrCode = order.qrCode
    // torder.createdTime = order.createdTime
    // torder.status = order.status
    // torder.leaveDateText = order.leaveDateText
    // torder.seatRequest = order.seatRequest.map((obj)=> {return Object.assign({}, obj)});
    console.log("cool", order);
    // return this.orderCollection.add(torder);
  }

  updateOrder(order: Order) {
    return this.orderCollection.doc(order.orderNumber).update(order);
  }

  deleteOrder(orderNumber) {
    return this.orderCollection.doc(orderNumber).delete();
  }

}
