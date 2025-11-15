import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import productRoutes from "./api/v1/routes/productRoutes";
import path from "path";
import setupSwagger from "./config/swagger";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Allow the front-end to access static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

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

export default app;