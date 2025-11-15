import { Product } from "../models/productModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
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

    return {
        id: doc.id,
        ...doc.data()
    } as Product;
};

export const createProduct = async (
    data: Omit<Product, "id">,
    files?: Express.Multer.File[]
): Promise<string> => {

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
        imageUrls = await uploadFilesToFirebase(files);
    }

    const newData = {
        ...data,
        images: imageUrls,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };

    const newId = await createDocument(COLLECTION, newData);
    return newId;
};

export const updateProduct = async (
    id: string,
    patch: Partial<Product>,
    files?: Express.Multer.File[]
): Promise<void> => {

    let imageUrls: string[] | undefined;

    if (files && files.length > 0) {
        imageUrls = await uploadFilesToFirebase(files);
    }

    const updatedData: Partial<Product> = {
        ...patch,
        ...(imageUrls ? { images: imageUrls } : {}),
        updatedAt: Timestamp.now(),
    };

    await updateDocument(COLLECTION, id, updatedData);
};

export const deleteProduct = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};