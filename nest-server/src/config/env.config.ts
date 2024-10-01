export const AppConfig = {
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRE) || 60 * 60,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  throttleShortTTL: parseInt(process.env.THROTTLE_SHORT_TTL) || 1000,
  throttleShortLimit: parseInt(process.env.THROTTLE_SHORT_LIMIT) || 3,

  throttleMediumTTL: parseInt(process.env.THROTTLE_MEDIUM_TTL) || 10000,
  throttleMediumLimit: parseInt(process.env.THROTTLE_MEDIUM_LIMIT) || 20,

  throttleLongTTL: parseInt(process.env.THROTTLE_LONG_TTL) || 60000,
  throttleLongLimit: parseInt(process.env.THROTTLE_LONG_LIMIT) || 100,
  // logger
  logLevel: process.env.LOG_LEVEL || 'info',
};
