import { ValidationPipe, BadRequestException } from '@nestjs/common';

export function getValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: false,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map((error) => ({
          [error.property]: Object.values(error.constraints).join(', '),
        })),
      );
    },
  });
}
