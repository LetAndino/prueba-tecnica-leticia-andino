import { useEffect, useState } from 'react';
import type { Cart } from '../../types/cart';
import { cartService } from '../../services/cartService';
import { Pagination } from '../common/Pagination';
import { Modal } from '../common/Modal';
import { CartForm } from './CartForm';
import { paginate, sortItems } from '../../utils/pagination';

export const CartList: React.FC = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [sorted, setSorted] = useState<Cart[]>([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Cart | undefined>();

    useEffect(() => {
        cartService.getAll().then((data) => { setCarts(data); setLoading(false); });
    }, []);

    useEffect(() => {
        setSorted(sortItems(carts, 'userId', order));
        setPage(1);
    }, [order, carts]);

    const openCreate = () => { setEditing(undefined); setModalOpen(true); };
    const openEdit = (c: Cart) => { setEditing(c); setModalOpen(true); };

    const handleSave = async (data: Omit<Cart, 'id'>) => {
        setSaving(true);
        try {
            if (editing?.id) {
                // PUT devuelve el objeto completo
                const updated = await cartService.update(editing.id, data);
                setCarts((prev) => prev.map((c) => (c.id === editing.id ? { ...updated, id: editing.id } : c)));
            } else {
                // POST devuelve solo { id }, reconstruimos con los datos del form
                const res = await cartService.create(data);
                const newCart: Cart = { ...data, id: res.id };
                setCarts((prev) => [newCart, ...prev]);
            }
            setModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar carrito?')) return;
        await cartService.delete(id);
        setCarts((prev) => prev.filter((c) => c.id !== id));
    };

    const current = paginate(sorted, page, limit);
    const totalPages = Math.ceil(sorted.length / limit);

    if (loading) return <div className="text-center py-8">Cargando...</div>;

    return (
        <div>
            <div className="flex gap-3 mb-6 items-center">
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
                    Ordenar por usuario {order === 'asc' ? '↑' : '↓'}
                </button>
                <button onClick={openCreate} className="ml-auto bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                    + Nuevo carrito
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-3 border-b">ID</th>
                            <th className="text-left p-3 border-b">Usuario ID</th>
                            <th className="text-left p-3 border-b">Fecha</th>
                            <th className="text-left p-3 border-b">Productos</th>
                            <th className="text-left p-3 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 border-b">
                                <td className="p-3">{c.id}</td>
                                <td className="p-3">{c.userId}</td>
                                <td className="p-3">{new Date(c.date).toLocaleDateString()}</td>
                                <td className="p-3">{c.products.length} item(s)</td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => openEdit(c)} className="px-3 py-1 bg-yellow-400 rounded text-xs hover:bg-yellow-500">Editar</button>
                                    <button onClick={() => handleDelete(c.id!)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar carrito' : 'Nuevo carrito'}>
                <CartForm initial={editing} onSubmit={handleSave} loading={saving} />
            </Modal>
        </div>
    );
};
