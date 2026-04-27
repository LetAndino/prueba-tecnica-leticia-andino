import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';

export const Navbar: React.FC = () => {
    const logout = useAuthStore((s) => s.logout);
    const totalItems = useCartStore((s) => s.getTotalItems());
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded hover:bg-blue-700 transition ${isActive ? 'bg-blue-700' : ''}`;

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
            <div className="flex gap-2">
                <NavLink to="/products" className={linkClass}>Productos</NavLink>
                <NavLink to="/users" className={linkClass}>Usuarios</NavLink>
                <NavLink to="/cart" className={linkClass}>
                    Carrito {totalItems > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2">{totalItems}</span>}
                </NavLink>
            </div>
            <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-blue-700 transition">
                Cerrar sesión
            </button>
        </nav>
    );
};
