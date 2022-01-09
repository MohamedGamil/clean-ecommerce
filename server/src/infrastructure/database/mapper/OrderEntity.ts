import { EntitySchema } from 'typeorm';
import { Order } from '@domain/models/Order';
import { User } from '@domain/models/User';
import { BaseEntity } from './BaseEntity';

export const OrderEntity = new EntitySchema<Order>({
  name: 'Order',
  tableName: 'orders',
  target: Order,
  columns: {
    ...BaseEntity,
    paymentType: {
      name: 'payment_type',
      type: String,
      length: 50,
      nullable: true,
    },
    paymentStatus: {
      name: 'payment_status',
      type: String,
      length: 50,
      nullable: true,
    },
    deliveryStatus: {
      name: 'delivery_status',
      type: String,
      length: 50,
      nullable: true,
    },
    status: {
      type: String,
      length: 50,
      nullable: true,
    },
    totalDiscount: {
      name: 'total_discount',
      type: "double",
      nullable: true,
    },
    grandTotal: {
      name: 'grand_total',
      type: "double",
      nullable: true,
    },
    address: {
      type: "longtext",
      nullable: true,
    },
    reviewed: {
      type: "boolean",
      default: false,
      nullable: true,
    },
  },
  orderBy: {
    createdAt: 'DESC',
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: () => User,
      joinColumn: true,
    },
  },
  indices: [
  ],
  uniques: [
  ],
});
