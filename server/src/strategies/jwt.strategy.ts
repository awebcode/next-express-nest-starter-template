import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}
  async sign(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async validate(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return { ...payload };
    } catch (e) {
      return null;
    }
  }
}
