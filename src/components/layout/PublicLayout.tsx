import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <div className={`min-h-screen ${isHome ? 'bg-[#08121E] text-white' : 'bg-[#F4F8FC] text-slate-800'} font-sans selection:bg-emerald-500 selection:text-white flex flex-col justify-between`}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
