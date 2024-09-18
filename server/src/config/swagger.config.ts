import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function setupSwagger(app: INestApplication): void {
  const SwaggerOptions = new DocumentBuilder()
    .setTitle('Nest.js API')
    .setDescription('Nest.js API description')
    .setVersion('1.0')
    .addServer('http://localhost:5000/', 'Local environment')
    .addServer('https://asikur.api.com/', 'Staging')
    .addServer('https://production.asikur.api.com/', 'Production')
    .addTag('Nest API Tag')
    .addBearerAuth()
    .build();
  // Set up Swagger documentation
  SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, SwaggerOptions));
}
