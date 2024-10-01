import { Request, Response, NextFunction } from "express";
import { validateDTOmiddleware } from "../../middlewares/validateDTOmiddleware";
import { ProductService } from "./product.services";
import { CreateProductDTO, UpdateProductDTO } from "./product.dto";
import { AppError } from "../../types/errorTypes";
import type { TypedRequestBody } from "../../types/types";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductById(id);
    if (!product) {
      throw new AppError("Product does not exists", 404);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = [
  validateDTOmiddleware(CreateProductDTO), // Validation middleware
  async (req: TypedRequestBody<CreateProductDTO>, res: Response, next: NextFunction) => {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
];

export const updateProduct = [
  validateDTOmiddleware(UpdateProductDTO), // Validation middleware
  async (req: TypedRequestBody<UpdateProductDTO>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
];

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await ProductService.deleteProduct(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
