import { EntitySchema } from 'typeorm';
import { User } from '@domain/models/User';
import { Order } from '@domain/models/Order';
import { Product } from '@src/domain/models/Product';
import { BaseEntity } from './BaseEntity';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    ...BaseEntity,
    name: {
      type: String,
      length: 100,
      nullable: true,
    },
    email: {
      type: String,
      length: 100,
      nullable: true,
    },
    password: {
      type: String,
      length: 191,
      nullable: true,
    },
    isAdmin: {
      name: 'is_admin',
      type: 'boolean',
      default: false,
      nullable: true,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    orders: {
      type: 'one-to-many',
      target: () => Order,
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
      inverseSide: 'user',
    },
    products: {
      type: 'one-to-many',
      target: () => Product,
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
      inverseSide: 'author',
    },
  },
  indices: [
    {
      name: 'IDX_USERS',
      unique: true,
      columns: ['name', 'email'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_USERS',
      columns: ['email'],
    },
  ],
});
