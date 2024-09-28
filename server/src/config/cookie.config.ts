import type { CookieOptions as ExpressCookieOptions } from 'express';
import { AppConfig } from './env.config';

enum SAME_SITE {
  LAX = 'lax',
  STRICT = 'strict',
  NONE = 'none',
}

const baseCookieOptions: ExpressCookieOptions = {
  httpOnly: true,
  secure: AppConfig.nodeEnv === 'production',
  sameSite: SAME_SITE.STRICT,
  path: '/',
};

export const getCookieOptions = (maxAge: number): ExpressCookieOptions => ({
  ...baseCookieOptions,
  maxAge: maxAge * 1000, // Convert seconds to milliseconds
});
