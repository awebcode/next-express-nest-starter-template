import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { getCookieOptions } from 'src/config/cookie.config';
import { ENV_VARIABLES } from 'src/config/env.config';
import { logInfo } from 'src/utils/logger.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private tokenCache = new Map<string, any>(); // In-memory cache
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    let accessToken = this.extractTokenFromCookies(request, 'access_token');

    // Check if token exists in cache
    if (accessToken && this.tokenCache.has(accessToken)) {
      logInfo({ message: 'Found token in cache', status: 200 });
      request.user = this.tokenCache.get(accessToken);
      return true;
    }

    // Verify access token
    if (accessToken && this.isTokenValid(accessToken, ENV_VARIABLES.jwtSecret)) {
      const decoded = this.jwtService.verify(accessToken, { secret: ENV_VARIABLES.jwtSecret });
      this.tokenCache.set(accessToken, decoded);
      request.user = decoded;
      return true;
    }

    // Handle expired or invalid access token
    const refreshToken = this.extractTokenFromCookies(request, 'refresh_token');
    if (!refreshToken) {
      throw new UnauthorizedException('No valid access or refresh token provided');
    }

    try {
      const refreshTokenPayload = this.jwtService.verify(refreshToken, { secret: ENV_VARIABLES.refreshTokenSecret });
      accessToken = this.jwtService.sign(
        { userId: refreshTokenPayload.userId, role: refreshTokenPayload.role },
        {
          secret: ENV_VARIABLES.jwtSecret,
          expiresIn: '1h',
        },
      );

      response.cookie('access_token', accessToken, getCookieOptions(60 * 60));
      this.tokenCache.set(accessToken, { userId: refreshTokenPayload.userId, role: refreshTokenPayload.role });
      request.user = refreshTokenPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private extractTokenFromCookies(request: Request, tokenName: string): string | null {
    return request.cookies[tokenName] || request.headers.authorization?.split(' ')[1] || null;
  }

  private isTokenValid(token: string, secret: string): boolean {
    try {
      this.jwtService.verify(token, { secret });
      return true;
    } catch {
      return false;
    }
  }
}
