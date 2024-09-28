import type { NextFunction } from "express";
import { AppError } from "../types/errorTypes";
import prisma from "../prisma/prismaClient";

/**
 * Check if a user exists by email or ID
 * @param identifier - User email or ID
 * @param identifierType - Type of identifier ('email' or 'id')
 * @param shouldExist - Flag indicating whether the user should exist or not
 * @param next - Express next function for error handling
 */
export async function checkIsUserExistsOrNot(
  identifier: string,
  identifierType: "email" | "id",
  shouldExist: boolean=false,
  next: NextFunction
) {
  if (!identifier) {
    return next(new AppError("Identifier is required", 400));
  }
  const user =
    identifierType === "email"
      ? await prisma.user.findUnique({ where: { email: identifier } })
      : await prisma.user.findUnique({ where: { id: identifier } });

  // Determine the appropriate message and status code
  if (user && shouldExist) {
    return next(new AppError("User already exists", 409));
  } else if (!user && !shouldExist) {
    return next(new AppError("User does not exist", 404));
  }

}