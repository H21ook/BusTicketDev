import { Passenger } from "./passenger.model";
import { Subscriber } from "./subscriber.model";
import { Dispatcher } from "./dispatcher.model";

export class Order {
    orderNumber?: string;
    dispatcher?: any;
    passengers?: Passenger[];
    totalAmount?: number;
    subscriberId?: number;
    subscriber?: Subscriber;
    isAgree?: boolean;
    expired?: string;
    bigCount?: number;
    childCount?: number;
    qrCode?: string;
    createdTime?: string;
    status?: string;
    leaveDateText?: string;
    seatRequest?: any[];
}