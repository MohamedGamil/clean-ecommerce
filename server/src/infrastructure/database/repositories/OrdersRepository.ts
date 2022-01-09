import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IOrdersRepository } from '@application/ports/IOrdersRepository';
import { Order } from '@domain/models/Order';
import { OrderEntity } from '@infrastructure/database/mapper/OrderEntity';
import { BaseRepository } from './BaseRepository';

@Injectable()
export class OrdersRepository extends BaseRepository<Order>
  implements IOrdersRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, OrderEntity);
  }
}
