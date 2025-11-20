import express from "express";
import * as productController from "../controllers/productController";
import upload from "../middleware/upload";
import { validate } from "../middleware/validateMiddleware";
import { createProductSchema, updateProductSchema } from "../validatiors/productValidators"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Product"
 *               description:
 *                 type: string
 *                 example: "A test product"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               stock:
 *                 type: integer
 *                 example: 10
 *               price:
 *                 type: number
 *                 example: 100
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1699999999999"
 *                     name:
 *                       type: string
 *                       example: "Test Product"
 *                     description:
 *                       type: string
 *                       example: "A test product"
 *                     category:
 *                       type: string
 *                       example: "Electronics"
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     price:
 *                       type: number
 *                       example: 100
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "/uploads/test1.jpg"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
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
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       stock:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       '500':
 *         description: Internal server error
 */

router.get(
    "/", 
    authenticate, 
    productController.getAllProducts
);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1699999999999"
 *     responses:
 *       '200':
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     category:
 *                       type: string
 *                     stock:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isActive:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.get(
    "/:id", 
    authenticate, 
    productController.getProductById
);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1699999999999"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1699999999999"
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.delete(
    "/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["manager"] }), 
    productController.deleteProduct
);

export default router;