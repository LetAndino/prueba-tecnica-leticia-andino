import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../utils/validators';
import type { User, UserInput } from '../../types/user';

interface UserFormProps {
    initial?: User;
    onSubmit: (data: UserInput) => void;
    loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ initial, onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
        resolver: yupResolver(userSchema) as never,
        defaultValues: initial,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-h-96 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input {...register('name.firstname')} className="w-full border rounded px-3 py-2 text-sm" />
                    {errors.name?.firstname && <p className="text-red-500 text-xs">{errors.name.firstname.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Apellido</label>
                    <input {...register('name.lastname')} className="w-full border rounded px-3 py-2 text-sm" />
                    {errors.name?.lastname && <p className="text-red-500 text-xs">{errors.name.lastname.message}</p>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input {...register('email')} className="w-full border rounded px-3 py-2 text-sm" />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Usuario</label>
                <input {...register('username')} className="w-full border rounded px-3 py-2 text-sm" />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <input type="password" {...register('password')} className="w-full border rounded px-3 py-2 text-sm" />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input {...register('phone')} className="w-full border rounded px-3 py-2 text-sm" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Ciudad</label>
                    <input {...register('address.city')} className="w-full border rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Calle</label>
                    <input {...register('address.street')} className="w-full border rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input type="number" {...register('address.number')} className="w-full border rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Código postal</label>
                    <input {...register('address.zipcode')} className="w-full border rounded px-3 py-2 text-sm" />
                </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50">
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};
