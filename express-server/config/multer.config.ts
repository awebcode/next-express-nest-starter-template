import multer, { FileFilterCallback } from "multer";
import path from "path";

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the uploads folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Define file filter with correct typing
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    const error: Error = new Error("File type not allowed");
    cb(error as any, false); // Reject the file with an error
  }
};

// Create the multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB
  fileFilter: fileFilter,
});

export default upload;
