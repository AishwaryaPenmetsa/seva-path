// ============================================================
// SevaPath — Premium Help Map Page
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import BenefitCard from '../components/BenefitCard';
import { EmptyState } from '../components/UI';
import { 
  Search, RefreshCw, FileText, CheckCircle, AlertCircle, 
  Info, Sparkles, ShieldCheck, ArrowRight, Layers
} from 'lucide-react';

export default function HelpMapPage() {
  const { t, helpMapResults, language } = useApp();
  const navigate = useNavigate();

  if (!helpMapResults || helpMapResults.totalCount === 0) {
    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <EmptyState
            icon={<Search size={48} />}
            title={t('helpMap.noMatches')}
            subtitle={t('helpMap.noMatchesSub')}
            action={
              <div className="flex gap-3">
                <button onClick={() => navigate('/questionnaire')} className="btn btn-primary shadow-md">
                  <RefreshCw size={16} /> {language === 'te' ? 'మళ్ళీ ప్రయత్నించండి' : 'Try again'}
                </button>
                <button onClick={() => navigate('/find')} className="btn btn-secondary">
                  {language === 'te' ? 'వర్గాలు చూడండి' : 'Browse categories'}
                </button>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  const { likelyMatches, needsMoreInfo, otherPossible, totalCount } = helpMapResults;

  const easyCount = [...likelyMatches, ...needsMoreInfo, ...otherPossible]
    .filter((r) => r.benefit.effortLevel === 'easy').length;
  const needDocsCount = [...likelyMatches, ...needsMoreInfo, ...otherPossible]
    .filter((r) => r.benefit.documents.length > 2).length;

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* ── Page Header & Civic Badge ──────────────────────────── */}
        <div className="mb-8 animate-fade-in flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold mb-2.5 border border-[#16856A]/20">
              <ShieldCheck size={14} />
              <span>Tailored Civic Recommendations</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F]">
              {t('helpMap.title')}
            </h1>
            <p className="text-sm text-[#66727E] mt-1 font-medium">
              {t('helpMap.found', { count: totalCount.toString() })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/questionnaire')}
              className="btn btn-secondary btn-sm"
            >
              <RefreshCw size={14} />
              <span>{language === 'te' ? 'సవరించు' : 'Refine Answers'}</span>
            </button>
          </div>
        </div>

        {/* ── Summary Tiles (Premium Information Tiles with Ambient Glows) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
          <SummaryTile 
            icon={<FileText size={20} />} 
            value={totalCount} 
            label={t('helpMap.possibleBenefits')} 
            color="#173B5F" 
            bg="#EAF2F8"
            glow="glow-navy"
          />
          <SummaryTile 
            icon={<CheckCircle size={20} />} 
            value={easyCount} 
            label={t('helpMap.easyToPrepare')} 
            color="#16856A" 
            bg="#E8F5E9"
            glow="glow-seva"
          />
          <SummaryTile 
            icon={<AlertCircle size={20} />} 
            value={needDocsCount} 
            label={t('helpMap.needDocuments')} 
            color="#D99A24" 
            bg="#FEF3CD"
            glow="glow-amber"
          />
          <SummaryTile 
            icon={<Info size={20} />} 
            value={needsMoreInfo.length} 
            label={t('helpMap.needMoreInfo')} 
            color="#66727E" 
            bg="#F0F2F4"
            glow=""
          />
        </div>

        {/* ── Start Here Section (Primary Highlights with Ambient Green Glow) ── */}
        {likelyMatches.length > 0 && (
          <section className="mb-12 relative">
            {/* Ambient Aura Background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#16856A]/5 via-transparent to-[#173B5F]/5 rounded-3xl blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-[#16856A]">
                  <span className="w-7 h-7 rounded-lg bg-[#E8F5E9] text-[#16856A] flex items-center justify-center font-bold text-xs shadow-sm">
                    ✓
                  </span>
                  <span>{t('helpMap.startHere')}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#16856A] text-white ml-2">
                    Highest Match
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {likelyMatches.map((result) => (
                  <BenefitCard key={result.benefit.id} result={result} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── May Need More Info ──────────────────────────── */}
        {needsMoreInfo.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-[#D99A24]">
              <span className="w-6 h-6 rounded-lg bg-[#FEF3CD] text-[#D99A24] flex items-center justify-center font-bold text-xs">
                !
              </span>
              <span>{t('helpMap.mayNeedMore')}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {needsMoreInfo.map((result) => (
                <BenefitCard key={result.benefit.id} result={result} />
              ))}
            </div>
          </section>
        )}

        {/* ── Other Possible Schemes ──────────────────────── */}
        {otherPossible.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-[#66727E]">
              <span className="w-6 h-6 rounded-lg bg-[#F0F2F4] text-[#66727E] flex items-center justify-center font-bold text-xs">
                i
              </span>
              <span>{t('helpMap.otherPossible')}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {otherPossible.map((result) => (
                <BenefitCard key={result.benefit.id} result={result} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function SummaryTile({
  icon,
  value,
  label,
  color,
  bg,
  glow,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  bg: string;
  glow: string;
}) {
  return (
    <div className="card p-4 sm:p-5 flex flex-col justify-between rounded-2xl border border-[#E2E6EA] hover:border-[#173B5F]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span 
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs" 
          style={{ background: bg, color }}
        >
          {icon}
        </span>
        <div className="text-2xl font-extrabold tracking-tight" style={{ color }}>
          {value}
        </div>
      </div>
      <div className="text-xs font-semibold text-[#66727E] leading-tight">
        {label}
      </div>
    </div>
  );
}
