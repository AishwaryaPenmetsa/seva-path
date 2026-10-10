// ============================================================
// SevaPath — Premium Benefit Card Component
// Full compliance with verified links, tracking, and rationale
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, EffortIndicator, AppModeBadge } from './UI';
import type { MatchResult, CategoryId } from '../types';
import { createTrackedApplication } from '../services/startApplication';
import { 
  FileText, Clock, Monitor, Check, ChevronRight, 
  GraduationCap, Briefcase, Wallet, Home as HomeIcon,
  Wheat, Heart, Users, Store, ArrowRight, ShieldCheck,
  ExternalLink, BookmarkPlus, BookmarkCheck, Calendar,
  AlertCircle, HelpCircle, Info
} from 'lucide-react';

const categoryMeta: Record<CategoryId, { color: string; bg: string; icon: React.ReactNode }> = {
  education: { color: '#B85F45', bg: '#F1EDE4', icon: <GraduationCap size={16} /> },
  scholarships: { color: '#B85F45', bg: '#F1EDE4', icon: <GraduationCap size={16} /> },
  'jobs-skills': { color: '#151719', bg: '#F1EDE4', icon: <Briefcase size={16} /> },
  'financial-support': { color: '#30364F', bg: '#F1EDE4', icon: <Wallet size={16} /> },
  'loans-finance': { color: '#30364F', bg: '#F1EDE4', icon: <Wallet size={16} /> },
  housing: { color: '#B85F45', bg: '#F1EDE4', icon: <HomeIcon size={16} /> },
  farming: { color: '#728477', bg: '#F1EDE4', icon: <Wheat size={16} /> },
  health: { color: '#B85F45', bg: '#F1EDE4', icon: <Heart size={16} /> },
  'women-family': { color: '#30364F', bg: '#F1EDE4', icon: <Users size={16} /> },
  business: { color: '#151719', bg: '#F1EDE4', icon: <Store size={16} /> },
};

