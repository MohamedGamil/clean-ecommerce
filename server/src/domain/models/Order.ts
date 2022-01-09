import { User } from '@domain/models/User';
import { IEntity } from '@domain/shared/IEntity';

export type OrderAttributes = {
  user?: User,
  payment_type?: string,
  payment_status?: string,
  delivery_status?: string,
  total_discount?: number,
  grand_total?: number,
  address?: string,
  status?: string,
  reviewed?: boolean,
  id?: number,
};

export class Order implements IEntity {
  id?: number;

  user?: User;

  paymentType?: string;

  paymentStatus?: string;

  deliveryStatus?: string;

  totalDiscount?: number;

  grandTotal?: number;

  address?: string;

  status?: string;

  reviewed?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  constructor( attributes: OrderAttributes = {} ) {
    this.user = attributes.user;
    this.paymentType = attributes.payment_type;
    this.paymentStatus = attributes.payment_status;
    this.deliveryStatus = attributes.delivery_status;
    this.totalDiscount = attributes.total_discount;
    this.grandTotal = attributes.grand_total;
    this.address = attributes.address;
    this.status = attributes.status;
    this.reviewed = attributes.reviewed;
    this.id = attributes.id;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof Order)) return false;

    return this.id === entity.id;
  }
}
