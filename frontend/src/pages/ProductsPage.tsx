import { Layout } from './Layout';
import { ProductList } from '../components/products/ProductList';

export const ProductsPage: React.FC = () => (
    <Layout>
        <h1 className="text-2xl font-bold mb-6">Productos</h1>
        <ProductList />
    </Layout>
);
