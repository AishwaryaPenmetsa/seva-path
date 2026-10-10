// ============================================================
// SevaPath — Core Types
// ============================================================

export type Language = 'en' | 'te' | 'hi';

export type MatchStatus = 'likely' | 'more-info' | 'no-match' | 'action-required';

export type EffortLevel = 'easy' | 'moderate' | 'higher';

export type ApplicationMode = 'online' | 'offline' | 'both';

export type CategoryId =
  | 'education'
  | 'scholarships'
  | 'jobs-skills'
  | 'financial-support'
  | 'loans-finance'
  | 'housing'
  | 'farming'
  | 'health'
  | 'women-family'
  | 'business';

export interface Category {
  id: CategoryId;
  name: string;
  nameTe: string;
  nameHi?: string;
  description: string;
  descriptionTe: string;
  descriptionHi?: string;
  icon: string; // Lucide icon name
}

export interface EligibilityCriterion {
  field: string;
  label: string;
  labelTe: string;
  condition: string;
  conditionTe: string;
  // Function key for matching
  matchKey: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  nameTe: string;
  description: string;
  descriptionTe: string;
  whyNeeded: string;
  whyNeededTe: string;
  howToGet: string;
  howToGetTe: string;
  officialLink?: string;
  estimatedTime?: string;
}

export interface ApplicationStep {
  step: number;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
}

export interface DeadlineInfo {
  type: 'rolling' | 'dated' | 'unknown';
  date?: string;
  note?: string;
  sourceUrl?: string;
  lastVerified?: string;
}

export interface HelplineInfo {
  number: string;
  hours?: string;
  sourceUrl?: string;
}

export interface Benefit {
  id: string;
  name: string;
  nameTe: string;
  nameHi?: string;
  category: CategoryId;
  description: string;
  descriptionTe: string;
  descriptionHi?: string;
  benefit: string;
  benefitTe: string;
  benefitHi?: string;
  eligibilityCriteria: EligibilityCriterion[];
  documents: DocumentRequirement[];
  preparationTime: string;
  effortLevel: EffortLevel;
  applicationMode: ApplicationMode;
  applicationSteps: ApplicationStep[];
  officialSource: string;
  officialSourceTe: string;
  officialApplicationUrl: string;
  officialInfoUrl?: string;
  officialStatusUrl?: string;
  department: string;
  departmentTe: string;
  departmentHi?: string;
  departmentName?: string;
  lastVerified: string;
  deadline?: string;
  deadlineInfo?: DeadlineInfo;
  helpline?: HelplineInfo;
  sourceUrl?: string;
  state?: string;
  tags?: string[];
  verificationNotes: string;
  verificationNotesTe: string;
  isDemoData?: boolean;
}

// User profile built from questionnaire
export interface UserProfile {
  age?: number;
  state?: string;
  occupation?: string;
  needs: string[];
  // Adaptive situation answers
  educationLevel?: string;
  employmentSituation?: string;
  farmingSituation?: string;
  businessSituation?: string;
  incomeRange?: string;
  additionalCircumstances: string[];
}

export interface MatchResult {
  benefit: Benefit;
  status: MatchStatus;
  matchedCriteria: string[];
  missingInfo: string[];
  unmatchedCriteria?: string[];
}

export interface HelpMapResults {
  likelyMatches: MatchResult[];
  needsMoreInfo: MatchResult[];
  otherPossible: MatchResult[];
  totalCount: number;
}

// Document checklist state
export interface DocumentCheckItem {
  documentId: string;
  benefitId: string;
  isReady: boolean;
  uploadedFile?: string;
}

// Application tracking
export type ApplicationStatus =
  | 'discovered'
  | 'preparing'
  | 'documents-ready'
  | 'form-completed'
  | 'submitted'
  | 'verification'
  | 'approved'
  | 'rejected'
  | 'action-required'
  | 'decision-received';

export type CivicApplicationStage =
  | 'started'
  | 'documents-ready'
  | 'submitted'
  | 'under-verification'
  | 'decision';

export type CivicDecisionOutcome = 'approved' | 'rejected' | 'waiting';

export interface TrackedApplication {
  id: string;
  benefitId: string;
  benefitName: string;
  benefitNameTe: string;
  benefitNameHi?: string;
  category: CategoryId;
  status: ApplicationStatus;
  startedDate: string;
  timeline: ApplicationTimelineEntry[];
  civicStage?: CivicApplicationStage;
  civicDecision?: CivicDecisionOutcome;
  submittedDate?: string;
  verificationDate?: string;
  decisionDate?: string;
  userNotes?: string;
  officialStatusUrl?: string;
  /** Index (0-7) of the current journey step; 7 = journey complete. User-managed beyond step 3. */
  stage?: number;
  /** Dates (YYYY-MM-DD) the user/system reached each stage index. */
  stageDates?: Record<number, string>;
  nextAction?: string;
  nextActionTe?: string;
  reminder?: string;
  notes?: string;
}

export interface ApplicationTimelineEntry {
  step: string;
  stepTe: string;
  date?: string;
  completed: boolean;
  current: boolean;
}

// Form explainer
export interface FormField {
  id: string;
  governmentWording: string;
  governmentWordingTe: string;
  whatItMeans: string;
  whatItMeansTe: string;
  whatToEnter: string;
  whatToEnterTe: string;
  whereToFind: string;
  whereToFindTe: string;
  warning?: string;
  warningTe?: string;
}

// Questionnaire step
export interface QuestionnaireState {
  currentStep: number;
  totalSteps: number;
  answers: UserProfile;
  isComplete: boolean;
}

// Notification / Reminder
export interface Reminder {
  id: string;
  applicationId: string;
  message: string;
  messageTe: string;
  scheduledFor: string;
  isRead: boolean;
}

// Authentication user for journey saving
export interface AuthUser {
  name: string;
  email: string;
  isLoggedIn: boolean;
  createdAt: string;
}

