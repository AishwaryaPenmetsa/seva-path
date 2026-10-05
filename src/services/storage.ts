// ============================================================
// SevaPath — LocalStorage Persistence
// ============================================================

import type {
  UserProfile,
  HelpMapResults,
  TrackedApplication,
  DocumentCheckItem,
  Language,
} from '../types';

const KEYS = {
  LANGUAGE: 'sevapath_language',
  USER_PROFILE: 'sevapath_user_profile',
  HELP_MAP: 'sevapath_help_map',
  APPLICATIONS: 'sevapath_applications',
  DOCUMENTS: 'sevapath_documents',
  SAVED_BENEFITS: 'sevapath_saved_benefits',
  PROFILE_NAME: 'sevapath_profile_name',
  QUESTIONNAIRE_STEP: 'sevapath_questionnaire_step',
  AUTH_USER: 'sevapath_auth_user',
} as const;

function get<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (val === null) return fallback;
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function set(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be full or unavailable
  }
}

// Language
export function getLanguage(): Language {
  return get<Language>(KEYS.LANGUAGE, 'en');
}

export function setLanguage(lang: Language): void {
  set(KEYS.LANGUAGE, lang);
}

// User Profile
export function getUserProfile(): UserProfile | null {
  return get<UserProfile | null>(KEYS.USER_PROFILE, null);
}

export function setUserProfile(profile: UserProfile): void {
  set(KEYS.USER_PROFILE, profile);
}

// Help Map Results
export function getHelpMap(): HelpMapResults | null {
  return get<HelpMapResults | null>(KEYS.HELP_MAP, null);
}

export function setHelpMap(results: HelpMapResults): void {
  set(KEYS.HELP_MAP, results);
}

// Applications
export function getApplications(): TrackedApplication[] {
  return get<TrackedApplication[]>(KEYS.APPLICATIONS, []);
}

export function setApplications(apps: TrackedApplication[]): void {
  set(KEYS.APPLICATIONS, apps);
}

export function addApplication(app: TrackedApplication): void {
  const apps = getApplications();
  const exists = apps.find((a) => a.id === app.id);
  if (!exists) {
    apps.push(app);
    setApplications(apps);
  }
}

export function updateApplication(id: string, updates: Partial<TrackedApplication>): void {
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx !== -1) {
    apps[idx] = { ...apps[idx], ...updates };
    setApplications(apps);
  }
}

// Documents
export function getDocumentChecks(): DocumentCheckItem[] {
  return get<DocumentCheckItem[]>(KEYS.DOCUMENTS, []);
}

export function setDocumentChecks(docs: DocumentCheckItem[]): void {
  set(KEYS.DOCUMENTS, docs);
}

export function toggleDocumentReady(documentId: string, benefitId: string): void {
  const docs = getDocumentChecks();
  const idx = docs.findIndex((d) => d.documentId === documentId && d.benefitId === benefitId);
  if (idx !== -1) {
    docs[idx].isReady = !docs[idx].isReady;
  } else {
    docs.push({ documentId, benefitId, isReady: true });
  }
  setDocumentChecks(docs);
}

export function isDocumentReady(documentId: string, benefitId: string): boolean {
  const docs = getDocumentChecks();
  const doc = docs.find((d) => d.documentId === documentId && d.benefitId === benefitId);
  return doc?.isReady ?? false;
}

// Saved Benefits
export function getSavedBenefits(): string[] {
  return get<string[]>(KEYS.SAVED_BENEFITS, []);
}

export function toggleSavedBenefit(benefitId: string): void {
  const saved = getSavedBenefits();
  const idx = saved.indexOf(benefitId);
  if (idx !== -1) {
    saved.splice(idx, 1);
  } else {
    saved.push(benefitId);
  }
  set(KEYS.SAVED_BENEFITS, saved);
}

export function isBenefitSaved(benefitId: string): boolean {
  return getSavedBenefits().includes(benefitId);
}

// Profile Name
export function getProfileName(): string {
  return get<string>(KEYS.PROFILE_NAME, '');
}

export function setProfileName(name: string): void {
  set(KEYS.PROFILE_NAME, name);
}

// Questionnaire step
export function getQuestionnaireStep(): number {
  return get<number>(KEYS.QUESTIONNAIRE_STEP, 1);
}

export function setQuestionnaireStep(step: number): void {
  set(KEYS.QUESTIONNAIRE_STEP, step);
}

// Auth User
export function getAuthUser(): import('../types').AuthUser | null {
  return get<import('../types').AuthUser | null>(KEYS.AUTH_USER, null);
}

export function setAuthUser(user: import('../types').AuthUser | null): void {
  if (user === null) {
    localStorage.removeItem(KEYS.AUTH_USER);
  } else {
    set(KEYS.AUTH_USER, user);
  }
}

// Clear all
export function clearAllData(): void {
  Object.values(KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
