import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerConfigService } from './services/throttle-config.service';
import { PrismaService } from './services/prisma.service';
import { ChatGateway } from './services/chat-gateway/chat.gateway';
import { ChatModule } from './services/chat-gateway/chat.module';
import { ProductModule } from './services/product/product.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    
    ChatModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: APP_GUARD, useClass: ThrottlerGuard }, ChatGateway],
})
export class AppModule {}
