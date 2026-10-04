// ============================================================
// SevaPath — Benefit Action Journey Graphic Component
// ============================================================
// Redesigned to show dynamic state, explain locked steps,
// and always surface the next action the user should take.
// ============================================================

import React from 'react';
import { Sparkles, FileText, Send, BarChart3, ArrowRight, Lock, Check, Info } from 'lucide-react';

export type JourneyStage = 'match' | 'prepare' | 'apply' | 'track';

interface BenefitJourneyGraphicProps {
  currentStage?: JourneyStage;
  /** 0–1 representing document prep progress */
  prepProgress?: number;
  /** True when all documents are marked ready */
  allDocsReady?: boolean;
  /** Application already submitted? */
  isSubmitted?: boolean;
  /** Next action label */
  nextActionLabel?: string;
  /** Callback for the next-step CTA */
  onNextAction?: () => void;
}

const stages: {
  id: JourneyStage;
  label: string;
  sub: string;
  lockedReason: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'match',
    label: 'MATCH',
    sub: 'Eligibility checked',
    lockedReason: '',
    icon: <Sparkles size={16} />,
  },
  {
    id: 'prepare',
    label: 'PREPARE',
    sub: 'Documents checklist',
    lockedReason: '',
    icon: <FileText size={16} />,
  },
  {
    id: 'apply',
    label: 'APPLY',
    sub: 'Submit application',
    lockedReason: 'Complete document preparation first',
    icon: <Send size={16} />,
  },
  {
    id: 'track',
    label: 'TRACK',
    sub: 'Monitor progress',
    lockedReason: 'Available after you submit your application',
    icon: <BarChart3 size={16} />,
  },
];

export default function BenefitJourneyGraphic({
  currentStage = 'prepare',
  prepProgress = 0,
  allDocsReady = false,
  isSubmitted = false,
  nextActionLabel,
  onNextAction,
}: BenefitJourneyGraphicProps) {
  const stageIndex = stages.findIndex((s) => s.id === currentStage);

  return (
    <div className="relative mb-8 animate-fade-in">
      {/* Journey bar */}
      <div className="benefit-journey-bar">
        {/* Progress fill behind the stages */}
        <div
          className="benefit-journey-bar__fill"
          style={{ width: `${Math.max(0, ((stageIndex) / (stages.length - 1)) * 100)}%` }}
        />

        <div className="benefit-journey-bar__stages">
          {stages.map((stage, idx) => {
            const isCurrent = idx === stageIndex;
            const isDone = idx < stageIndex;
            const isLocked = idx > stageIndex;

            return (
              <React.Fragment key={stage.id}>
                <div
                  className={`benefit-journey-stage ${isCurrent ? 'benefit-journey-stage--current' : ''} ${isDone ? 'benefit-journey-stage--done' : ''} ${isLocked ? 'benefit-journey-stage--locked' : ''}`}
                >
                  {/* Node circle */}
                  <div className="benefit-journey-node">
                    {isDone ? (
                      <Check size={14} className="stroke-[3]" />
                    ) : isLocked ? (
                      <Lock size={12} />
                    ) : (
                      stage.icon
                    )}
                  </div>

                  {/* Label */}
                  <div className="benefit-journey-label">
                    <span className="benefit-journey-label__title">{stage.label}</span>
                    <span className="benefit-journey-label__sub">
                      {isLocked ? stage.lockedReason : stage.sub}
                    </span>
                  </div>
                </div>

                {/* Connector between stages */}
                {idx < stages.length - 1 && (
                  <div className="benefit-journey-connector">
                    <div
                      className={`benefit-journey-connector__line ${
                        idx < stageIndex ? 'benefit-journey-connector__line--done' : ''
                      }`}
                    />
                    <ArrowRight
                      size={12}
                      className={idx < stageIndex ? 'text-[#16856A]' : 'text-[#CBD5E1]'}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Prep progress micro-bar (visible during prepare stage) */}
      {currentStage === 'prepare' && (
        <div className="benefit-journey-prep-bar">
          <div className="benefit-journey-prep-bar__track">
            <div
              className="benefit-journey-prep-bar__fill"
              style={{ width: `${Math.round(prepProgress * 100)}%` }}
            />
          </div>
          <span className="benefit-journey-prep-bar__label">
            {allDocsReady
              ? '✓ All documents ready'
              : `${Math.round(prepProgress * 100)}% prepared`}
          </span>
        </div>
      )}

      {/* Next step CTA — always visible, always prominent */}
      {nextActionLabel && onNextAction && (
        <button onClick={onNextAction} className="benefit-journey-cta group" type="button">
          <span className="benefit-journey-cta__icon">
            <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="benefit-journey-cta__text">
            <span className="benefit-journey-cta__overline">Next Step</span>
            <span className="benefit-journey-cta__label">{nextActionLabel}</span>
          </span>
        </button>
      )}
    </div>
  );
}
