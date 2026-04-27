import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../utils/validators';
import type { Product, ProductInput } from '../../types/product';

interface ProductFormProps {
    initial?: Product;
    onSubmit: (data: ProductInput) => void;
    loading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initial, onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductInput>({
        resolver: yupResolver(productSchema),
        defaultValues: initial,
    });

    const field = (label: string, name: keyof ProductInput, type = 'text') => (
        <div className="mb-3">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input type={type} {...register(name)} className="w-full border rounded px-3 py-2 text-sm" />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {field('Título', 'title')}
            {field('Precio', 'price', 'number')}
            {field('Descripción', 'description')}
            {field('Categoría', 'category')}
            {field('URL de imagen', 'image')}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};
