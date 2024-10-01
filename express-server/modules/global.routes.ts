import { Router } from "express";
import userRoutes from "./user/user.routes";
import emailRoutes from "./email/email.routes";
import productRoutes from "./products/product.routes";
// Import other routes as needed

const router = Router();

// Define routes
router.use("/user", userRoutes);
router.use("/products",productRoutes)
router.use("/email", emailRoutes);
// Add other route paths here, e.g.:
// router.use('/orders', orderRoute);

// You can also define other routes directly
router.get("/health", (req, res) => {
  res.status(200).json({ message: "API is running smoothly" });
});

export default router;
