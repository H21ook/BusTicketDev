import { Passenger } from "./passenger.model";
import { Subscriber } from "./subscriber.model";

export class Order {
    orderNumber?: string;
    dispatcherId?: string;
    passengers?: Passenger[];
    totalAmount?: number;
    subscriberId?: number;
    subscriber?: Subscriber;
    isAgree?: boolean;
    expired?: string;
    bigCount?: number;
    childCount?: number;
}