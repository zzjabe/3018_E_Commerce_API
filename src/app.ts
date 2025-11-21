import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";

import productRoutes from "./api/v1/routes/productRoutes";
import setupSwagger from "./config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import adminRoutes from "./api/v1/routes/adminRoutes"
import { getHelmetConfig } from "./config/helmetConfig";

// Initialize Express application
const app: Express = express();

// Apply basic Helmet security
app.use(getHelmetConfig());

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
};

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/products", productRoutes);

// Health check
app.get("/api/v1/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

setupSwagger(app);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;