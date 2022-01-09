import { EntitySchema } from 'typeorm';
import { Product } from '@domain/models/Product';
import { User } from '@domain/models/User';
import { BaseEntity } from './BaseEntity';

export const ProductEntity = new EntitySchema<Product>({
  name: 'Product',
  tableName: 'products',
  target: Product,
  columns: {
    ...BaseEntity,
    name: {
      type: String,
      length: 191,
      nullable: true,
    },
    desc: {
      type: String,
      length: 191,
      nullable: true,
    },
    slug: {
      type: String,
      length: 191,
      nullable: true,
    },
    sku: {
      type: String,
      length: 100,
      nullable: true,
    },
    featuredPic: {
      name: 'featured_pic',
      type: String,
      length: 191,
      nullable: true,
    },
    status: {
      type: String,
      length: 25,
      nullable: true,
    },
    price: {
      type: "double",
      nullable: true,
    },
    sale_price: {
      type: "double",
      nullable: true,
    },
    published: {
      type: "boolean",
      default: false,
      nullable: true,
    },
  },
  orderBy: {
    createdAt: 'DESC',
  },
  relations: {
    author: {
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
