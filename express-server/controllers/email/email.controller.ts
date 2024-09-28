import type { Request, Response, NextFunction } from "express";
import { sendEmail } from "../../config/nodemailer.config";

export async function sendEmailCtrl(req: Request, res: Response, next: NextFunction) {
  const { to, name, subject, text, link } = req.body;
  try {
    await sendEmail(to, name, subject, text, link);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
}
