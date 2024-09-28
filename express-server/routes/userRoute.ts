import express from "express";
import * as userCtrl from "../controllers/user/user.controller";

const router = express.Router();

// Get all users
router.get("/all", userCtrl.getAllUsers);
// Create a new user
router.post("/register", userCtrl.createUser);
//login
router.post("/login", userCtrl.login);
//get me
router.get("/me", userCtrl.getMe);
//get user by id
router.get("/:id", userCtrl.getUserById);
//@update me
router.patch("/update/:id", userCtrl.updateUser);
//@delete me
router.delete("/delete/:id", userCtrl.deleteUser);
//refresh token
router.get("/refresh", userCtrl.refreshToken);
//forget password
router.post("/forget-password", userCtrl.forgetPassword);
//reset password
router.post("/reset-password", userCtrl.resetPassword);
//logout
router.get("/logout", userCtrl.logout);
export default router;
