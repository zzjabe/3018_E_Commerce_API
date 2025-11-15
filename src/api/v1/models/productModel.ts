import { Timestamp } from "firebase-admin/firestore";

export interface Product {
    id: string;
    name: string;
    description: string;
    category?: string;
    stock: number;
    price: number;
    images: string[];
    isActive?: Boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}