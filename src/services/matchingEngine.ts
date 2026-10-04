// ============================================================
// SevaPath — Matching Engine
// ============================================================

import type { UserProfile, MatchResult, HelpMapResults, MatchStatus, Benefit } from '../types';
import { demoBenefits } from '../data/benefits';

function matchesCriterion(profile: UserProfile, matchKey: string): boolean {
  switch (matchKey) {
    case 'student':
      return profile.occupation === 'student';
    case 'post-matric':
      return ['intermediate', 'undergraduate', 'postgraduate', 'diploma'].includes(profile.educationLevel || '');
    case 'higher-edu':
      return ['undergraduate', 'postgraduate'].includes(profile.educationLevel || '');
    case 'income-low':
      return ['dont-know', 'below-1', '1-2.5', '2.5-5'].includes(profile.incomeRange || '');
    case 'job-seeker':
      return profile.occupation === 'looking-for-work' || profile.needs.includes('job');
    case 'age-youth':
      return (profile.age || 0) >= 18 && (profile.age || 0) <= 35;
    case 'senior':
      return (profile.age || 0) >= 60;
    case 'looking-for-work':
      return profile.occupation === 'looking-for-work';
    case 'housing-need':
      return profile.needs.includes('housing');
    case 'farmer':
      return profile.occupation === 'farmer';
    case 'small-farmer':
      return ['small-holder', 'landless'].includes(profile.farmingSituation || '');
    case 'health-need':
      return profile.needs.includes('health');
    case 'disability':
      return profile.additionalCircumstances.includes('disability');
    case 'pregnant':
      return profile.additionalCircumstances.includes('pregnant');
    case 'single-parent':
      return profile.additionalCircumstances.includes('single-parent');
    case 'widow':
      return profile.additionalCircumstances.includes('widow');
    case 'business-owner':
      return profile.occupation === 'business-owner';
    case 'business-need':
      return profile.needs.includes('business');
    case 'women-need':
      return profile.needs.includes('women-family');
    default:
      return false;
  }
}

function matchBenefit(profile: UserProfile, benefit: Benefit): MatchResult {
  const matchedCriteria: string[] = [];
  const missingInfo: string[] = [];
  let matchCount = 0;

  for (const criterion of benefit.eligibilityCriteria) {
    if (matchesCriterion(profile, criterion.matchKey)) {
      matchCount++;
      matchedCriteria.push(criterion.label);
    } else {
      // Check if user hasn't provided relevant info vs definitely doesn't match
      const fieldValue = getFieldValue(profile, criterion.field);
      if (fieldValue === undefined || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        missingInfo.push(criterion.label);
      }
    }
  }

  const totalCriteria = benefit.eligibilityCriteria.length;
  let status: MatchStatus;

  if (matchCount === totalCriteria) {
    status = 'likely';
  } else if (matchCount > 0 && missingInfo.length > 0) {
    status = 'more-info';
  } else if (matchCount > 0) {
    status = 'more-info';
  } else {
    status = 'no-match';
  }

  return {
    benefit,
    status,
    matchedCriteria,
    missingInfo,
  };
}

function getFieldValue(profile: UserProfile, field: string): unknown {
  switch (field) {
    case 'occupation': return profile.occupation;
    case 'age': return profile.age;
    case 'state': return profile.state;
    case 'needs': return profile.needs;
    case 'educationLevel': return profile.educationLevel;
    case 'employmentSituation': return profile.employmentSituation;
    case 'farmingSituation': return profile.farmingSituation;
    case 'businessSituation': return profile.businessSituation;
    case 'income': return profile.incomeRange;
    case 'additionalCircumstances': return profile.additionalCircumstances;
    default: return undefined;
  }
}

export function matchBenefits(profile: UserProfile): HelpMapResults {
  const results = demoBenefits.map((benefit) => matchBenefit(profile, benefit));

  const likelyMatches = results.filter((r) => r.status === 'likely');
  const needsMoreInfo = results.filter((r) => r.status === 'more-info');
  const otherPossible = results.filter((r) => r.status === 'no-match' && r.matchedCriteria.length > 0);

  // Sort by number of matched criteria
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
      missingInfo: ['Complete the questionnaire for personalized matching'],
    }));
}
