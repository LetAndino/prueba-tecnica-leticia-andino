import api from './api';
import type { User, UserInput } from '../types/user';

export const userService = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data;
    },

    getById: async (id: number): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    create: async (user: UserInput): Promise<{ id: number }> => {
        const response = await api.post('/users', user);
        return response.data;
    },

    update: async (id: number, user: Partial<UserInput>): Promise<Partial<User>> => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};