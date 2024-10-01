import { authMiddleware } from "../../middlewares/authMiddleware";
import express from "express";
import * as productCtrl from "./product.controllers"; // Import your product controller
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import { Role } from "@prisma/client";

const router = express.Router();

// Public Routes (No authentication required)
router.get("/", productCtrl.getAllProducts); // Fetch all products
router.get("/:id", productCtrl.getProductById); // Fetch a single product by ID or slug

// Authenticated Routes (Authentication required)
router.use(authMiddleware); // Apply authMiddleware globally to all routes below
// Admin-Only Routes (Authentication + Admin role required)
router.use(roleMiddleware([Role.ADMIN])); // Apply roleMiddleware to admin routes only
router.post("/", productCtrl.createProduct); // Create a product (must be logged in)
router.patch("/:id", productCtrl.updateProduct); // Update a product (must be logged in)
router.delete("/:id", productCtrl.deleteProduct); // Delete a product (must be logged in)




export default router;
