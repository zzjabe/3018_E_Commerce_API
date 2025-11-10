import request from "supertest";
import express from "express";
import productRoutes from "../src/api/v1/routes/productRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/products", productRoutes);

describe("Product API", () => {
    let productId: string;

    it("POST create product", async () => {
        const res = await request(app)
            .post("/api/v1/products")
            .send({ name: "Test Product", price: 100, stock: 5, images: ["test1.jpg", "test2.jpg"] });

        expect(res.status).toBe(201);
        productId = res.body.data.id;
    });

    it("GET all products", async () => {
        const res = await request(app).get("/api/v1/products");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("GET by id", async () => {
        const res = await request(app).get(`/api/v1/products/${productId}`);
        expect(res.status).toBe(200);
    });

    it("PUT update product", async () => {
        const res = await request(app)
            .put(`/api/v1/products/${productId}`)
            .send({ name: "Updated Product" });

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("Updated Product");
    });

    it("DELETE product", async () => {
        const res = await request(app).delete(`/api/v1/products/${productId}`);
        expect(res.status).toBe(200);
    });
});
