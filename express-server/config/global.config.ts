import { helmetConfig } from "./helmet.config";
import { rateLimitConfig } from "./rate-limit.config";
import { loggerInstance } from "./logger.config";

// Exporting a configuration object
const globalConfig = {
  helmet: helmetConfig,
  rateLimit: rateLimitConfig,
  logger: loggerInstance,
  corsOptions: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
};

export default globalConfig;
