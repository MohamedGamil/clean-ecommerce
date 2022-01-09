import { Module } from '@nestjs/common';

import { IUsersRepository } from '@application/ports/IUsersRepository';
import { UsersRepository } from '@infrastructure/database/repositories/UsersRepository';
import { ProductsController } from '@presentation/controllers/ProductsController';
import { ProductsUseCases } from '@application/use-cases/ProductsUseCases';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsUseCases,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class ProductsModule {}
