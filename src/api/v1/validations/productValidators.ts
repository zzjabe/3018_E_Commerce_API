import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     createProductSchema:
 *       type: object
 *       required:
 *         - name
 *         - stock
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Name of the product
 *           example: "Wireless Bluetooth Headphones"
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 10000
 *           description: Detailed description of the product
 *           example: "High-quality bluetooth headphones with noise cancellation."
 *         category:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           description: Category this product belongs to
 *           example: "Electronics"
 *         stock:
 *           type: number
 *           description: Available product stock
 *           example: 50
 *         price:
 *           type: number
 *           description: Price of the product
 *           example: 129.99
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the product is active and visible
 *           example: true
 */
export const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(1).max(10000).optional(),
    category: Joi.string().min(1).max(50).optional(),
    
    stock: Joi.number().required().empty("").messages({
        "any.required": "Stock is required",
        "number.base": "Stock must be a number",
        "string.empty": "Stock cannot be empty",
    }),

    price: Joi.number().required().empty("").messages({
        "any.required": "Price is required",
        "number.base": "Price must be a number",
        "string.empty": "Price cannot be empty",
    }),


    images: Joi.forbidden(),

    isActive: Joi.boolean().optional(),

    createdAt: Joi.forbidden(),
    updatedAt: Joi.forbidden(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     updateProductSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Updated product name
 *           example: "Updated Wireless Bluetooth Headphones"
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 10000
 *           description: Updated description of the product
 *           example: "New improved model with longer battery life."
 *         category:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           description: Updated category of the product
 *           example: "Audio"
 *         stock:
 *           type: number
 *           nullable: true
 *           description: Updated stock number (if provided)
 *           example: 80
 *         price:
 *           type: number
 *           nullable: true
 *           description: Updated price (if provided)
 *           example: 149.99
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active
 *           example: true
 */
export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    description: Joi.string().min(1).max(10000).optional(),
    category: Joi.string().min(1).max(50).optional(),

    stock: Joi.number().optional().empty("").messages({
        "number.base": "Stock must be a number",
        "string.empty": "Stock cannot be an empty string",
    }),

    price: Joi.number().optional().empty("").messages({
        "number.base": "Price must be a number",
        "string.empty": "Price cannot be an empty string",
    }),

    images: Joi.forbidden(),

    isActive: Joi.boolean().optional(),

    createdAt: Joi.forbidden(),
    updatedAt: Joi.forbidden(),
});