// ============================================================
// SevaPath — Editorial Civic-Tech Visuals for Questionnaire Steps
// ============================================================

import React from 'react';

interface QuestionnaireStepVisualProps {
  step: number;
}

export default function QuestionnaireStepVisual({ step }: QuestionnaireStepVisualProps) {
  switch (step) {
    case 1:
      return <Step1Visual />;
    case 2:
      return <Step2Visual />;
    case 3:
      return <Step3Visual />;
    case 4:
      return <Step4Visual />;
    case 5:
      return <Step5Visual />;
    case 6:
      return <Step6Visual />;
    default:
      return null;
  }
}

// ── Step 1: Personal Details & Demographics ──────────────────
function Step1Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#EAF2F8]/80 via-white to-[#F0FAF7]/70 border border-[#E2E6EA] overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A] block mb-1">
          Step 01 • Citizen Profile
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Personal & Regional Demographics
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Establishes state jurisdiction and age-based public scheme parameters.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ambient Glow */}
          <circle cx="38" cy="38" r="32" fill="#EAF2F8" />
          <circle cx="38" cy="38" r="24" stroke="#173B5F" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          
          {/* Map Pin / Location Beacon */}
          <path d="M 52 24 C 52 32 44 38 44 38 C 44 38 36 32 36 24 C 36 19.5 39.5 16 44 16 C 48.5 16 52 19.5 52 24 Z" fill="#D99A24" fillOpacity="0.2" stroke="#D99A24" strokeWidth="1.5" />
          <circle cx="44" cy="24" r="2.5" fill="#D99A24" />

          {/* Citizen ID Card Silhouette */}
          <rect x="18" y="28" width="34" height="26" rx="4" fill="white" stroke="#173B5F" strokeWidth="1.5" />
          <circle cx="27" cy="38" r="4.5" fill="#173B5F" fillOpacity="0.15" stroke="#173B5F" strokeWidth="1" />
          <line x1="35" y1="36" x2="46" y2="36" stroke="#16856A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="41" x2="43" y2="41" stroke="#9AA5B1" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Verified Badge */}
          <circle cx="48" cy="50" r="7" fill="#16856A" />
          <path d="M 45 50 L 47 52 L 51 48" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── Step 2: Support Needs Matrix ────────────────────────────
function Step2Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#F0FAF7]/90 via-white to-[#FEF3CD]/40 border border-[#E2E6EA] overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A] block mb-1">
          Step 02 • Support Domains
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Priority Needs & Assistance Areas
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Select all domains where you or your family require government support.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Interconnected Domain Nodes */}
          <circle cx="38" cy="38" r="32" fill="#F0FAF7" />
          
          {/* Connector Triangles */}
          <line x1="38" y1="20" x2="22" y2="48" stroke="#16856A" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
          <line x1="38" y1="20" x2="54" y2="48" stroke="#173B5F" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
          <line x1="22" y1="48" x2="54" y2="48" stroke="#D99A24" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />

          {/* Node 1: Education/Skills (Top) */}
          <circle cx="38" cy="20" r="9" fill="white" stroke="#173B5F" strokeWidth="1.5" />
          <path d="M 34 20 L 38 17 L 42 20 L 38 23 Z" fill="#173B5F" />

          {/* Node 2: Farming/Livelihood (Bottom Left) */}
          <circle cx="22" cy="48" r="9" fill="white" stroke="#16856A" strokeWidth="1.5" />
          <path d="M 22 43 C 25 45 25 50 22 53 C 19 50 19 45 22 43 Z" fill="#16856A" />

          {/* Node 3: Financial/Welfare (Bottom Right) */}
          <circle cx="54" cy="48" r="9" fill="white" stroke="#D99A24" strokeWidth="1.5" />
          <circle cx="54" cy="48" r="4.5" fill="#FEF3CD" stroke="#D99A24" strokeWidth="1" />
          
          {/* Central Hub Spark */}
          <circle cx="38" cy="38" r="3" fill="#16856A" />
        </svg>
      </div>
    </div>
  );
}

// ── Step 3: Domain Specific Details ─────────────────────────
function Step3Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#EAF2F8]/90 via-white to-[#E8F5E9]/60 border border-[#E2E6EA] overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A] block mb-1">
          Step 03 • Adaptive Specifics
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Occupation & Scale Qualifications
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Fine-tunes eligibility for special subsidies, equipment, or scholarships.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="38" r="32" fill="#EAF2F8" />
          
          {/* Multi-tier Pathway Steps */}
          <rect x="18" y="46" width="10" height="14" rx="2" fill="#173B5F" fillOpacity="0.2" stroke="#173B5F" strokeWidth="1.2" />
          <rect x="31" y="38" width="10" height="22" rx="2" fill="#16856A" fillOpacity="0.25" stroke="#16856A" strokeWidth="1.2" />
          <rect x="44" y="28" width="10" height="32" rx="2" fill="#16856A" stroke="#16856A" strokeWidth="1.2" />

          {/* Growth / Progression Arrow */}
          <path d="M 20 40 Q 34 26 52 20" stroke="#D99A24" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M 48 18 L 54 19 L 52 25" stroke="#D99A24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Target Star */}
          <circle cx="54" cy="19" r="2.5" fill="#D99A24" />
        </svg>
      </div>
    </div>
  );
}

