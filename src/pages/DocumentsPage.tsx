// ============================================================
// SevaPath — Premium Document Preparation Page
// ============================================================

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ProgressBar, DemoBadge } from '../components/UI';
import DocumentStack3D from '../components/DocumentStack3D';
import { getBenefitById } from '../data/benefits';
import * as storage from '../services/storage';
import {
  ChevronLeft, Check, X, Upload, FileText,
  ChevronDown, ChevronUp, ExternalLink, Info, AlertTriangle,
  Lock, Sparkles, ShieldCheck
} from 'lucide-react';

export default function DocumentsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useApp();
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [, forceUpdate] = useState(0);

  const benefit = getBenefitById(id || '');
  if (!benefit) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-12">
        <div className="text-center">
          <p className="text-lg font-bold text-[#17212B]">{t('general.error')}</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">
            <ChevronLeft size={16} /> {t('q.back')}
          </button>
        </div>
      </div>
    );
  }

  const b = benefit;
  const name = language === 'te' ? b.nameTe : b.name;
  const readyCount = b.documents.filter((d) => storage.isDocumentReady(d.id, b.id)).length;

  const handleToggleReady = (docId: string) => {
    storage.toggleDocumentReady(docId, b.id);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
        
        <button onClick={() => navigate(`/benefit/${b.id}`)} className="btn btn-ghost btn-sm mb-4 -ml-2 text-[#66727E]">
          <ChevronLeft size={16} /> {language === 'te' ? 'వెనుకకు' : 'Back to Scheme'}
        </button>

        {/* ── 3D Visual Document Stack ── */}
        <DocumentStack3D 
          readyCount={readyCount} 
          totalCount={b.documents.length} 
          benefitName={name} 
        />

        {/* ── Privacy Guarantee ── */}
        <div className="p-4 rounded-2xl mb-6 flex items-start gap-3 bg-white/80 backdrop-blur-md border border-[#E2E6EA] text-xs text-[#66727E]">
          <Lock size={16} className="text-[#16856A] mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-[#17212B] block mb-0.5">{t('docs.privacyWarning')}</span>
            <span>All checklists remain private in your browser session. No physical government records are transmitted.</span>
          </div>
        </div>

        {/* ── Document Checklist Accordion ── */}
        <div className="space-y-3">
          {b.documents.map((doc) => {
            const ready = storage.isDocumentReady(doc.id, b.id);
            const expanded = expandedDoc === doc.id;
            const docName = language === 'te' ? doc.nameTe : doc.name;
            const docDesc = language === 'te' ? doc.descriptionTe : doc.description;
            const whyNeeded = language === 'te' ? doc.whyNeededTe : doc.whyNeeded;
            const howToGet = language === 'te' ? doc.howToGetTe : doc.howToGet;

            return (
              <div 
                key={doc.id} 
                className={`card p-0 overflow-hidden transition-all duration-300 rounded-2xl border ${
                  ready ? 'border-[#16856A]/40 bg-white' : 'border-[#E2E6EA] bg-white/90'
                }`}
              >
                {/* Header */}
                <div 
                  className="flex items-center gap-3.5 p-4 sm:p-5 cursor-pointer hover:bg-[#F8FAFC]/60 transition-colors" 
                  onClick={() => setExpandedDoc(expanded ? null : doc.id)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleReady(doc.id); }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      ready 
                        ? 'bg-[#16856A] text-white shadow-md shadow-[#16856A]/25' 
                        : 'border-2 border-[#CBD5E1] hover:border-[#173B5F]'
                    }`}
                    aria-label={ready ? t('docs.markNotReady') : t('docs.markReady')}
                  >
                    {ready && <Check size={16} className="stroke-[3]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#17212B]">{docName}</p>
                    <p className="text-xs text-[#66727E] mt-0.5 line-clamp-1">{docDesc}</p>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    ready ? 'bg-[#E8F5E9] text-[#16856A]' : 'bg-[#FEF3CD] text-[#7C5B00]'
                  }`}>
                    {ready ? t('docs.docReady') : t('docs.docMissing')}
                  </span>

                  {expanded ? <ChevronUp size={18} className="text-[#9AA5B1]" /> : <ChevronDown size={18} className="text-[#9AA5B1]" />}
                </div>

                {/* Expanded Details */}
                {expanded && (
                  <div className="border-t border-[#E2E6EA] p-5 bg-[#F8FAFC] animate-fade-in space-y-4">
                    <div className="p-3.5 rounded-xl bg-white border border-[#E2E6EA] text-xs space-y-3">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[#9AA5B1] text-[10px] block mb-1">
                          {t('docs.whyNeeded')}
                        </span>
                        <p className="text-[#17212B] leading-relaxed">{whyNeeded}</p>
                      </div>

                      <div>
                        <span className="font-bold uppercase tracking-wider text-[#9AA5B1] text-[10px] block mb-1">
                          {t('docs.howToGet')}
                        </span>
                        <p className="text-[#17212B] leading-relaxed">{howToGet}</p>
                        {doc.estimatedTime && (
                          <p className="text-[11px] text-[#D99A24] font-semibold mt-1">
                            {t('docs.estTime')}: {doc.estimatedTime}
                          </p>
                        )}
                        {doc.officialLink && (
                          <a 
                            href={doc.officialLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#173B5F] mt-2 hover:underline"
                          >
                            <ExternalLink size={12} /> {t('docs.officialLink')}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleReady(doc.id)} 
                        className={`btn btn-sm ${ready ? 'btn-secondary' : 'btn-success'}`}
                      >
                        {ready ? (
                          <><X size={14} /> {t('docs.markNotReady')}</>
                        ) : (
                          <><Check size={14} /> {t('docs.markReady')}</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
