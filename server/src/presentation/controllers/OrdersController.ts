import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { OrdersUseCases } from '@application/use-cases/OrdersUseCases';
import { NotFoundError } from '@presentation/errors/NotFoundError';
import { BadRequestError } from '@presentation/errors/BadRequestError';
import { UnprocessableEntityError } from '@presentation/errors/UnprocessableEntityError';
import { OrderVM } from '@presentation/view-models/orders/OrderVM';
import { CreateOrderVM } from '@presentation/view-models/orders/CreateOrderVM';

@ApiTags('Orders')
@Controller()
export class OrdersController {
  constructor(private readonly ordersUseCases: OrdersUseCases) {}

  @Get('users/:userId/orders')
  @ApiOperation({
    summary: 'Find all Orders of a User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  @ApiOkResponse({ description: 'Orders founded.', type: [OrderVM] })
  @ApiNotFoundResponse({
    description: 'If the user passed in userId not exists.',
    type: NotFoundError,
  })
  async getOrdersByUser(@Param('userId') userId: string): Promise<OrderVM[]> {
    const orders = this.ordersUseCases.getAllOrdersByUser(parseInt(userId, 10));

    return (await orders).map(order => OrderVM.toViewModel(order));
  }

  @Get('users/:userId/orders/:orderId')
  @ApiOperation({
    summary: 'Find a Order of an User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  @ApiParam({
    name: 'orderId',
    type: Number,
    description: 'The order id',
  })
  @ApiOkResponse({ description: 'Order founded.', type: OrderVM })
  @ApiNotFoundResponse({
    description: 'If the user or the order not exists.',
    type: NotFoundError,
  })
  async getOrder(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
  ): Promise<OrderVM> {
    const order = await this.ordersUseCases.getOrderByUser(
      parseInt(userId, 10),
      parseInt(orderId, 10),
    );

    return OrderVM.toViewModel(order);
  }

  @Post('users/:userId/orders')
  @ApiOperation({
    summary: 'Creates a new Order',
  })
  @ApiCreatedResponse({ description: 'User created.', type: OrderVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  async createOrder(
    @Param('userId') userId: string,
    @Body() createOrder: CreateOrderVM,
  ): Promise<OrderVM> {
    const order = await this.ordersUseCases.createOrder(
      parseInt(userId, 10),
      CreateOrderVM.fromViewModel(createOrder),
    );

    return OrderVM.toViewModel(order);
  }
}
