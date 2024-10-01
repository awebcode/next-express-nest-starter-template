import { authMiddleware } from "../../middlewares/authMiddleware";
import express from "express";
import * as userCtrl from "./user.controllers";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import { Role } from "@prisma/client";

const router = express.Router();

// Public Routes (No authentication required)
router.post("/register", userCtrl.createUser);
router.post("/login", userCtrl.login);
router.post("/forget-password", userCtrl.forgetPassword);
router.post("/reset-password", userCtrl.resetPassword);
router.get("/logout", userCtrl.logout);

// Authenticated Routes (Authentication required)
router.use(authMiddleware); // Apply authMiddleware globally to all routes below

router.get("/me", userCtrl.getMe);
router.patch("/update/:id", userCtrl.updateUser);
router.get("/refresh", userCtrl.refreshToken);

// Admin-Only Routes (Authentication + Admin role required)
router.use(roleMiddleware([Role.ADMIN])); // Apply roleMiddleware to admin routes only

router.get("/all", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUserById);
router.delete("/delete/:id", userCtrl.deleteUser);

export default router;
