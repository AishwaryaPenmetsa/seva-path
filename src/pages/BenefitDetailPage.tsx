// ============================================================
// SevaPath — Premium Benefit Detail Page (Redesigned)
// Verified links, department helplines, warm civic palette
// ============================================================

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, EffortIndicator, AppModeBadge, JourneyTimeline } from '../components/UI';
import BenefitJourneyGraphic from '../components/BenefitJourneyGraphic';
import type { JourneyStage } from '../components/BenefitJourneyGraphic';
import { getBenefitById } from '../data/benefits';
import { getStage, STARTED, VERIFICATION } from '../services/applicationJourney';
import {
  ChevronLeft, ChevronRight, Check, AlertTriangle,
  FileText, Clock, Monitor, ExternalLink, Shield,
  Calendar, BookmarkPlus, Bookmark, Info, ArrowRight,
  ShieldCheck, Sparkles, Building2, Send, Phone
} from 'lucide-react';
import * as storage from '../services/storage';
import { continueToApplication, createTrackedApplication, isOpenableUrl } from '../services/startApplication';

export default function BenefitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, isBenefitSaved, toggleSavedBenefit, addApplication, applications, updateApplication, helpMapResults } = useApp();

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const benefit = getBenefitById(id || '');

  if (!benefit) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-12">
        <div className="text-center">
          <p className="text-lg font-bold text-[#151719] mb-2">{t('general.error')}</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            <ChevronLeft size={16} /> {t('q.back')}
          </button>
        </div>
      </div>
    );
  }

  const b = benefit;
  const name = isTe ? b.nameTe : isHi ? (b.nameHi || b.name) : b.name;
  const description = isTe ? b.descriptionTe : isHi ? (b.descriptionHi || b.description) : b.description;
  const benefitText = isTe ? b.benefitTe : isHi ? (b.benefitHi || b.benefit) : b.benefit;
  const dept = isTe ? b.departmentTe : isHi ? (b.departmentHi || b.department) : (b.departmentName || b.department);
  const officialSrc = isTe ? b.officialSourceTe : b.officialSource;
  const verNotes = isTe ? b.verificationNotesTe : b.verificationNotes;
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

  // Existing application
  const existingApp = applications.find((a) => a.benefitId === b.id);
  const appStage = existingApp ? getStage(existingApp) : 0;
  const isSubmitted = appStage >= VERIFICATION;
  const isFormCompleted = appStage >= STARTED;

  // Compute current journey stage
  const currentStage: JourneyStage = useMemo(() => {
    if (isSubmitted) return 'track';
    if (isFormCompleted || allDocsReady) return 'apply';
    return 'prepare';
  }, [isSubmitted, isFormCompleted, allDocsReady]);

  const handleContinue = () => {
    continueToApplication({
      benefit: b,
      existing: existingApp,
      addApplication,
      updateApplication,
      navigate,
    });
  };

  const { nextActionLabel, nextActionHandler } = (() => {
    if (isSubmitted) {
      return {
        nextActionLabel: isTe ? 'మీ దరఖాస్తు ట్రాక్ చేయండి' : isHi ? 'आवेदन ट्रैक करें' : 'Track your application',
        nextActionHandler: () => navigate('/applications'),
      };
    }
    if (allDocsReady) {
      return {
        nextActionLabel: isTe ? 'దరఖాస్తుకు కొనసాగండి' : isHi ? 'आवेदन के लिए आगे बढ़ें' : 'Continue to application',
        nextActionHandler: handleContinue,
      };
    }
    const remaining = b.documents.length - readyDocs.length;
    return {
      nextActionLabel: isTe
        ? `${remaining} పత్రాలు సిద్ధం చేయండి`
        : isHi
        ? `शेष ${remaining} दस्तावेज तैयार करें`
        : `Prepare ${remaining} remaining document${remaining !== 1 ? 's' : ''}`,
      nextActionHandler: () => navigate(`/documents/${b.id}`),
    };
  })();

  const handleStartApplication = () => {
    if (!existingApp) {
      const app = createTrackedApplication(b, 1);
      storage.addApplication(app);
      addApplication(app);
    }
    navigate('/applications');
  };

  const missingDocs = b.documents.filter((d) => !docChecks.find((dc) => dc.documentId === d.id && dc.benefitId === b.id && dc.isReady));

  const hasAppUrl = Boolean(b.officialApplicationUrl && b.officialApplicationUrl !== '#demo');
  const hasInfoUrl = Boolean((b.officialInfoUrl || b.sourceUrl) && (b.officialInfoUrl || b.sourceUrl) !== '#demo');

  const deadlineDisplay = b.deadline
    ? b.deadline === 'rolling'
      ? (isTe ? 'అప్లికేషన్లు తెరిచి ఉన్నాయి (రోలింగ్)' : isHi ? 'आवेदन खुले हैं (रोलिंग)' : 'Applications open (rolling)')
      : b.deadline
    : (isTe ? 'గడువు కోసం అధికారిక పోర్టల్ తనిఖీ చేయండి' : isHi ? 'समय सीमा के लिए पोर्टल देखें' : 'Check the official portal for current deadline');

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        
        {/* Back navigation */}
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-6 -ml-2 text-[#728477] hover:text-[#151719]">
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
        <div className="benefit-hero animate-fade-in p-6 sm:p-8 rounded-3xl bg-white border border-[#D8CDBB] shadow-xs flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold text-[#B85F45] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F1EDE4]">
                {t(`cat.${b.category}` as any)}
              </span>
              {matchResult && <StatusBadge status={matchResult.status} />}
              {existingApp && (
                <span className="text-xs font-bold text-[#30364F] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8E3DA]">
                  Tracked
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719]">
              {name}
            </h1>
            <p className="text-sm text-[#728477] mt-2 leading-relaxed max-w-2xl font-medium">
              {description}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => toggleSavedBenefit(b.id)} 
              className={`btn btn-sm ${saved ? 'bg-[#151719] text-white' : 'bg-[#F1EDE4] text-[#151719] border border-[#D8CDBB]'}`}
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
            <div className="card p-6 rounded-3xl bg-white border border-[#D8CDBB]">
              <h2 className="text-base font-bold text-[#151719] mb-4 flex items-center gap-2">
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

            {/* Eligibility Criteria */}
            <div className="card p-6 rounded-3xl bg-white border border-[#D8CDBB]">
              <h2 className="text-base font-bold text-[#151719] mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#728477]" />
                <span>{t('detail.eligibility')}</span>
              </h2>
              <div className="space-y-3">
                {b.eligibilityCriteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3DA]">
                    <Check size={16} className="text-[#728477] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#151719]">{isTe ? c.labelTe : c.label}</p>
                      <p className="text-xs text-[#728477] mt-0.5">{isTe ? c.conditionTe : c.condition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Preparation Action Card */}
            <div className="card p-6 rounded-3xl bg-white border border-[#D8CDBB]">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-base font-bold text-[#151719] flex items-center gap-2">
                  <FileText size={18} className="text-[#B85F45]" />
                  <span>{t('detail.docsNeeded')}</span>
                </h2>
                <button
                  onClick={() => navigate(`/documents/${b.id}`)}
                  className="btn btn-sm bg-[#B85F45] text-white hover:bg-[#a05038]"
                >
                  <span>{t('detail.prepDocs')}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {b.documents.map((doc) => {
                  const isReady = storage.isDocumentReady(doc.id, b.id);
                  return (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3DA]">
                      <span className="text-xs font-semibold text-[#151719]">{isTe ? doc.nameTe : doc.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isReady ? 'bg-[#EAF4F0] text-[#728477]' : 'bg-[#F1EDE4] text-[#151719]'
                      }`}>
                        {isReady ? 'Ready' : 'Needed'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="card p-6 rounded-3xl bg-white border border-[#D8CDBB]">
              <h2 className="text-base font-bold text-[#151719] mb-4">{t('detail.applicationJourney')}</h2>
              <JourneyTimeline
                steps={[
                  { label: `01 ${isTe ? 'వివరాలు తనిఖీ చేయండి' : 'Check details'}`, completed: true, current: false },
                  { label: `02 ${isTe ? 'పత్రాలు సిద్ధం చేయండి' : 'Prepare documents'}`, completed: allDocsReady, current: !allDocsReady },
                  { label: `03 ${isTe ? 'అధికారికంగా దరఖాస్తు చేయండి' : 'Apply officially'}`, completed: isSubmitted, current: allDocsReady && !isSubmitted },
                ]}
              />
              <p className="text-[11px] text-[#728477] mt-4 leading-relaxed">
                {isTe
                  ? 'SevaPath దరఖాస్తు ప్రయాణాన్ని సిద్ధం చేసి నావిగేట్ చేయడంలో సహాయపడుతుంది. తుది సమర్పణ, ధృవీకరణ మరియు నిర్ణయాలు అధికారిక ప్రభుత్వ అధికారం చేతిలో ఉంటాయి.'
                  : 'SevaPath helps you prepare and navigate the application journey. Final submission, verification and decisions are handled by the official government authority.'}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Primary Action Button */}
            {isSubmitted ? (
              <button 
                onClick={() => navigate('/applications')} 
                className="btn btn-primary w-full py-4 text-base shadow-lg group"
              >
                <span>{isTe ? 'మీ దరఖాస్తు ట్రాక్ చేయండి' : isHi ? 'आवेदन ट्रैक करें' : 'Track Your Application'}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : allDocsReady ? (
              <button 
                onClick={handleContinue} 
                className="btn btn-primary w-full py-4 text-base shadow-lg group"
              >
                <Send size={18} />
                <span>{isTe ? 'దరఖాస్తుకు కొనసాగండి' : isHi ? 'आवेदन के लिए आगे बढ़ें' : 'Continue to Application'}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                onClick={() => existingApp ? navigate('/applications') : handleStartApplication()} 
                className="btn btn-primary w-full py-4 text-base shadow-lg group"
              >
                <span>{existingApp
                  ? (isTe ? 'మీ ప్రగతిని చూడండి' : isHi ? 'प्रगति देखें' : 'View Your Progress')
                  : (isTe ? 'దరఖాస్తు ప్రారంభించండి' : isHi ? 'ट्रैक शुरू करें' : 'Start Application Track')
                }</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Why locked note */}
            {!allDocsReady && !isSubmitted && (
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#D8CDBB] text-xs">
                <div className="flex items-start gap-2.5">
                  <Info size={16} className="text-[#D99A24] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#151719] mb-1">
                      {isTe ? 'దరఖాస్తు ఎందుకు అందుబాటులో లేదు?' : 'Why can\'t I apply yet?'}
                    </p>
                    <p className="text-[#728477] leading-relaxed">
                      {isTe
                        ? `మీరు అధికారిక దరఖాస్తు ప్రారంభించడానికి ముందు ${missingDocs.length} పత్రం(లు) సిద్ధం చేయాలి.`
                        : `You need to prepare ${missingDocs.length} more document${missingDocs.length !== 1 ? 's' : ''} before starting the official application.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Deadline Tile */}
            <div className="card p-5 rounded-2xl bg-white border border-[#D8CDBB]">
              <div className="flex items-center gap-2 mb-2 text-[#151719]">
                <Calendar size={16} className="text-[#B85F45]" />
                <h3 className="text-xs font-bold uppercase tracking-wider">{t('detail.deadline')}</h3>
              </div>
              <p className="text-sm font-semibold text-[#151719]">
                {deadlineDisplay}
              </p>
            </div>

            {/* Official Source & Verification Tile */}
            <div className="card p-5 rounded-2xl bg-white border border-[#D8CDBB]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#151719] mb-3 flex items-center gap-1.5">
                <Building2 size={14} className="text-[#728477]" />
                <span>{t('detail.officialSource')}</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#728477] font-medium">{t('detail.department')}</span>
                  <p className="text-[#151719] font-semibold mt-0.5">{dept}</p>
                </div>
                <div>
                  <span className="text-[#728477] font-medium">{t('detail.lastVerified')}</span>
                  <p className="text-[#728477] font-bold mt-0.5 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-[#728477]" /> {b.lastVerified}
                  </p>
                </div>
              </div>

              {/* Verified External Buttons */}
              <div className="mt-4 space-y-2">
                {hasAppUrl ? (
                  <a 
                    href={b.officialApplicationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-sm w-full text-xs"
                  >
                    <ExternalLink size={13} />
                    <span>Open official application</span>
                  </a>
                ) : null}

                {hasInfoUrl ? (
                  <a 
                    href={b.officialInfoUrl || b.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-ghost btn-sm w-full text-xs border border-[#D8CDBB]"
                  >
                    <ExternalLink size={13} />
                    <span>Official information</span>
                  </a>
                ) : null}

                {!hasAppUrl && !hasInfoUrl && (
                  <p className="text-xs text-[#728477] p-2 bg-[#F1EDE4] rounded-xl text-center font-medium">
                    Check the official department: {b.departmentName || b.department}
                  </p>
                )}
              </div>
            </div>

            {/* Helpline Box */}
            <div className="card p-5 rounded-2xl bg-[#FAF8F3] border border-[#D8CDBB]">
              <div className="flex items-center gap-2 mb-2 text-[#151719]">
                <Phone size={16} className="text-[#B85F45]" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  {isTe ? 'సహాయం కావాలా?' : isHi ? 'सहायता चाहिए?' : 'Need Help?'}
                </h3>
              </div>
              <p className="text-xs text-[#728477] mb-2 leading-relaxed">
                {isTe
                  ? 'ప్రశ్నల కోసం అధికారిక శాఖ హెల్ప్‌లైన్‌ను సంప్రదించండి:'
                  : 'Contact the verified department helpline for scheme queries:'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#151719] font-mono">
                  {b.helpline?.number || '1800-11-0031 / 1100'}
                </span>
                <button
                  onClick={() => navigate('/help')}
                  className="text-xs font-bold text-[#B85F45] hover:underline"
                >
                  View /help
                </button>
              </div>
            </div>

            {/* Trust disclaimer */}
            <div className="p-4 rounded-2xl border border-[#D8CDBB] text-xs text-[#728477] bg-white">
              <div className="flex items-start gap-2">
                <Shield size={14} className="mt-0.5 text-[#728477] shrink-0" />
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
      <span className="text-[11px] font-medium text-[#728477] uppercase tracking-wider">{label}</span>
      <div className="text-xs font-bold text-[#151719] mt-1">{value}</div>
    </div>
  );
}
