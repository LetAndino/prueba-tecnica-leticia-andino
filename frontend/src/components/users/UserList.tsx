import { useEffect, useState } from 'react';
import type { User, UserInput } from '../../types/user';
import { userService } from '../../services/userService';
import { Pagination } from '../common/Pagination';
import { Modal } from '../common/Modal';
import { UserForm } from './UserForm';
import { paginate, sortItems } from '../../utils/pagination';

export const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [sorted, setSorted] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [sortBy, setSortBy] = useState<keyof User>('username');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<User | undefined>();

    useEffect(() => {
        userService.getAll().then((data) => { setUsers(data); setLoading(false); });
    }, []);

    useEffect(() => {
        setSorted(sortItems(users, sortBy, order));
        setPage(1);
    }, [sortBy, order, users]);

    const openCreate = () => { setEditing(undefined); setModalOpen(true); };
    const openEdit = (u: User) => { setEditing(u); setModalOpen(true); };

    const handleSave = async (data: UserInput) => {
        setSaving(true);
        try {
            if (editing) {
                // PUT devuelve el objeto sin id, lo reconstruimos
                await userService.update(editing.id, data);
                setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...data, id: editing.id } : u)));
            } else {
                // POST devuelve solo { id }, reconstruimos con los datos del form
                const res = await userService.create(data);
                const newUser: User = { ...data, id: res.id };
                setUsers((prev) => [newUser, ...prev]);
            }
            setModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar usuario?')) return;
        await userService.delete(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const current = paginate(sorted, page, limit);
    const totalPages = Math.ceil(sorted.length / limit);

    if (loading) return <div className="text-center py-8">Cargando...</div>;

    return (
        <div>
            <div className="flex gap-3 mb-6 items-center">
                <select value={sortBy as string} onChange={(e) => setSortBy(e.target.value as keyof User)} className="border rounded px-3 py-2 text-sm">
                    <option value="username">Usuario</option>
                    <option value="email">Email</option>
                </select>
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
                    {order === 'asc' ? '↑ Asc' : '↓ Desc'}
                </button>
                <button onClick={openCreate} className="ml-auto bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                    + Nuevo usuario
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-3 border-b">ID</th>
                            <th className="text-left p-3 border-b">Usuario</th>
                            <th className="text-left p-3 border-b">Nombre</th>
                            <th className="text-left p-3 border-b">Email</th>
                            <th className="text-left p-3 border-b">Teléfono</th>
                            <th className="text-left p-3 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 border-b">
                                <td className="p-3">{u.id}</td>
                                <td className="p-3">{u.username}</td>
                                <td className="p-3">{u.name.firstname} {u.name.lastname}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">{u.phone}</td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => openEdit(u)} className="px-3 py-1 bg-yellow-400 rounded text-xs hover:bg-yellow-500">Editar</button>
                                    <button onClick={() => handleDelete(u.id)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar usuario' : 'Nuevo usuario'}>
                <UserForm initial={editing} onSubmit={handleSave} loading={saving} />
            </Modal>
        </div>
    );
};
