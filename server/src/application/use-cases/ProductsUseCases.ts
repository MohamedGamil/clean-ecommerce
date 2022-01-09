import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from '@domain/models/Product';
import { IUsersRepository } from '@application/ports/IUsersRepository';

@Injectable()
export class ProductsUseCases {
  private readonly logger = new Logger(ProductsUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async getAllProductsByUser(userId: number): Promise<Product[]> {
    this.logger.log('Fetch all user`s products');

    const user = await this.usersRepository.findOne(userId, {
      relations: ['products'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    return user.findProducts();
  }

  async getProductByUser(userId: number, productId: number): Promise<Product> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['products'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    const product = user.findProduct(productId);

    if (!product)
      throw new NotFoundException(`The product {${productId}} wasn't found.`);

    return product;
  }

  async createProduct(userId: number, product: Product): Promise<Product> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['products'],
    });

    if (!user)
      throw new NotFoundException(`The user {${userId}} wasn't found.`);

    user.createProduct(product);

    // const savedUser = await this.usersRepository.save(user);

    // return savedUser.products.find(p => p.title === product.title);

    return null;
  }
}
