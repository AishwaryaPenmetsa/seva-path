// ============================================================
// SevaPath — Auth Modal (Log In / Create Account Demo)
// ============================================================

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { X, ShieldCheck, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signup',
  onSuccess,
}: AuthModalProps) {
  const { language, login } = useApp();
  const te = language === 'te';

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError(te ? 'దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామాను నమోదు చేయండి' : 'Please enter a valid email address');
      return;
    }

    if (!password || password.length < 4) {
      setError(te ? 'పాస్‌వర్డ్ కనీసం 4 అక్షరాలు ఉండాలి' : 'Password must be at least 4 characters');
      return;
    }

    // Perform demo auth login
    login(email, mode === 'signup' ? name : undefined);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onSuccess?.();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E2E6EA] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#173B5F] to-[#16856A] text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-3">
            <ShieldCheck size={14} className="text-[#1EB993]" />
            <span>{te ? 'సేవాపాత్ ఖాతా' : 'SevaPath Account'}</span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight mb-1">
            {mode === 'signup'
              ? (te ? 'మీ సేవాపాత్ ప్రయాణాన్ని సేవ్ చేయండి' : 'Save Your SevaPath Journey')
              : (te ? 'ఖాతాలోకి లాగిన్ అవ్వండి' : 'Log In to SevaPath')}
          </h3>
          <p className="text-xs text-white/80 leading-relaxed">
            {te
              ? 'ఒకే చోట మీ ప్రయోజనాలు, పత్రాలు మరియు పురోగతిని సేవ్ చేయడానికి ఖాతాను సృష్టించండి.'
              : 'Save your benefits, documents, and application progress in one place.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4 border border-white/10">
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'signup' ? 'bg-white text-[#173B5F] shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              {te ? 'ఖాతా సృష్టించండి' : 'Create Account'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'login' ? 'bg-white text-[#173B5F] shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              {te ? 'లాగ్ ఇన్' : 'Log In'}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center animate-fade-in">
              <CheckCircle2 size={48} className="mx-auto text-[#16856A] mb-3" />
              <h4 className="text-lg font-extrabold text-[#173B5F] mb-1">
                {mode === 'signup'
                  ? (te ? 'ఖాతా విజయవంతంగా సృష్టించబడింది!' : 'Account Created Successfully!')
                  : (te ? 'విజయవంతంగా లాగిన్ అయ్యారు!' : 'Logged In Successfully!')}
              </h4>
              <p className="text-xs text-[#66727E]">
                {te ? 'మీ ప్రయాణం సేవ్ చేయబడింది.' : 'Your SevaPath journey is saved.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-[#FDE8E8] text-[#C94A4A] text-xs font-semibold">
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#173B5F] mb-1.5">
                    {te ? 'పూర్తి పేరు' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-[#66727E]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={te ? 'మీ పేరు (ఉదా. రాము)' : 'e.g. Rahul Sharma'}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E6EA] rounded-xl text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#173B5F] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#173B5F] mb-1.5">
                  {te ? 'ఇమెయిల్ చిరునామా' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-[#66727E]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E6EA] rounded-xl text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#173B5F] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B5F] mb-1.5">
                  {te ? 'పాస్‌వర్డ్' : 'Password'}
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-[#66727E]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E6EA] rounded-xl text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#173B5F] transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2"
                >
                  <span>
                    {mode === 'signup'
                      ? (te ? 'ఖాతా సృష్టించి సేవ్ చేయండి' : 'Create Account & Save')
                      : (te ? 'లాగ్ ఇన్ చేసి సేవ్ చేయండి' : 'Log In & Save')}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="text-[11px] text-center text-[#66727E] pt-1">
                {te
                  ? 'డెమో ఖాతా — బ్రౌజర్ డేటా సురక్షితంగా సేవ్ చేయబడుతుంది.'
                  : 'Demo Authentication — Your profile and applications are saved locally.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
