import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Languages, ChevronDown } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState('EN');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, hasActivePlan, user } = useAuth();
  const isAdmin = user?.is_admin === true;

  const isHome = location.pathname === '/';
  const languages = [
    { label: 'English', shortCode: 'EN', gtCode: 'en' },
    { label: 'Español', shortCode: 'ES', gtCode: 'es' },
    { label: 'Deutsch', shortCode: 'DE', gtCode: 'de' },
    { label: 'Svenska', shortCode: 'SV', gtCode: 'sv' },
  ];

  const navLinks = isAdmin
    ? [
        { name: 'Profile', path: '/my-account', isHash: false },
        { name: 'Live Classes', path: '/my-account?tab=classes', isHash: false },
      ]
    : [
        { name: 'Home', path: '/', isHash: false },
        { name: 'Library', path: '/library', isHash: false },
        ...(!hasActivePlan ? [{ name: 'Pricing', path: '/pricing', isHash: false }] : []),
        { name: 'Unsubscribe', path: '/unsubscribe', isHash: false },
      ];

  const handleNavClick = (link: { name: string; path: string; isHash?: boolean }) => {
    setIsOpen(false);
    if (link.isHash && isHome) {
      const el = document.getElementById(link.path.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link.path);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (isAdmin && path === '/my-account') return location.pathname === '/my-account' && new URLSearchParams(location.search).get('tab') !== 'classes';
    if (path.includes('?')) return `${location.pathname}${location.search}` === path;
    return location.pathname.startsWith(path);
  };

  const handleLangChange = (language: typeof languages[number]) => {
    setLanguageCode(language.shortCode);
    setIsLanguageOpen(false);
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (!select) return;
    select.value = language.gtCode;
    select.dispatchEvent(new Event('change'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#090D16]/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-extrabold tracking-tight text-xl group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all bg-gradient-to-tr from-[#00B67A] to-teal-400 shadow-emerald-500/25 group-hover:shadow-emerald-500/40 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline font-black tracking-tight text-lg text-white">
              <span>Content</span>
              <span className="text-[#00B67A] ml-1">AI Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                type="button"
                className={`text-sm font-semibold transition-colors relative py-1 cursor-pointer ${
                  isActive(link.path)
                    ? 'text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full animate-fadeIn bg-gradient-to-r from-emerald-400 to-teal-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Auth CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border text-slate-300 hover:text-white hover:bg-white/5 border-white/10"
                aria-haspopup="listbox"
                aria-expanded={isLanguageOpen}
                aria-label="Choose language"
              >
                <Languages className="w-3.5 h-3.5 text-[#00D084]" />
                <span>{languageCode}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-xl p-1.5 shadow-2xl z-50 border border-white/10 bg-[#0F172A]/95 text-slate-200 backdrop-blur-xl" role="listbox">
                  {languages.map((language) => (
                    <button
                      key={language.gtCode}
                      type="button"
                      onClick={() => handleLangChange(language)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <Link
                to="/my-account"
                className="text-xs font-bold px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                {isAdmin ? 'Profile' : 'My Account'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                Log In
              </Link>
            )}
            {!isAdmin && !hasActivePlan && (
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white text-xs font-bold shadow-[0_4px_15px_rgba(0,182,122,0.35)] active:scale-95 transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>Get Access</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 space-y-2 animate-fadeIn border-b backdrop-blur-xl bg-[#090D16]/98 border-white/10 text-white">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              type="button"
              className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                isActive(link.path)
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen((open) => !open)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg border text-slate-200 hover:text-white hover:bg-white/5 border-white/10"
                aria-expanded={isLanguageOpen}
              >
                <Languages className="w-4 h-4 text-[#00D084]" />
                <span>Language: {languageCode}</span>
              </button>
              {isLanguageOpen && (
                <div className="mt-1 rounded-xl p-1.5 shadow-lg border border-white/10 bg-[#0F172A] text-slate-200">
                  {languages.map((language) => (
                    <button
                      key={language.gtCode}
                      type="button"
                      onClick={() => handleLangChange(language)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <Link
                to="/my-account"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium rounded-lg border text-slate-200 hover:text-white hover:bg-white/5 border-white/10"
              >
                {isAdmin ? 'Profile' : 'My Account'}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium rounded-lg border text-slate-200 hover:text-white hover:bg-white/5 border-white/10"
              >
                Log In
              </Link>
            )}
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold text-white rounded-full shadow-lg bg-[#00B67A] shadow-emerald-500/25"
            >
              Explore 6 Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
