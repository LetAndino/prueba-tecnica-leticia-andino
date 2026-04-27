import type { Product } from '../../types/product';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const addItem = useCartStore((s) => s.addItem);

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-3"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200?text=No+image')}
            />
            <h3 className="font-semibold text-sm mb-1 line-clamp-2 flex-1">{product.title}</h3>
            <p className="text-xs text-gray-500 mb-2 capitalize">{product.category}</p>
            <span className="text-lg font-bold text-green-600 mb-3">${product.price}</span>
            <div className="flex gap-2">
                <button onClick={() => addItem(product)} className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600">
                    + Carrito
                </button>
                <button onClick={() => onEdit(product)} className="px-3 py-1 bg-yellow-400 rounded text-sm hover:bg-yellow-500">
                    ✏️
                </button>
                <button onClick={() => onDelete(product.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                    🗑️
                </button>
            </div>
        </div>
    );
};
