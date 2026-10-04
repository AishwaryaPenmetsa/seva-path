// ============================================================
// SevaPath — Premium Benefit Card Component
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, EffortIndicator, AppModeBadge, DemoBadge } from './UI';
import type { MatchResult, CategoryId } from '../types';
import { 
  FileText, Clock, Monitor, Check, ChevronRight, 
  GraduationCap, Briefcase, Wallet, Home as HomeIcon,
  Wheat, Heart, Users, Store, ArrowRight, ShieldCheck
} from 'lucide-react';

const categoryMeta: Record<CategoryId, { color: string; bg: string; icon: React.ReactNode }> = {
  education: { color: '#173B5F', bg: '#EAF2F8', icon: <GraduationCap size={16} /> },
  'jobs-skills': { color: '#16856A', bg: '#E8F5E9', icon: <Briefcase size={16} /> },
  'financial-support': { color: '#D99A24', bg: '#FEF3CD', icon: <Wallet size={16} /> },
  housing: { color: '#173B5F', bg: '#EAF2F8', icon: <HomeIcon size={16} /> },
  farming: { color: '#16856A', bg: '#E8F5E9', icon: <Wheat size={16} /> },
  health: { color: '#C94A4A', bg: '#FDE8E8', icon: <Heart size={16} /> },
  'women-family': { color: '#16856A', bg: '#E8F5E9', icon: <Users size={16} /> },
  business: { color: '#173B5F', bg: '#EAF2F8', icon: <Store size={16} /> },
};

export default function BenefitCard({ result }: { result: MatchResult }) {
  const { t, language } = useApp();
  const navigate = useNavigate();
  const b = result.benefit;

  const name = language === 'te' ? b.nameTe : b.name;
  const benefitText = language === 'te' ? b.benefitTe : b.benefit;
  const catLabel = t(`cat.${b.category}` as any);
  const cat = categoryMeta[b.category] || categoryMeta.education;
  const isLikely = result.status === 'likely';

  return (
    <div 
      className={`card card-interactive animate-fade-in-up flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
        isLikely ? 'card-featured' : ''
      }`}
    >
      {/* Top Category Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
        style={{ background: isLikely ? 'linear-gradient(90deg, #16856A, #1a9d7e)' : 'linear-gradient(90deg, #173B5F, #1e4d7a)' }}
      />

      <div>
        {/* Header: Category Badge & Status */}
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div className="flex items-center gap-2">
            <span 
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.icon}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#66727E]">
              {catLabel}
            </span>
          </div>
          <StatusBadge status={result.status} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#17212B] group-hover:text-[#173B5F] transition-colors mb-2">
          {name}
        </h3>

        {/* Benefit Description */}
        <p className="text-xs text-[#66727E] leading-relaxed mb-4">
          {benefitText}
        </p>

        {/* Why matched criteria tag cloud */}
        {result.matchedCriteria.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-[#F0F5FA] border border-[#E2E6EA]/60">
            <div className="text-[10px] font-bold text-[#173B5F] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#16856A]" />
              {t('benefit.whyAppeared')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedCriteria.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#E2E6EA] text-[#17212B] shadow-2xs"
                >
                  <Check size={11} className="text-[#16856A] stroke-[3]" /> {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata Tiles */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-white border border-[#E2E6EA]/80 text-[11px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#9AA5B1] text-[10px] uppercase font-semibold">{t('benefit.documents')}</span>
            <span className="font-bold text-[#17212B] flex items-center gap-1">
              <FileText size={12} className="text-[#173B5F]" /> {b.documents.length} Proofs
            </span>
          </div>
          <div className="flex flex-col gap-0.5 border-x border-[#E2E6EA] px-2">
            <span className="text-[#9AA5B1] text-[10px] uppercase font-semibold">{t('benefit.preparation')}</span>
            <span className="font-bold text-[#17212B] flex items-center gap-1">
              <Clock size={12} className="text-[#D99A24]" /> {b.preparationTime}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 pl-1">
            <span className="text-[#9AA5B1] text-[10px] uppercase font-semibold">{t('benefit.application')}</span>
            <span className="font-bold text-[#17212B] flex items-center gap-1">
              <Monitor size={12} className="text-[#16856A]" />
              <AppModeBadge mode={b.applicationMode} />
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div>
        <div className="flex items-center justify-between mb-3 pt-2 border-t border-[#E2E6EA]/60">
          <div>
            <span className="text-[11px] text-[#66727E] font-medium">{t('benefit.prepEffort')}</span>
            <div className="mt-0.5"><EffortIndicator level={b.effortLevel} /></div>
          </div>
          {b.isDemoData && <DemoBadge />}
        </div>

        <button
          onClick={() => navigate(`/benefit/${b.id}`)}
          className={`btn w-full justify-between group/btn text-sm py-2.5 ${
            isLikely ? 'btn-success' : 'btn-primary'
          }`}
        >
          <span>{t('benefit.viewPrepare')}</span>
          <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
