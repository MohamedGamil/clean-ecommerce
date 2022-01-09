import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Order } from '@domain/models/Order';
import { IUsersRepository } from '@application/ports/IUsersRepository';

@Injectable()
export class OrdersUseCases {
  private readonly logger = new Logger(OrdersUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async getAllOrdersByUser(userId: number): Promise<Order[]> {
    this.logger.log('Fetch all user`s orders');

    const user = await this.usersRepository.findOne(userId, {
      relations: ['orders'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    return user.findOrders();
  }

  async getOrderByUser(userId: number, orderId: number): Promise<Order> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['orders'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    const post = user.findOrder(orderId);

    if (!post)
      throw new NotFoundException(`The post {${orderId}} wasn't found.`);

    return post;
  }

  async createOrder(userId: number, order: Order): Promise<Order> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['orders'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    user.createOrder(order);

    const savedUser = await this.usersRepository.save(user);

    return savedUser.orders.find(p => p.id === order.id);
  }
}
