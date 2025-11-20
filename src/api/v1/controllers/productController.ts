import { NextFunction, Request, Response } from "express";
import * as productService from "../services/productServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../models/responseModel";
import { fileTypeFromBuffer } from "file-type";

export const getAllProducts = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.status(HTTP_STATUS.OK)
           .json(successResponse(products, "Fetched all products successfully"));
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
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
        next(err);
    }
};

export const createProduct = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void>=> {
    try {
        const files = req.files as Express.Multer.File[] | undefined;

        if (files && files.length > 0) { 
            for (const file of files) { 
                if (!file.buffer) { 
                    throw new Error(`File ${file.originalname} has no buffer. Upload failed.`);
                }
                const type = await fileTypeFromBuffer(file.buffer);
                if (!type || !["image/jpeg", "image/png", "image/gif"].includes(type.mime)) {
                    throw new Error(`Invalid image file: ${file.originalname}`);
                }
            }
        } 
                                
        const newId = await productService.createProduct(req.body, files);

        res.status(HTTP_STATUS.CREATED)
           .json(successResponse({ id: newId }, "Product created successfully"));
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const files = req.files as Express.Multer.File[] | undefined;

        if (files && files.length > 0) { 
            for (const file of files) { 
                if (!file.buffer) { 
                    throw new Error(`File ${file.originalname} has no buffer. Upload failed.`);
                }
                const type = await fileTypeFromBuffer(file.buffer);
                if (!type || !["image/jpeg", "image/png", "image/gif"].includes(type.mime)) {
                    throw new Error(`Invalid image file: ${file.originalname}`);
                }
            }
        }
        
        await productService.updateProduct(req.params.id, req.body, files);

        res.status(HTTP_STATUS.OK)
           .json(successResponse({ id }, "Product updated successfully"));
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(HTTP_STATUS.OK)
           .json(successResponse({ id }, "Product deleted successfully"));
    } catch (err) {
        next(err);
    }
};