// ── Step 4: Household Economic Assessment ───────────────────
function Step4Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#FEF3CD]/60 via-white to-[#EAF2F8]/70 border border-[#E2E6EA] overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A24] block mb-1">
          Step 04 • Income Parameters
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Household Income & Economic Slab
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Government welfare benefits frequently follow statutory income thresholds.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="38" r="32" fill="#FEF3CD" fillOpacity="0.7" />
          
          {/* Vault / Ledger Slab */}
          <rect x="18" y="24" width="40" height="30" rx="6" fill="white" stroke="#173B5F" strokeWidth="1.5" />
          <line x1="18" y1="34" x2="58" y2="34" stroke="#E2E6EA" strokeWidth="1" />
          
          {/* Currency / Support Shield Motif */}
          <circle cx="38" cy="42" r="7" fill="#FEF3CD" stroke="#D99A24" strokeWidth="1.2" />
          <text x="38" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7C5B00" fontFamily="sans-serif">₹</text>

          {/* Calibrated Meter Gauge */}
          <path d="M 24 29 L 34 29" stroke="#16856A" strokeWidth="2" strokeLinecap="round" />
          <path d="M 37 29 L 45 29" stroke="#D99A24" strokeWidth="2" strokeLinecap="round" />
          <path d="M 48 29 L 52 29" stroke="#9AA5B1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ── Step 5: Inclusive Social Welfare ────────────────────────
function Step5Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#FDE8E8]/50 via-white to-[#E8F5E9]/60 border border-[#E2E6EA] overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A] block mb-1">
          Step 05 • Special Inclusions
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Priority Welfare & Inclusion Criteria
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Identifies affirmative entitlements, disability pensions, and care subsidies.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="38" r="32" fill="#E8F5E9" />
          
          {/* Protective Shield Base */}
          <path d="M 38 18 L 54 25 C 54 44 38 56 38 56 C 38 56 22 44 22 25 Z" fill="white" stroke="#16856A" strokeWidth="1.5" />
          
          {/* Family & Support Heart Motif */}
          <path d="M 38 31 C 35 27 28 29 28 34 C 28 39 38 46 38 46 C 38 46 48 39 48 34 C 48 29 41 27 38 31 Z" fill="#16856A" fillOpacity="0.15" stroke="#16856A" strokeWidth="1.2" />

          {/* Spark of Dignity / Affirmation */}
          <circle cx="38" cy="35" r="2.5" fill="#D99A24" />
        </svg>
      </div>
    </div>
  );
}

// ── Step 6: Final Verified Dossier Review ───────────────────
function Step6Visual() {
  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-[#EAF2F8]/90 via-white to-[#E8F5E9]/80 border border-[#16856A]/30 overflow-hidden flex items-center justify-between px-6 mb-6 shadow-2xs">
      <div className="z-10 max-w-[70%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A] block mb-1">
          Step 06 • Final Verification
        </span>
        <h3 className="text-sm font-bold text-[#173B5F]">
          Citizen Evaluation Dossier
        </h3>
        <p className="text-[11px] text-[#66727E] mt-0.5">
          Review your entries before running the benefit matching algorithm.
        </p>
      </div>

      {/* Editorial Graphic */}
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="38" r="32" fill="#EAF2F8" />
          
          {/* Document Sheet 1 (Underneath) */}
          <rect x="22" y="18" width="34" height="42" rx="4" fill="white" stroke="#9AA5B1" strokeWidth="1" transform="rotate(-6 22 18)" opacity="0.6" />
          
          {/* Document Sheet 2 (Top) */}
          <rect x="20" y="18" width="36" height="44" rx="4" fill="white" stroke="#173B5F" strokeWidth="1.5" />
          
          {/* Content Lines */}
          <line x1="26" y1="26" x2="44" y2="26" stroke="#173B5F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="26" y1="32" x2="48" y2="32" stroke="#9AA5B1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="26" y1="38" x2="42" y2="38" stroke="#9AA5B1" strokeWidth="1.2" strokeLinecap="round" />

          {/* Official Verification Seal */}
          <circle cx="44" cy="50" r="9" fill="#16856A" stroke="white" strokeWidth="1.5" />
          <path d="M 41 50 L 43 52 L 47 48" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
