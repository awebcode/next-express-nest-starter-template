import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from '@prisma/client';
import { ProductQueryDto } from './dto/product-query.dto';
import { generateSlug } from 'src/utils/slugify.utils';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const slug = dto.name ? generateSlug(dto.name) : undefined;
      return await this.prisma.product.create({
        data: {
          ...dto,
          slug,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getProducts(query: ProductQueryDto): Promise<Product[]> {
    const { search, minPrice, maxPrice, pageSize = 10, page = 1 } = query;

    // Construct the where clause
    const where: any = {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive', // This should be a valid QueryMode value
        },
      }),
      ...(minPrice && {
        price: {
          gte: minPrice,
        },
      }),
      ...(maxPrice && {
        price: {
          lte: maxPrice,
        },
      }),
    };

    try {
      return this.prisma.product.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const slug = dto.name ? generateSlug(dto.name) : undefined;
    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        slug,
      },
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.delete({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}
