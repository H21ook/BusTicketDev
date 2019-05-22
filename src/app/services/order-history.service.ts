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

  constructor(
    private afs: AngularFirestore,
  ) { 
    this.orderCollection = this.afs.collection<Order>('order');
  }

  getOrders() {
    return this.orderCollection.snapshotChanges();
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
    var tempOrder = order;
    tempOrder.subscriber = Object.assign({}, tempOrder.subscriber);
    console.log("coo", tempOrder);
    console.log("cool", order);
    return this.orderCollection.doc(tempOrder.orderNumber).set(tempOrder);
  }

  updateOrder(order: Order) {
    return this.orderCollection.doc(order.orderNumber).update(order);
  }

  deleteOrder(orderNumber) {
    return this.orderCollection.doc(orderNumber).delete();
  }

}
