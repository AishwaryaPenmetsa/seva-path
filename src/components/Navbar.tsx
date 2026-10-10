// ============================================================
// SevaPath — Universal Navbar (Desktop & Mobile)
// Navigation: Home, Find Help, For You, Form Guides, Help Map, My Applications, Help
// Persistent 3-way language switcher: EN | తెలుగు | हिन्दी
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types';
import {
  Globe, Search, FileText, User, Sparkles,
  ShieldCheck, HelpCircle, Users, Home, MapPin, BookOpen
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
    if (path === '/find' && (location.pathname === '/find' || location.pathname === '/questionnaire' || location.pathname.startsWith('/find/'))) {
      return true;
    }
    if (path === '/for' && location.pathname.startsWith('/for/')) return true;
    if (path === '/form-guides' && (location.pathname === '/form-guides' || location.pathname === '/form-explainer')) return true;
    return location.pathname === path;
  };

  const isDark = isTransparent && !scrolled;

  const navLinks: { to: string; label: string; labelTe: string; labelHi: string }[] = [
    { to: '/', label: 'Home', labelTe: 'హోమ్', labelHi: 'होम' },
    { to: '/find', label: 'Find Help', labelTe: 'సహాయం కనుగొనండి', labelHi: 'सहायता खोजें' },
    { to: '/for/student', label: 'For You', labelTe: 'మీ కోసం', labelHi: 'आपके लिए' },
    { to: '/form-guides', label: 'Form Guides', labelTe: 'ఫారమ్ గైడ్‌లు', labelHi: 'फॉर्म गाइड' },
    { to: '/help-map', label: 'Help Map', labelTe: 'హెల్ప్ మ్యాప్', labelHi: 'हेल्प मैप' },
    { to: '/applications', label: 'My Applications', labelTe: 'నా దరఖాస్తులు', labelHi: 'मेरे आवेदन' },
    { to: '/help', label: 'Help', labelTe: 'సహాయం', labelHi: 'सहायता' },
  ];

  const getLabel = (l: { label: string; labelTe: string; labelHi: string }) => {
    if (language === 'te') return l.labelTe;
    if (language === 'hi') return l.labelHi;
    return l.label;
  };

  return (
    <>
      {/* Desktop Nav */}
      <header
        className={`navbar hidden md:block sticky top-0 z-40 transition-all duration-500 ${
          isDark
            ? 'navbar--dark bg-transparent border-b border-white/8'
            : 'bg-white/95 backdrop-blur-md border-b border-[#D8CDBB]/70 shadow-[0_2px_12px_rgba(21,23,25,0.04)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="SevaPath Home">
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
            <nav className="flex items-center gap-0.5" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-2.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#B85F45]/40 whitespace-nowrap ${
                      isDark
                        ? active
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        : active
                          ? 'bg-[#F1EDE4] text-[#151719] shadow-xs'
                          : 'text-[#728477] hover:text-[#151719] hover:bg-[#F1EDE4]/60'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {getLabel(link)}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* 3-way Language Switcher */}
            <div
              className={`flex items-center rounded-full p-0.5 border text-xs font-bold transition-all ${
                isDark
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-[#F1EDE4] border-[#D8CDBB] text-[#151719]'
              }`}
              role="group"
              aria-label="Language selection"
            >
              {(['en', 'te', 'hi'] as Language[]).map((lang) => {
                const isSelected = language === lang;
                const label = lang === 'en' ? 'EN' : lang === 'te' ? 'తెలుగు' : 'हिन्दी';
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-white text-[#151719] shadow-xs'
                          : 'bg-[#151719] text-white shadow-xs'
                        : isDark
                          ? 'text-white/70 hover:text-white'
                          : 'text-[#728477] hover:text-[#151719]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

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
              <span>{language === 'te' ? 'ప్రొఫైల్' : language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header
        className={`md:hidden sticky top-0 z-40 px-4 h-14 flex items-center justify-between transition-all duration-500 ${
          isDark
            ? 'bg-transparent border-b border-white/8'
            : 'bg-white/95 backdrop-blur-md border-b border-[#D8CDBB]'
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
        <div className="flex items-center gap-1.5">
          {(['en', 'te', 'hi'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                language === lang
                  ? isDark
                    ? 'bg-white text-[#151719] border-white'
                    : 'bg-[#151719] text-white border-[#151719]'
                  : isDark
                    ? 'bg-white/10 text-white/70 border-white/20'
                    : 'bg-[#F1EDE4] text-[#728477] border-[#D8CDBB]'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'te' ? 'తె' : 'हि'}
            </button>
          ))}
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav
        className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around py-2 px-1 bg-[#FAF8F3]/95 backdrop-blur-lg border-t border-[#D8CDBB]"
        aria-label="Mobile navigation"
      >
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/') ? 'page' : undefined}
        >
          <Home size={17} />
          <span>{language === 'te' ? 'హోమ్' : language === 'hi' ? 'होम' : 'Home'}</span>
        </Link>
        <Link
          to="/find"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/find') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/find') ? 'page' : undefined}
        >
          <Search size={17} />
          <span>{language === 'te' ? 'కనుగొనండి' : language === 'hi' ? 'खोजें' : 'Find'}</span>
        </Link>
        <Link
          to="/for/student"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/for') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/for') ? 'page' : undefined}
        >
          <Users size={17} />
          <span>{language === 'te' ? 'మీ కోసం' : language === 'hi' ? 'आपके लिए' : 'For You'}</span>
        </Link>
        <Link
          to="/applications"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/applications') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/applications') ? 'page' : undefined}
        >
          <FileText size={17} />
          <span>{language === 'te' ? 'దరఖాస్తులు' : language === 'hi' ? 'आवेदन' : 'Apps'}</span>
        </Link>
        <Link
          to="/help"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/help') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/help') ? 'page' : undefined}
        >
          <HelpCircle size={17} />
          <span>{language === 'te' ? 'సహాయం' : language === 'hi' ? 'सहायता' : 'Help'}</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[9px] font-semibold transition-all ${
            isActive('/profile') ? 'text-[#B85F45] bg-[#F1EDE4]' : 'text-[#728477]'
          }`}
          aria-current={isActive('/profile') ? 'page' : undefined}
        >
          <User size={17} />
          <span>{language === 'te' ? 'ప్రొఫైల్' : language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
        </Link>
      </nav>
    </>
  );
}
