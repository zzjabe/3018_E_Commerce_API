import express, { Request, Response, Express } from "express";
import productRoutes from "./api/v1/routes/productRoutes";
import path from "path";

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

export default app;