import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product, Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ProductQueryDto } from './dto/product-query.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ApiDocs } from 'src/utils/swagger.docs';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.ADMIN) // Only ADMIN users can create products
  @UseGuards(AuthGuard, RolesGuard)
  @ApiDocs({
    successStatus: 201,
    summary: 'Create a new product',
    description: 'Product created successfully',
    responseSchema: CreateProductDto,
    authRequired: true,
    errorResponses: {
      400: 'Invalid request body',
    },
  })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Get()
  @ApiDocs({
    summary: 'Get list of products with optional filters and pagination',
    description: 'List of products',
    responseSchema: [CreateProductDto],
    errorResponses: {
      404: 'Products Not found!',
    },
  })
  async getAll(@Query() query: ProductQueryDto): Promise<Product[]> {
    return this.productService.getProducts(query);
  }

  @Get(':id')
  @ApiDocs({
    summary: 'Get a product details by ID',
    description: 'Product details',
    responseSchema: CreateProductDto,
    errorResponses: {
      404: 'Products Not found!',
    },
  })
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN) // Only ADMIN users can update products
  @UseGuards(AuthGuard, RolesGuard)
  @ApiDocs({
    summary: 'Update a product  by ID',
    description: 'Product updated successfully',
    responseSchema: CreateProductDto,
    errorResponses: {
      404: 'Products Not found!',
    },
  })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN) // Only ADMIN users can delete products
  @UseGuards(AuthGuard, RolesGuard)
  @ApiDocs({
    summary: 'Delete a product by ID',
    description: 'Product deleted successfully',
    responseSchema: {},
    errorResponses: {
      404: 'Products Not found!',
    },
  })
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
