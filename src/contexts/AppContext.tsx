// ============================================================
// SevaPath — App Context (state management)
// ============================================================

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  Language,
  UserProfile,
  HelpMapResults,
  TrackedApplication,
} from '../types';
import { translations, type TranslationKey } from '../i18n/translations';
import * as storage from '../services/storage';
import { matchBenefits } from '../services/matchingEngine';

interface AppContextValue {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string>) => string;

  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;

  // Help Map
  helpMapResults: HelpMapResults | null;
  runMatching: (profile: UserProfile) => HelpMapResults;

  // Applications
  applications: TrackedApplication[];
  addApplication: (app: TrackedApplication) => void;
  updateApplication: (id: string, updates: Partial<TrackedApplication>) => void;
  removeApplication: (id: string) => void;

  // Saved benefits
  savedBenefits: string[];
  toggleSavedBenefit: (id: string) => void;
  isBenefitSaved: (id: string) => boolean;

  // Profile
  profileName: string;
  setProfileName: (name: string) => void;

  // Clear all
  clearAllData: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(storage.getLanguage());
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(storage.getUserProfile());
  const [helpMapResults, setHelpMapResults] = useState<HelpMapResults | null>(storage.getHelpMap());
  const [applications, setApplications] = useState<TrackedApplication[]>(storage.getApplications());
  const [savedBenefits, setSavedBenefits] = useState<string[]>(storage.getSavedBenefits());
  const [profileName, setProfileNameState] = useState<string>(storage.getProfileName());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    storage.setLanguage(lang);
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
  }, []);

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string>): string => {
    let text: string = (translations[language]?.[key] as string) || (translations.en[key] as string) || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }, [language]);

  const setUserProfile = useCallback((profile: UserProfile) => {
    setUserProfileState(profile);
    storage.setUserProfile(profile);
  }, []);

  const clearUserProfile = useCallback(() => {
    setUserProfileState(null);
    setHelpMapResults(null);
  }, []);

  const runMatching = useCallback((profile: UserProfile): HelpMapResults => {
    const results = matchBenefits(profile);
    setHelpMapResults(results);
    storage.setHelpMap(results);
    return results;
  }, []);

  const addApplication = useCallback((app: TrackedApplication) => {
    setApplications((prev) => {
      if (prev.find((a) => a.id === app.id)) return prev;
      const next = [...prev, app];
      storage.setApplications(next);
      return next;
    });
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<TrackedApplication>) => {
    setApplications((prev) => {
      const next = prev.map((a) => a.id === id ? { ...a, ...updates } : a);
      storage.setApplications(next);
      return next;
    });
  }, []);

  const removeApplication = useCallback((id: string) => {
    setApplications((prev) => {
      const next = prev.filter((a) => a.id !== id);
      storage.setApplications(next);
      return next;
    });
  }, []);

  const toggleSavedBenefit = useCallback((id: string) => {
    setSavedBenefits((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((b) => b !== id) : [...prev, id];
      storage.toggleSavedBenefit(id);
      return next;
    });
  }, []);

  const isBenefitSaved = useCallback((id: string) => {
    return savedBenefits.includes(id);
  }, [savedBenefits]);

  const setProfileName = useCallback((name: string) => {
    setProfileNameState(name);
    storage.setProfileName(name);
  }, []);

  const clearAllData = useCallback(() => {
    storage.clearAllData();
    setLanguageState('en');
    setUserProfileState(null);
    setHelpMapResults(null);
    setApplications([]);
    setSavedBenefits([]);
    setProfileNameState('');
  }, []);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      userProfile,
      setUserProfile,
      clearUserProfile,
      helpMapResults,
      runMatching,
      applications,
      addApplication,
      updateApplication,
      removeApplication,
      savedBenefits,
      toggleSavedBenefit,
      isBenefitSaved,
      profileName,
      setProfileName,
      clearAllData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
