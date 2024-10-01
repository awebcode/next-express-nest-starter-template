import { Injectable, HttpException, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { getCookieOptions } from 'src/config/cookie.config';
import { AppConfig } from 'src/config/env.config';
import type { Request, Response } from 'express';
import { logInfo } from 'src/utils/logger.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Creates a new user by hashing their password and saving the user to the database.
   * Throws an exception if the email already exists.
   */
  async createUser(dto: CreateUserDto) {
    try {
      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new HttpException('User already exists', 409);
      }
      console.log(dto);
      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(dto.password, 12);
      const user = await this.prisma.user.create({
        data: { ...dto, password: hashedPassword },
      });
      return { success: true, message: 'User created successfully', user };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  /**
   * Validates a user by comparing the provided password with the stored hashed password.
   * Throws an exception if credentials are invalid.
   */
  async validateUser(email: string, password: string) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Validate credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', 400);
    }
    return user;
  }

  /**
   * Logs in a user by validating credentials, generating access and refresh tokens,
   * and setting them in the response cookies.
   */
  async login(dto: LoginDto, res: Response) {
    const user = await this.validateUser(dto.email, dto.password);

    // Generate tokens with different expiry times
    const payload = { userId: user.id, role: user.role };
    const accessToken = this.generateToken(payload, '1h', 'access');
    const refreshToken = this.generateToken(payload, '7d');

    // Set the tokens in the cookies
    this.setCookies(res, accessToken, refreshToken);

    logInfo({ message: `Login successful for user ${user.email}`, status: 200, url: '/auth/login' });
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
      },
      backendTokens: {
        accessToken,
        refreshToken,
        expiresAccessTokenAt: new Date().setTime(new Date().getTime() + AppConfig.accessTokenExpiresIn * 1000),
      },
    };
  }

  /**
   * Refreshes the access token by verifying the refresh token from cookies
   * and issuing a new access token.
   * Throws an exception if refresh token is invalid or missing.
   */
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'] || req.headers.authorization?.split(' ')[1];
    // Check if refresh token exist
    if (!refreshToken) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: AppConfig.refreshTokenSecret,
      });

      // Remove the `exp` field from the payload before creating a new token
      const { exp, ...newPayload } = payload;

      // Generate new access and refresh tokens
      const accessToken = this.generateToken(newPayload, '1h', 'access');
      const newRefreshToken = this.generateToken(newPayload, '7d');

      // Set the new tokens in cookies
      this.setCookies(res, accessToken, newRefreshToken);
      return {
        success: true,
        message: 'Access token refreshed',
        backendTokens: {
          accessToken,
          refreshToken: newRefreshToken,
          expiresAccessTokenAt: new Date().setTime(new Date().getTime() + AppConfig.accessTokenExpiresIn * 1000),
        },
      };
    } catch (err) {
      console.log('Invalid refresh token', err);
      throw new HttpException('Invalid refresh token', 401);
    }
  }

  /**
   * Returns the currently authenticated user, fetched by the ID in the request.
   */
  async getMe(req: Request) {
    if (!req.user) {
      throw new NotFoundException('User does not exists');
    }
    const user = await this.getUserById(String(req.user.userId));
    return { success: true, user };
  }

  /**
   * Retrieves a user by their unique ID.
   */
  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Retrieves all users from the database.
   */
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return { success: true, users };
  }

  /**
   * Updates the authenticated user's data.
   * If the password is included, it's hashed before saving.
   */
  async updateMe(id: string, dto: UpdateUserDto) {
    const updateData: any = { ...dto };

    // Hash the new password if it was updated
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.prisma.user.update({ where: { id }, data: updateData });
    return { success: true, message: 'Profile updated successfully', user };
  }

  /**
   * Updates any user's data by an admin. Handles password hashing if required.
   */
  async updateUserByAdmin(id: string, dto: UpdateUserDto) {
    const updateData: any = { ...dto };

    // Hash the password if provided
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.prisma.user.update({ where: { id }, data: updateData });
    return { success: true, message: 'User updated successfully by admin', user };
  }

  /**
   * Deletes a user by their unique ID. Throws an exception if the user doesn't exist.
   */
  async deleteUserByAdmin(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    await this.prisma.user.delete({ where: { id } });
    return { success: true, message: 'User deleted successfully' };
  }

  /**
   * Deletes the authenticated user's account.
   */
  async deleteMyAccount(req: Request) {
    const userId = String(req.user.userId);

    // Check if the user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    await this.prisma.user.delete({ where: { id: userId } });
    return { success: true, message: 'Account deleted successfully' };
  }

  /**
   * Logs the user out by clearing the authentication cookies.
   */
  async logout(res: Response) {
    this.clearCookies(res);
    return { success: true, message: 'Logged out successfully' };
  }

  /**
   * Generates a JWT token with the given payload and expiration time.
   */
  private generateToken(payload: any, expiresIn: string, type?: string) {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: type === 'access' ? AppConfig.jwtSecret : AppConfig.refreshTokenSecret,
    });
  }

  /**
   * Sets the access and refresh tokens in the response cookies.
   */
  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, getCookieOptions(60 * 60)); // 1 hour expiration
    res.cookie('refresh_token', refreshToken, getCookieOptions(60 * 60 * 24 * 7)); // 7 days expiration
  }

  /**
   * Clears the access and refresh tokens by setting empty cookies with an immediate expiration.
   */
  private clearCookies(res: Response) {
    res.cookie('access_token', '', getCookieOptions(0));
    res.cookie('refresh_token', '', getCookieOptions(0));
  }
}
