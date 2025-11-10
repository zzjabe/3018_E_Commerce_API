import { Request, Response } from "express";
import * as productService from "../services/productServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../models/responseModel";

export const getAllProducts = (req: Request, res: Response): void => {
    try {
        const products = productService.getAllProducts();
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(products, "Fetched all products successfully"));
    } catch (err) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json(errorResponse("Failed to retrieve products", "PRODUCT_FETCH_ERROR"));
    }
};

export const getProductById = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const product = productService.getProductById(id);

        if (!product) {
            res
                .status(HTTP_STATUS.NOT_FOUND)
                .json(errorResponse("Product not found", "PRODUCT_NOT_FOUND"));
            return;
        }

        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(product, "Product retrieved successfully"));
    } catch (err) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json(errorResponse("Failed to retrieve product", "PRODUCT_FETCH_ERROR"));
    }
};

export const createProduct = (req: Request, res: Response): void => {
    try {
        const { name, description, category, stock, price, isActive } = req.body;

        if (!name || price === undefined || stock === undefined) {
            res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json(errorResponse("Missing required fields", "VALIDATION_ERROR"));
            return;
        }

        // Get image path array from Multer
        const imageFiles = req.files as Express.Multer.File[];
        const imagePaths = imageFiles ? imageFiles.map(file => `/uploads/${file.filename}`) : [];

        const newProduct = productService.createProduct({
            name,
            description,
            category,
            stock: Number(stock),
            price: Number(price),
            images: imagePaths,
            isActive: isActive === "true" || isActive === true,
        });

        res
            .status(HTTP_STATUS.CREATED)
            .json(successResponse(newProduct, "Product created successfully"));
    } catch (err) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json(errorResponse("Failed to create product", "PRODUCT_CREATE_ERROR"));
    }
};

export const updateProduct = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const updatedProduct = productService.updateProduct(id, req.body);

        if (!updatedProduct) {
            res
                .status(HTTP_STATUS.NOT_FOUND)
                .json(errorResponse("Product not found", "PRODUCT_NOT_FOUND"));
            return;
        }

        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(updatedProduct, "Product updated successfully"));
    } catch (err) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json(errorResponse("Failed to update product", "PRODUCT_UPDATE_ERROR"));
    }
};

export const deleteProduct = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const deletedProduct = productService.deleteProduct(id);

        if (!deletedProduct) {
            res
                .status(HTTP_STATUS.NOT_FOUND)
                .json(errorResponse("Product not found", "PRODUCT_NOT_FOUND"));
            return;
        }

        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(deletedProduct, "Product deleted successfully"));
    } catch (err) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json(errorResponse("Failed to delete product", "PRODUCT_DELETE_ERROR"));
    }
};
