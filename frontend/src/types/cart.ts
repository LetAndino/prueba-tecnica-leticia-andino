import type { Product } from './product';

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    id?: number;
    userId: number;
    date: string;
    products: CartItem[];
}

export interface CartItemWithProduct extends CartItem {
    product: Product;
}