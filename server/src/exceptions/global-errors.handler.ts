import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { logError } from 'src/utils/logger.utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Default error message
    let errorMessage: string | string[] = 'An unexpected error occurred';
    // Check for Prisma-related errors
    if (typeof exception.message === 'string' && exception.message.includes('prisma')) {
      errorMessage = 'Prisma Connection or Data Error: Invalid value provided in Prisma operation.';
    } else {
      const exceptionResponse =
        exception instanceof HttpException ? exception.getResponse() : { message: 'Internal server error' };
    // console.log({exception,exceptionResponse})

      // Format error messages
      if (Array.isArray(exceptionResponse)) {
        errorMessage = exceptionResponse.map((errObj) =>
          Object.entries(errObj)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', '),
        );
      } else if (typeof exceptionResponse === 'object') {
        errorMessage = exceptionResponse['message']
          ? exceptionResponse['message']
          : exception.message 
      }
       else if (typeof exceptionResponse === 'string'){
        errorMessage = exceptionResponse
      }
    }

    // Ensure errorMessage is an array of objects with message key
    const errorMessagesArray = Array.isArray(errorMessage)
      ? errorMessage
      :  [{ message: errorMessage }];

    // Log the error details for debugging using winston
   logError({
     message: errorMessagesArray
       .map((e) =>
         Object.entries(e)
           .map(([key, value]) => `${key}: ${value}`)
           .join(', '),
       )
       .join(' | '),
     url: request.url,
   });


    const customErrorResponse = {
      success: false,
      statusCode: status,
      messages: errorMessagesArray,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(customErrorResponse);
  }
}
