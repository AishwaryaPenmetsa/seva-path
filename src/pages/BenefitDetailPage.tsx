// ============================================================
// SevaPath — Premium Benefit Detail Page (Redesigned)
// ============================================================
// Dynamically computes journey stage from document readiness
// and application status. Always shows the next action.
// ============================================================

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, EffortIndicator, AppModeBadge, JourneyTimeline, ProgressBar, DemoBadge } from '../components/UI';
import BenefitJourneyGraphic from '../components/BenefitJourneyGraphic';
import type { JourneyStage } from '../components/BenefitJourneyGraphic';
import { getBenefitById } from '../data/benefits';
import type { TrackedApplication } from '../types';
import {
  ChevronLeft, ChevronRight, Check, AlertTriangle,
  FileText, Clock, Monitor, ExternalLink, Shield,
  Calendar, BookmarkPlus, Bookmark, Info, ArrowRight,
  ShieldCheck, Sparkles, Building2, UserCheck, Send,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import * as storage from '../services/storage';

export default function BenefitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, isBenefitSaved, toggleSavedBenefit, addApplication, applications, updateApplication, helpMapResults } = useApp();

  const benefit = getBenefitById(id || '');

  if (!benefit) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-12">
        <div className="text-center">
          <p className="text-lg font-bold text-[#17212B] mb-2">{t('general.error')}</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            <ChevronLeft size={16} /> {t('q.back')}
          </button>
        </div>
      </div>
    );
  }

  const b = benefit;
  const name = language === 'te' ? b.nameTe : b.name;
  const description = language === 'te' ? b.descriptionTe : b.description;
  const benefitText = language === 'te' ? b.benefitTe : b.benefit;
  const dept = language === 'te' ? b.departmentTe : b.department;
  const officialSrc = language === 'te' ? b.officialSourceTe : b.officialSource;
  const verNotes = language === 'te' ? b.verificationNotesTe : b.verificationNotes;
  const saved = isBenefitSaved(b.id);

  // Match result if available
  const matchResult = helpMapResults
    ? [...helpMapResults.likelyMatches, ...helpMapResults.needsMoreInfo, ...helpMapResults.otherPossible].find((r) => r.benefit.id === b.id)
    : null;

  // Document readiness
  const docChecks = storage.getDocumentChecks();
  const readyDocs = b.documents.filter((d) => docChecks.find((dc) => dc.documentId === d.id && dc.benefitId === b.id && dc.isReady));
  const allDocsReady = readyDocs.length === b.documents.length && b.documents.length > 0;
  const prepProgress = b.documents.length > 0 ? readyDocs.length / b.documents.length : 0;

  // Existing application for this benefit
  const existingApp = applications.find((a) => a.benefitId === b.id);
  const isSubmitted = existingApp ? ['submitted', 'verification', 'approved', 'rejected', 'action-required'].includes(existingApp.status) : false;
  const isFormCompleted = existingApp ? ['form-completed', 'submitted', 'verification', 'approved', 'rejected', 'action-required'].includes(existingApp.status) : false;

  // Compute current journey stage
  const currentStage: JourneyStage = useMemo(() => {
    if (isSubmitted) return 'track';
    if (isFormCompleted || allDocsReady) return 'apply';
    return 'prepare';
  }, [isSubmitted, isFormCompleted, allDocsReady]);

  // Compute next action label and handler
  const { nextActionLabel, nextActionHandler } = useMemo(() => {
    if (isSubmitted) {
      return {
        nextActionLabel: language === 'te' ? 'మీ దరఖాస్తు ట్రాక్ చేయండి' : 'Track your application status',
        nextActionHandler: () => navigate('/applications'),
      };
    }
    if (allDocsReady) {
      return {
        nextActionLabel: language === 'te' ? 'దరఖాస్తుకు కొనసాగండి' : 'Continue to application',
        nextActionHandler: () => {
          if (b.officialApplicationUrl) {
            // Create/update tracked application and open official portal
            handleStartApplication('form-completed');
          }
        },
      };
    }
    const remaining = b.documents.length - readyDocs.length;
    return {
      nextActionLabel: language === 'te'
        ? `${remaining} పత్రాలు సిద్ధం చేయండి`
        : `Prepare ${remaining} remaining document${remaining !== 1 ? 's' : ''}`,
      nextActionHandler: () => navigate(`/documents/${b.id}`),
    };
  }, [isSubmitted, allDocsReady, readyDocs.length, b.documents.length, language, b.id]);

  const handleStartApplication = (initialStatus: 'discovered' | 'preparing' | 'form-completed' = 'discovered') => {
    // If already tracked, don't duplicate
    if (existingApp) {
      if (initialStatus === 'form-completed') {
        // Update status and open official URL
        updateApplication(existingApp.id, {
          status: 'form-completed',
          nextAction: language === 'te' ? 'అధికారిక పోర్టల్‌లో సమర్పించండి' : 'Submit on the official portal',
          nextActionTe: 'అధికారిక పోర్టల్‌లో సమర్పించండి',
          timeline: existingApp.timeline.map((entry, i) => ({
            ...entry,
            completed: i <= 2,
            current: i === 3,
            date: i === 2 ? new Date().toISOString().split('T')[0] : entry.date,
          })),
        });
        if (b.officialApplicationUrl) {
          window.open(b.officialApplicationUrl, '_blank', 'noopener,noreferrer');
        }
        navigate('/applications');
      } else {
        navigate('/applications');
      }
      return;
    }

    const app: TrackedApplication = {
      id: `app-${b.id}-${Date.now()}`,
      benefitId: b.id,
      benefitName: b.name,
      benefitNameTe: b.nameTe,
      category: b.category,
      status: initialStatus,
      startedDate: new Date().toISOString().split('T')[0],
      timeline: [
        { step: t('tracker.discovered'), stepTe: 'ప్రయోజనం కనుగొనబడింది', date: new Date().toISOString().split('T')[0], completed: true, current: false },
        { step: t('tracker.docsPrepared'), stepTe: 'పత్రాలు సిద్ధమయ్యాయి', completed: initialStatus !== 'discovered', current: initialStatus === 'discovered' || initialStatus === 'preparing', date: allDocsReady ? new Date().toISOString().split('T')[0] : undefined },
        { step: t('tracker.formCompleted'), stepTe: 'ఫారమ్ పూర్తయింది', completed: initialStatus === 'form-completed', current: initialStatus === 'form-completed', date: initialStatus === 'form-completed' ? new Date().toISOString().split('T')[0] : undefined },
        { step: t('tracker.submitted'), stepTe: 'దరఖాస్తు సమర్పించబడింది', completed: false, current: false },
        { step: t('tracker.verification'), stepTe: 'ధృవీకరణ', completed: false, current: false },
        { step: t('tracker.decision'), stepTe: 'నిర్ణయం', completed: false, current: false },
      ],
      nextAction: initialStatus === 'form-completed'
        ? (language === 'te' ? 'అధికారిక పోర్టల్‌లో సమర్పించండి' : 'Submit on the official portal')
        : (language === 'te' ? 'పత్రాలు సిద్ధం చేయండి' : 'Prepare your documents'),
      nextActionTe: initialStatus === 'form-completed' ? 'అధికారిక పోర్టల్‌లో సమర్పించండి' : 'పత్రాలు సిద్ధం చేయండి',
    };
    addApplication(app);

    if (initialStatus === 'form-completed' && b.officialApplicationUrl) {
      window.open(b.officialApplicationUrl, '_blank', 'noopener,noreferrer');
    }
    navigate('/applications');
  };

  // Missing documents list (for the actionable checklist)
  const missingDocs = b.documents.filter((d) => !docChecks.find((dc) => dc.documentId === d.id && dc.benefitId === b.id && dc.isReady));

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        
        {/* Back navigation */}
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-6 -ml-2 text-[#66727E] hover:text-[#173B5F]">
          <ChevronLeft size={16} /> {t('helpMap.back')}
        </button>

        {/* ── Dynamic Journey Graphic ── */}
        <BenefitJourneyGraphic
          currentStage={currentStage}
          prepProgress={prepProgress}
          allDocsReady={allDocsReady}
          isSubmitted={isSubmitted}
          nextActionLabel={nextActionLabel}
          onNextAction={nextActionHandler}
        />

        {/* ── Hero Header ── */}
        <div className="benefit-hero animate-fade-in">
          <div className="benefit-hero__content">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold text-[#16856A] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8F5E9]">
                {t(`cat.${b.category}` as any)}
              </span>
              {matchResult && <StatusBadge status={matchResult.status} />}
              {existingApp && (
                <span className="text-xs font-bold text-[#173B5F] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAF2F8]">
                  Tracked
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F]">
              {name}
            </h1>
            <p className="text-sm text-[#66727E] mt-2 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => toggleSavedBenefit(b.id)} 
              className={`btn btn-sm ${saved ? 'btn-primary' : 'btn-secondary'}`}
            >
              {saved ? <Bookmark size={15} className="fill-current text-white" /> : <BookmarkPlus size={15} />}
              <span>{saved ? t('detail.saved') : t('detail.saveBenefit')}</span>
            </button>
          </div>
        </div>

        {/* ── Main 2-Column Content ── */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          
          {/* Main Left Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Quick Facts Grid */}
            <div className="card p-6 rounded-3xl">
              <h2 className="text-base font-bold text-[#173B5F] mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-[#D99A24]" />
                <span>{t('detail.quickFacts')}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <QuickFact label={t('detail.support')} value={benefitText} />
                <QuickFact label={t('benefit.documents')} value={`${b.documents.length} Required`} />
                <QuickFact label={t('benefit.preparation')} value={b.preparationTime} />
                <QuickFact label={t('benefit.application')} value={<AppModeBadge mode={b.applicationMode} />} />
                <QuickFact label={t('detail.authority')} value={dept} />
                <QuickFact label={t('benefit.prepEffort')} value={<EffortIndicator level={b.effortLevel} />} />
              </div>
            </div>

            {/* Why Shown / Eligibility Criteria */}
            {matchResult && matchResult.matchedCriteria.length > 0 && (
              <div className="card p-6 rounded-3xl bg-gradient-to-br from-white to-[#F0FAF7] border-[#16856A]/30">
                <h2 className="text-base font-bold text-[#16856A] mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} />
                  <span>{t('detail.whyShown')}</span>
                </h2>
                <div className="space-y-2 mb-4">
                  {matchResult.matchedCriteria.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-[#17212B]">
                      <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#16856A] flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </div>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
                {matchResult.missingInfo.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E2E6EA]">
                    <p className="text-xs font-bold text-[#D99A24] uppercase tracking-wider mb-2">{t('detail.missingInfo')}</p>
                    {matchResult.missingInfo.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#66727E]">
                        <AlertTriangle size={13} className="text-[#D99A24] shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-[#9AA5B1] mt-4 italic">{t('detail.notOfficial')}</p>
              </div>
            )}

            {/* What You Receive */}
            <div className="card p-6 rounded-3xl">
              <h2 className="text-base font-bold text-[#173B5F] mb-3">{t('detail.whatYouGet')}</h2>
              <p className="text-sm text-[#17212B] leading-relaxed bg-[#EAF2F8]/60 p-4 rounded-2xl border border-[#E2E6EA]/80 font-medium">
                {benefitText}
              </p>
            </div>

            {/* ── Document Checklist Prep ── */}
            <div className="card p-6 rounded-3xl" id="preparation-section">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[#173B5F]">{t('detail.beforeApply')}</h2>
                <span className={`text-xs font-bold ${allDocsReady ? 'text-[#16856A]' : 'text-[#D99A24]'}`}>
                  {readyDocs.length} / {b.documents.length} {t('detail.ready')}
                </span>
              </div>
              
              <ProgressBar
                value={readyDocs.length}
                max={b.documents.length}
              />

              {/* Status message */}
              {allDocsReady ? (
                <div className="mt-4 p-4 rounded-2xl bg-[#E8F5E9] border border-[#16856A]/25 flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#16856A] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#126D57]">
                      {language === 'te' ? 'అన్ని పత్రాలు సిద్ధం!' : 'All documents are ready!'}
                    </p>
                    <p className="text-xs text-[#126D57]/80 mt-0.5">
                      {language === 'te'
                        ? 'మీరు ఇప్పుడు దరఖాస్తు చేయడానికి కొనసాగవచ్చు.'
                        : 'You can now proceed to the application. Click the button below to continue.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#FEF3CD]/60 border border-[#D99A24]/20 flex items-start gap-3">
                  <AlertCircle size={18} className="text-[#D99A24] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#7C5B00]">
                      {language === 'te'
                        ? `${missingDocs.length} పత్రం(లు) ఇంకా సిద్ధం కాలేదు`
                        : `${missingDocs.length} document${missingDocs.length !== 1 ? 's' : ''} still needed`}
                    </p>
                    <p className="text-xs text-[#7C5B00]/70 mt-0.5">
                      {language === 'te'
                        ? 'దరఖాస్తు చేయడానికి ముందు అన్ని పత్రాలను సిద్ధం చేయండి.'
                        : 'Prepare all documents before applying. Click each item below to mark it as ready.'}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-2">
                {b.documents.map((doc) => {
                  const ready = storage.isDocumentReady(doc.id, b.id);
                  return (
                    <div 
                      key={doc.id} 
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                        ready 
                          ? 'bg-[#E8F5E9] border-[#16856A]/30 text-[#126D57]' 
                          : 'bg-[#F8FAFC] border-[#E2E6EA] text-[#17212B]'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        ready ? 'bg-[#16856A] text-white shadow-sm' : 'border-2 border-[#CBD5E1]'
                      }`}>
                        {ready && '✓'}
                      </div>
                      <span className="text-sm font-semibold flex-1">{language === 'te' ? doc.nameTe : doc.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        ready ? 'bg-[#16856A]/20 text-[#16856A]' : 'bg-[#FEF3CD] text-[#7C5B00]'
                      }`}>
                        {ready ? t('docs.docReady') : t('docs.docMissing')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(`/documents/${b.id}`)}
                  className="btn btn-secondary flex-1 font-semibold"
                >
                  <FileText size={16} />
                  <span>{t('detail.prepareDocuments')}</span>
                  <ChevronRight size={16} />
                </button>

                {allDocsReady && (
                  <button
                    onClick={() => handleStartApplication('form-completed')}
                    className="btn btn-success flex-1 font-semibold shadow-lg shadow-[#16856A]/25 group"
                  >
                    <Send size={16} />
                    <span>{language === 'te' ? 'దరఖాస్తుకు కొనసాగండి' : 'Continue to application'}</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            {/* Application Steps Journey */}
            <div className="card p-6 rounded-3xl">
              <h2 className="text-base font-bold text-[#173B5F] mb-4">{t('detail.applicationJourney')}</h2>
              <JourneyTimeline
                steps={b.applicationSteps.map((s, i) => ({
                  label: `${String(s.step).padStart(2, '0')} ${language === 'te' ? s.titleTe : s.title}`,
                  completed: false,
                  current: i === 0,
                }))}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Primary Action Button — context-aware */}
            {isSubmitted ? (
              <button 
                onClick={() => navigate('/applications')} 
                className="btn btn-primary w-full py-4 text-base shadow-lg shadow-[#173B5F]/25 group"
              >
                <span>{language === 'te' ? 'మీ దరఖాస్తు ట్రాక్ చేయండి' : 'Track Your Application'}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : allDocsReady ? (
              <button 
                onClick={() => handleStartApplication('form-completed')} 
                className="btn btn-success w-full py-4 text-base shadow-lg shadow-[#16856A]/25 group"
              >
                <Send size={18} />
                <span>{language === 'te' ? 'దరఖాస్తుకు కొనసాగండి' : 'Continue to Application'}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                onClick={() => existingApp ? navigate('/applications') : handleStartApplication()} 
                className="btn btn-success w-full py-4 text-base shadow-lg shadow-[#16856A]/25 group"
              >
                <span>{existingApp
                  ? (language === 'te' ? 'మీ ప్రగతిని చూడండి' : 'View Your Progress')
                  : (language === 'te' ? 'దరఖాస్తు ప్రారంభించండి' : 'Start Application Track')
                }</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Why locked — only when Apply is not yet available */}
            {!allDocsReady && !isSubmitted && (
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA] text-xs">
                <div className="flex items-start gap-2.5">
                  <Info size={16} className="text-[#D99A24] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#17212B] mb-1">
                      {language === 'te' ? 'దరఖాస్తు ఎందుకు అందుబాటులో లేదు?' : 'Why can\'t I apply yet?'}
                    </p>
                    <p className="text-[#66727E] leading-relaxed">
                      {language === 'te'
                        ? `మీరు అధికారిక దరఖాస్తు ప్రారంభించడానికి ముందు ${missingDocs.length} పత్రం(లు) సిద్ధం చేయాలి. ముందుగా "పత్రాలు సిద్ధం చేయండి" క్లిక్ చేయండి.`
                        : `You need to prepare ${missingDocs.length} more document${missingDocs.length !== 1 ? 's' : ''} before starting the official application. Use the "Prepare Documents" button above to mark each document as ready.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Deadline Tile */}
            <div className="card p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-[#173B5F]">
                <Calendar size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider">{t('detail.deadline')}</h3>
              </div>
              <p className="text-sm font-semibold text-[#17212B]">
                {b.deadline || t('detail.noDeadline')}
              </p>
            </div>

            {/* Official Source & Verification Tile */}
            <div className="card p-5 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B5F] mb-3 flex items-center gap-1.5">
                <Building2 size={14} />
                <span>{t('detail.officialSource')}</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#9AA5B1] font-medium">{t('detail.department')}</span>
                  <p className="text-[#17212B] font-semibold mt-0.5">{dept}</p>
                </div>
                <div>
                  <span className="text-[#9AA5B1] font-medium">{t('detail.lastVerified')}</span>
                  <p className="text-[#16856A] font-bold mt-0.5 flex items-center gap-1">
                    <ShieldCheck size={12} /> {b.lastVerified}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a 
                  href={b.officialApplicationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm w-full text-xs"
                >
                  <ExternalLink size={13} /> {t('detail.viewSource')}
                </a>
              </div>
            </div>

            {/* Demo Notice */}
            {b.isDemoData && (
              <div className="p-3.5 rounded-2xl text-xs bg-[#FEF3CD] text-[#7C5B00] border border-[#D99A24]/30">
                <div className="flex items-start gap-2">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  <p>{t('detail.demoNotice')}</p>
                </div>
              </div>
            )}

            {/* Trust disclaimer */}
            <div className="p-4 rounded-2xl border border-[#E2E6EA] text-xs text-[#66727E] bg-white/60">
              <div className="flex items-start gap-2">
                <Shield size={14} className="mt-0.5 text-[#16856A] shrink-0" />
                <p>{t('detail.basedOn')}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-medium text-[#9AA5B1] uppercase tracking-wider">{label}</span>
      <div className="text-xs font-bold text-[#17212B] mt-1">{value}</div>
    </div>
  );
}
