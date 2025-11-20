import Joi from "joi";

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