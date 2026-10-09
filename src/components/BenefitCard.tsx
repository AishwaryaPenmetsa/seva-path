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
  AlertCircle, HelpCircle
} from 'lucide-react';

const categoryMeta: Record<CategoryId, { color: string; bg: string; icon: React.ReactNode }> = {
  education: { color: '#B85F45', bg: '#F1EDE4', icon: <GraduationCap size={16} /> },
  'jobs-skills': { color: '#151719', bg: '#F1EDE4', icon: <Briefcase size={16} /> },
  'financial-support': { color: '#30364F', bg: '#F1EDE4', icon: <Wallet size={16} /> },
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
  const te = language === 'te';

  const isTracked = applications.some((a) => a.benefitId === b.id);
  const [justTracked, setJustTracked] = useState(false);

  const name = te ? b.nameTe : b.name;
  const benefitText = te ? b.benefitTe : b.benefit;
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

  const hasOfficialUrl = Boolean(b.officialApplicationUrl && b.officialApplicationUrl !== '#demo');

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
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
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
        <h3 className="text-base font-bold text-[#151719] group-hover:text-[#B85F45] transition-colors mb-2 leading-snug">
          {name}
        </h3>

        {/* Department / Provider */}
        <div className="text-[11px] text-[#728477] mb-2 font-medium flex items-center gap-1.5 flex-wrap">
          <span>{te ? b.departmentTe : b.department}</span>
          {b.state && (
            <span className="px-2 py-0.5 rounded-full bg-[#E8E3DA] text-[#30364F] font-bold text-[10px]">
              {b.state}
            </span>
          )}
        </div>

        {/* Benefit Description */}
        <p className="text-xs text-[#3B3F4A] leading-relaxed mb-4">
          {benefitText}
        </p>

        {/* Why matched criteria tag cloud */}
        {result.matchedCriteria && result.matchedCriteria.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB]">
            <div className="text-[10px] font-bold text-[#151719] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#B85F45]" />
              {te ? 'మీరు ఎందుకు అర్హులు:' : 'Why you matched:'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedCriteria.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-white border border-[#D8CDBB] text-[#151719]"
                >
                  <Check size={11} className="text-[#B85F45] stroke-[3]" /> {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing / Unmatched info */}
        {result.missingInfo && result.missingInfo.length > 0 && (
          <div className="mb-3 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
            <div className="font-bold text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1 text-amber-800">
              <HelpCircle size={11} /> {te ? 'మరిన్ని వివరాలు అవసరం:' : 'Needs more information:'}
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[10.5px]">
              {result.missingInfo.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Unmatched reasons if present */}
        {result.unmatchedCriteria && result.unmatchedCriteria.length > 0 && (
          <div className="mb-3 p-2.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-[11px] text-rose-900">
            <div className="font-bold text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1 text-rose-800">
              <AlertCircle size={11} /> {te ? 'అర్హత లేని కారణం:' : 'Why not matched:'}
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[10.5px]">
              {result.unmatchedCriteria.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Metadata Tiles */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-2xl bg-white border border-[#E8E3DA] text-[11px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#728477] text-[10px] uppercase font-semibold">{t('benefit.documents')}</span>
            <span className="font-bold text-[#151719] flex items-center gap-1">
              <FileText size={12} className="text-[#B85F45]" /> {b.documents.length} Proofs
            </span>
          </div>
          <div className="flex flex-col gap-0.5 border-x border-[#E8E3DA] px-2">
            <span className="text-[#728477] text-[10px] uppercase font-semibold">{t('benefit.preparation')}</span>
            <span className="font-bold text-[#151719] flex items-center gap-1">
              <Clock size={12} className="text-[#D99A24]" /> {b.preparationTime}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 pl-1">
            <span className="text-[#728477] text-[10px] uppercase font-semibold">{t('benefit.application')}</span>
            <span className="font-bold text-[#151719] flex items-center gap-1">
              <Monitor size={12} className="text-[#30364F]" />
              <AppModeBadge mode={b.applicationMode} />
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Action Buttons */}
      <div>
        <div className="flex items-center justify-between mb-3 pt-2 border-t border-[#E8E3DA] text-[11px] text-[#728477]">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{te ? 'ధృవీకరించబడింది:' : 'Verified:'} {b.lastVerified}</span>
          </div>
          <div className="mt-0.5">
            <EffortIndicator level={b.effortLevel} />
          </div>
        </div>

        {/* Action button row */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {hasOfficialUrl ? (
            <a
              href={b.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D8CDBB] hover:border-[#151719] text-[#151719] font-bold text-xs transition-all shadow-2xs"
            >
              <span>{te ? 'అధికారిక సైట్' : 'Official site'}</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center px-2 py-2 rounded-xl bg-[#F1EDE4] text-[#728477] text-[10px] font-semibold text-center leading-tight">
              {te ? 'అధికారిక విభాగాన్ని సంప్రదించండి' : 'Check dept directly'}
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
                <span>{te ? 'ట్రాక్ చేయబడింది' : 'Tracked'}</span>
              </>
            ) : (
              <>
                <BookmarkPlus size={13} />
                <span>{te ? 'ట్రాక్ చేయండి' : 'Track this'}</span>
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
