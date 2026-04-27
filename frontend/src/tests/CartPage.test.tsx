import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartPage } from '../pages/CartPage';
import { useCartStore } from '../store/useCartStore';

vi.mock('../store/useCartStore', () => ({
    useCartStore: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    NavLink: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

describe('CartPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('muestra mensaje cuando el carrito está vacío', () => {
        vi.mocked(useCartStore).mockReturnValue({
            items: [],
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
            getTotal: () => 0,
            getTotalItems: () => 0,
        });

        render(<CartPage />);
        expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
    });

    it('muestra items y permite actualizar cantidad', () => {
        const mockItem = {
            productId: 1,
            quantity: 2,
            product: { id: 1, title: 'Test Product', price: 100, description: '', category: '', image: '' },
        };

        const mockUpdate = vi.fn();
        vi.mocked(useCartStore).mockReturnValue({
            items: [mockItem],
            addItem: vi.fn(),
            removeItem: vi.fn(),
            updateQuantity: mockUpdate,
            clearCart: vi.fn(),
            getTotal: () => 200,
            getTotalItems: () => 2,
        });

        render(<CartPage />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        fireEvent.click(screen.getByText('+'));
        expect(mockUpdate).toHaveBeenCalledWith(1, 3);
    });

    it('permite eliminar un item', () => {
        const mockRemove = vi.fn();
        const mockItem = {
            productId: 1,
            quantity: 1,
            product: { id: 1, title: 'Test Product', price: 50, description: '', category: '', image: '' },
        };

        vi.mocked(useCartStore).mockReturnValue({
            items: [mockItem],
            addItem: vi.fn(),
            removeItem: mockRemove,
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
            getTotal: () => 50,
            getTotalItems: () => 1,
        });

        render(<CartPage />);
        fireEvent.click(screen.getByText('✕'));
        expect(mockRemove).toHaveBeenCalledWith(1);
    });
});
