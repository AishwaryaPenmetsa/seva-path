// ============================================================
// SevaPath — Premium Navbar Component
// Supports transparent mode over cinematic hero
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {
  Home,
  Search,
  FileText,
  User,
  Globe,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  isTransparent?: boolean;
}

export default function Navbar({ isTransparent = false }: NavbarProps) {
  const { t, language, setLanguage } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isTransparent) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isTransparent]);

  const isActive = (path: string) => {
    if (path === '/find' && (location.pathname === '/find' || location.pathname === '/questionnaire' || location.pathname === '/help-map')) {
      return true;
    }
    return location.pathname === path;
  };

  // Cinematic (dark) mode: transparent navbar over hero
  const isDark = isTransparent && !scrolled;

  return (
    <>
      {/* Desktop Nav */}
      <header
        className={`navbar hidden md:block sticky top-0 z-40 transition-all duration-500 ${
          isDark
            ? 'navbar--dark bg-transparent border-b border-white/8'
            : 'bg-white/90 backdrop-blur-md border-b border-[#E2E6EA]/80 shadow-[0_2px_12px_rgba(23,59,95,0.04)]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-tr from-[#16856A] to-[#1EB993] shadow-[#16856A]/30'
                  : 'bg-gradient-to-tr from-[#173B5F] to-[#16856A] shadow-[#173B5F]/20'
              }`}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className={`text-lg font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-[#173B5F]'}`}>
                  SEVAPATH
                </span>
                <span className={`block text-[9px] font-bold uppercase tracking-wider -mt-1 transition-colors ${isDark ? 'text-[#1EB993]' : 'text-[#16856A]'}`}>
                  Civic-Tech Engine
                </span>
              </div>
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-2">
              <Link
                to="/find"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isDark
                    ? isActive('/find')
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    : isActive('/find')
                      ? 'bg-[#EAF2F8] text-[#173B5F] shadow-sm'
                      : 'text-[#66727E] hover:text-[#17212B] hover:bg-black/5'
                }`}
              >
                {t('nav.findHelp')}
              </Link>
              <Link
                to="/applications"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isDark
                    ? isActive('/applications')
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    : isActive('/applications')
                      ? 'bg-[#EAF2F8] text-[#173B5F] shadow-sm'
                      : 'text-[#66727E] hover:text-[#17212B] hover:bg-black/5'
                }`}
              >
                {t('nav.myApplications')}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                isDark
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-[#F0F2F4] hover:bg-[#EAF2F8] text-[#173B5F] border-[#E2E6EA]'
              }`}
              aria-label="Toggle language"
            >
              <Globe size={14} className={isDark ? 'text-[#1EB993]' : 'text-[#16856A]'} />
              <span className={language === 'en' ? (isDark ? 'text-white' : 'text-[#173B5F]') : 'opacity-60'}>EN</span>
              <span className={isDark ? 'text-white/30' : 'text-[#CBD5E1]'}>|</span>
              <span className={language === 'te' ? (isDark ? 'text-[#1EB993]' : 'text-[#16856A]') : 'opacity-60'}>తెలుగు</span>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDark
                  ? isActive('/profile')
                    ? 'bg-[#16856A] text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  : isActive('/profile')
                    ? 'bg-[#173B5F] text-white shadow-sm shadow-[#173B5F]/20'
                    : 'text-[#66727E] hover:text-[#17212B] hover:bg-black/5'
              }`}
            >
              <User size={15} />
              {t('nav.profile')}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header
        className={`md:hidden sticky top-0 z-40 px-4 h-14 flex items-center justify-between transition-all duration-500 ${
          isDark
            ? 'bg-transparent border-b border-white/8'
            : 'bg-white/90 backdrop-blur-md border-b border-[#E2E6EA]'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm ${
            isDark ? 'bg-gradient-to-tr from-[#16856A] to-[#1EB993]' : 'bg-gradient-to-tr from-[#173B5F] to-[#16856A]'
          }`}>
            <ShieldCheck size={16} />
          </div>
          <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#173B5F]'}`}>
            SEVAPATH
          </span>
        </Link>
        <button
          onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
            isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-[#F0F2F4] text-[#173B5F] border-[#E2E6EA]'
          }`}
          aria-label="Toggle language"
        >
          <Globe size={13} className={isDark ? 'text-[#1EB993]' : 'text-[#16856A]'} />
          <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
        </button>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav md:hidden flex items-center justify-around py-2 px-2 bg-white/95 backdrop-blur-lg border-t border-[#E2E6EA]">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            isActive('/') ? 'text-[#173B5F] bg-[#EAF2F8]' : 'text-[#66727E]'
          }`}
        >
          <Home size={18} />
          {t('nav.home')}
        </Link>
        <Link
          to="/find"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            isActive('/find') ? 'text-[#173B5F] bg-[#EAF2F8]' : 'text-[#66727E]'
          }`}
        >
          <Search size={18} />
          {t('nav.find')}
        </Link>
        <Link
          to="/applications"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            isActive('/applications') ? 'text-[#173B5F] bg-[#EAF2F8]' : 'text-[#66727E]'
          }`}
        >
          <FileText size={18} />
          {t('nav.applications')}
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            isActive('/profile') ? 'text-[#173B5F] bg-[#EAF2F8]' : 'text-[#66727E]'
          }`}
        >
          <User size={18} />
          {t('nav.profile')}
        </Link>
      </nav>
    </>
  );
}
