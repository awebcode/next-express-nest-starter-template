import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { AppConfig } from "./env.config";
import { AppError } from "../types/errorTypes";

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: AppConfig.smtpHost, // SMTP server from AppConfig
  port: AppConfig.smtpPort, // Port from AppConfig
  secure: AppConfig.smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: AppConfig.smtpUser, // Email from AppConfig
    pass: AppConfig.smtpPass, // Password from AppConfig
  },
});

// Function to send email
export const sendEmail = async (
  to: string,
  name: string,
  subject: string,
  message: string,
  buttonLink: string
) => {
  // Load the HTML email template
  const templatePath = path.join(__dirname, "../public/templates/emailTemplate.html");
  let template = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders with actual values
  template = template.replace("{{title}}", subject);
  template = template.replace("{{name}}", name);
  template = template.replace("{{message}}", message);
  template = template.replace("{{link}}", buttonLink);
  template= template.replace("{{buttonText}}", "Get Started");

  // Set up email data
  const mailOptions = {
    from: `"${AppConfig.fromName}" <${AppConfig.fromEmail}>`, // sender address
    to, // recipient
    subject, // Subject line
    html: template, // HTML body content
  };

  // Send email with transporter object
  try {
      const info = await transporter.sendMail(mailOptions);
       console.log("Email sent successfully: %s", info.response);

      return info
  } catch (error) {
    throw new AppError("Failed to send email or Invalid credentials", 500);
  }
};

//* Example usage
// sendEmail(
//   "recipient@example.com",
//   "John Doe",
//   "Welcome to Our Platform!",
//   "Thank you for joining us. Click the link below to get started:",
//   "https://example.com/welcome"
// );
