// ============================================================
// SevaPath — Citizen Application Journey Tracker
// Stages: Started → Documents ready → Submitted → Under verification → Decision
// User-managed beyond step 2. SevaPath never auto-advances.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { EmptyState } from '../components/UI';
import { getBenefitById } from '../data/benefits';
import { isOpenableUrl, openOfficialApplication } from '../services/startApplication';
import type { TrackedApplication, CivicApplicationStage, CivicDecisionOutcome, ApplicationStatus } from '../types';
import {
  FileText, ArrowRight, ExternalLink, Trash2, Calendar,
  ShieldCheck, Info, Sparkles, ChevronDown, ChevronUp,
  Search, Check, Clock, Edit2, RotateCcw
} from 'lucide-react';

const STAGES: { key: CivicApplicationStage; en: string; te: string; hi: string; isUserSet: boolean }[] = [
  { key: 'started', en: 'Started', te: 'ప్రారంభమైంది', hi: 'आरंभ हुआ', isUserSet: false },
  { key: 'documents-ready', en: 'Documents ready', te: 'పత్రాలు సిద్ధమయ్యాయి', hi: 'दस्तावेज तैयार', isUserSet: false },
  { key: 'submitted', en: 'Submitted', te: 'సమర్పించబడింది', hi: 'जमा किया गया', isUserSet: true },
  { key: 'under-verification', en: 'Under verification', te: 'ధృవీకరణలో ఉంది', hi: 'सत्यापन प्रक्रिया में', isUserSet: true },
  { key: 'decision', en: 'Decision', te: 'నిర్ణయం', hi: 'निर्णय', isUserSet: true },
];

