import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function setupSwagger(app: express.Application): void {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Express API",
        version: "1.0.0",
        description: "Express API documentation",
      },
      servers: [
        { url: "http://localhost:5000/", description: "Local environment" },
        { url: "https://asikur.api.com/", description: "Staging" },
        { url: "https://production.asikur.api.com/", description: "Production" },
      ],
      tags: [
        {
          name: "Express API Tag",
          description: "Tag for Express API",
        },
      ],
      security: [{ bearerAuth: [] }],
    },
    apis: ["./routes/*.ts"], // Path to the API docs (adjust as needed)
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  // Set up Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
