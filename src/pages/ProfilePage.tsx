// ============================================================
// SevaPath — Premium Profile Page
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { getBenefitById } from '../data/benefits';
import {
  User, Globe, Bookmark, FileText,
  Trash2, ChevronRight, AlertTriangle, ShieldCheck,
  Sparkles, Check
} from 'lucide-react';

export default function ProfilePage() {
  const {
    t, language, setLanguage,
    profileName, setProfileName,
    savedBenefits, toggleSavedBenefit,
    applications,
    clearAllData,
  } = useApp();
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profileName);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveName = () => {
    setProfileName(nameInput);
    setEditingName(false);
  };

  const handleClear = () => {
    clearAllData();
    setShowClearConfirm(false);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold mb-2">
            <ShieldCheck size={14} />
            <span>Local Browser Preferences</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F]">
            {t('profile.title')}
          </h1>
        </div>

        {/* Name Card */}
        <div className="card p-6 rounded-3xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#EAF2F8] text-[#173B5F] shadow-xs">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">{t('profile.name')}</h2>
              <span className="text-[11px] text-[#66727E]">Used for local greeting</span>
            </div>
          </div>
          {editingName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-[#E2E6EA] rounded-xl text-sm font-medium focus:outline-none focus:border-[#173B5F]"
                placeholder={language === 'te' ? 'మీ పేరు' : 'Your name'}
                autoFocus
              />
              <button onClick={handleSaveName} className="btn btn-primary btn-sm">{t('general.save')}</button>
              <button onClick={() => setEditingName(false)} className="btn btn-ghost btn-sm">{t('general.cancel')}</button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA]">
              <p className="text-sm font-bold text-[#17212B]">
                {profileName || (language === 'te' ? 'పేరు సెట్ చేయబడలేదు' : 'Citizen (Default)')}
              </p>
              <button onClick={() => { setNameInput(profileName); setEditingName(true); }} className="btn btn-secondary btn-sm text-xs">
                {language === 'te' ? 'సవరించు' : 'Edit'}
              </button>
            </div>
          )}
        </div>

        {/* Language Switcher Card */}
        <div className="card p-6 rounded-3xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#EAF2F8] text-[#173B5F] shadow-xs">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">{t('profile.language')}</h2>
              <span className="text-[11px] text-[#66727E]">Active interface language</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`btn btn-sm flex-1 ${language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
            >
              English {language === 'en' && <Check size={14} />}
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`btn btn-sm flex-1 ${language === 'te' ? 'btn-primary' : 'btn-secondary'}`}
            >
              తెలుగు {language === 'te' && <Check size={14} />}
            </button>
          </div>
        </div>

        {/* Saved Benefits Card */}
        <div className="card p-6 rounded-3xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#EAF2F8] text-[#173B5F] shadow-xs">
              <Bookmark size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">{t('profile.savedBenefits')}</h2>
              <span className="text-[11px] text-[#66727E]">{savedBenefits.length} Bookmarked</span>
            </div>
          </div>
          {savedBenefits.length === 0 ? (
            <p className="text-xs text-[#66727E] p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA] text-center">{t('profile.noSaved')}</p>
          ) : (
            <div className="space-y-2">
              {savedBenefits.map((id) => {
                const benefit = getBenefitById(id);
                if (!benefit) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA]">
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-xs font-bold text-[#17212B] truncate">
                        {language === 'te' ? benefit.nameTe : benefit.name}
                      </p>
                      <span className="text-[10px] font-bold text-[#16856A] uppercase">
                        {t(`cat.${benefit.category}` as any)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => navigate(`/benefit/${id}`)} className="btn btn-secondary btn-sm text-xs">
                        <ChevronRight size={14} />
                      </button>
                      <button onClick={() => toggleSavedBenefit(id)} className="btn btn-ghost btn-sm text-[#C94A4A]">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Applications Summary Card */}
        <div className="card p-6 rounded-3xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#EAF2F8] text-[#173B5F] shadow-xs">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">{t('profile.applications')}</h2>
              <span className="text-[11px] text-[#66727E]">{applications.length} Active Tracks</span>
            </div>
          </div>
          {applications.length === 0 ? (
            <p className="text-xs text-[#66727E] p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA] text-center">{t('tracker.noApps')}</p>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EAF2F8] border border-[#173B5F]/15">
              <p className="text-xs font-bold text-[#173B5F]">
                {applications.length} {language === 'te' ? 'దరఖాస్తులు చురుగ్గా ఉన్నాయి' : 'active application track(s)'}
              </p>
              <button onClick={() => navigate('/applications')} className="btn btn-primary btn-sm text-xs">
                <span>{t('nav.myApplications')}</span> <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Clear Data Card */}
        <div className="card p-6 rounded-3xl border border-[#C94A4A]/30 bg-white">
          <h2 className="text-sm font-bold text-[#C94A4A] mb-2">{t('profile.clearData')}</h2>
          <p className="text-xs text-[#66727E] mb-4 leading-relaxed">
            Reset all saved benefits, tracked applications, and local responses from your browser.
          </p>
          {showClearConfirm ? (
            <div className="p-4 rounded-2xl bg-[#FDE8E8] border border-[#C94A4A]/30">
              <p className="text-xs font-semibold text-[#C94A4A] mb-3 flex items-start gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{t('profile.clearConfirm')}</span>
              </p>
              <div className="flex gap-2">
                <button onClick={handleClear} className="btn btn-sm bg-[#C94A4A] text-white hover:bg-[#a83636]">
                  {t('general.yes')}
                </button>
                <button onClick={() => setShowClearConfirm(false)} className="btn btn-ghost btn-sm">
                  {t('general.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowClearConfirm(true)} className="btn btn-ghost btn-sm text-[#C94A4A] hover:bg-[#FDE8E8]">
              <Trash2 size={14} /> <span>{t('profile.clearData')}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
