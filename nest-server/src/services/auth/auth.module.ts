import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt.strategy'; // For access token validation
import { RolesGuard } from '../../guards/roles.guard'; // For role-based authorization
import { AppConfig } from 'src/config/env.config';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../../guards/auth.guard';
@Module({
  imports: [
    JwtModule.register({
      secret: AppConfig.jwtSecret,
      signOptions: { expiresIn: '1h' }, // Access token expiration
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy, AuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
