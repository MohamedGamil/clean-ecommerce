import { Injectable } from '@nestjs/common';

import { Product } from '@domain/models/Product';

import { IRepository } from './IRepository';

@Injectable()
export abstract class IProductsRepository extends IRepository<Product> {}
