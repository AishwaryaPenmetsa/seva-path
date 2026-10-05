// ============================================================
// SevaPath — Start application flow (shared)
// ============================================================
// 1. Opens the configured official URL in a new tab (synchronously,
//    inside the user's click so popup blockers allow it).
// 2. Persists the tracked application to localStorage BEFORE navigating.
// 3. Updates React state so /applications shows it immediately.
// SevaPath never marks an application as submitted/verified/decided.
// ============================================================

import type { Benefit, TrackedApplication } from '../types';
import * as storage from './storage';
import { buildTimeline, getStage, nextStepText, stageUpdates, statusForStage, STARTED } from './applicationJourney';

export function isOpenableUrl(url?: string): boolean {
  return !!url && /^https?:\/\//i.test(url);
}

/** Opens the benefit's configured official application URL in a new tab. */
export function openOfficialApplication(url?: string): boolean {
  if (!isOpenableUrl(url)) return false;
  const w = window.open(url, '_blank');
  if (w) {
    try { w.opener = null; } catch { /* ignore */ }
  }
  return !!w;
}

/** Creates a tracked application at the given stage (0-3). */
export function createTrackedApplication(b: Benefit, stage: number): TrackedApplication {
  const today = new Date().toISOString().split('T')[0];
  const dates: Record<number, string> = {};
  for (let i = 0; i < stage; i++) dates[i] = today;
  return {
    id: `app-${b.id}-${Date.now()}`,
    benefitId: b.id,
    benefitName: b.name,
    benefitNameTe: b.nameTe,
    category: b.category,
    status: statusForStage(stage),
    startedDate: today,
    stage,
    stageDates: dates,
    timeline: buildTimeline(stage, dates),
    nextAction: nextStepText(stage, 'en'),
    nextActionTe: nextStepText(stage, 'te'),
  };
}

interface Deps {
  benefit: Benefit;
  existing?: TrackedApplication;
  addApplication: (app: TrackedApplication) => void;
  updateApplication: (id: string, updates: Partial<TrackedApplication>) => void;
  navigate: (to: string) => void;
}

export function continueToApplication(d: Deps): void {
  const { benefit: b } = d;

  // Open the official portal first, synchronously within the click gesture.
  openOfficialApplication(b.officialApplicationUrl);

  // Re-read storage so we never create a duplicate for the same benefit.
  const existing = d.existing || storage.getApplications().find((a) => a.benefitId === b.id);

  if (existing) {
    // Never move a user-managed stage backwards.
    if (getStage(existing) < STARTED) {
      const updates = stageUpdates(existing, STARTED);
      storage.updateApplication(existing.id, updates);
      d.updateApplication(existing.id, updates);
    }
  } else {
    const app = createTrackedApplication(b, STARTED);
    storage.addApplication(app); // persist before navigating
    d.addApplication(app);
  }

  d.navigate('/applications');
}
