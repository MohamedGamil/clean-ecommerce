import { Injectable } from '@nestjs/common';

import { Order } from '@domain/models/Order';

import { IRepository } from './IRepository';

@Injectable()
export abstract class IOrdersRepository extends IRepository<Order> {}
