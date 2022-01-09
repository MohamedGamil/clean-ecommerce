import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IProductsRepository } from '@application/ports/IProductsRepository';
import { Product } from '@domain/models/Product';
import { ProductEntity } from '@infrastructure/database/mapper/ProductEntity';
import { BaseRepository } from './BaseRepository';

@Injectable()
export class ProductsRepository extends BaseRepository<Product>
  implements IProductsRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, ProductEntity);
  }
}
