// ============================================================
// SevaPath — Matching Engine
// Precise rule-based civic eligibility engine
// ============================================================

import type { UserProfile, MatchResult, HelpMapResults, MatchStatus, Benefit } from '../types';
import { demoBenefits } from '../data/benefits';

interface CriterionEvaluation {
  matched: boolean;
  isMissing: boolean;
  reason?: string;
}

function evaluateCriterion(profile: UserProfile, matchKey: string, field: string): CriterionEvaluation {
  switch (matchKey) {
    case 'student':
      if (!profile.occupation) return { matched: false, isMissing: true };
      return {
        matched: profile.occupation === 'student',
        isMissing: false,
        reason: profile.occupation !== 'student' ? 'Requires student status' : undefined,
      };

    case 'post-matric':
      if (!profile.educationLevel) return { matched: false, isMissing: true };
      const isPostMatric = ['intermediate', 'undergraduate', 'postgraduate', 'diploma'].includes(profile.educationLevel);
      return {
        matched: isPostMatric,
        isMissing: false,
        reason: !isPostMatric ? 'Requires post-matric education (Intermediate/Diploma/Degree)' : undefined,
      };

    case 'higher-edu':
      if (!profile.educationLevel) return { matched: false, isMissing: true };
      const isHigher = ['undergraduate', 'postgraduate'].includes(profile.educationLevel);
      return {
        matched: isHigher,
        isMissing: false,
        reason: !isHigher ? 'Requires higher education (UG/PG)' : undefined,
      };

    case 'income-low':
      // "don't know" income must NOT count as a match; use needs-more-info
      if (!profile.incomeRange || profile.incomeRange === 'dont-know') {
        return { matched: false, isMissing: true, reason: 'Family income needs to be specified' };
      }
      const isLowIncome = ['below-1', '1-2.5', '2.5-5'].includes(profile.incomeRange);
      return {
        matched: isLowIncome,
        isMissing: false,
        reason: !isLowIncome ? 'Income exceeds low-income threshold' : undefined,
      };

    case 'job-seeker':
      if (!profile.occupation && (!profile.needs || profile.needs.length === 0)) {
        return { matched: false, isMissing: true };
      }
      const isJobSeeker = profile.occupation === 'looking-for-work' || (profile.needs && profile.needs.includes('job'));
      return {
        matched: isJobSeeker,
        isMissing: false,
        reason: !isJobSeeker ? 'Requires looking for work or job training need' : undefined,
      };

    case 'age-youth':
      if (profile.age === undefined) return { matched: false, isMissing: true };
      const isYouth = profile.age >= 18 && profile.age <= 35;
      return {
        matched: isYouth,
        isMissing: false,
        reason: !isYouth ? `Age must be between 18 and 35 (current: ${profile.age})` : undefined,
      };

    case 'senior':
      if (profile.age === undefined) return { matched: false, isMissing: true };
      const isSenior = profile.age >= 60;
      return {
        matched: isSenior,
        isMissing: false,
        reason: !isSenior ? `Age must be 60 or above (current: ${profile.age})` : undefined,
      };

    case 'looking-for-work':
      if (!profile.occupation) return { matched: false, isMissing: true };
      return {
        matched: profile.occupation === 'looking-for-work',
        isMissing: false,
        reason: profile.occupation !== 'looking-for-work' ? 'Requires job-seeking status' : undefined,
      };

    case 'housing-need':
      if (!profile.needs || profile.needs.length === 0) return { matched: false, isMissing: true };
      return {
        matched: profile.needs.includes('housing'),
        isMissing: false,
        reason: !profile.needs.includes('housing') ? 'Requires housing assistance need' : undefined,
      };

    case 'farmer':
      if (!profile.occupation) return { matched: false, isMissing: true };
      return {
        matched: profile.occupation === 'farmer',
        isMissing: false,
        reason: profile.occupation !== 'farmer' ? 'Requires farmer occupation' : undefined,
      };

    case 'small-farmer':
      if (!profile.farmingSituation) return { matched: false, isMissing: true };
      const isSmall = ['small-holder', 'landless'].includes(profile.farmingSituation);
      return {
        matched: isSmall,
        isMissing: false,
        reason: !isSmall ? 'Requires small or landless farmer category' : undefined,
      };

    case 'health-need':
      if (!profile.needs || profile.needs.length === 0) return { matched: false, isMissing: true };
      return {
        matched: profile.needs.includes('health'),
        isMissing: false,
        reason: !profile.needs.includes('health') ? 'Requires health assistance need' : undefined,
      };

    case 'disability':
      return {
        matched: profile.additionalCircumstances.includes('disability'),
        isMissing: false,
        reason: !profile.additionalCircumstances.includes('disability') ? 'Requires person with disability certification' : undefined,
      };

    case 'pregnant':
      return {
        matched: profile.additionalCircumstances.includes('pregnant'),
        isMissing: false,
        reason: !profile.additionalCircumstances.includes('pregnant') ? 'Requires pregnant/lactating mother status' : undefined,
      };

    case 'single-parent':
      return {
        matched: profile.additionalCircumstances.includes('single-parent'),
        isMissing: false,
        reason: !profile.additionalCircumstances.includes('single-parent') ? 'Requires single parent status' : undefined,
      };

    case 'widow':
      return {
        matched: profile.additionalCircumstances.includes('widow'),
        isMissing: false,
        reason: !profile.additionalCircumstances.includes('widow') ? 'Requires widow status' : undefined,
      };

    case 'business-owner':
      if (!profile.occupation) return { matched: false, isMissing: true };
      return {
        matched: profile.occupation === 'business-owner',
        isMissing: false,
        reason: profile.occupation !== 'business-owner' ? 'Requires business owner or entrepreneur status' : undefined,
      };

    case 'business-need':
      if (!profile.needs || profile.needs.length === 0) return { matched: false, isMissing: true };
      return {
        matched: profile.needs.includes('business'),
        isMissing: false,
        reason: !profile.needs.includes('business') ? 'Requires business/enterprise support need' : undefined,
      };

    case 'women-need':
      if (!profile.needs || profile.needs.length === 0) return { matched: false, isMissing: true };
      return {
        matched: profile.needs.includes('women-family'),
        isMissing: false,
        reason: !profile.needs.includes('women-family') ? 'Requires women and family support need' : undefined,
      };

    default:
      return { matched: false, isMissing: false };
  }
}

