import api from './api';
import type { Product, ProductInput } from '../types/product';

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },

    getById: async (id: number): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getByCategory: async (category: string): Promise<Product[]> => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    getCategories: async (): Promise<string[]> => {
        const response = await api.get('/products/categories');
        return response.data;
    },

    create: async (product: ProductInput): Promise<{ id: number }> => {
        const response = await api.post('/products', product);
        return response.data;
    },

    update: async (id: number, product: Partial<ProductInput>): Promise<Product> => {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },
};