export default function ApplicationsPage() {
  const { t, language, applications, updateApplication, removeApplication } = useApp();
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [editingDatesApp, setEditingDatesApp] = useState<string | null>(null);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const getStageIndex = (app: TrackedApplication): number => {
    if (app.civicStage) {
      const idx = STAGES.findIndex((s) => s.key === app.civicStage);
      return idx >= 0 ? idx : 0;
    }
    // Fallback based on legacy stage/status
    if (app.status === 'decision-received' || app.status === 'approved' || app.status === 'rejected') return 4;
    if (app.status === 'verification') return 3;
    if (app.status === 'submitted') return 2;
    if (app.status === 'documents-ready') return 1;
    return 0;
  };

  const handleAdvanceStage = (app: TrackedApplication) => {
    const currentIndex = getStageIndex(app);
    if (currentIndex >= STAGES.length - 1) return;
    const nextStage = STAGES[currentIndex + 1].key;
    const today = new Date().toISOString().split('T')[0];

    const stageStatusMap: Record<CivicApplicationStage, ApplicationStatus> = {
      'started': 'preparing',
      'documents-ready': 'documents-ready',
      'submitted': 'submitted',
      'under-verification': 'verification',
      'decision': 'decision-received',
    };

    updateApplication(app.id, {
      civicStage: nextStage,
      status: nextStage === 'decision' ? 'decision-received' : stageStatusMap[nextStage],
      submittedDate: nextStage === 'submitted' ? today : app.submittedDate,
      verificationDate: nextStage === 'under-verification' ? today : app.verificationDate,
      decisionDate: nextStage === 'decision' ? today : app.decisionDate,
      civicDecision: nextStage === 'decision' ? (app.civicDecision || 'waiting') : app.civicDecision,
    });
  };

  const handleRewindStage = (app: TrackedApplication) => {
    const currentIndex = getStageIndex(app);
    if (currentIndex <= 0) return;
    const prevStage = STAGES[currentIndex - 1].key;

    const stageStatusMap: Record<CivicApplicationStage, ApplicationStatus> = {
      'started': 'preparing',
      'documents-ready': 'documents-ready',
      'submitted': 'submitted',
      'under-verification': 'verification',
      'decision': 'decision-received',
    };

    updateApplication(app.id, {
      civicStage: prevStage,
      status: stageStatusMap[prevStage],
    });
  };

  const handleUpdateDecision = (app: TrackedApplication, decision: CivicDecisionOutcome) => {
    updateApplication(app.id, {
      civicDecision: decision,
      status: decision === 'approved' ? 'approved' : decision === 'rejected' ? 'rejected' : 'decision-received',
    });
  };

  const handleSaveNote = (app: TrackedApplication, note: string) => {
    updateApplication(app.id, { userNotes: note });
  };

  if (applications.length === 0) {
    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719] mb-1">{t('tracker.title')}</h1>
            <p className="text-sm text-[#728477]">{t('tracker.subtitle')}</p>
          </div>
          <EmptyState
            icon={<FileText size={48} />}
            title={t('tracker.noApps')}
            subtitle={t('tracker.noAppsSub')}
            action={
              <button onClick={() => navigate('/questionnaire')} className="btn btn-primary shadow-md">
                <Search size={16} /> {t('tracker.findHelp')}
              </button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#728477]/10 text-[#728477] text-xs font-bold mb-2.5">
            <ShieldCheck size={14} className="text-[#B85F45]" />
            <span>{isTe ? 'మీరు నిర్వహించే పౌర ట్రాకర్' : isHi ? 'नागरिक स्व-प्रबंधित ट्रैकर' : 'Self-managed civic tracker'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719] mb-1">{t('tracker.title')}</h1>
          <p className="text-sm text-[#728477]">{t('tracker.subtitle')}</p>
        </div>

        {/* Trust & Independence Banner */}
        <div className="p-4 rounded-2xl mb-6 bg-[#FAF8F3] border border-[#D8CDBB] flex items-start gap-3 text-xs text-[#30364F]">
          <Info size={16} className="mt-0.5 shrink-0 text-[#B85F45]" />
          <div className="space-y-1">
            <span className="font-bold text-[#151719] block">
              {isTe
                ? 'మీరు నవీకరించినది. SevaPath మీ అధికారిక స్థితిని చూడలేదు.'
                : isHi
                ? 'आपके द्वारा अपडेट किया गया। SevaPath आपकी आधिकारिक स्थिति नहीं देख सकता।'
                : 'Updated by you. SevaPath cannot see your official status.'}
            </span>
            <p className="text-[#728477] leading-relaxed">
              {isTe
                ? 'దరఖాస్తు సమర్పణ, విచారణ మరియు తుది నిర్ణయాలు ప్రభుత్వ అధికారుల పరిధిలో ఉంటాయి. మీ పురోగతిని ట్రాక్ చేయడానికి ఈ మైలురాళ్లను మీరే నవీకరించండి.'
                : isHi
                ? 'आवेदन जमा करना और अंतिम निर्णय सरकारी विभागों के अधीन हैं। अपनी प्रगति याद रखने के लिए इसे स्वयं अपडेट करें।'
                : 'Official application decisions are made exclusively by government departments. Mark these milestones manually to keep your personal records organised.'}
            </p>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-5">
          {applications.map((app) => {
            const benefit = getBenefitById(app.benefitId);
            const appName = isTe ? app.benefitNameTe : isHi ? (app.benefitNameHi || app.benefitName) : app.benefitName;
            const stageIdx = getStageIndex(app);
            const currentStageObj = STAGES[stageIdx];
            const expanded = expandedApp === app.id;
            const isEditingDates = editingDatesApp === app.id;

            const officialUrl = app.officialStatusUrl || benefit?.officialStatusUrl || benefit?.officialApplicationUrl;
            const hasOfficialStatusUrl = isOpenableUrl(officialUrl);

            return (
              <div
                key={app.id}
                className="card p-0 rounded-3xl border border-[#D8CDBB] bg-[#FAF8F3] overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                {/* Main Card Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B85F45] block mb-1">
                        Application #{app.id.slice(-6)}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[#151719] leading-snug">
                        {appName}
                      </h2>
                    </div>

                    <button
                      onClick={() => removeApplication(app.id)}
                      className="text-[#728477] hover:text-[#B85F45] p-1.5 rounded-lg transition-colors"
                      aria-label="Remove tracked application"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* 5-Stage Stepper Bar */}
                  <div className="my-5">
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-2">
                      {STAGES.map((s, idx) => {
                        const isDone = idx < stageIdx;
                        const isCurrent = idx === stageIdx;
                        return (
                          <div key={s.key} className="flex flex-col items-center">
                            <div
                              className={`w-full h-2 rounded-full transition-all ${
                                isDone
                                  ? 'bg-[#728477]'
                                  : isCurrent
                                  ? 'bg-[#B85F45]'
                                  : 'bg-[#D8CDBB]/50'
                              }`}
                            />
                            <span
                              className={`text-[9px] sm:text-[10px] mt-1.5 text-center font-bold truncate max-w-full ${
                                isCurrent
                                  ? 'text-[#B85F45]'
                                  : isDone
                                  ? 'text-[#151719]'
                                  : 'text-[#728477]'
                              }`}
                            >
                              {isTe ? s.te : isHi ? s.hi : s.en}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stage Summary & Decision if at stage 4 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E8E3DA] flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#B85F45]" />
                      <span className="text-xs font-bold text-[#151719]">
                        Current Stage: {isTe ? currentStageObj.te : isHi ? currentStageObj.hi : currentStageObj.en}
                      </span>
                    </div>

                    {stageIdx === 4 && (
                      <div className="flex items-center gap-1.5">
                        {(['approved', 'waiting', 'rejected'] as CivicDecisionOutcome[]).map((d) => (
                          <button
                            key={d}
                            onClick={() => handleUpdateDecision(app, d)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                              app.civicDecision === d
                                ? d === 'approved'
                                  ? 'bg-[#728477] text-white'
                                  : d === 'rejected'
                                  ? 'bg-[#B85F45] text-white'
                                  : 'bg-[#D99A24] text-white'
                                : 'bg-[#F1EDE4] text-[#728477] hover:bg-[#D8CDBB]'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controls: Next, Back, Edit Dates */}
                  <div className="mt-4 pt-4 border-t border-[#E8E3DA] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {stageIdx > 0 && (
                        <button
                          onClick={() => handleRewindStage(app)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#D8CDBB] bg-white text-xs font-bold text-[#728477] hover:bg-[#F1EDE4] transition-colors"
                        >
                          <RotateCcw size={12} />
                          <span>Back</span>
                        </button>
                      )}

                      {stageIdx < STAGES.length - 1 && (
                        <button
                          onClick={() => handleAdvanceStage(app)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#151719] text-white text-xs font-bold hover:bg-[#30364F] transition-all shadow-2xs"
                        >
                          <span>Next Stage</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {hasOfficialStatusUrl && (
                        <a
                          href={officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#B85F45] text-white text-xs font-bold hover:bg-[#a05038] transition-all"
                        >
                          <span>Open official status page</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      <button
                        onClick={() => setExpandedApp(expanded ? null : app.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-[#728477] hover:bg-[#F1EDE4]"
                      >
                        <span>{expanded ? 'Hide Details' : 'Milestone Notes & Dates'}</span>
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Milestone Dates & Notes */}
                {expanded && (
                  <div className="border-t border-[#D8CDBB] p-5 sm:p-6 bg-white space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#151719]">
                        Milestone Dates & Private Notes
                      </h3>
                      <button
                        onClick={() => setEditingDatesApp(isEditingDates ? null : app.id)}
                        className="text-xs font-bold text-[#B85F45] flex items-center gap-1 hover:underline"
                      >
                        <Edit2 size={12} />
                        <span>{isEditingDates ? 'Done Editing' : 'Edit Dates'}</span>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3DA]">
                        <span className="text-[10px] font-bold text-[#728477] uppercase block mb-1">Started Date</span>
                        <span className="text-xs font-bold text-[#151719]">{app.startedDate || '—'}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3DA]">
                        <span className="text-[10px] font-bold text-[#728477] uppercase block mb-1">Submitted Date</span>
                        {isEditingDates ? (
                          <input
                            type="date"
                            value={app.submittedDate || ''}
                            onChange={(e) => updateApplication(app.id, { submittedDate: e.target.value })}
                            className="w-full text-xs p-1 border rounded"
                          />
                        ) : (
                          <span className="text-xs font-bold text-[#151719]">{app.submittedDate || 'Not recorded yet'}</span>
                        )}
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3DA]">
                        <span className="text-[10px] font-bold text-[#728477] uppercase block mb-1">Decision Date</span>
                        {isEditingDates ? (
                          <input
                            type="date"
                            value={app.decisionDate || ''}
                            onChange={(e) => updateApplication(app.id, { decisionDate: e.target.value })}
                            className="w-full text-xs p-1 border rounded"
                          />
                        ) : (
                          <span className="text-xs font-bold text-[#151719]">{app.decisionDate || 'Not recorded yet'}</span>
                        )}
                      </div>
                    </div>

                    {/* Private User Note */}
                    <div>
                      <label className="text-[11px] font-bold text-[#728477] uppercase block mb-1">
                        Application Reference / Notes (stays on device)
                      </label>
                      <textarea
                        rows={2}
                        defaultValue={app.userNotes || ''}
                        onBlur={(e) => handleSaveNote(app, e.target.value)}
                        placeholder="e.g., Application Ref: NSP-2025-9876, submitted at MeeSeva center."
                        className="w-full p-2.5 rounded-xl border border-[#D8CDBB] bg-[#FAF8F3] text-xs text-[#151719] focus:outline-none focus:ring-1 focus:ring-[#B85F45]"
                      />
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
