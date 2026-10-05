// ============================================================
// SevaPath — Application Tracker Page
// ============================================================
// User-managed tracker. SevaPath only knows the steps up to
// "Application started". Submitted / Verification / Decision are
// changed ONLY when the user clicks the matching button.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { JourneyTimeline, EmptyState } from '../components/UI';
import type { TrackedApplication } from '../types';
import { getBenefitById } from '../data/benefits';
import * as storage from '../services/storage';
import { isOpenableUrl, openOfficialApplication, continueToApplication } from '../services/startApplication';
import {
  STAGES, STARTED, VERIFICATION, DECISION, COMPLETE,
  getStage, stageUpdates, statusLabel, nextStepText,
} from '../services/applicationJourney';
import {
  Search, ChevronDown, ChevronUp, ArrowRight, ExternalLink,
  Bell, FileText, Check, Info, Trash2,
  Sparkles, ShieldCheck, Calendar
} from 'lucide-react';

export default function ApplicationsPage() {
  const { t, language, applications, addApplication, updateApplication, removeApplication } = useApp();
  const navigate = useNavigate();
  const te = language === 'te';
  const [expandedApp, setExpandedApp] = useState<string | null>(applications[0]?.id || null);
  const [reminderSet, setReminderSet] = useState<Record<string, string>>({});

  const setReminder = (appId: string, when: string) => {
    setReminderSet((prev) => ({ ...prev, [appId]: when }));
  };

  // User-controlled milestone change (persisted by AppContext)
  const moveTo = (app: TrackedApplication, stage: number) => {
    const updates = stageUpdates(app, stage);
    storage.updateApplication(app.id, updates);
    updateApplication(app.id, updates);
  };

  if (applications.length === 0) {
    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F] mb-1">{t('tracker.title')}</h1>
            <p className="text-sm text-[#66727E]">{t('tracker.subtitle')}</p>
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
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold mb-2.5">
            <ShieldCheck size={14} />
            <span>{te ? 'మీరు నిర్వహించే ట్రాకర్' : 'Self-managed tracking'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F] mb-1">{t('tracker.title')}</h1>
          <p className="text-sm text-[#66727E]">{t('tracker.subtitle')}</p>
        </div>

        {/* Trust notice */}
        <div className="p-4 rounded-2xl mb-6 bg-white/80 backdrop-blur-md border border-[#E2E6EA] flex items-start gap-3 text-xs text-[#66727E]">
          <Info size={16} className="mt-0.5 shrink-0 text-[#173B5F]" />
          <div className="space-y-1">
            <span className="font-bold text-[#17212B] block">
              {te
                ? 'SevaPath ప్రత్యక్ష ప్రభుత్వ స్థితి అప్‌డేట్‌లను అందుకోదు. ఈ దశలను మీరే నిర్వహిస్తారు.'
                : 'SevaPath does not receive live government status updates. You manage these milestones yourself.'}
            </span>
            <span className="block">
              {te
                ? 'SevaPath దరఖాస్తు ప్రయాణాన్ని సిద్ధం చేసి నావిగేట్ చేయడంలో సహాయపడుతుంది. తుది సమర్పణ, ధృవీకరణ మరియు నిర్ణయాలు అధికారిక ప్రభుత్వ అధికారం చేతిలో ఉంటాయి.'
                : 'SevaPath helps you prepare and navigate the application journey. Final submission, verification and decisions are handled by the official government authority.'}
            </span>
          </div>
        </div>

        {/* Tracked Applications Stack */}
        <div className="space-y-4">
          {applications.map((app) => {
            const expanded = expandedApp === app.id;
            const benefit = getBenefitById(app.benefitId);
            const url = benefit?.officialApplicationUrl;
            const canOpen = isOpenableUrl(url);
            const appName = te ? app.benefitNameTe : app.benefitName;

            // Effective stage: documents may have become ready since the app was saved
            const savedStage = getStage(app);
            const docsReady = !!benefit && benefit.documents.length > 0 &&
              benefit.documents.every((d) => storage.isDocumentReady(d.id, benefit.id));
            const stage = savedStage < STARTED && docsReady ? Math.max(savedStage, 2) : savedStage;
            const statusText = stage < STARTED && stage >= 2
              ? statusLabel('documents-ready', language)
              : statusLabel(app.status, language);
            const inProgress = stage < COMPLETE;
            const nextText = nextStepText(stage, language);

            const steps = STAGES.map((s, i) => {
              const base = te ? s.te : s.en;
              const date = app.stageDates?.[i];
              const pendingUser = s.userAction && i >= stage;
              const suffix = pendingUser ? (te ? ' — మీ చర్య' : ' — your action') : (date && i < stage ? ` — ${date}` : '');
              return { label: `${base}${suffix}`, completed: i < stage, current: i === stage || (stage === STARTED && i === STARTED) };
            });

            const continueApp = () => continueToApplication({
              benefit: benefit!,
              existing: app,
              addApplication,
              updateApplication,
              navigate,
            });

            return (
              <div
                key={app.id}
                className="card p-0 overflow-hidden rounded-3xl border border-[#E2E6EA] shadow-md transition-all duration-300 animate-fade-in"
              >
                {/* Header Tile */}
                <div
                  className="p-5 sm:p-6 cursor-pointer hover:bg-[#F8FAFC]/60 transition-colors"
                  onClick={() => setExpandedApp(expanded ? null : app.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-[#66727E] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0F2F4]">
                          {t(`cat.${app.category}` as any)}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A]">
                          {inProgress
                            ? (te ? 'దరఖాస్తు పురోగతిలో ఉంది' : 'Application in progress')
                            : (te ? 'పూర్తయింది' : 'Journey complete')}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#17212B] mt-1">{appName}</h3>
                      <div className="flex items-center gap-3 text-xs text-[#9AA5B1] mt-1 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {te ? 'ప్రారంభం' : 'Started on'} {app.startedDate}
                        </span>
                      </div>
                      <div className="mt-2 text-xs">
                        <span className="text-[#9AA5B1] font-medium">{te ? 'స్థితి: ' : 'Status: '}</span>
                        <span className="font-bold text-[#173B5F]">{statusText}</span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#F0F2F4] flex items-center justify-center text-[#66727E] shrink-0">
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* NEXT STEP — always visible so the user knows what to do now */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EAF2F8] to-white border border-[#173B5F]/20">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#173B5F] text-white flex items-center justify-center shrink-0">
                        <ArrowRight size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#173B5F] block">
                          {t('tracker.nextStep')}
                        </span>
                        <p className="text-sm font-semibold text-[#17212B]">{nextText}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                      {stage < 2 && (
                        <button
                          onClick={() => navigate(`/documents/${app.benefitId}`)}
                          className="btn btn-primary flex-1 text-sm"
                        >
                          <FileText size={15} />
                          <span>{te ? 'పత్రాలు సిద్ధం చేయండి' : 'Prepare documents'}</span>
                        </button>
                      )}

                      {stage === 2 && benefit && (
                        <button onClick={continueApp} className="btn btn-success flex-1 text-sm">
                          <span>{te ? 'దరఖాస్తుకు కొనసాగండి' : 'Continue to application'}</span>
                          <ArrowRight size={15} />
                        </button>
                      )}

                      {stage >= STARTED && stage < VERIFICATION && (
                        <>
                          <button
                            onClick={() => openOfficialApplication(url)}
                            disabled={!canOpen}
                            className="btn btn-primary flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>{te ? 'అధికారిక దరఖాస్తు తెరవండి' : 'Open official application'}</span>
                            <ExternalLink size={15} />
                          </button>
                          <button
                            onClick={() => moveTo(app, VERIFICATION)}
                            className="btn btn-secondary flex-1 text-sm"
                          >
                            <Check size={15} />
                            <span>{te ? 'నేను నా దరఖాస్తును సమర్పించాను' : 'I have submitted my application'}</span>
                          </button>
                        </>
                      )}

                      {stage === VERIFICATION && (
                        <button onClick={() => moveTo(app, DECISION)} className="btn btn-success flex-1 text-sm">
                          <Check size={15} />
                          <span>{te ? 'ధృవీకరించబడినట్లు గుర్తించండి' : 'Mark as verified'}</span>
                        </button>
                      )}

                      {stage === DECISION && (
                        <button onClick={() => moveTo(app, COMPLETE)} className="btn btn-success flex-1 text-sm">
                          <Check size={15} />
                          <span>{te ? 'నిర్ణయం అందిందని గుర్తించండి' : 'Mark decision received'}</span>
                        </button>
                      )}

                      {stage > STARTED && canOpen && (
                        <button
                          onClick={() => openOfficialApplication(url)}
                          className="btn btn-secondary flex-1 text-sm"
                        >
                          <span>{te ? 'అధికారిక దరఖాస్తు తెరవండి' : 'Open official application'}</span>
                          <ExternalLink size={15} />
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/benefit/${app.benefitId}`)}
                        className="btn btn-ghost flex-1 text-sm"
                      >
                        <span>{te ? 'ప్రయోజనం చూడండి' : 'View benefit'}</span>
                      </button>
                    </div>

                    {stage >= STARTED && stage < VERIFICATION && !canOpen && (
                      <p className="text-[11px] text-[#7C5B00] mt-2">
                        {te
                          ? 'ఈ ప్రయోజనానికి అధికారిక దరఖాస్తు లింక్ ఇంకా సెట్ చేయలేదు.'
                          : 'No official application link is configured for this benefit yet.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Timeline & Details */}
                {expanded && (
                  <div className="border-t border-[#E2E6EA] p-5 sm:p-6 bg-[#F8FAFC] animate-fade-in space-y-6">

                    {/* Journey Timeline */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2E6EA]">
                      <h4 className="text-xs font-bold text-[#173B5F] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#D99A24]" />
                        <span>{t('tracker.timeline')}</span>
                      </h4>
                      <JourneyTimeline steps={steps} />
                    </div>

                    {/* Follow-up Reminder */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2E6EA]">
                      <h4 className="text-xs font-bold text-[#173B5F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Bell size={13} className="text-[#16856A]" />
                        <span>{t('tracker.setReminder')}</span>
                      </h4>

                      {reminderSet[app.id] ? (
                        <div className="p-3 rounded-xl bg-[#E8F5E9] text-[#126D57] text-xs font-bold flex items-center gap-2">
                          <Check size={16} className="stroke-[3]" />
                          <span>{t('tracker.reminderSet')} — {reminderSet[app.id]}</span>
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          <button onClick={() => setReminder(app.id, t('tracker.tomorrow'))} className="btn btn-secondary btn-sm text-xs">
                            {t('tracker.tomorrow')}
                          </button>
                          <button onClick={() => setReminder(app.id, t('tracker.in3Days'))} className="btn btn-secondary btn-sm text-xs">
                            {t('tracker.in3Days')}
                          </button>
                          <button onClick={() => setReminder(app.id, t('tracker.nextWeek'))} className="btn btn-secondary btn-sm text-xs">
                            {t('tracker.nextWeek')}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end pt-2">
                      <button
                        onClick={() => removeApplication(app.id)}
                        className="btn btn-ghost btn-sm text-xs text-[#C94A4A] hover:bg-[#FDE8E8]"
                      >
                        <Trash2 size={14} />
                        <span>{te ? 'తొలగించు' : 'Remove'}</span>
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
