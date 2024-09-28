import express from "express";
import { sendEmailCtrl } from "../controllers/email/email.controller";

const router = express.Router();

router.post("/send-email", sendEmailCtrl);

export default router;