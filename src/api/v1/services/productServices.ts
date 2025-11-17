import { Product } from "../models/productModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";
import { Timestamp } from "firebase-admin/firestore";
import { uploadFilesToFirebase } from "../utils/firebaseUploader";

const COLLECTION = "products";

export const getAllProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Product;
};

export const createProduct = async (
    data: Partial<Product>,
    files?: Express.Multer.File[]
): Promise<string> => {
    const productData: Partial<Product> = {
        ...data,
        stock: Number(data.stock),
        price: Number(data.price),
        images: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };

    if (data.isActive !== undefined) {
        if (typeof data.isActive === "string") {
            productData.isActive = data.isActive === "true";
        } else {
            productData.isActive = !!data.isActive;
        }
    } else {
        productData.isActive = false;
    }

    if (files && files.length > 0) {
        productData.images = await uploadFilesToFirebase(files);
    }

    return await createDocument(COLLECTION, productData);
};

export const updateProduct = async (
    id: string,
    patch: Partial<Product>,
    files?: Express.Multer.File[]
): Promise<void> => {
    const updatedData: Partial<Product> = { ...patch };

    if (updatedData.stock !== undefined) updatedData.stock = Number(updatedData.stock);
    if (updatedData.price !== undefined) updatedData.price = Number(updatedData.price);

    if (updatedData.isActive !== undefined) {
        if (typeof updatedData.isActive === "string") {
            updatedData.isActive = updatedData.isActive === "true";
        } else {
            updatedData.isActive = !!updatedData.isActive;
        }
    }

    if (files && files.length > 0) {
        updatedData.images = await uploadFilesToFirebase(files);
    }

    updatedData.updatedAt = Timestamp.now();

    await updateDocument(COLLECTION, id, updatedData);
};

export const deleteProduct = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};