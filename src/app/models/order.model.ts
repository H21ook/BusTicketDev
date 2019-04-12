import { Passenger } from "./passenger.model";
import { Subscriber } from "./subscriber.model";
import { Direction } from "./direction.model"

export class Order {
    orderCode?: string;
    passengers?: Passenger[];
    totalAmount?: number;
    subscriber?: Subscriber;
    isAgree?: boolean;
    direction?: Direction;
}