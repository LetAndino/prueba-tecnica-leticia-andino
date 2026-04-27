import api from './api';
import type { Cart } from '../types/cart';

export const cartService = {
    getAll: async (): Promise<Cart[]> => {
        const response = await api.get('/carts');
        return response.data;
    },

    getByUser: async (userId: number): Promise<Cart[]> => {
        const response = await api.get(`/carts/user/${userId}`);
        return response.data;
    },

    getById: async (id: number): Promise<Cart> => {
        const response = await api.get(`/carts/${id}`);
        return response.data;
    },

    create: async (cart: Omit<Cart, 'id'>): Promise<{ id: number }> => {
        const response = await api.post('/carts', cart);
        return response.data;
    },

    update: async (id: number, cart: Partial<Cart>): Promise<Cart> => {
        const response = await api.put(`/carts/${id}`, cart);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/carts/${id}`);
    },
};
