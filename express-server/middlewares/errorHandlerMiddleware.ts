import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../types/errorTypes";
import { loggerInstance } from "../config/logger.config";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  loggerInstance.error(err.message||err);
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default errorHandler;
// 404
export const NotFoundExceptionMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const error = new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
  next(error);
};
