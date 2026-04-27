import * as yup from 'yup';

export const productSchema = yup.object({
    title: yup.string().required('El título es obligatorio').max(200),
    price: yup.number().required('El precio es obligatorio').positive(),
    description: yup.string().required('La descripción es obligatoria'),
    category: yup.string().required('La categoría es obligatoria'),
    image: yup.string().url('Debe ser una URL válida').required('La imagen es obligatoria'),
});

export const userSchema = yup.object({
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    username: yup.string().required('El usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
    phone: yup.string().required('El teléfono es obligatorio'),
    name: yup.object({
        firstname: yup.string().required('El nombre es obligatorio'),
        lastname: yup.string().required('El apellido es obligatorio'),
    }),
    address: yup.object({
        city: yup.string().required('La ciudad es obligatoria'),
        street: yup.string().required('La calle es obligatoria'),
        number: yup.number().required('El número es obligatorio'),
        zipcode: yup.string().required('El código postal es obligatorio'),
        geolocation: yup.object({
            lat: yup.string().required('Latitud requerida'),
            long: yup.string().required('Longitud requerida'),
        }),
    }),
});

export const loginSchema = yup.object({
    username: yup.string().required('El usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});