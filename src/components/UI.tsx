// ============================================================
// SevaPath — Premium Shared UI Components
// ============================================================

import React from 'react';
import type { MatchStatus, EffortLevel, ApplicationMode } from '../types';
import { useApp } from '../contexts/AppContext';
import { Check, Circle, AlertCircle, Info, ChevronRight, Sparkles, Shield } from 'lucide-react';

// ── Status Badge ─────────────────────────────────
export function StatusBadge({ status }: { status: MatchStatus }) {
  const { t } = useApp();
  const config = {
    likely: { 
      label: t('benefit.likelyMatch'), 
      className: 'bg-[#E8F5E9] text-[#126D57] border border-[#16856A]/30 glow-badge-likely', 
      dot: 'bg-[#16856A]' 
    },
    'more-info': { 
      label: t('benefit.moreInfo'), 
      className: 'bg-[#FEF3CD] text-[#7C5B00] border border-[#D99A24]/30', 
      dot: 'bg-[#D99A24]' 
    },
    'no-match': { 
      label: t('benefit.noMatch'), 
      className: 'bg-[#F0F2F4] text-[#66727E] border border-[#E2E6EA]', 
      dot: 'bg-[#9AA5B1]' 
    },
    'action-required': { 
      label: t('benefit.actionRequired'), 
      className: 'bg-[#FDE8E8] text-[#C94A4A] border border-[#C94A4A]/30', 
      dot: 'bg-[#C94A4A]' 
    },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${c.className}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot} shrink-0 animate-pulse`} />
      {c.label}
    </span>
  );
}

// ── Effort Indicator ─────────────────────────────
export function EffortIndicator({ level }: { level: EffortLevel }) {
  const { t } = useApp();
  const labels = {
    easy: t('benefit.easy'),
    moderate: t('benefit.moderate'),
    higher: t('benefit.higher'),
  };
  const dots = { easy: 1, moderate: 2, higher: 3 };
  const dotColor = {
    easy: 'bg-[#16856A]',
    moderate: 'bg-[#D99A24]',
    higher: 'bg-[#C94A4A]',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((n) => (
          <span 
            key={n} 
            className={`w-2 h-2 rounded-full transition-all ${
              n <= dots[level] ? dotColor[level] : 'bg-[#E2E6EA]'
            }`} 
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-[#66727E]">{labels[level]}</span>
    </div>
  );
}

// ── Application Mode Badge ───────────────────────
export function AppModeBadge({ mode }: { mode: ApplicationMode }) {
  const { t } = useApp();
  const labels = { online: t('benefit.online'), offline: t('benefit.offline'), both: t('benefit.both') };
  return (
    <span className="text-xs font-semibold text-[#17212B]">{labels[mode]}</span>
  );
}

// ── Journey Timeline ─────────────────────────────
interface JourneyStep {
  label: string;
  completed: boolean;
  current: boolean;
}

export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="journey-line">
      {steps.map((step, i) => (
        <div key={i} className="journey-step">
          <div className={`journey-dot ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`} />
          <span className={`text-sm ${
            step.completed 
              ? 'text-[#17212B] font-medium' 
              : step.current 
                ? 'text-[#173B5F] font-bold' 
                : 'text-[#9AA5B1]'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────
export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      {label && <div className="text-xs font-semibold text-[#66727E] mb-1.5">{label}</div>}
      <div className="h-2.5 rounded-full bg-[#E2E6EA] overflow-hidden p-0.5 shadow-inner">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-[#173B5F] via-[#16856A] to-[#1a9d7e] transition-all duration-500 shadow-sm" 
          style={{ width: `${percent}%` }} 
        />
      </div>
    </div>
  );
}

// ── Info Tooltip ─────────────────────────────────
export function InfoTooltip({ text, children }: { text: string; children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center text-[#66727E] hover:text-[#173B5F] transition-colors"
        aria-label="More information"
      >
        {children || <Info size={16} />}
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2E6EA] shadow-xl text-xs text-[#17212B] z-50 animate-fade-in">
          {text}
          <button onClick={() => setOpen(false)} className="absolute top-1 right-2 text-[#9AA5B1] hover:text-[#17212B] text-sm">×</button>
        </div>
      )}
    </span>
  );
}

