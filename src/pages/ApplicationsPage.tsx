// ============================================================
// SevaPath — Premium Application Tracker Page
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { JourneyTimeline, EmptyState } from '../components/UI';
import type { TrackedApplication, ApplicationStatus } from '../types';
import {
  Search, ChevronDown, ChevronUp, Clock, ArrowRight,
  Bell, FileText, Check, AlertCircle, Info, Edit3, Trash2,
  Sparkles, Award, ShieldCheck, Calendar
} from 'lucide-react';

const statusConfig: Record<ApplicationStatus, { color: string; bg: string; border: string }> = {
  discovered: { color: '#173B5F', bg: '#EAF2F8', border: '#173B5F' },
  preparing: { color: '#D99A24', bg: '#FEF3CD', border: '#D99A24' },
  'documents-ready': { color: '#16856A', bg: '#E8F5E9', border: '#16856A' },
  'form-completed': { color: '#16856A', bg: '#E8F5E9', border: '#16856A' },
  submitted: { color: '#173B5F', bg: '#EAF2F8', border: '#173B5F' },
  verification: { color: '#D99A24', bg: '#FEF3CD', border: '#D99A24' },
  approved: { color: '#16856A', bg: '#E8F5E9', border: '#16856A' },
  rejected: { color: '#C94A4A', bg: '#FDE8E8', border: '#C94A4A' },
  'action-required': { color: '#C94A4A', bg: '#FDE8E8', border: '#C94A4A' },
};

export default function ApplicationsPage() {
  const { t, language, applications, updateApplication, removeApplication } = useApp();
  const navigate = useNavigate();
  const [expandedApp, setExpandedApp] = useState<string | null>(applications[0]?.id || null);
  const [reminderSet, setReminderSet] = useState<Record<string, string>>({});

  const setReminder = (appId: string, when: string) => {
    setReminderSet((prev) => ({ ...prev, [appId]: when }));
  };

  const getStatusLabel = (status: ApplicationStatus): string => {
    const labels: Record<ApplicationStatus, string> = {
      discovered: language === 'te' ? 'కనుగొనబడింది' : 'Discovered',
      preparing: language === 'te' ? 'సిద్ధం చేస్తోంది' : 'Preparing Documents',
      'documents-ready': language === 'te' ? 'పత్రాలు సిద్ధం' : 'Documents Ready',
      'form-completed': language === 'te' ? 'ఫారమ్ పూర్తి' : 'Form Completed',
      submitted: language === 'te' ? 'సమర్పించబడింది' : 'Submitted to Portal',
      verification: language === 'te' ? 'ధృవీకరణలో' : 'Under Verification',
      approved: language === 'te' ? 'ఆమోదించబడింది' : 'Approved & Disbursed',
      rejected: language === 'te' ? 'తిరస్కరించబడింది' : 'Rejected',
      'action-required': language === 'te' ? 'చర్య అవసరం' : 'Action Required',
    };
    return labels[status];
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
            <span>Active Citizen Tracking</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F] mb-1">{t('tracker.title')}</h1>
          <p className="text-sm text-[#66727E]">{t('tracker.subtitle')}</p>
        </div>

        {/* Status Notice */}
        <div className="p-4 rounded-2xl mb-6 bg-white/80 backdrop-blur-md border border-[#E2E6EA] flex items-start gap-3 text-xs text-[#66727E]">
          <Info size={16} className="mt-0.5 shrink-0 text-[#173B5F]" />
          <div>
            <span className="font-bold text-[#17212B] block mb-0.5">{t('tracker.statusTracking')}</span>
            <span>Maintain local notes, follow up dates, and milestone checks all in one place.</span>
          </div>
        </div>

        {/* Tracked Applications Stack */}
        <div className="space-y-4">
          {applications.map((app) => {
            const expanded = expandedApp === app.id;
            const sc = statusConfig[app.status] || statusConfig.discovered;
            const appName = language === 'te' ? app.benefitNameTe : app.benefitName;
            const nextAction = language === 'te' ? (app.nextActionTe || app.nextAction) : app.nextAction;

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
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-[#66727E] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0F2F4]">
                          {t(`cat.${app.category}` as any)}
                        </span>
                        <span 
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sc.color }} />
                          {getStatusLabel(app.status)}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-[#17212B] mt-1">{appName}</h3>
                      <div className="flex items-center gap-2 text-xs text-[#9AA5B1] mt-1">
                        <Calendar size={13} />
                        <span>Started on {app.startedDate}</span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#F0F2F4] flex items-center justify-center text-[#66727E] shrink-0">
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Next Action Callout */}
                  {nextAction && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#EAF2F8] to-white border border-[#173B5F]/15 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#173B5F] text-white flex items-center justify-center shrink-0">
                        <ArrowRight size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#173B5F] block">
                          {t('tracker.nextStep')}
                        </span>
                        <p className="text-xs font-semibold text-[#17212B]">{nextAction}</p>
                      </div>
                    </div>
                  )}
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
                      <JourneyTimeline
                        steps={app.timeline.map((entry) => ({
                          label: `${language === 'te' ? entry.stepTe : entry.step}${entry.date ? ` — ${entry.date}` : ''}`,
                          completed: entry.completed,
                          current: entry.current,
                        }))}
                      />
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

                    {/* Actions footer */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => navigate(`/benefit/${app.benefitId}`)}
                        className="btn btn-primary btn-sm text-xs"
                      >
                        <FileText size={14} />
                        <span>{language === 'te' ? 'వివరాలు చూడండి' : 'View Scheme Details'}</span>
                      </button>

                      <button
                        onClick={() => removeApplication(app.id)}
                        className="btn btn-ghost btn-sm text-xs text-[#C94A4A] hover:bg-[#FDE8E8]"
                      >
                        <Trash2 size={14} />
                        <span>{language === 'te' ? 'తొలగించు' : 'Remove'}</span>
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
