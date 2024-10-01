import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/env.config';
import { setupSwagger } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
import { getValidationPipe } from './config/app-validation.config';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from './config/logger.config';
import { GlobalExceptionFilter } from './exceptions/global-errors.handler';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
      level: AppConfig.logLevel || 'info',
    }),
  });

  app.use(helmet());

  app.enableCors({ origin: '*', credentials: true });

  app.use('/public', express.static(join(__dirname, 'public')));

  app.use(cookieParser());
  // Set up Swagger documentation
  setupSwagger(app);

  // Enable global validation pipe
  app.useGlobalPipes(getValidationPipe());
  // Add global filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Set the global prefix for all routes
  app.setGlobalPrefix('/api/v1');
  // Start the server
  await app.listen(AppConfig.port || 5000, async () => {
    console.log(`Application is running on: http://localhost:${AppConfig.port || 5000}`);
  });
}
bootstrap();
