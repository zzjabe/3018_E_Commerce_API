export interface Product {
    id: string;
    name: string;
    description: string;
    category?: string;
    stock: number;
    price: number;
    images: string[];
    isActive?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}