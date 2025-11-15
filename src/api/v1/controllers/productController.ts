import { Request, Response } from "express";
import * as productService from "../services/productServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../models/responseModel";
import { uploadFilesToFirebase } from "../../../utils/firebaseUploader";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.status(HTTP_STATUS.OK)
           .json(successResponse(products, "Fetched all products successfully"));
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponse("Failed to retrieve products", "PRODUCT_FETCH_ERROR"));
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);

        if (!product) {
            res.status(HTTP_STATUS.NOT_FOUND)
               .json(errorResponse("Product not found", "PRODUCT_NOT_FOUND"));
            return;
        }

        res.status(HTTP_STATUS.OK)
           .json(successResponse(product, "Product retrieved successfully"));
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponse("Failed to retrieve product", "PRODUCT_FETCH_ERROR"));
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, category, stock, price, isActive } = req.body;

        if (!name || stock === undefined || price === undefined) {
            res.status(HTTP_STATUS.BAD_REQUEST)
               .json(errorResponse("Missing required fields", "VALIDATION_ERROR"));
            return;
        }

        const files = req.files as Express.Multer.File[];
        const imageUrls = files?.length
            ? await uploadFilesToFirebase(files)
            : [];

        const newId = await productService.createProduct({
            name,
            description,
            category,
            stock: Number(stock),
            price: Number(price),
            images: imageUrls,
            isActive: isActive === "true" || isActive === true
        });

        res.status(HTTP_STATUS.CREATED)
           .json(successResponse({ id: newId }, "Product created successfully"));
        
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponse("Failed to create product", "PRODUCT_CREATE_ERROR"));
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        let updatedFields = req.body;

        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const newImageUrls = await uploadFilesToFirebase(files);
            updatedFields.images = newImageUrls;
        }

        await productService.updateProduct(id, updatedFields);

        res.status(HTTP_STATUS.OK)
           .json(successResponse(null, "Product updated successfully"));
        
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponse("Failed to update product", "PRODUCT_UPDATE_ERROR"));
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);

        res.status(HTTP_STATUS.OK)
           .json(successResponse(null, "Product deleted successfully"));
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponse("Failed to delete product", "PRODUCT_DELETE_ERROR"));
    }
};
