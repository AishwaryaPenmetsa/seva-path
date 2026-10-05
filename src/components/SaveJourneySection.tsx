// ============================================================
// SevaPath — Save My SevaPath Journey Section (Final Step CTA)
// ============================================================

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import AuthModal from './AuthModal';
import { BookmarkCheck, ShieldCheck, UserCheck, LogOut, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SaveJourneySection() {
  const { language, authUser, logout } = useApp();
  const te = language === 'te';

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('signup');

  const openAuth = (mode: 'login' | 'signup') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <>
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#173B5F] via-[#1A456E] to-[#16856A] text-white shadow-xl relative overflow-hidden my-8 animate-fade-in border border-white/10">
        {/* Background glow accent */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#1EB993]/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-[#D99A24]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/20">
            <Sparkles size={14} className="text-[#D99A24]" />
            <span>{te ? 'ముగింపు దశ — మీ ప్రయాణాన్ని భద్రపరచండి' : 'Final Step — Save Your Journey'}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
            <BookmarkCheck size={24} className="text-[#1EB993] shrink-0" />
            <span>{te ? 'నా సేవాపాత్ ప్రయాణాన్ని సేవ్ చేయండి' : 'Save My SevaPath Journey'}</span>
          </h2>

          <p className="text-xs md:text-sm text-white/85 leading-relaxed max-w-xl mb-6">
            {te
              ? 'ఒకే చోట మీ ప్రయోజనాలు, పత్రాలు మరియు దరఖాస్తు పురోగతిని సేవ్ చేయడానికి ఖాతాను సృష్టించండి.'
              : 'Create an account to save your benefits, documents, and application progress in one place.'}
          </p>

          {authUser && authUser.isLoggedIn ? (
            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1EB993]/30 border border-[#1EB993]/50 flex items-center justify-center text-white shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{authUser.name}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1EB993] text-white text-[10px] font-extrabold">
                      <CheckCircle2 size={11} /> {te ? 'సేవ్ చేయబడింది' : 'Saved'}
                    </span>
                  </div>
                  <span className="text-xs text-white/70 block">{authUser.email}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all self-end sm:self-center"
              >
                <LogOut size={14} />
                <span>{te ? 'నిష్క్రమించండి' : 'Log Out'}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openAuth('signup')}
                className="px-5 py-3 rounded-2xl bg-[#1EB993] hover:bg-[#199d7d] text-white text-xs md:text-sm font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <UserCheck size={16} />
                <span>{te ? 'ఖాతా సృష్టించండి' : 'Create Account'}</span>
              </button>

              <button
                onClick={() => openAuth('login')}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs md:text-sm font-extrabold border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Lock size={15} />
                <span>{te ? 'లాగ్ ఇన్' : 'Log In'}</span>
              </button>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-[11px] text-white/60">
            <ShieldCheck size={14} className="text-[#1EB993] shrink-0" />
            <span>
              {te
                ? 'ముందుగా సైన్ ఇన్ చేయాల్సిన అవసరం లేదు. మీరు ఎల్లప్పుడూ ఉచితంగా అన్వేషించవచ్చు.'
                : 'No initial login required. You can always explore benefits freely.'}
            </span>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
      />
    </>
  );
}
