import { Module } from '@nestjs/common';

import { IUsersRepository } from '@application/ports/IUsersRepository';
import { UsersRepository } from '@infrastructure/database/repositories/UsersRepository';
import { OrdersController } from '@presentation/controllers/OrdersController';
import { OrdersUseCases } from '@application/use-cases/OrdersUseCases';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [
    OrdersUseCases,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class OrdersModule {}
