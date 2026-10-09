// ============================================================
// SevaPath — Local Profile & Data Management Page
// Completely local-first. Zero server storage. Export & Clear.
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { getBenefitById } from '../data/benefits';
import * as storage from '../services/storage';
import {
  User, Globe, Bookmark, FileText,
  Trash2, ChevronRight, AlertTriangle, ShieldCheck,
  Download, RefreshCw, Check, HardDrive
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
  const te = language === 'te';

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profileName);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleSaveName = () => {
    setProfileName(nameInput);
    setEditingName(false);
  };

  const handleExportData = () => {
    const data = {
      profileName,
      userProfile: storage.getUserProfile(),
      applications: storage.getApplications(),
      savedBenefits: storage.getSavedBenefits(),
      documents: storage.getDocumentChecks(),
      exportedAt: new Date().toISOString(),
      appVersion: 'SevaPath-2.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sevapath-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85F45]/10 text-[#B85F45] text-xs font-bold mb-2">
            <ShieldCheck size={14} />
            <span>{te ? 'స్థానిక బ్రౌజర్ గోప్యత' : 'Local Browser Preferences'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719]">
            {t('profile.title')}
          </h1>
          <p className="text-xs text-[#728477] mt-1 leading-relaxed">
            {te
              ? 'మీ సమాచారం మీ పరికరంలో మాత్రమే భద్రపరచబడుతుంది. ఏ సర్వర్‌కు పంపబడదు.'
              : 'Your data is stored exclusively on this device. SevaPath does not transmit your personal records to any remote server.'}
          </p>
        </div>

        {/* Local Storage Privacy Note */}
        <div className="p-4 rounded-3xl bg-[#F1EDE4] border border-[#D8CDBB] mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#30364F] text-white flex items-center justify-center shrink-0 mt-0.5">
            <HardDrive size={16} />
          </div>
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#151719] block mb-0.5">
              {te ? 'డేటా నిల్వ నోటీసు: 100% పరికరంలో మాత్రమే' : 'Data Storage Notice: 100% On-Device'}
            </span>
            <span className="text-[#3B3F4A]">
              {te
                ? 'సేవాపాత్‌లో మీరు నమోదు చేసిన ప్రతి వివరాలు, సమాధానాలు మరియు దరఖాస్తు ట్రాకింగ్ మీ బ్రౌజర్ లోకల్ స్టోరేజ్‌లో మాత్రమే నిల్వ చేయబడతాయి. ఖాతా లాగిన్ లేదా రిమోట్ డేటాబేస్ అవసరం లేదు.'
                : 'All answers, bookmarked schemes, and tracked application statuses are saved in your browser\'s local storage. No account login or cloud database is required.'}
            </span>
          </div>
        </div>

        {/* Name Card */}
        <div className="card p-6 rounded-3xl mb-4 bg-[#FAF8F3] border border-[#D8CDBB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F1EDE4] text-[#B85F45] shadow-xs">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151719]">{t('profile.name')}</h2>
              <span className="text-[11px] text-[#728477]">
                {te ? 'స్థానిక అభినందన కోసం ఉపయోగించబడింది' : 'Used for personalized local greeting'}
              </span>
            </div>
          </div>
          {editingName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-[#D8CDBB] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#B85F45]/30 focus:border-[#B85F45] bg-white text-[#151719]"
                placeholder={te ? 'మీ పేరు' : 'Your name'}
                autoFocus
              />
              <button onClick={handleSaveName} className="btn bg-[#B85F45] text-white hover:bg-[#a05038] btn-sm">{t('general.save')}</button>
              <button onClick={() => setEditingName(false)} className="btn btn-ghost btn-sm">{t('general.cancel')}</button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E8E3DA]">
              <p className="text-sm font-bold text-[#151719]">
                {profileName || (te ? 'పౌరుడు (డిఫాల్ట్)' : 'Citizen (Default)')}
              </p>
              <button onClick={() => { setNameInput(profileName); setEditingName(true); }} className="btn btn-secondary btn-sm text-xs">
                {te ? 'సవరించు' : 'Edit'}
              </button>
            </div>
          )}
        </div>

        {/* Language Switcher Card */}
        <div className="card p-6 rounded-3xl mb-4 bg-[#FAF8F3] border border-[#D8CDBB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F1EDE4] text-[#30364F] shadow-xs">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151719]">{t('profile.language')}</h2>
              <span className="text-[11px] text-[#728477]">
                {te ? 'క్రియాశీల ఇంటర్‌ఫేస్ భాష' : 'Active interface language'}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`btn btn-sm flex-1 ${language === 'en' ? 'bg-[#30364F] text-white' : 'bg-white border border-[#D8CDBB] text-[#3B3F4A]'}`}
            >
              English {language === 'en' && <Check size={14} />}
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`btn btn-sm flex-1 ${language === 'te' ? 'bg-[#B85F45] text-white' : 'bg-white border border-[#D8CDBB] text-[#3B3F4A]'}`}
            >
              తెలుగు {language === 'te' && <Check size={14} />}
            </button>
          </div>
        </div>

        {/* Saved Benefits Card */}
        <div className="card p-6 rounded-3xl mb-4 bg-[#FAF8F3] border border-[#D8CDBB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F1EDE4] text-[#B85F45] shadow-xs">
              <Bookmark size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151719]">{t('profile.savedBenefits')}</h2>
              <span className="text-[11px] text-[#728477]">{savedBenefits.length} {te ? 'బుక్‌మార్క్ చేయబడ్డాయి' : 'Bookmarked'}</span>
            </div>
          </div>
          {savedBenefits.length === 0 ? (
            <p className="text-xs text-[#728477] p-4 rounded-2xl bg-white border border-[#E8E3DA] text-center">{t('profile.noSaved')}</p>
          ) : (
            <div className="space-y-2">
              {savedBenefits.map((id) => {
                const benefit = getBenefitById(id);
                if (!benefit) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E8E3DA]">
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-xs font-bold text-[#151719] truncate">
                        {te ? benefit.nameTe : benefit.name}
                      </p>
                      <span className="text-[10px] font-bold text-[#B85F45] uppercase">
                        {t(`cat.${benefit.category}` as any)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => navigate(`/benefit/${id}`)} className="btn btn-secondary btn-sm text-xs">
                        <ChevronRight size={14} />
                      </button>
                      <button onClick={() => toggleSavedBenefit(id)} className="btn btn-ghost btn-sm text-[#B85F45]">
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
        <div className="card p-6 rounded-3xl mb-4 bg-[#FAF8F3] border border-[#D8CDBB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F1EDE4] text-[#30364F] shadow-xs">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151719]">{t('profile.applications')}</h2>
              <span className="text-[11px] text-[#728477]">{applications.length} {te ? 'చురుకైన ట్రాక్‌లు' : 'Active Tracks'}</span>
            </div>
          </div>
          {applications.length === 0 ? (
            <p className="text-xs text-[#728477] p-4 rounded-2xl bg-white border border-[#E8E3DA] text-center">{t('tracker.noApps')}</p>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB]">
              <p className="text-xs font-bold text-[#151719]">
                {applications.length} {te ? 'దరఖాస్తులు చురుగ్గా ఉన్నాయి' : 'active application track(s)'}
              </p>
              <button onClick={() => navigate('/applications')} className="btn bg-[#30364F] text-white hover:bg-[#151719] btn-sm text-xs">
                <span>{t('nav.myApplications')}</span> <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Data Actions: Export & Clear */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Export my data */}
          <div className="card p-6 rounded-3xl bg-[#FAF8F3] border border-[#D8CDBB] flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#151719] mb-1 flex items-center gap-2">
                <Download size={16} className="text-[#30364F]" />
                <span>{te ? 'నా డేటాను ఎగుమతి చేయండి' : 'Export My Data'}</span>
              </h2>
              <p className="text-xs text-[#728477] mb-4 leading-relaxed">
                {te
                  ? 'మీ ప్రొఫైల్, పత్రాలు మరియు దరఖాస్తు పురోగతిని JSON ఫైల్‌గా డౌన్‌లోడ్ చేసుకోండి.'
                  : 'Download a complete local JSON backup of your profile, checklist, and tracked applications.'}
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="btn bg-[#30364F] text-white hover:bg-[#151719] btn-sm text-xs w-full justify-center"
            >
              {exportSuccess ? (
                <>
                  <Check size={14} className="text-[#D8CDBB]" />
                  <span>{te ? 'డౌన్‌లోడ్ పూర్తయింది!' : 'Downloaded!'}</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>{te ? 'బ్యాకప్ డౌన్‌లోడ్ చేయండి' : 'Download Backup (.json)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Clear my data */}
          <div className="card p-6 rounded-3xl border border-[#B85F45]/30 bg-[#FAF8F3] flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#B85F45] mb-1 flex items-center gap-2">
                <Trash2 size={16} />
                <span>{t('profile.clearData')}</span>
              </h2>
              <p className="text-xs text-[#728477] mb-4 leading-relaxed">
                {te
                  ? 'మీ పరికరం నుండి సేవ్ చేసిన అన్ని డేటాను తొలగించి రీసెట్ చేయండి.'
                  : 'Reset all saved benefits, questionnaire answers, and application progress on this browser.'}
              </p>
            </div>

            {showClearConfirm ? (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="text-xs font-semibold text-rose-800 mb-2 flex items-start gap-1.5">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>{t('profile.clearConfirm')}</span>
                </p>
                <div className="flex gap-2">
                  <button onClick={handleClear} className="btn btn-sm bg-[#B85F45] text-white hover:bg-[#a05038] text-xs">
                    {t('general.yes')}
                  </button>
                  <button onClick={() => setShowClearConfirm(false)} className="btn btn-ghost btn-sm text-xs">
                    {t('general.cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="btn btn-ghost btn-sm text-[#B85F45] hover:bg-rose-50 text-xs w-full justify-center border border-[#B85F45]/30"
              >
                <Trash2 size={14} /> <span>{te ? 'డేటాను క్లియర్ చేయండి' : 'Clear My Data'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
