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
  const { isAuthenticated, hasActivePlan } = useAuth();

  const isHome = location.pathname === '/';
  const languages = [
    { label: 'English', shortCode: 'EN', gtCode: 'en' },
    { label: 'Español', shortCode: 'ES', gtCode: 'es' },
    { label: 'Deutsch', shortCode: 'DE', gtCode: 'de' },
    { label: 'Svenska', shortCode: 'SV', gtCode: 'sv' },
  ];

  const navLinks = [
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHome 
        ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-white/10' 
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-extrabold tracking-tight text-xl group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
              isHome 
                ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 shadow-emerald-500/25 group-hover:shadow-emerald-500/40' 
                : 'bg-gradient-to-tr from-[#0B57A2] via-blue-600 to-cyan-500 shadow-blue-500/25'
            }`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className={`flex items-baseline font-black tracking-tight text-lg ${isHome ? 'text-white' : 'text-slate-900'}`}>
              <span>Content</span>
              <span className={`bg-clip-text text-transparent ${
                isHome 
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400' 
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600'
              }`}>AIHub</span>
              <span className="text-emerald-500 font-mono text-xs ml-0.5 font-bold">.net</span>
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
                    ? isHome ? 'text-white font-bold' : 'text-[#0B57A2] font-bold'
                    : isHome ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full animate-fadeIn ${
                    isHome ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-[#0B57A2]'
                  }`} />
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
                className={`inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-bold rounded-lg transition-colors ${isHome ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'}`}
                aria-haspopup="listbox"
                aria-expanded={isLanguageOpen}
                aria-label="Choose language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{languageCode}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl text-slate-800" role="listbox">
                  {languages.map((language) => (
                    <button key={language.gtCode} type="button" onClick={() => handleLangChange(language)} className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-slate-100">
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <Link
                to="/my-account"
                className={`text-xs font-bold px-3 py-2 transition-colors ${
                  isHome ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                className={`text-xs font-bold px-3 py-2 transition-colors ${
                  isHome ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`p-2 rounded-lg focus:outline-none ${
                isHome ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`lg:hidden px-4 pt-3 pb-6 space-y-2 animate-fadeIn border-b ${
          isHome 
            ? 'bg-[#090D16]/98 backdrop-blur-xl border-white/10 text-white' 
            : 'bg-white/98 backdrop-blur-xl border-slate-200 shadow-xl text-slate-800'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              type="button"
              className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                isActive(link.path)
                  ? isHome ? 'bg-white/10 text-white font-semibold' : 'bg-blue-50 text-[#0B57A2] font-bold'
                  : isHome ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className={`pt-4 border-t flex flex-col gap-2 ${isHome ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen((open) => !open)}
                className={`w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg ${isHome ? 'text-slate-200 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-expanded={isLanguageOpen}
              >
                <Languages className="w-4 h-4" />
                <span>Language: {languageCode}</span>
              </button>
              {isLanguageOpen && (
                <div className="mt-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg text-slate-800">
                  {languages.map((language) => (
                    <button key={language.gtCode} type="button" onClick={() => handleLangChange(language)} className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-slate-100">
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
                className={`w-full text-center py-2.5 text-sm font-medium rounded-lg ${
                  isHome ? 'text-slate-200 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`w-full text-center py-2.5 text-sm font-medium rounded-lg ${
                  isHome ? 'text-slate-200 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Log In
              </Link>
            )}
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-2.5 text-sm font-bold text-white rounded-full shadow-lg ${
                isHome ? 'bg-[#00B67A] shadow-emerald-500/30' : 'bg-[#0B57A2] shadow-blue-500/30'
              }`}
            >
              Explore 6 Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
