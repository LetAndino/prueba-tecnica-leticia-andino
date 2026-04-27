import { Navbar } from '../components/common/Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
    </div>
);
