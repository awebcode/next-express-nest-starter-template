NestJS Starter Template
<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p> <p align="center"> A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications. </p>
Features
Authentication: Includes JWT-based authentication for secure user login and registration.
CRUD Operations: Basic Product CRUD (Create, Read, Update, Delete) API.
Swagger: Automatically generated API documentation with Swagger.
Logging: Winston is integrated for efficient and structured logging.
Data Transfer Objects (DTOs): Strongly typed request validation using DTOs and class validators.
Modular Architecture: Well-structured code with separation of concerns across modules.
Getting Started
Prerequisites
Before running the application, ensure you have the following installed:

Node.js >= 14.x
PNPM or NPM
PostgreSQL (or any preferred DBMS)
Installation
Clone the repository:
bash
Copy code
git clone <repository-url>
cd nestjs-starter-template
Install dependencies using pnpm (preferred) or npm:
bash
Copy code
pnpm install
Configuration
Copy the example environment file and set up your configuration:
bash
Copy code
cp .env.example .env
Set up your database configuration in the .env file:
bash
Copy code
DB_HOST=localhost
DB_PORT=5432
DB_USER=your-db-username
DB_PASS=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-secret-key
Running the Application
You can run the application in different environments using the following commands:

bash
Copy code
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
API Documentation
Once the application is running, Swagger documentation will be available at:

bash
Copy code
http://localhost:3000/api
You can view and test the API endpoints here.

Available APIs
Authentication APIs
POST /auth/register: Register a new user.
POST /auth/login: Authenticate user and return JWT token.
Product APIs
GET /products: Get a list of all products.
POST /products: Create a new product.
GET /products/:id: Get a product by its ID.
PUT /products/:id: Update a product by its ID.
DELETE /products/:id: Delete a product by its ID.
Logging
Winston is used for logging. All logs, including errors and requests, are stored in the logs/ directory. The logging level can be configured in the .env file:

bash
Copy code
LOG_LEVEL=info
Logs are written both to the console and to files.

Testing
You can run unit and end-to-end (E2E) tests using the following commands:

bash
Copy code
# Run unit tests
pnpm run test

# Run e2e tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
File Structure
This template is organized as follows:

ruby
Copy code
src/
│
├── auth/            # Authentication module
│   ├── dto/         # Auth DTOs
│   └── auth.service.ts
│
├── products/        # Product module
│   ├── dto/         # Product DTOs
│   └── product.service.ts
│
├── common/          # Shared resources like guards, interceptors, and pipes
├── logger/          # Winston logging module
└── app.module.ts    # Application root module
Stay in Touch
Author: Md Asikur Rahman
NestJS Framework: NestJS
License: MIT License
