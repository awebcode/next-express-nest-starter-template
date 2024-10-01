import express from "express";
import { sendEmailCtrl } from "./email.controllers";

const router = express.Router();

router.post("/send-email", sendEmailCtrl);

export default router;
