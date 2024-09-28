import { Router } from "express";
import userRoute from "./userRoute";
import emailRoute from "./emailRoute";
// Import other routes as needed

const router = Router();

// Define routes
router.use("/user", userRoute);
router.use("/email", emailRoute);
// Add other route paths here, e.g.:
// router.use('/products', productRoute);
// router.use('/orders', orderRoute);

// You can also define other routes directly
router.get("/health", (req, res) => {
  res.status(200).json({ message: "API is running smoothly" });
});

export default router;
