import { IsNotEmpty, IsOptional, IsString, IsNumber, IsPositive, IsDecimal } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the product', example: 19.99 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'The discounted price of the product', example: 9.99, required: false })
  @IsOptional()
  @IsDecimal()
  discountedPrice?: number;

  @ApiProperty({ description: 'The stock quantity of the product', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;
 
  @ApiProperty({ description: 'The slug of the product for SEO', uniqueItems: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  slug?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}