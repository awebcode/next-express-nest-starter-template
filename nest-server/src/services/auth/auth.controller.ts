import { Controller, Post, Body, Req, Res, UseGuards, Get, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiDocs } from 'src/utils/swagger.docs';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Auth') // Grouping the Auth endpoints in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiDocs({
    successStatus: 201,
    summary: 'Register a new user',
    description: 'Registers a new user with unique email and hashed password.',
    responseSchema: CreateUserDto,
    errorResponses: {
      409: 'User already exists',
    },
  })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiDocs({
    summary: 'Login a user',
    description: 'Validates user credentials and returns JWT access & refresh tokens.',
    responseSchema: { accessToken: 'string', refreshToken: 'string' },
    errorResponses: {
      400: 'Invalid credentials',
    },
  })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('refresh')
  @ApiDocs({
    summary: 'Generate new access and refresh tokens',
    description: 'Generates new access token using refresh token from cookies.',
    responseSchema: { accessToken: 'string' },
    errorResponses: {
      401: 'Unauthorized',
    },
  })
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post('logout')
  @ApiDocs({
    summary: 'Logout a user',
    description: 'Clears the JWT tokens from cookies and logs out the user.',
    responseSchema: { success: true, message: 'Logged out successfully' },
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiDocs({
    summary: 'Get current user details',
    description: 'Retrieves details of the authenticated user.',
    responseSchema: UpdateUserDto,
    errorResponses: {
      404: 'User does not exists',
    },
  })
  async getMe(@Req() req: Request) {
    return this.authService.getMe(req);
  }

  @Patch('update-me')
  @UseGuards(AuthGuard)
  @ApiDocs({
    summary: 'Update own account details',
    description: 'Allows authenticated users to update their account details.',
    responseSchema: UpdateUserDto,
  })
  async updateMe(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.authService.updateMe(String(req.user.userId), dto);
  }

  @Post('delete-my-account')
  @UseGuards(AuthGuard)
  @ApiDocs({
    summary: 'Delete own account',
    description: 'Deletes the authenticated user’s account.',
    responseSchema: { success: true, message: 'Account deleted successfully' },
  })
  async deleteMyAccount(@Req() req: Request) {
    return this.authService.deleteMyAccount(req);
  }

  @Get('users')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiDocs({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users (admin-only access).',
    responseSchema: [UpdateUserDto],
  })
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('get-single-user/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiDocs({
    summary: 'Get single user details by ID',
    description: 'Retrieves details of an user.',
    responseSchema: UpdateUserDto,
    errorResponses: {
      404: 'User does not exists',
    },
  })
  async getSingleUser(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Patch('update-user-by-admin/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiDocs({
    summary: 'Update user details by ID (Admin only)',
    description: 'Allows admins to update a user’s details by their ID.',
    responseSchema: UpdateUserDto,
    errorResponses: {
      404: 'User does not exists',
    },
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user to update' })
  async updateUserByAdmin(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUserByAdmin(id, dto);
  }

  @Post('delete-user-by-admin/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiDocs({
    summary: 'Delete a user by ID (Admin only)',
    description: 'Allows admins to delete a user by their ID.',
    responseSchema: { success: true, message: 'User deleted successfully' },
    errorResponses: {
      404: 'User does not exists',
    },
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user to delete' })
  async deleteUserByAdmin(@Param('id') id: string) {
    return this.authService.deleteUserByAdmin(id);
  }
}
