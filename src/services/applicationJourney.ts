// ============================================================
// SevaPath — Application journey model
// ============================================================
// Stages 0-2 are known to SevaPath. Stage 3 starts when the user
// clicks "Continue to application". Stages 4-6 (submitted,
// verification, decision) are ONLY changed by explicit user action.
// SevaPath never receives live government status.
// ============================================================

import type { ApplicationStatus, TrackedApplication, ApplicationTimelineEntry } from '../types';

export const STAGES = [
  { en: 'Benefit discovered', te: 'ప్రయోజనం కనుగొనబడింది', userAction: false },
  { en: 'Documents prepared', te: 'పత్రాలు సిద్ధమయ్యాయి', userAction: false },
  { en: 'Ready to apply', te: 'దరఖాస్తుకు సిద్ధం', userAction: false },
  { en: 'Application started', te: 'దరఖాస్తు ప్రారంభమైంది', userAction: false },
  { en: 'Application submitted', te: 'దరఖాస్తు సమర్పించబడింది', userAction: true },
  { en: 'Verification', te: 'ధృవీకరణ', userAction: true },
  { en: 'Decision', te: 'నిర్ణయం', userAction: true },
] as const;

export const STARTED = 3;
export const SUBMITTED = 4;
export const VERIFICATION = 5;
export const DECISION = 6;
export const COMPLETE = 7;

/** Current step index of an application (handles older saved data). */
export function getStage(app: TrackedApplication): number {
  if (typeof app.stage === 'number') return app.stage;
  switch (app.status) {
    case 'discovered':
    case 'preparing': return 1;
    case 'documents-ready': return 2;
    case 'form-completed': return STARTED;
    case 'submitted': return VERIFICATION;
    case 'verification': return DECISION;
    case 'approved':
    case 'rejected':
    case 'decision-received': return COMPLETE;
    default: return STARTED;
  }
}

export function statusForStage(stage: number): ApplicationStatus {
  if (stage <= 1) return 'preparing';
  if (stage === 2) return 'documents-ready';
  if (stage <= 4) return 'form-completed'; // shown as "Application started"
  if (stage === VERIFICATION) return 'submitted';
  if (stage === DECISION) return 'verification';
  return 'decision-received';
}

export function statusLabel(status: ApplicationStatus, lang: 'en' | 'te'): string {
  const m: Record<ApplicationStatus, [string, string]> = {
    discovered: ['Benefit discovered', 'ప్రయోజనం కనుగొనబడింది'],
    preparing: ['Preparing documents', 'పత్రాలు సిద్ధం చేస్తున్నారు'],
    'documents-ready': ['Ready to apply', 'దరఖాస్తుకు సిద్ధం'],
    'form-completed': ['Application started', 'దరఖాస్తు ప్రారంభమైంది'],
    submitted: ['Application submitted', 'దరఖాస్తు సమర్పించబడింది'],
    verification: ['Verification marked done', 'ధృవీకరణ పూర్తిగా గుర్తించబడింది'],
    approved: ['Decision received', 'నిర్ణయం అందింది'],
    rejected: ['Decision received', 'నిర్ణయం అందింది'],
    'action-required': ['Action required', 'చర్య అవసరం'],
    'decision-received': ['Decision received', 'నిర్ణయం అందింది'],
  };
  return m[status][lang === 'te' ? 1 : 0];
}

export function nextStepText(stage: number, lang: 'en' | 'te'): string {
  const te = lang === 'te';
  if (stage <= 1) return te ? 'మీ పత్రాలను సిద్ధం చేయండి.' : 'Prepare your documents.';
  if (stage === 2) return te ? 'దరఖాస్తుకు కొనసాగండి.' : 'Continue to the official application.';
  if (stage <= 4) return te ? 'అధికారిక ప్రభుత్వ పోర్టల్‌లో మీ దరఖాస్తును పూర్తి చేయండి.' : 'Complete your application on the official government portal.';
  if (stage === VERIFICATION) return te ? 'సంబంధిత శాఖ మీ దరఖాస్తును ధృవీకరించే వరకు వేచి ఉండండి.' : 'Wait for the concerned department to verify your application.';
  if (stage === DECISION) return te ? 'శాఖ నిర్ణయం తెలిపినప్పుడు, దాన్ని ఇక్కడ గుర్తించండి.' : 'When the department informs you of a decision, record it here.';
  return te ? 'అన్ని దశలు మీరు గుర్తించారు.' : 'You have marked every step as done.';
}

/** Builds the stored timeline snapshot (kept for compatibility). */
export function buildTimeline(stage: number, dates: Record<number, string> = {}): ApplicationTimelineEntry[] {
  return STAGES.map((s, i) => ({
    step: s.en,
    stepTe: s.te,
    date: dates[i],
    completed: i < stage,
    current: i === stage,
  }));
}

/** Moves an application to a new stage and returns the updates to persist. */
export function stageUpdates(app: TrackedApplication, stage: number): Partial<TrackedApplication> {
  const today = new Date().toISOString().split('T')[0];
  const dates = { ...(app.stageDates || {}) };
  for (let i = getStage(app); i < stage; i++) if (!dates[i]) dates[i] = today;
  const lang = { en: nextStepText(stage, 'en'), te: nextStepText(stage, 'te') };
  return {
    stage,
    stageDates: dates,
    status: statusForStage(stage),
    timeline: buildTimeline(stage, dates),
    nextAction: lang.en,
    nextActionTe: lang.te,
  };
}
