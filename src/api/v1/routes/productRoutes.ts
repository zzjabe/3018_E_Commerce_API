import express from "express";
import * as productController from "../controllers/productController";
import upload from "../middleware/upload";
import { validate } from "../middleware/validateMiddleware";
import { createProductSchema, updateProductSchema } from "../validations/productValidators"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/createProductSchema'
 *               - type: object
 *                 properties:
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: binary
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post(
    "/", 
    authenticate, 
    isAuthorized({ hasRole: ["manager"] }),
    upload.array("images", 2), 
    validate(createProductSchema), 
    productController.createProduct
);

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Fetched all products successfully
 *       500:
 *         description: Internal server error
 */
router.get(
    "/", 
    authenticate, 
    productController.getAllProducts
);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/:id", 
    authenticate, 
    productController.getProductById
);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/updateProductSchema'
 *               - type: object
 *                 properties:
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: binary
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.put(
    "/:id",
    authenticate, 
    isAuthorized({ hasRole: ["manager"] }), 
    upload.array("images", 2), 
    validate(updateProductSchema), 
    productController.updateProduct
);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete(
    "/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["manager"] }), 
    productController.deleteProduct
);

export default router;