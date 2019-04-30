import { Passenger } from "./passenger.model";
import { Subscriber } from "./subscriber.model";

export class Order {
    orderCode?: string;
    passengers?: Passenger[];
    totalAmount?: number;
    subscriber?: Subscriber;
    isAgree?: boolean;
}