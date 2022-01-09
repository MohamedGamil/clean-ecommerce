import { Order } from './Order';
import { Product } from './Product';
import { DomainException } from '@domain/exceptions/DomainException';
import { IEntity } from '@domain/shared/IEntity';

export class User implements IEntity {
  id?: number;

  name: string;

  email: string;

  password: string;

  isAdmin: boolean = false;

  orders?: Order[];

  products?: Product[];

  createdAt?: Date;

  updatedAt?: Date;

  constructor(name: string, email: string, orders?: Order[], products?: Product[], id?: number) {
    this.name = name;
    this.email = email;
    this.orders = orders;
    this.products = products;
    this.id = id;
  }

  findOrder(orderId: number): Order {
    return this.orders?.find(p => p.id === orderId) ?? null;
  }

  findOrders(): Order[] {
    return this.orders ?? [];
  }

  createOrder(order: Order): void {
    if (!this.orders) this.orders = new Array<Order>();

    if (this.orders.map(p => p.id).includes(order.id))
      throw new DomainException('Order with the same name already exists');

    this.orders.push(order);
  }

  findProduct(productId: number): Product {
    return this.products?.find(p => p.id === productId) ?? null;
  }

  findProducts(): Product[] {
    return this.products ?? [];
  }

  createProduct(product: Product): void {
    if (!this.products) this.products = new Array<Product>();

    if (this.products.map(p => p.id).includes(product.id))
      throw new DomainException('Product with the same name already exists');

    this.products.push(product);
  }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false;

    return this.id === entity.id;
  }
}
