import prisma from "../../prisma/prismaClient";
import { CreateProductDTO, UpdateProductDTO } from "./product.dto";

export class ProductService {
  static async getAllProducts() {
   
    return prisma.product.findMany({
      include: { categories: true, images: true, variants: true, reviews: true,user: true },
      take: 20,
      // cursor: {
      //   id:
      // }
    });
  }
  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { categories: true, images: true, variants: true, reviews: true },
    });
  }

  static async createProduct(data: CreateProductDTO) {
    return prisma.product.create({
      data: {
        ...data,
        categories: {
          connect: data.categories.map((categoryId) => ({ id: categoryId })),
        },
        images: {
          create: data.images,
        },
        variants: {
          create: data.variants,
        },
      },
    });
  }

  static async updateProduct(id: string, data: UpdateProductDTO) {
    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        categories: {
          set:
            data.categories && data.categories.map((categoryId) => ({ id: categoryId })),
        },
        images: {
          deleteMany: {}, // Clear existing images
          create: data.images,
        },
        variants: {
          deleteMany: {}, // Clear existing variants
          create: data.variants,
        },
      },
    });
  }

  static async deleteProduct(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
