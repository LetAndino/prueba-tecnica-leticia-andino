import { Layout } from './Layout';
import { UserList } from '../components/users/UserList';

export const UsersPage: React.FC = () => (
    <Layout>
        <h1 className="text-2xl font-bold mb-6">Usuarios</h1>
        <UserList />
    </Layout>
);
