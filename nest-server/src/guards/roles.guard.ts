import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(    // Reflector is essential to read metadata
    private readonly jwtStrategy: JwtStrategy, // Assuming it's used for token validation
    private readonly prisma: PrismaService ){} // Prisma to access user roles) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No access token found');
    }
    const payload = await this.jwtStrategy.validate(token);

    if (!payload||!payload.userId) {
      throw new UnauthorizedException('Invalid access token!')
    }

    const requiredRoles = this.getRoleFromHandler(context);
    const user= await this.prisma.user.findUnique({ where: { id: payload.userId } })
    //* if (requiredRole && user.role !== requiredRole) { this is for single role only
    //   throw new UnauthorizedException('Insufficient permissions');
    //* }
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) { //for multiple role users can access specific task
      throw new UnauthorizedException('Insufficient permissions');
    }

    request.user = user;
    return true;
  }

  private getRoleFromHandler(context: ExecutionContext): string | null {
    const handler = context.getHandler();
    const roles = Reflect.getMetadata('roles', handler);
    return roles ? roles : null;
   //* return roles ? roles[0] : null; // Assuming a single role for simplicity
  }
}
