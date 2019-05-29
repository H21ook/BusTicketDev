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

  getOrders(userID) {
    return this.orderCollection.snapshotChanges().pipe(
      map(orders => {
        let result: Order[] = [];
        orders.map(order => {
          if (order.payload.doc.id.substring(0, order.payload.doc.id.length - 14) == userID) {
            result.push(order.payload.doc.data());
          }
        });
        return result;
      })
    );
  }

  getOrder(orderNumber: string, userID: string): Observable<Order> {
    return this.orderCollection.doc<Order>(userID + "" + orderNumber).valueChanges().pipe(
      take(1),
      map(order => {
        order.orderNumber = orderNumber;
        return order;
      })
    );
  }

  createOrder(order: Order, userID: string) {
    var tempOrder = order;
    tempOrder.subscriber = Object.assign({}, tempOrder.subscriber);
    return this.orderCollection.doc(userID + "" + tempOrder.orderNumber).set(tempOrder);
  }

  updateOrder(order: Order, userID: string) {
    return this.orderCollection.doc(userID + "" + order.orderNumber).update(order);
  }

  deleteOrder(orderNumber, userID: string) {
    return this.orderCollection.doc(userID + "" + orderNumber).delete();
  }

}
