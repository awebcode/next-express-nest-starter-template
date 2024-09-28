import { Request, Response, type NextFunction } from "express";
import { userService } from "./user.service";
import { AppError } from "../../types/errorTypes";
import prisma from "../../prisma/prismaClient";
import { RegisterDTO, LoginDTO, UpdateUserDto } from "./user.dto";
import type { TypedRequestBody } from "../../types/types";
import { validateDTOmiddleware } from "../../middlewares/validateDTOmiddleware";
import bcrypt from "bcrypt";
import { checkIsUserExistsOrNot } from "../../utils/isUserNotExisits";
import { AppConfig } from "../../config/env.config";
import { loggerInstance } from "../../config/logger.config";
import { Role } from "@prisma/client";
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // Validate the request body based on RegisterDTO schema
  try {
    const users = await prisma.user.findMany({ take: 20 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    //will return err if user does not exist
    await checkIsUserExistsOrNot(id, "id", false, next);

    const user = await prisma.user.findUnique({ where: { id } });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = [
  validateDTOmiddleware(RegisterDTO), // Call the validation middleware as part of the array
  async (req: TypedRequestBody<RegisterDTO>, res: Response, next: NextFunction) => {
    try {
      await checkIsUserExistsOrNot(req.body.email, "email", true, next);

      const newUser = await prisma.user.create({
        data: { ...req.body, password: await bcrypt.hash(req.body.password, 12) },
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
];

/**
 * Logs in a user by validating credentials, generating access and refresh tokens,
 * and setting them in the response cookies.
 */
export const login = [
  validateDTOmiddleware(LoginDTO),
  async (req: TypedRequestBody<LoginDTO>, res: Response, next: NextFunction) => {
    try {
      const user = await userService.validateUser(req.body.email, req.body.password);
      if (!user) {
        throw new AppError("Invalid email or password", 401);
      }

      const payload = { userId: user.id, role: user.role };
      const accessToken = await userService.generateToken(payload, "1h", "access");
      const refreshToken = await userService.generateToken(payload, "7d");

      // Set the tokens in the cookies
      await userService.setCookies(res, accessToken, refreshToken);

      loggerInstance.info({
        message: `Login successful for user ${user.email}`,
        status: 200,
        url: "/auth/login",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userService.userResponse(user),
        tokens: userService.formatTokens(accessToken, refreshToken),
      });
    } catch (error) {
      next(error);
    }
  },
];

/**
 * Refreshes the access token by verifying the refresh token from cookies
 * and issuing a new access token.
 * Throws an exception if refresh token is invalid or missing.
 */
export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  const refreshToken =
    req.cookies["refresh_token"] || req.headers.authorization?.split(" ")[1];
  // Check if refresh token exist
  if (!refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  try {
    // Verify the refresh token
    const payload = await userService.verifyToken(
      refreshToken,
      AppConfig.refreshTokenSecret
    );

    // Remove the `exp` field from the payload before creating a new token
    const { exp, ...newPayload } = payload as any;

    // Generate new access and refresh tokens
    const accessToken = await userService.generateToken(newPayload, "1h", "access");
    const newRefreshToken = await userService.generateToken(newPayload, "7d");

    // Set the new tokens in cookies
    userService.setCookies(res, accessToken, newRefreshToken);

    // Return the new access and refresh tokens
    loggerInstance.info({
      message: "Access token refreshed",
      status: 200,
      url: "/auth/refresh",
    });
    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      tokens: userService.formatTokens(accessToken, newRefreshToken),
    });
  } catch (err) {
    loggerInstance.error({
      message: "Invalid refresh token",
      status: 401,
      url: "/auth/refresh",
    });
    next(err);
  }
}

/**
 * Returns the currently authenticated user, fetched by the ID in the request.
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError("User does not exists", 404);
    }
    const user = await prisma.user.findUnique({ where: { id: String(req.user.userId) } });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

//**Update user
export const updateUser = [
  validateDTOmiddleware(UpdateUserDto),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new AppError("User does not exists", 404);
      }
      if (user.role !== Role.ADMIN || (req.user && req.user.id !== id)) {
        throw new AppError("You cannot update this user", 400);
      }
      console.log("worl")
      const updatedUser = await prisma.user.update({ where: { id }, data: req.body });
      
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
];

//**Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    if (user.role !== Role.ADMIN || (req.user && req.user.id !== id)) {
      throw new AppError("You cannot delete this user", 400);
    }
    const deletedUser = await prisma.user.delete({ where: { id } });
    if (!deletedUser) {
      throw new AppError("User does not exists", 404);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

//**Forget and reset passwords
export async function forgetPassword(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  try {
    await userService.generateResetToken(email);
    res.status(200).json({ message: "Reset password link sent to your email." });
  } catch (error) {
    next(error);
  }
}

//**Reset password
export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  const { token, newPassword } = req.body;

  try {
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    next(error);
  }
}

//*logout
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.clearCookies(res);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}
