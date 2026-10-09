// ============================================================
// SevaPath — Journey Next Step Banner
// Guides users across Discover → Check → Prepare → Apply → Track
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {
  Sparkles, CheckCircle2, FileText, ExternalLink,
  Award, ChevronRight, ArrowRight
} from 'lucide-react';

export type JourneyStageKey = 'discover' | 'check' | 'prepare' | 'apply' | 'track';

interface Props {
  currentStage: JourneyStageKey;
  customNextAction?: {
    label: string;
    labelTe: string;
    onClick: () => void;
  };
}

export default function JourneyNextStepBanner({ currentStage, customNextAction }: Props) {
  const { language } = useApp();
  const navigate = useNavigate();
  const te = language === 'te';

  const stages: {
    key: JourneyStageKey;
    step: number;
    title: string;
    titleTe: string;
    nextRoute: string;
    actionLabel: string;
    actionLabelTe: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'discover',
      step: 1,
      title: 'Discover',
      titleTe: 'కనుగొనండి',
      nextRoute: '/questionnaire',
      actionLabel: 'Check Your Eligibility',
      actionLabelTe: 'అర్హతను తనిఖీ చేయండి',
      icon: <Sparkles size={14} />,
    },
    {
      key: 'check',
      step: 2,
      title: 'Check',
      titleTe: 'అర్హత చూడండి',
      nextRoute: '/form-explainer',
      actionLabel: 'View Document Guides',
      actionLabelTe: 'పత్రాల మార్గదర్శిని చూడండి',
      icon: <CheckCircle2 size={14} />,
    },
    {
      key: 'prepare',
      step: 3,
      title: 'Prepare',
      titleTe: 'సిద్ధం అవ్వండి',
      nextRoute: '/applications',
      actionLabel: 'Go To Official Application',
      actionLabelTe: 'అధికారిక దరఖాస్తుకు వెళ్లండి',
      icon: <FileText size={14} />,
    },
    {
      key: 'apply',
      step: 4,
      title: 'Apply',
      titleTe: 'దరఖాస్తు చేయండి',
      nextRoute: '/applications',
      actionLabel: 'Track Your Progress',
      actionLabelTe: 'పురోగతిని ట్రాక్ చేయండి',
      icon: <ExternalLink size={14} />,
    },
    {
      key: 'track',
      step: 5,
      title: 'Track',
      titleTe: 'ట్రాక్ చేయండి',
      nextRoute: '/find',
      actionLabel: 'Explore More Schemes',
      actionLabelTe: 'మరిన్ని పథకాలను అన్వేషించండి',
      icon: <Award size={14} />,
    },
  ];

  const currentIndex = stages.findIndex((s) => s.key === currentStage);
  const current = stages[currentIndex] || stages[0];
  const nextStage = stages[currentIndex + 1] || stages[0];

  const handleNextClick = () => {
    if (customNextAction) {
      customNextAction.onClick();
    } else {
      navigate(current.nextRoute);
    }
  };

  return (
    <div className="w-full my-6 p-4 md:p-5 rounded-3xl bg-[#FAF8F3] border border-[#D8CDBB] shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Progress pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {stages.map((s, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <React.Fragment key={s.key}>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-[#B85F45] text-white shadow-xs'
                      : isDone
                      ? 'bg-[#728477]/20 text-[#151719]'
                      : 'bg-[#F1EDE4] text-[#728477]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {s.step}
                  </span>
                  <span>{te ? s.titleTe : s.title}</span>
                </div>
                {idx < stages.length - 1 && (
                  <ChevronRight size={14} className="text-[#D8CDBB] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Guided Next Step Action */}
        <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#E8E3DA]">
          <div className="text-left md:text-right">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#728477] block">
              {te ? 'తదుపరి సిఫార్సు చేసిన దశ' : 'Recommended Next Step'}
            </span>
            <span className="text-xs font-bold text-[#151719]">
              {customNextAction
                ? (te ? customNextAction.labelTe : customNextAction.label)
                : (te ? current.actionLabelTe : current.actionLabel)}
            </span>
          </div>

          <button
            onClick={handleNextClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#30364F] hover:bg-[#151719] text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <span>{te ? 'కొనసాగించండి' : 'Proceed'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
