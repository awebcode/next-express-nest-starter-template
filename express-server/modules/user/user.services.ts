import type { NextFunction, Response } from "express";
import prisma from "../../prisma/prismaClient";
import { AppError } from "../../types/errorTypes";
import bcrypt from "bcrypt";
import { AppConfig } from "../../config/env.config";
import { sign, verify } from "jsonwebtoken";
import { getCookieOptions } from "../../config/cookie.config";
import type { User } from "@prisma/client";
import { randomBytes } from "crypto";
import { sendEmail } from "../../config/nodemailer.config";

export const userService = {
  /**
   * Validates a user by comparing the provided password with the stored hashed password.
   * Throws an exception if credentials are invalid.
   */
  validateUser: async function (email: string, password: string) {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // Validate credentials
    if (!user) {
      throw new AppError("Invalid credentials", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 400);
    }
    return user;
  },
  /**
   * Generates a JWT token with a specified payload and expiration time.
   */
  generateToken: async function (payload: any, expiresIn: string, type?: string) {
    return sign(
      payload,
      type === "access" ? AppConfig.jwtSecret : AppConfig.refreshTokenSecret,
      { expiresIn }
    );
  },
  verifyToken: async function (token: string, secret: string) {
    return await verify(token, secret);
  },
  formatTokens: (accessToken: string, refreshToken: string) => {
    return {
      accessToken,
      refreshToken,
      expiresAccessTokenAt: new Date().setTime(
        new Date().getTime() + Number(AppConfig.accessTokenExpiresIn) * 1000
      ),
    };
  },
  //* Helper functions
  //reduce user data

  userResponse: (user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
    };
  },

  /**
   * Sets the access and refresh tokens in the response cookies.
   */
  setCookies: function (res: Response, accessToken: string, refreshToken: string) {
    res.cookie("access_token", accessToken, getCookieOptions(60 * 60)); // 1 hour expiration
    res.cookie("refresh_token", refreshToken, getCookieOptions(60 * 60 * 24 * 7)); // 7 days expiration
  },

  /**
   * Clears the access and refresh tokens by setting empty cookies with an immediate expiration.
   */
  clearCookies: function (res: Response) {
    res.cookie("access_token", "", getCookieOptions(0));
    res.cookie("refresh_token", "", getCookieOptions(0));
  },

  //*Forget and reset passwords

  generateResetToken: async function (email: string) {
   try {
     const user = await prisma.user.findUnique({ where: { email } });
     if (!user) {
       throw new AppError("User does not exist", 404);
     }

     // Generate a random token
     const token = randomBytes(32).toString("hex");

    

     await prisma.user.update({
       where: { email },
       data: {
         resetToken: token,
         resetTokenExpiry: new Date(Date.now() + 3600000), // Token expires in 1 hour
       },
     });

     // Send email
     const link = `${AppConfig.clientUrl}/reset-password/${token}`;
     await sendEmail(
       email,
       user.name,
       "Reset Your Password",
       "Click the link below to reset your password:",
       link
     );
   } catch (error: any) {
     throw new AppError(error.message || "Something went wrong", 400);
    
   }
  },

  resetPassword: async function (token: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { resetToken: token },
    });

    if (!user || (user.resetTokenExpiry && user.resetTokenExpiry < new Date())) {
      throw new AppError("Invalid or expired token", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: { resetToken: token },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });
  },
};
