import express from "express";
import errorHandler, { NotFoundExceptionMiddleware } from "./middlewares/errorHandlerMiddleware";
import config from "./config/global.config"; // Import the consolidated config
import globalRouter from "./modules/global.routes"; // Import the global router
import cors from "cors";
import { setupSwagger } from "./config/swagger.config";
import { config as dotenvConfig } from "dotenv";
import morgan from "morgan";
import { loggerInstance } from "./config/logger.config";
import { AppConfig } from "./config/env.config";
import cookieParser from "cookie-parser";
const app = express();
dotenvConfig();

//@ Setup Swagger
setupSwagger(app);

//* Use Helmet
app.use(config.helmet());

// Logging middleware
//<> Use Morgan with Winston
//use combined on production instead of dev
app.use(
  morgan("dev", { stream: { write: (message) => loggerInstance.info(message.trim()) } })
);

// Apply the rate limiting middleware to all requests.
app.use(config.rateLimit);

// Middleware to parse JSON requests
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors(config.corsOptions));
app.use(cookieParser());
// Use the global router for all API routes
app.use("/api/v1", globalRouter);



//* Global Errors Handler
app.use(NotFoundExceptionMiddleware);
app.use(errorHandler);

// Start the server
app.listen(AppConfig.port, () => {
  console.info(`Server is running on http://localhost:${AppConfig.port}`);
});
