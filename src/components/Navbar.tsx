// ============================================================
// SevaPath — Premium Navbar Component
// Navigation: Home | Find Help | For You | Form Guides | My Applications
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
  ShieldCheck,
  Users,
  Briefcase,
  Menu,
  X as CloseIcon,
} from 'lucide-react';

interface NavbarProps {
  isTransparent?: boolean;
}

export default function Navbar({ isTransparent = false }: NavbarProps) {
  const { t, language, setLanguage } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (path === '/for' && location.pathname.startsWith('/for/')) return true;
    return location.pathname === path;
  };

  const isDark = isTransparent && !scrolled;

  const navLinks = [
    { to: '/', label: 'Home', labelTe: 'హోమ్' },
    { to: '/find', label: t('nav.findHelp'), labelTe: 'సహాయం కనుగొనండి' },
    { to: '/for/student', label: 'For You', labelTe: 'మీ కోసం' },
    { to: '/form-explainer', label: 'Form Guides', labelTe: 'ఫారమ్ గైడ్‌లు' },
    { to: '/help-map', label: 'Help Map', labelTe: 'హెల్ప్ మ్యాప్' },
    { to: '/applications', label: t('nav.myApplications'), labelTe: 'నా దరఖాస్తులు' },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <header
        className={`navbar hidden md:block sticky top-0 z-40 transition-all duration-500 ${
          isDark
            ? 'navbar--dark bg-transparent border-b border-white/8'
            : 'bg-white/90 backdrop-blur-md border-b border-[#D8CDBB]/60 shadow-[0_2px_12px_rgba(21,23,25,0.04)]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="SevaPath Home">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-tr from-[#B85F45] to-[#D99A24]'
                  : 'bg-gradient-to-tr from-[#151719] to-[#30364F]'
              }`}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className={`text-lg font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-[#151719]'}`}>
                  SEVAPATH
                </span>
                <span className={`block text-[9px] font-bold uppercase tracking-wider -mt-1 transition-colors ${isDark ? 'text-[#D99A24]' : 'text-[#B85F45]'}`}>
                  Civic-Tech Engine
                </span>
              </div>
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(({ to, label, labelTe }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#B85F45]/40 ${
                      isDark
                        ? active
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        : active
                          ? 'bg-[#F1EDE4] text-[#151719] shadow-sm'
                          : 'text-[#728477] hover:text-[#151719] hover:bg-[#F1EDE4]/60'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {language === 'te' ? labelTe : label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border focus:outline-none focus:ring-2 focus:ring-[#B85F45]/40 ${
                isDark
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-[#F1EDE4] hover:bg-[#D8CDBB] text-[#151719] border-[#D8CDBB]'
              }`}
              aria-label={`Switch to ${language === 'en' ? 'Telugu' : 'English'}`}
            >
              <Globe size={14} className={isDark ? 'text-[#D99A24]' : 'text-[#B85F45]'} />
              <span className={language === 'en' ? '' : 'opacity-50'}>EN</span>
              <span className={isDark ? 'text-white/30' : 'text-[#D8CDBB]'}>|</span>
              <span className={language === 'te' ? (isDark ? 'text-[#D99A24]' : 'text-[#B85F45]') : 'opacity-50'}>తెలుగు</span>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#B85F45]/40 ${
                isDark
                  ? isActive('/profile')
                    ? 'bg-[#B85F45] text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  : isActive('/profile')
                    ? 'bg-[#151719] text-white shadow-sm'
                    : 'text-[#728477] hover:text-[#151719] hover:bg-[#F1EDE4]/60'
              }`}
              aria-current={isActive('/profile') ? 'page' : undefined}
            >
              <User size={15} />
              {language === 'te' ? 'ప్రొఫైల్' : t('nav.profile')}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header
        className={`md:hidden sticky top-0 z-40 px-4 h-14 flex items-center justify-between transition-all duration-500 ${
          isDark
            ? 'bg-transparent border-b border-white/8'
            : 'bg-white/90 backdrop-blur-md border-b border-[#D8CDBB]'
        }`}
      >
        <Link to="/" className="flex items-center gap-2" aria-label="SevaPath Home">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm ${
            isDark ? 'bg-gradient-to-tr from-[#B85F45] to-[#D99A24]' : 'bg-gradient-to-tr from-[#151719] to-[#30364F]'
          }`}>
            <ShieldCheck size={16} />
          </div>
          <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#151719]'}`}>
            SEVAPATH
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
              isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-[#F1EDE4] text-[#151719] border-[#D8CDBB]'
            }`}
            aria-label="Toggle language"
          >
            <Globe size={13} className={isDark ? 'text-[#D99A24]' : 'text-[#B85F45]'} />
            <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav
        className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around py-2 px-2 bg-[#FAF8F3]/95 backdrop-blur-lg border-t border-[#D8CDBB]"
        aria-label="Mobile navigation"
      >
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
            isActive('/') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/') ? 'page' : undefined}
        >
          <Home size={18} />
          {language === 'te' ? 'హోమ్' : 'Home'}
        </Link>
        <Link
          to="/find"
          className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
            isActive('/find') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/find') ? 'page' : undefined}
        >
          <Search size={18} />
          {language === 'te' ? 'కనుగొనండి' : 'Find'}
        </Link>
        <Link
          to="/for/student"
          className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
            isActive('/for') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/for') ? 'page' : undefined}
        >
          <Users size={18} />
          {language === 'te' ? 'మీ కోసం' : 'For You'}
        </Link>
        <Link
          to="/applications"
          className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
            isActive('/applications') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/applications') ? 'page' : undefined}
        >
          <FileText size={18} />
          {language === 'te' ? 'దరఖాస్తులు' : 'Applications'}
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
            isActive('/profile') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/profile') ? 'page' : undefined}
        >
          <User size={18} />
          {language === 'te' ? 'ప్రొఫైల్' : 'Profile'}
        </Link>
      </nav>
    </>
  );
}
