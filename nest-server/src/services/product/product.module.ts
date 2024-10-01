import {  Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [AuthModule], // Import AuthModule to make JwtService available
  providers: [ ProductService, PrismaService, JwtStrategy],
  controllers: [ProductController],
})
export class ProductModule {}
