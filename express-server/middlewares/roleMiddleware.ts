import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/errorTypes";
import type { Role } from "@prisma/client";

export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("User does not exists", 404);
    }

    // Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        "Forbidden. You do not have the required privileges or roles.",
        403
      );
    }

    next(); // User has one of the allowed roles, proceed to the next middleware/route handler
  };
};
