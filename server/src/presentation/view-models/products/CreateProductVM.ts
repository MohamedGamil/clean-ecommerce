import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from '@domain/models/Product';

export class CreateProductVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the product',
    example: 'Domain Driven Design',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the product',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
  desc: string;

  static fromViewModel(vm: CreateProductVM): Product {
    return new Product({
      name: vm.name,
      desc: vm.desc,
    });
  }
}
