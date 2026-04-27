import { useForm, useFieldArray } from 'react-hook-form';
import type { Cart } from '../../types/cart';

interface CartFormProps {
    initial?: Cart;
    onSubmit: (data: Omit<Cart, 'id'>) => void;
    loading?: boolean;
}

export const CartForm: React.FC<CartFormProps> = ({ initial, onSubmit, loading }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<Omit<Cart, 'id'>>({
        defaultValues: initial ?? {
            userId: 1,
            date: new Date().toISOString().split('T')[0],
            products: [{ productId: 1, quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'products' });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Usuario ID</label>
                <input type="number" {...register('userId', { required: true, valueAsNumber: true })} className="w-full border rounded px-3 py-2 text-sm" />
                {errors.userId && <p className="text-red-500 text-xs">Requerido</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input type="date" {...register('date', { required: true })} className="w-full border rounded px-3 py-2 text-sm" />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Productos</label>
                    <button type="button" onClick={() => append({ productId: 1, quantity: 1 })} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                        + Agregar
                    </button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                        <input
                            type="number"
                            placeholder="ID producto"
                            {...register(`products.${index}.productId`, { valueAsNumber: true })}
                            className="flex-1 border rounded px-3 py-2 text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Cantidad"
                            {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                            className="w-24 border rounded px-3 py-2 text-sm"
                        />
                        {fields.length > 1 && (
                            <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                        )}
                    </div>
                ))}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50">
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};
