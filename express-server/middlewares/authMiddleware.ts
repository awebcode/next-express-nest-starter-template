import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookieOptions } from "../config/cookie.config"; // Adjust path as necessary
import { AppConfig } from "../config/env.config"; // Adjust path as necessary
import { logInfo } from "../utils/logger.utils"; // Adjust path as necessary
import { loggerInstance } from "../config/logger.config";

const tokenCache = new Map<string, JwtPayload>(); // In-memory cache

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = extractTokenFromCookies(req, "access_token");

  // Check if token exists in cache
  if (accessToken && tokenCache.has(accessToken)) {
    loggerInstance.info({ message: "Found token in cache", status: 200 });
    req.user = tokenCache.get(accessToken) as any;
    return next();
  }

  // Verify access token
  if (accessToken && isTokenValid(accessToken, AppConfig.jwtSecret)) {
    const decoded = jwt.verify(accessToken, AppConfig.jwtSecret) as JwtPayload;
    tokenCache.set(accessToken, decoded);
    req.user = decoded as any;
    return next();
  }

  // Handle expired or invalid access token
  const refreshToken = extractTokenFromCookies(req, "refresh_token");
  if (!refreshToken) {
    return res.status(401).json({ message: "No valid access or refresh token provided" });
  }

  try {
    const refreshTokenPayload = jwt.verify(
      refreshToken,
      AppConfig.refreshTokenSecret
    ) as JwtPayload;
    accessToken = jwt.sign(
      { userId: refreshTokenPayload.userId, role: refreshTokenPayload.role },
      AppConfig.jwtSecret,
      { expiresIn: "1h" }
    );

    res.cookie("access_token", accessToken, getCookieOptions(60 * 60));
    tokenCache.set(accessToken, {
      userId: refreshTokenPayload.userId,
      role: refreshTokenPayload.role,
    });
    req.user = refreshTokenPayload as any;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Helper functions
const extractTokenFromCookies = (req: Request, tokenName: string): string | null => {
  return req.cookies[tokenName] || req.headers.authorization?.split(" ")[1] || null;
};

const isTokenValid = (token: string, secret: string): boolean => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
};
