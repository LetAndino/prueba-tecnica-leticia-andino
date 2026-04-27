import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const parseUser = (): User | null => {
    try {
        const raw = localStorage.getItem('user');
        if (!raw || raw === 'undefined') return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    user: parseUser(),
    token: localStorage.getItem('token'),

    login: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
}));