// ── Empty State ──────────────────────────────────
export function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-3xl bg-white/70 backdrop-blur-md border border-[#E2E6EA] shadow-sm">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[#EAF2F8] text-[#173B5F] flex items-center justify-center mb-4 shadow-inner">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-[#17212B] mb-2">{title}</h3>
      {subtitle && <p className="text-xs text-[#66727E] mb-6 max-w-md leading-relaxed">{subtitle}</p>}
      {action}
    </div>
  );
}

// ── Demo Badge ───────────────────────────────────
export function DemoBadge() {
  const { t } = useApp();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3CD] text-[#7C5B00] border border-[#D99A24]/30">
      <Info size={10} />
      {t('general.demo')}
    </span>
  );
}

// ── Selection Card ───────────────────────────────
export function SelectionCard({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 group cursor-pointer ${
        selected 
          ? 'bg-gradient-to-r from-white to-[#EAF2F8] border-[#173B5F] shadow-md shadow-[#173B5F]/10' 
          : 'bg-white/80 hover:bg-white border-[#E2E6EA] hover:border-[#173B5F]/40 shadow-xs'
      }`}
      role="option"
      aria-selected={selected}
    >
      {icon && (
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          selected ? 'bg-[#173B5F] text-white shadow-sm' : 'bg-[#EAF2F8] text-[#173B5F]'
        }`}>
          {icon}
        </span>
      )}
      <span className={`text-sm font-bold flex-1 ${selected ? 'text-[#173B5F]' : 'text-[#17212B]'}`}>
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
        selected ? 'bg-[#16856A] text-white shadow-sm' : 'border-2 border-[#E2E6EA] group-hover:border-[#173B5F]/40'
      }`}>
        {selected && <Check size={14} className="stroke-[3]" />}
      </div>
    </button>
  );
}

// ── Category Card ────────────────────────────────
export function CategoryCard({
  name,
  description,
  icon,
  onClick,
}: {
  name: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card card-interactive text-left w-full group p-5 flex flex-col justify-between hover:border-[#173B5F]/40 transition-all duration-300"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#EAF2F8] to-white border border-[#E2E6EA] text-[#173B5F] shadow-xs group-hover:bg-[#173B5F] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#17212B] group-hover:text-[#173B5F] transition-colors mb-0.5">
            {name}
          </h3>
          <p className="text-xs text-[#66727E] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-[#E2E6EA]/50 text-[11px] font-bold text-[#173B5F]">
        <span>Explore benefits</span>
        <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

// ── Loading Checklist ────────────────────────────
export function LoadingChecklist({
  items,
  currentIndex,
}: {
  items: { label: string }[];
  currentIndex: number;
}) {
  return (
    <div className="space-y-4 p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E2E6EA] shadow-xl">
      {items.map((item, i) => (
        <div 
          key={i} 
          className={`flex items-center gap-3.5 transition-all duration-500 ${
            i <= currentIndex ? 'opacity-100 transform translate-x-0' : 'opacity-40 transform translate-x-2'
          }`}
        >
          {i < currentIndex ? (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#16856A] text-white shadow-md shadow-[#16856A]/20">
              <Check size={14} className="stroke-[3]" />
            </div>
          ) : i === currentIndex ? (
            <div className="w-7 h-7 rounded-full border-2 border-[#173B5F] flex items-center justify-center bg-white shadow-md shadow-[#173B5F]/20 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#173B5F]" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full border-2 border-[#E2E6EA] bg-white" />
          )}
          <span className={`text-sm font-semibold ${
            i <= currentIndex ? 'text-[#17212B]' : 'text-[#9AA5B1]'
          }`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
