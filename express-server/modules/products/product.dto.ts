import { PartialType } from "@nestjs/mapped-types";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsArray,
} from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @IsArray()
  @IsUUID("4", { each: true })
  categories!: string[];

  @IsArray()
  images!: { url: string }[];

  @IsArray()
  variants!: { name: string; value: string }[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
