import { IsOptional, IsString, IsNumber, IsPositive, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductQueryDto {
  @ApiProperty({ description: 'Search term for product name', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Price filter minimum', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minPrice?: number;

  @ApiProperty({ description: 'Price filter maximum', example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPrice?: number;

  @ApiProperty({ description: 'Number of items per page', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  pageSize?: number;

  @ApiProperty({ description: 'Page number for pagination', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number;
}
