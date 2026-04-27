import { useState } from 'react';
import { Layout } from './Layout';
import { useCartStore } from '../store/useCartStore';
import { Pagination } from '../components/common/Pagination';
import { CartList } from '../components/cart/CartList';
import { paginate } from '../utils/pagination';

export const CartPage: React.FC = () => {
    const [tab, setTab] = useState<'local' | 'api'>('local');
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
    const [page, setPage] = useState(1);
    const limit = 5;
    const totalPages = Math.ceil(items.length / limit);
    const current = paginate(items, page, limit);

    const tabClass = (t: 'local' | 'api') =>
        `px-4 py-2 text-sm font-medium border-b-2 transition ${tab === t ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`;

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>

            <div className="flex gap-4 border-b mb-6">
                <button className={tabClass('local')} onClick={() => setTab('local')}>Mi carrito</button>
                <button className={tabClass('api')} onClick={() => setTab('api')}>Gestión de carritos</button>
            </div>

            {tab === 'local' && (
                items.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">El carrito está vacío</div>
                ) : (
                    <>
                        <div className="space-y-3">
                            {current.map((item) => (
                                <div key={item.productId} className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow-sm">
                                    <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate">{item.product.title}</h3>
                                        <p className="text-green-600 font-bold">${item.product.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">+</button>
                                    </div>
                                    <p className="w-20 text-right font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeItem(item.productId)} className="text-red-500 hover:text-red-700 text-sm">✕</button>
                                </div>
                            ))}
                        </div>
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                            <button onClick={clearCart} className="text-red-500 hover:underline text-sm">Vaciar carrito</button>
                            <span className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</span>
                        </div>
                    </>
                )
            )}

            {tab === 'api' && <CartList />}
        </Layout>
    );
};
