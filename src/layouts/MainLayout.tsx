import { Outlet } from 'react-router-dom';
import { TopContactBar } from '@/components/layout/TopContactBar';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopContactBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
