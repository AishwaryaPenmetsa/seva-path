// ============================================================
// SevaPath — Premium Questionnaire Page (6-step flow)
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SelectionCard, ProgressBar, LoadingChecklist } from '../components/UI';
import QuestionnaireBackground from '../components/QuestionnaireBackground';
import QuestionnaireStepVisual from '../components/QuestionnaireStepVisual';
import { indianStates } from '../data/benefits';
import type { UserProfile } from '../types';
import {
  ChevronLeft, ChevronRight, SkipForward,
  GraduationCap, Briefcase, Search as SearchIcon, Wheat,
  Store, Home as HomeIcon, Coffee, UserCheck,
  Heart, Users, DollarSign, HelpCircle, Baby, Shield, Info, Edit2,
  Sparkles, ShieldCheck, Check
} from 'lucide-react';

const TOTAL_STEPS = 6;

export default function QuestionnairePage() {
  const { t, language, setUserProfile, runMatching } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Answers state
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState('');
  const [employmentSituation, setEmploymentSituation] = useState('');
  const [farmingSituation, setFarmingSituation] = useState('');
  const [businessSituation, setBusinessSituation] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [showWhyIncome, setShowWhyIncome] = useState(false);
  const [additionalCircumstances, setAdditionalCircumstances] = useState<string[]>([]);

  // Check if step 3 is needed
  const needsStep3 = needs.includes('education') || needs.includes('job') || needs.includes('farming') || needs.includes('business');

  const goNext = () => {
    if (step === 2 && !needsStep3) {
      setStep(4);
    } else if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step === 4 && !needsStep3) {
      setStep(2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return age !== '' && state !== '' && occupation !== '';
      case 2: return needs.length > 0;
      case 3: return true;
      case 4: return incomeRange !== '';
      case 5: return true;
      case 6: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      age: parseInt(age) || undefined,
      state,
      occupation,
      needs,
      educationLevel: educationLevel || undefined,
      employmentSituation: employmentSituation || undefined,
      farmingSituation: farmingSituation || undefined,
      businessSituation: businessSituation || undefined,
      incomeRange: incomeRange || undefined,
      additionalCircumstances,
    };

    setUserProfile(profile);
    setIsLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          runMatching(profile);
          setTimeout(() => navigate('/help-map'), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const toggleNeed = (need: string) => {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const toggleCircumstance = (c: string) => {
    if (c === 'none' || c === 'prefer-not') {
      setAdditionalCircumstances([c]);
      return;
    }
    setAdditionalCircumstances((prev) => {
      const filtered = prev.filter((p) => p !== 'none' && p !== 'prefer-not');
      return filtered.includes(c) ? filtered.filter((p) => p !== c) : [...filtered, c];
    });
  };

  const editField = (targetStep: number) => {
    setStep(targetStep);
  };

  // Loading screen with animated scanner
  if (isLoading) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center pb-20 md:pb-12">
        <QuestionnaireBackground />
        <div className="relative z-10 max-w-md w-full mx-auto px-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#173B5F] to-[#16856A] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-[#173B5F]/20 animate-pulse">
            <Sparkles size={30} className="text-[#D99A24]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#173B5F] mb-2">
            {language === 'te' ? 'మీ ప్రయోజనాలను సరిపోల్చుతోంది...' : 'Evaluating Civic Entitlements...'}
          </h2>
          <p className="text-xs text-[#66727E] mb-8 font-medium">
            Cross-referencing central guidelines & state government portals
          </p>
          <LoadingChecklist
            items={[
              { label: t('loading.checking') },
              { label: t('loading.comparing') },
              { label: t('loading.documents') },
              { label: t('loading.plan') },
            ]}
            currentIndex={loadingStep}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] pb-20 md:pb-12">
      <QuestionnaireBackground />
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Step Header & Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16856A]">
              {t('q.step')} {step} {t('q.of')} {TOTAL_STEPS}
            </span>
            <span className="text-xs text-[#66727E] font-semibold">
              {Math.round((step / TOTAL_STEPS) * 100)}% Completed
            </span>
          </div>
          <ProgressBar value={step} max={TOTAL_STEPS} />
        </div>

        {/* Card Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E2E6EA] shadow-xl shadow-[#173B5F]/5">
          
          <div className="animate-fade-in" key={step}>
            <QuestionnaireStepVisual step={step} />
            
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Basic Demographics
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F]">
                    {t('q1.title')}
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Age */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66727E] block mb-2">
                      {t('q1.age')}
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 28"
                      min="1"
                      max="120"
                      className="w-full px-4 py-3.5 border-2 border-[#E2E6EA] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#173B5F] bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66727E] block mb-2">
                      {t('q1.state')}
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3.5 border-2 border-[#E2E6EA] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#173B5F] bg-white transition-all shadow-xs"
                    >
                      <option value="">{language === 'te' ? 'రాష్ట్రం ఎంచుకోండి' : 'Select state'}</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66727E] block mb-3">
                      {t('q1.occupation')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { key: 'student', label: t('q1.student'), icon: <GraduationCap size={18} /> },
                        { key: 'employed', label: t('q1.employed'), icon: <Briefcase size={18} /> },
                        { key: 'looking-for-work', label: t('q1.lookingForWork'), icon: <SearchIcon size={18} /> },
                        { key: 'farmer', label: t('q1.farmer'), icon: <Wheat size={18} /> },
                        { key: 'business-owner', label: t('q1.businessOwner'), icon: <Store size={18} /> },
                        { key: 'homemaker', label: t('q1.homemaker'), icon: <HomeIcon size={18} /> },
                        { key: 'retired', label: t('q1.retired'), icon: <Coffee size={18} /> },
                        { key: 'other', label: t('q1.other'), icon: <UserCheck size={18} /> },
                      ].map((opt) => (
                        <SelectionCard
                          key={opt.key}
                          label={opt.label}
                          icon={opt.icon}
                          selected={occupation === opt.key}
                          onClick={() => setOccupation(opt.key)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Areas of Need
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F] mb-1">
                    {t('q2.title')}
                  </h2>
                  <p className="text-xs text-[#66727E] font-medium">{t('q2.selectMultiple')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: 'education', label: t('q2.education'), icon: <GraduationCap size={18} /> },
                    { key: 'job', label: t('q2.job'), icon: <Briefcase size={18} /> },
                    { key: 'financial', label: t('q2.financial'), icon: <DollarSign size={18} /> },
                    { key: 'housing', label: t('q2.housing'), icon: <HomeIcon size={18} /> },
                    { key: 'health', label: t('q2.health'), icon: <Heart size={18} /> },
                    { key: 'farming', label: t('q2.farming'), icon: <Wheat size={18} /> },
                    { key: 'business', label: t('q2.business'), icon: <Store size={18} /> },
                    { key: 'women-family', label: t('q2.women'), icon: <Users size={18} /> },
                    { key: 'other', label: t('q2.other'), icon: <HelpCircle size={18} /> },
                  ].map((opt) => (
                    <SelectionCard
                      key={opt.key}
                      label={opt.label}
                      icon={opt.icon}
                      selected={needs.includes(opt.key)}
                      onClick={() => toggleNeed(opt.key)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Category Details
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F]">
                    {t('q3.title')}
                  </h2>
                </div>

                {needs.includes('education') && (
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#66727E] mb-2.5 block">{t('q3.eduLevel')}</span>
                    <div className="space-y-2">
                      {[
                        { key: 'school', label: t('q3.eduLevel.school') },
                        { key: 'intermediate', label: t('q3.eduLevel.intermediate') },
                        { key: 'undergraduate', label: t('q3.eduLevel.undergraduate') },
                        { key: 'postgraduate', label: t('q3.eduLevel.postgraduate') },
                        { key: 'diploma', label: t('q3.eduLevel.diploma') },
                        { key: 'other', label: t('q3.eduLevel.other') },
                      ].map((opt) => (
                        <SelectionCard
                          key={opt.key}
                          label={opt.label}
                          selected={educationLevel === opt.key}
                          onClick={() => setEducationLevel(opt.key)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {needs.includes('job') && (
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#66727E] mb-2.5 block">{t('q3.employment')}</span>
                    <div className="space-y-2">
                      {[
                        { key: 'searching', label: t('q3.employment.searching') },
                        { key: 'recently-lost', label: t('q3.employment.recentlyLost') },
                        { key: 'career-change', label: t('q3.employment.careerChange') },
                        { key: 'skill-training', label: t('q3.employment.skillTraining') },
                      ].map((opt) => (
                        <SelectionCard
                          key={opt.key}
                          label={opt.label}
                          selected={employmentSituation === opt.key}
                          onClick={() => setEmploymentSituation(opt.key)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {needs.includes('farming') && (
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#66727E] mb-2.5 block">{t('q3.farming.situation')}</span>
                    <div className="space-y-2">
                      {[
                        { key: 'small-holder', label: t('q3.farming.smallHolder') },
                        { key: 'landless', label: t('q3.farming.landless') },
                        { key: 'medium', label: t('q3.farming.medium') },
                        { key: 'livestock', label: t('q3.farming.livestock') },
                      ].map((opt) => (
                        <SelectionCard
                          key={opt.key}
                          label={opt.label}
                          selected={farmingSituation === opt.key}
                          onClick={() => setFarmingSituation(opt.key)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {needs.includes('business') && (
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#66727E] mb-2.5 block">{t('q3.business.situation')}</span>
                    <div className="space-y-2">
                      {[
                        { key: 'starting', label: t('q3.business.starting') },
                        { key: 'existing', label: t('q3.business.existing') },
                        { key: 'expanding', label: t('q3.business.expanding') },
                        { key: 'loan', label: t('q3.business.loan') },
                      ].map((opt) => (
                        <SelectionCard
                          key={opt.key}
                          label={opt.label}
                          selected={businessSituation === opt.key}
                          onClick={() => setBusinessSituation(opt.key)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {!needsStep3 && (
                  <p className="text-sm text-[#66727E] text-center py-8">
                    {language === 'te' ? 'ఈ దశ మీ ఎంపికలకు వర్తించదు. దయచేసి కొనసాగండి.' : 'This step does not apply based on your selections. Please continue.'}
                  </p>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Financial Context
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F] mb-1">
                    {t('q4.title')}
                  </h2>
                  <p className="text-xs text-[#66727E] font-medium">{t('q4.explanation')}</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { key: 'dont-know', label: t('q4.dontKnow') },
                    { key: 'below-1', label: t('q4.below1') },
                    { key: '1-2.5', label: t('q4.1to2.5') },
                    { key: '2.5-5', label: t('q4.2.5to5') },
                    { key: '5-10', label: t('q4.5to10') },
                    { key: 'above-10', label: t('q4.above10') },
                  ].map((opt) => (
                    <SelectionCard
                      key={opt.key}
                      label={opt.label}
                      selected={incomeRange === opt.key}
                      onClick={() => setIncomeRange(opt.key)}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setShowWhyIncome(!showWhyIncome)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B5F] mt-4 hover:underline"
                >
                  <Info size={14} /> {t('q4.whyAsk')}
                </button>
                {showWhyIncome && (
                  <div className="mt-2 p-3.5 rounded-2xl text-xs text-[#66727E] bg-[#EAF2F8] animate-fade-in leading-relaxed">
                    {t('q4.whyExplanation')}
                  </div>
                )}
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Special Inclusions
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F]">
                    {t('q5.title')}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {[
                    { key: 'disability', label: t('q5.disability'), icon: <Shield size={18} /> },
                    { key: 'senior', label: t('q5.senior'), icon: <UserCheck size={18} /> },
                    { key: 'single-parent', label: t('q5.singleParent'), icon: <Users size={18} /> },
                    { key: 'pregnant', label: t('q5.pregnant'), icon: <Baby size={18} /> },
                    { key: 'veteran', label: t('q5.veteran'), icon: <Shield size={18} /> },
                    { key: 'other-circumstances', label: t('q5.otherCircumstances'), icon: <HelpCircle size={18} /> },
                    { key: 'none', label: t('q5.none') },
                    { key: 'prefer-not', label: t('q5.preferNot') },
                  ].map((opt) => (
                    <SelectionCard
                      key={opt.key}
                      label={opt.label}
                      icon={opt.icon}
                      selected={additionalCircumstances.includes(opt.key)}
                      onClick={() => toggleCircumstance(opt.key)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16856A] block mb-1">
                    Summary Review
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173B5F]">
                    {t('q6.title')}
                  </h2>
                </div>

                <div className="space-y-3">
                  <ReviewRow label={t('q6.age')} value={age || '—'} onEdit={() => editField(1)} />
                  <ReviewRow label={t('q6.location')} value={state || '—'} onEdit={() => editField(1)} />
                  <ReviewRow label={t('q6.status')} value={occupation || '—'} onEdit={() => editField(1)} />
                  <ReviewRow
                    label={t('q6.needs')}
                    value={needs.length > 0 ? needs.join(', ') : '—'}
                    onEdit={() => editField(2)}
                  />
                  <ReviewRow label={t('q6.income')} value={incomeRange || '—'} onEdit={() => editField(4)} />
                  {additionalCircumstances.length > 0 && (
                    <ReviewRow
                      label={t('q6.other')}
                      value={additionalCircumstances.join(', ')}
                      onEdit={() => editField(5)}
                    />
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E2E6EA]">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="btn btn-ghost text-xs font-semibold"
            >
              <ChevronLeft size={16} /> {t('q.back')}
            </button>

            <div className="flex items-center gap-2">
              {step < 6 && step !== 1 && step !== 2 && (
                <button onClick={goNext} className="btn btn-ghost text-xs">
                  <span>{t('q.skip')}</span> <SkipForward size={14} />
                </button>
              )}
              {step < 6 ? (
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="btn btn-primary"
                >
                  <span>{t('q.next')}</span> <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn btn-success shadow-lg shadow-[#16856A]/25"
                >
                  <Sparkles size={16} />
                  <span>{t('q6.submit')}</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E6EA]">
      <div>
        <span className="text-[10px] font-bold text-[#9AA5B1] uppercase tracking-wider">{label}</span>
        <p className="text-sm font-bold text-[#17212B] capitalize">{value}</p>
      </div>
      <button onClick={onEdit} className="btn btn-ghost btn-sm text-[#173B5F]">
        <Edit2 size={14} />
      </button>
    </div>
  );
}