export function matchBenefit(profile: UserProfile, benefit: Benefit): MatchResult {
  const matchedCriteria: string[] = [];
  const missingInfo: string[] = [];
  const unmatchedCriteria: string[] = [];

  // Check state restriction if specified on scheme
  if (benefit.state) {
    if (!profile.state) {
      missingInfo.push(`State of residence required (${benefit.state})`);
    } else if (profile.state.toLowerCase() === benefit.state.toLowerCase()) {
      matchedCriteria.push(`Resident of ${benefit.state}`);
    } else {
      unmatchedCriteria.push(`Only available to residents of ${benefit.state} (current: ${profile.state})`);
    }
  }

  // Check all criteria defined in benefit
  for (const criterion of benefit.eligibilityCriteria) {
    const res = evaluateCriterion(profile, criterion.matchKey, criterion.field);
    if (res.matched) {
      matchedCriteria.push(criterion.label);
    } else if (res.isMissing) {
      missingInfo.push(res.reason ? `${criterion.label}: ${res.reason}` : criterion.label);
    } else {
      unmatchedCriteria.push(res.reason || criterion.label);
    }
  }

  let status: MatchStatus;

  // If hard-failed any criteria that don't match (and are not missing), not a match
  if (unmatchedCriteria.length > 0 && matchedCriteria.length === 0) {
    status = 'no-match';
  } else if (unmatchedCriteria.length > 0) {
    // Some matched, but some definitely do not match
    status = 'no-match';
  } else if (missingInfo.length > 0 && matchedCriteria.length > 0) {
    // Matched some, but needs more information (e.g. unknown income)
    status = 'more-info';
  } else if (missingInfo.length > 0) {
    // Profile doesn't have enough info yet
    status = 'more-info';
  } else if (matchedCriteria.length > 0) {
    // All relevant criteria matched without contradictions
    status = 'likely';
  } else {
    status = 'no-match';
  }

  return {
    benefit,
    status,
    matchedCriteria,
    missingInfo,
    unmatchedCriteria,
  };
}

export function matchBenefits(profile: UserProfile): HelpMapResults {
  const results = demoBenefits.map((benefit) => matchBenefit(profile, benefit));

  const likelyMatches = results.filter((r) => r.status === 'likely');
  const needsMoreInfo = results.filter((r) => r.status === 'more-info');
  const otherPossible = results.filter((r) => r.status === 'no-match' && r.matchedCriteria.length > 0);

  // Sort by number of matched criteria descending
  const sortByMatches = (a: MatchResult, b: MatchResult) =>
    b.matchedCriteria.length - a.matchedCriteria.length;

  likelyMatches.sort(sortByMatches);
  needsMoreInfo.sort(sortByMatches);
  otherPossible.sort(sortByMatches);

  return {
    likelyMatches,
    needsMoreInfo,
    otherPossible,
    totalCount: likelyMatches.length + needsMoreInfo.length + otherPossible.length,
  };
}

// Get benefits by category for "I Know What I Need" flow
export function getBenefitsByNeed(categoryId: string): MatchResult[] {
  return demoBenefits
    .filter((b) => b.category === categoryId)
    .map((benefit) => ({
      benefit,
      status: 'more-info' as MatchStatus,
      matchedCriteria: ['Category match'],
      missingInfo: ['Complete the questionnaire for personalized eligibility check'],
      unmatchedCriteria: [],
    }));
}
