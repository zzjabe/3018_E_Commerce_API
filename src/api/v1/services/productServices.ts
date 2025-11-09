import { Product } from '../models/productModel';

const products: Product[] = [];

export const getAllProducts = (): Product[] => {
    return products;
};

export const getProductById = (id: string): Product | null =>{
    const product = products.find(e => e.id === id);
    if (!product) {
        return null;
    }
    return product;
};

export const createProduct = (data: Omit<Product, "id">): Product => {
    const newProduct: Product = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    products.push(newProduct);

    return newProduct;
};

export const updateProduct = (
    id: string,
    patch: Partial<Product>
): Product | null =>{
    const idx = products.findIndex(b => b.id === id);
    if (idx === -1) return null;
    products[idx] = { 
        ...products[idx], 
        ...patch,
        updatedAt: new Date()
    };
    return products[idx];
}

export const deleteProduct = (id: string): Product | null => {
    const idx = products.findIndex(b => b.id === id);
    if (idx === -1) return null;
    return products.splice(idx, 1)[0];
}
