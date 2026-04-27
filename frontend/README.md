# Frontend – E-commerce

Interfaz para un e-commerce construida con React + TypeScript + Vite, consumiendo la API de [fakestoreapi.com](https://fakestoreapi.com/).

---

## Requisitos previos

- Node.js 18+
- npm 9+

---

## Instalación y ejecución

```bash
# Desde la raíz del repositorio
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación corre en `http://localhost:5173`.

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el bundle de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Ejecuta los tests en modo watch |
| `npm run test:run` | Ejecuta los tests una sola vez |

---

## Variables de entorno

El archivo `.env` ya está incluido con la configuración por defecto:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

---

## Credenciales de prueba

```
Usuario: mor_2314
Contraseña: 83r5^_
```

---

## Funcionalidades

- **Login** — autenticación con token JWT via fakestoreapi
- **Productos** — listado con filtro por categoría, ordenamiento y paginación. CRUD completo (crear, editar, eliminar)
- **Usuarios** — tabla con ordenamiento y paginación. CRUD completo
- **Carrito** — dos vistas:
  - *Mi carrito*: carrito local persistido en localStorage con paginación
  - *Gestión de carritos*: CRUD completo contra la API `/carts`
- **Paginación cliente** en todos los listados
- **Rutas protegidas** — redirige a `/login` si no hay sesión activa

---

## Dependencias principales

| Paquete | Uso |
|---------|-----|
| `react` + `react-dom` | Framework UI |
| `react-router-dom` | Enrutamiento |
| `axios` | Cliente HTTP |
| `zustand` | Estado global (auth y carrito) |
| `react-hook-form` | Manejo de formularios |
| `@hookform/resolvers` + `yup` | Validación de formularios |
| `tailwindcss` | Estilos |
| `vitest` + `@testing-library/react` | Tests unitarios |

---

## Estructura de carpetas

```
src/
├── components/
│   ├── auth/        # LoginForm
│   ├── cart/        # CartList, CartForm
│   ├── common/      # Navbar, Modal, Pagination
│   ├── products/    # ProductList, ProductCard, ProductForm
│   └── users/       # UserList, UserForm
├── pages/           # ProductsPage, UsersPage, CartPage, LoginPage
├── services/        # Llamadas a la API (axios)
├── store/           # Zustand stores
├── tests/           # Tests unitarios
├── types/           # Interfaces TypeScript
└── utils/           # Paginación, validadores
```
