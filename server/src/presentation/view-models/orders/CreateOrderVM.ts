import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from '@domain/models/Order';

export class CreateOrderVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment type',
    example: 'cash',
  })
  paymentType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Ordered product IDs',
    example: '1,2,3',
  })
  productIds: string;

  static fromViewModel(vm: CreateOrderVM): Order {
    return new Order({
      // ...
    });
  }
}