export default function BenefitCard({ result }: { result: MatchResult }) {
  const { t, language, applications, addApplication } = useApp();
  const navigate = useNavigate();
  const b = result.benefit;

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const isTracked = applications.some((a) => a.benefitId === b.id);
  const [justTracked, setJustTracked] = useState(false);

  const name = isTe ? b.nameTe : isHi ? (b.nameHi || b.name) : b.name;
  const benefitText = isTe ? b.benefitTe : isHi ? (b.benefitHi || b.benefit) : b.benefit;
  const catLabel = t(`cat.${b.category}` as any);
  const cat = categoryMeta[b.category] || categoryMeta.education;
  const isLikely = result.status === 'likely';

  const handleTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTracked) return;
    const app = createTrackedApplication(b, 1);
    addApplication(app);
    setJustTracked(true);
  };

  const hasAppUrl = Boolean(b.officialApplicationUrl && b.officialApplicationUrl !== '#demo');
  const hasInfoUrl = Boolean((b.officialInfoUrl || b.sourceUrl) && (b.officialInfoUrl || b.sourceUrl) !== '#demo');

  const deadlineLabel = b.deadline
    ? b.deadline === 'rolling'
      ? (isTe ? 'అప్లికేషన్లు తెరిచి ఉన్నాయి (రోలింగ్)' : isHi ? 'आवेदन खुले हैं (रोलिंग)' : 'Applications open (rolling)')
      : b.deadline
    : (isTe ? 'గడువు కోసం అధికారిక పోర్టల్ తనిఖీ చేయండి' : isHi ? 'समय सीमा के लिए पोर्टल देखें' : 'Check the official portal for current deadline');

  return (
    <div 
      className={`card card-interactive animate-fade-in-up flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border border-[#D8CDBB] bg-[#FAF8F3] hover:shadow-lg rounded-3xl p-5 ${
        isLikely ? 'ring-2 ring-[#B85F45]/30' : ''
      }`}
    >
      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
        style={{ background: isLikely ? 'linear-gradient(90deg, #B85F45, #D99A24)' : 'linear-gradient(90deg, #30364F, #728477)' }}
      />

      <div>
        {/* Header: Category Badge & Status */}
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div className="flex items-center gap-2">
            <span 
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.icon}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#728477]">
              {catLabel}
            </span>
          </div>
          <StatusBadge status={result.status} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#151719] group-hover:text-[#B85F45] transition-colors mb-1.5 leading-snug">
          {name}
        </h3>

        {/* Department / Provider */}
        <div className="text-[11px] text-[#728477] mb-2 font-medium flex items-center gap-1.5 flex-wrap">
          <span>{isTe ? b.departmentTe : isHi ? (b.departmentHi || b.department) : (b.departmentName || b.department)}</span>
          {b.state && (
            <span className="px-2 py-0.5 rounded-full bg-[#E8E3DA] text-[#30364F] font-bold text-[10px]">
              {b.state}
            </span>
          )}
        </div>

        {/* Benefit Description */}
        <div className="p-3 rounded-2xl bg-white border border-[#E8E3DA] mb-3 shadow-2xs">
          <p className="text-xs text-[#151719] font-medium leading-relaxed">
            {benefitText}
          </p>
        </div>

        {/* Match Rationale Pill Box */}
        {result.matchedCriteria && result.matchedCriteria.length > 0 && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-[#EAF4F0] border border-[#728477]/30 text-[11px] text-[#30364F] flex items-start gap-1.5">
            <Check size={13} className="text-[#728477] mt-0.5 shrink-0" />
            <div className="leading-snug">
              <span className="font-bold text-[#151719]">{t('benefit.matched')}: </span>
              <span>{result.matchedCriteria.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        )}

        {result.missingInfo && result.missingInfo.length > 0 && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-[#FEF3CD] border border-[#D99A24]/30 text-[11px] text-[#7C5B00] flex items-start gap-1.5">
            <HelpCircle size={13} className="mt-0.5 shrink-0 text-[#D99A24]" />
            <div className="leading-snug">
              <span className="font-bold">{t('benefit.missingInfo')}: </span>
              <span>{result.missingInfo.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        )}

        {/* Preparation Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#728477] mb-3 font-medium">
          <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-xl border border-[#E8E3DA]">
            <FileText size={13} className="text-[#30364F]" />
            <span>{b.documents.length} {t('benefit.documents')}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-xl border border-[#E8E3DA]">
            <Clock size={13} className="text-[#B85F45]" />
            <span>{b.preparationTime}</span>
          </div>
        </div>
      </div>

      {/* Footer Meta & Action Row */}
      <div className="pt-3 border-t border-[#E8E3DA]">
        <div className="flex items-center justify-between text-[11px] text-[#728477] mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span className="truncate max-w-[190px]">{deadlineLabel}</span>
          </div>
          <div className="mt-0.5">
            <EffortIndicator level={b.effortLevel} />
          </div>
        </div>

        {/* Action button row */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {hasAppUrl ? (
            <a
              href={b.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D8CDBB] hover:border-[#151719] text-[#151719] font-bold text-xs transition-all shadow-2xs"
            >
              <span className="truncate">{isTe ? 'అధికారిక దరఖాస్తు' : isHi ? 'आधिकारिक आवेदन' : 'Open application'}</span>
              <ExternalLink size={12} className="shrink-0" />
            </a>
          ) : hasInfoUrl ? (
            <a
              href={b.officialInfoUrl || b.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D8CDBB] hover:border-[#151719] text-[#151719] font-bold text-xs transition-all shadow-2xs"
            >
              <span className="truncate">{isTe ? 'అధికారిక సమాచారం' : isHi ? 'आधिकारिक जानकारी' : 'Official info'}</span>
              <ExternalLink size={12} className="shrink-0" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center px-2 py-2 rounded-xl bg-[#F1EDE4] text-[#728477] text-[10px] font-semibold text-center leading-tight">
              Check the official department: {b.departmentName || b.department}
            </span>
          )}

          <button
            onClick={handleTrack}
            disabled={isTracked || justTracked}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all ${
              isTracked || justTracked
                ? 'bg-[#E8E3DA] text-[#728477] cursor-default'
                : 'bg-[#30364F] text-white hover:bg-[#151719] shadow-2xs'
            }`}
          >
            {isTracked || justTracked ? (
              <>
                <BookmarkCheck size={13} className="text-[#728477]" />
                <span>{isTe ? 'ట్రాక్ చేయబడింది' : isHi ? 'ट्रैक किया गया' : 'Tracked'}</span>
              </>
            ) : (
              <>
                <BookmarkPlus size={13} />
                <span>{isTe ? 'ట్రాక్ చేయండి' : isHi ? 'ट्रैक करें' : 'Track this'}</span>
              </>
            )}
          </button>
        </div>

        {/* View & Prepare details button */}
        <button
          onClick={() => navigate(`/benefit/${b.id}`)}
          className={`btn w-full justify-between group/btn text-xs py-2.5 rounded-xl font-bold ${
            isLikely ? 'bg-[#B85F45] text-white hover:bg-[#a05038]' : 'bg-[#151719] text-white hover:bg-[#30364F]'
          }`}
        >
          <span>{t('benefit.viewPrepare')}</span>
          <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
