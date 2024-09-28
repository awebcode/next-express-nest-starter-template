import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/errorTypes";

export function validateDTOmiddleware(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObj);
    if (errors.length > 0) {
    
      const messages = errors.map((err) => Object.values(err.constraints!)).join(", ");
      console.log({messages})
      next(new AppError(messages, 400)); // Passes the error to the global error handler
      return;
    }

    next(); // Proceed to the next middleware if there are no errors
  };
}
