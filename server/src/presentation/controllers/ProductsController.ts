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

import { ProductsUseCases } from '@application/use-cases/ProductsUseCases';
import { NotFoundError } from '@presentation/errors/NotFoundError';
import { BadRequestError } from '@presentation/errors/BadRequestError';
import { UnprocessableEntityError } from '@presentation/errors/UnprocessableEntityError';
import { ProductVM } from '@presentation/view-models/products/ProductVM';
import { CreateProductVM } from '@presentation/view-models/products/CreateProductVM';

@ApiTags('Products')
@Controller()
export class ProductsController {
  constructor(private readonly productsUseCases: ProductsUseCases) {}

  @Get('users/:userId/products')
  @ApiOperation({
    summary: 'Find all Products of a User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  @ApiOkResponse({ description: 'Products founded.', type: [ProductVM] })
  @ApiNotFoundResponse({
    description: 'If the user passed in userId not exists.',
    type: NotFoundError,
  })
  async getProductsByUser(@Param('userId') userId: string): Promise<ProductVM[]> {
    const products = this.productsUseCases.getAllProductsByUser(parseInt(userId, 10));

    return (await products).map(product => ProductVM.toViewModel(product));
  }

  @Get('users/:userId/products/:productId')
  @ApiOperation({
    summary: 'Find a Product of an User',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The user id',
  })
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'The product id',
  })
  @ApiOkResponse({ description: 'Product founded.', type: ProductVM })
  @ApiNotFoundResponse({
    description: 'If the user or the product not exists.',
    type: NotFoundError,
  })
  async getProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<ProductVM> {
    const product = await this.productsUseCases.getProductByUser(
      parseInt(userId, 10),
      parseInt(productId, 10),
    );

    return ProductVM.toViewModel(product);
  }

  @Post('users/:userId/products')
  @ApiOperation({
    summary: 'Creates a new Product',
  })
  @ApiCreatedResponse({ description: 'User created.', type: ProductVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  async createProduct(
    @Param('userId') userId: string,
    @Body() createProduct: CreateProductVM,
  ): Promise<ProductVM> {
    const product = await this.productsUseCases.createProduct(
      parseInt(userId, 10),
      CreateProductVM.fromViewModel(createProduct),
    );

    return ProductVM.toViewModel(product);
  }
}
