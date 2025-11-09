import express from "express";
import * as productController from "../controllers/productController";
import upload from "../middleware/upload"

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", upload.array("images", 5), productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;