// src/utils/error-utils.ts

import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { logError } from 'src/utils/logger.utils';

export function formatErrorResponse(exception: any, requestUrl?: string): { message: string; statusCode: number } {
  let message: any = 'Unknown error';
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  if (exception instanceof HttpException) {
    statusCode = exception.getStatus();
    const response: any = exception.getResponse();

    if (typeof response === 'object' && 'message' in response) {
      message = Array.isArray(response['message']) ? response['message'].join(', ') : response.message;
      // Log the error with Winston
    } else if (typeof response === 'string') {
      message = response.includes('create()') ? 'Prisma data creation or network errors.' : response;
    }
  } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma-specific errors
    message = formatPrismaError(exception.message);
    statusCode = HttpStatus.BAD_REQUEST; // Default to BAD_REQUEST for Prisma errors
  } else if (exception.message) {
    message = exception.message.includes('create()') ? 'Prisma data creation or network errors.' : exception.message;
  }
  // Log the error with Winston
  logError({ message, url: requestUrl || '' });

  return { message, statusCode };
}

export function formatPrismaError(message: string): string {
  // Customize this based on known Prisma error patterns
  if (message.startsWith('P2002')) {
    return 'A record with the same unique field already exists.';
  }
  if (message.startsWith('P2003')) {
    return 'Invalid foreign key provided.';
  }
  return message.includes('create()') ? 'Prisma data creation or network errors.' : message;
}
