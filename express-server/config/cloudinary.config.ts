// cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import { AppConfig } from "./env.config";

// Ensure you set your environment variables or hard-code them (not recommended for production)
cloudinary.config({
  cloud_name: AppConfig.cloudinaryCloudName,
  api_key: AppConfig.cloudinaryApiKey,
  api_secret: AppConfig.cloudinaryApiSecret,
});

// Export the cloudinary instance for use in your application
export default cloudinary;
