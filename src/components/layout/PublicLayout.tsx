import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isDarkTheme = isHome;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500 selection:text-white flex flex-col justify-between relative overflow-x-clip ${
      isDarkTheme ? 'bg-[#08121E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* Global Ambient Lighting Accents for Home and Subpages */}
      {isDarkTheme ? (
        <>
          <div className="pointer-events-none fixed -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[150px] -z-10" />
          <div className="pointer-events-none fixed top-1/3 -right-20 h-[480px] w-[480px] rounded-full bg-teal-500/10 blur-[140px] -z-10" />
          <div className="pointer-events-none fixed bottom-1/4 -left-20 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px] -z-10" />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-emerald-500/8 blur-[140px] -z-10" />
          <div className="pointer-events-none fixed top-1/2 -right-24 h-[450px] w-[450px] rounded-full bg-teal-500/6 blur-[130px] -z-10" />
          <div className="pointer-events-none fixed bottom-10 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-500/6 blur-[130px] -z-10" />
        </>
      )}

      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};