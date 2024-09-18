import { Injectable } from '@nestjs/common';
import { ThrottlerOptionsFactory, ThrottlerModuleOptions } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          name: 'short',
          ttl: this.configService.get<number>('THROTTLE_SHORT_TTL'), // Use ConfigService
          limit: this.configService.get<number>('THROTTLE_SHORT_LIMIT'),
        },
        {
          name: 'medium',
          ttl: this.configService.get<number>('THROTTLE_MEDIUM_TTL'),
          limit: this.configService.get<number>('THROTTLE_MEDIUM_LIMIT'),
        },
        {
          name: 'long',
          ttl: this.configService.get<number>('THROTTLE_LONG_TTL'),
          limit: this.configService.get<number>('THROTTLE_LONG_LIMIT'),
        },
      ],
      errorMessage(context, throttlerLimitDetail) {
        return `Too many requests. Try again in ${throttlerLimitDetail.ttl} seconds.`;
      },
    };
  }
}
