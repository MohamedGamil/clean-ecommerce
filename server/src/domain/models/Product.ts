import { User } from '@domain/models/User';
import { IEntity } from '@domain/shared/IEntity';

export type ProductAttributes = {
  author?: User,
  name?: string,
  desc?: string,
  slug?: string,
  sku?: string,
  featuredPic?: string,
  status?: string,
  price?: number,
  sale_price?: number,
  published?: boolean,
  id?: number,
};

export class Product implements IEntity {
  id?: number;

  author?: User;

  name?: string;

  desc?: string;

  slug?: string;

  sku?: string;

  featuredPic?: string;

  status?: string;

  price?: number;

  sale_price?: number;

  published?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  constructor( attributes: ProductAttributes = {} ) {
    this.author = attributes.author;
    this.name = attributes.name;
    this.desc = attributes.desc;
    this.slug = attributes.slug;
    this.sku = attributes.sku;
    this.featuredPic = attributes.featuredPic;
    this.status = attributes.status;
    this.price = attributes.price;
    this.sale_price = attributes.sale_price;
    this.published = attributes.published;
    this.id = attributes.id;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof Product)) return false;

    return this.id === entity.id;
  }
}
