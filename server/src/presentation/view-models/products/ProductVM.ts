import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/models/Product';

export class ProductVM {
  @Expose()
  @ApiProperty({
    description: 'The id of the product',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The title of the product',
    example: 'Domain Driven Design',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The unique email of the user',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
  text: string;

  @Expose()
  @ApiProperty({ description: 'The crational date of the product' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'The date of the last product update' })
  updatedAt: Date;

  static toViewModel(user: Product): ProductVM {
    return plainToClass(ProductVM, user, { excludeExtraneousValues: true });
  }
}
