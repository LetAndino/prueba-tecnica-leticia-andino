import { useEffect, useState } from 'react';
import type { Product, ProductInput } from '../../types/product';
import { productService } from '../../services/productService';
import { ProductCard } from './ProductCard';
import { Pagination } from '../common/Pagination';
import { Modal } from '../common/Modal';
import { ProductForm } from './ProductForm';
import { paginate, sortItems } from '../../utils/pagination';

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const limit = 8;
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState<keyof Product>('title');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Product | undefined>();

    useEffect(() => {
        const load = async () => {
            try {
                const [data, cats] = await Promise.all([productService.getAll(), productService.getCategories()]);
                setProducts(data);
                setCategories(cats);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        let result = products;
        if (category) result = result.filter((p) => p.category === category);
        setFiltered(sortItems(result, sortBy, order));
        setPage(1);
    }, [category, sortBy, order, products]);

    const openCreate = () => { setEditing(undefined); setModalOpen(true); };
    const openEdit = (p: Product) => { setEditing(p); setModalOpen(true); };

    const handleSave = async (data: ProductInput) => {
        setSaving(true);
        try {
            if (editing) {
                // PUT devuelve el objeto completo con id
                const updated = await productService.update(editing.id, data);
                setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...updated, id: editing.id } : p)));
            } else {
                // POST devuelve solo { id }, reconstruimos con los datos del form
                const res = await productService.create(data);
                const newProduct: Product = { ...data, id: res.id };
                setProducts((prev) => [newProduct, ...prev]);
            }
            setModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar producto?')) return;
        await productService.delete(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const current = paginate(filtered, page, limit);
    const totalPages = Math.ceil(filtered.length / limit);

    if (loading) return <div className="text-center py-8">Cargando...</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2 text-sm">
                    <option value="">Todas las categorías</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={sortBy as string} onChange={(e) => setSortBy(e.target.value as keyof Product)} className="border rounded px-3 py-2 text-sm">
                    <option value="title">Título</option>
                    <option value="price">Precio</option>
                </select>
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
                    {order === 'asc' ? '↑ Asc' : '↓ Desc'}
                </button>
                <button onClick={openCreate} className="ml-auto bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                    + Nuevo producto
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {current.map((p) => (
                    <ProductCard key={p.id} product={p} onEdit={openEdit} onDelete={handleDelete} />
                ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar producto' : 'Nuevo producto'}>
                <ProductForm initial={editing} onSubmit={handleSave} loading={saving} />
            </Modal>
        </div>
    );
};
