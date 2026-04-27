import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validators';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginForm: React.FC = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: { username: string; password: string }) => {
        setError('');
        setLoading(true);
        try {
            const res = await authService.login(data);
            login(res.user, res.token);
            navigate('/products');
        } catch {
            setError('Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm mb-1">Usuario</label>
                    <input {...register('username')} className="w-full border rounded px-3 py-2" />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Contraseña</label>
                    <input type="password" {...register('password')} className="w-full border rounded px-3 py-2" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>

                <div className="mt-4 text-xs text-gray-500">
                    <p>Prueba: mor_2314 / 83r5^</p>
                </div>
            </form>
        </div>
    );
};