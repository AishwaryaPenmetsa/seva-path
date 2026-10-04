// ============================================================
// SevaPath — Cinematic Homepage
// Full visual transformation while preserving ALL functionality
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CategoryCard } from '../components/UI';
import CinematicHero from '../components/CinematicHero';
import { categories } from '../data/benefits';
import {
  GraduationCap, Briefcase, Wallet, Home as HomeIcon,
  Wheat, Heart, Users, Store,
  ChevronRight, Search, FileText, ArrowRight,
  Shield, Link as LinkIcon, CalendarCheck,
  Sparkles, CheckCircle2, Lock, Award, Map, BookOpen,
  ArrowUpRight, GitBranch, Layers, Zap, Clock, Star
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={22} />,
  Briefcase: <Briefcase size={22} />,
  Wallet: <Wallet size={22} />,
  Home: <HomeIcon size={22} />,
  Wheat: <Wheat size={22} />,
  Heart: <Heart size={22} />,
  Users: <Users size={22} />,
  Store: <Store size={22} />,
};

// ─── Scroll Reveal Hook ───────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Section Wrapper with Reveal ─────────────────────────
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-section ${visible ? 'reveal-section--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Problem Section — fragmented civic world ─────────────
function ProblemSection() {
  const navigate = useNavigate();
  const fragments = [
    { label: 'राशन कार्ड', pos: 'top-8 left-[8%]', rotate: '-rotate-6', delay: 0 },
    { label: 'पात्रता', pos: 'top-16 left-[30%]', rotate: 'rotate-3', delay: 80 },
    { label: '₹ Support?', pos: 'top-4 right-[20%]', rotate: '-rotate-4', delay: 160 },
    { label: 'Form 16-A', pos: 'top-24 right-[8%]', rotate: 'rotate-5', delay: 240 },
    { label: 'Pattadar', pos: 'bottom-16 left-[10%]', rotate: 'rotate-4', delay: 120 },
    { label: 'Ration', pos: 'bottom-8 left-[32%]', rotate: '-rotate-3', delay: 200 },
    { label: 'OBC Cert.', pos: 'bottom-20 right-[15%]', rotate: '-rotate-6', delay: 60 },
    { label: '???', pos: 'bottom-10 right-[5%]', rotate: 'rotate-8', delay: 280 },
  ];

  return (
    <section className="problem-section" id="problem">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="section-eyebrow section-eyebrow--amber">
              The Reality Today
            </span>
            <h2 className="section-heading section-heading--dark">
              THE SUPPORT EXISTS.<br />
              <span className="section-heading__accent">THE JOURNEY IS THE PROBLEM.</span>
            </h2>
            <p className="section-subtext">
              Thousands of government benefits go unclaimed every year — not because people don't qualify,
              but because the path to finding and applying for them is fragmented, jargon-filled, and exhausting.
            </p>
          </div>
        </RevealSection>

        {/* Fragmented document chaos visual */}
        <RevealSection delay={200}>
          <div className="problem-chaos">
            <div className="problem-chaos__inner">
              {fragments.map((f, i) => (
                <div
                  key={i}
                  className={`problem-fragment ${f.pos} ${f.rotate}`}
                  style={{ animationDelay: `${f.delay}ms` }}
                >
                  {f.label}
                </div>
              ))}

              {/* Central confusion node */}
              <div className="problem-chaos__center">
                <div className="problem-chaos__center-ring" />
                <div className="problem-chaos__center-ring problem-chaos__center-ring--2" />
                <span className="problem-chaos__center-icon">?</span>
              </div>
            </div>

            {/* Arrow leading to solution */}
            <div className="problem-chaos__arrow">
              <div className="problem-chaos__arrow-line" />
              <ArrowRight size={20} className="text-[#16856A]" />
            </div>

            {/* Resolved state */}
            <div className="problem-resolved">
              <div className="problem-resolved__glow" />
              <CheckCircle2 size={32} className="text-[#1EB993] relative z-10" />
              <span className="problem-resolved__label">SevaPath</span>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Journey Section — the 6-stage narrative ─────────────
function JourneySection() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 0,
      key: 'Discover',
      label: 'DISCOVER',
      tagline: 'What support exists for you?',
      desc: 'Answer a few simple questions about your situation. SevaPath scans hundreds of central and state schemes to find the ones you actually qualify for.',
      icon: <Sparkles size={22} />,
      color: '#16856A',
      glow: 'rgba(22,133,106,0.3)',
    },
    {
      id: 1,
      key: 'Check',
      label: 'CHECK',
      tagline: 'Are you truly eligible?',
      desc: 'Our eligibility engine cross-references your profile against official criteria — age, income, occupation, state, and more — giving you a confidence match score.',
      icon: <CheckCircle2 size={22} />,
      color: '#1EB993',
      glow: 'rgba(30,185,147,0.3)',
    },
    {
      id: 2,
      key: 'Prepare',
      label: 'PREPARE',
      tagline: 'Which documents do you need?',
      desc: 'Get a personalized document checklist. Upload what you have and SevaPath will tell you exactly what\'s ready and what\'s still needed.',
      icon: <FileText size={22} />,
      color: '#3B82F6',
      glow: 'rgba(59,130,246,0.3)',
    },
    {
      id: 3,
      key: 'Understand',
      label: 'UNDERSTAND',
      tagline: 'What does the form actually mean?',
      desc: 'Government forms are written in bureaucratic language. SevaPath\'s Form Explainer translates every field into plain language in Telugu or English.',
      icon: <BookOpen size={22} />,
      color: '#67D9FF',
      glow: 'rgba(103,217,255,0.3)',
    },
    {
      id: 4,
      key: 'Apply',
      label: 'APPLY',
      tagline: 'How do you submit your application?',
      desc: 'SevaPath links you directly to official government portals with step-by-step guidance. No third-party middlemen. No fees. Direct to source.',
      icon: <ArrowUpRight size={22} />,
      color: '#16856A',
      glow: 'rgba(22,133,106,0.3)',
    },
    {
      id: 5,
      key: 'Track',
      label: 'TRACK',
      tagline: 'What happens after you apply?',
      desc: 'Keep all your applications in one place. Monitor status, set reminders, and never lose track of a benefit you\'ve worked toward.',
      icon: <Award size={22} />,
      color: '#1EB993',
      glow: 'rgba(30,185,147,0.3)',
    },
  ];

  const active = stages[activeStage];

  return (
    <section className="journey-section" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="section-eyebrow section-eyebrow--green">
              End-to-End Civic Support
            </span>
            <h2 className="section-heading section-heading--dark">
              ONE CONTINUOUS{' '}
              <span className="section-heading__accent">JOURNEY</span>
            </h2>
          </div>
        </RevealSection>

        {/* Interactive journey visualizer */}
        <RevealSection delay={150}>
          <div className="journey-viz">
            {/* Stage selector — horizontal connected nodes */}
            <div className="journey-viz__track">
              {stages.map((s, i) => (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => setActiveStage(i)}
                    className={`journey-viz__node ${activeStage === i ? 'journey-viz__node--active' : ''} ${i < activeStage ? 'journey-viz__node--done' : ''}`}
                    style={activeStage === i ? { boxShadow: `0 0 0 3px ${s.glow}, 0 0 20px ${s.glow}` } : {}}
                    aria-label={s.label}
                    aria-pressed={activeStage === i}
                  >
                    <span className="journey-viz__node-icon">{s.icon}</span>
                    <span className="journey-viz__node-label">{s.label}</span>
                  </button>
                  {i < stages.length - 1 && (
                    <div
                      className={`journey-viz__connector ${i < activeStage ? 'journey-viz__connector--lit' : ''}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Active stage detail panel */}
            <div
              className="journey-viz__detail"
              key={activeStage}
              style={{ '--stage-glow': active.glow, '--stage-color': active.color } as React.CSSProperties}
            >
              <div className="journey-viz__detail-icon" style={{ background: active.color }}>
                {active.icon}
              </div>
              <div className="journey-viz__detail-content">
                <div className="journey-viz__detail-num">
                  Step {activeStage + 1} of 6
                </div>
                <h3 className="journey-viz__detail-heading">{active.label}</h3>
                <p className="journey-viz__detail-tagline">{active.tagline}</p>
                <p className="journey-viz__detail-desc">{active.desc}</p>
              </div>
              <div className="journey-viz__detail-glow" style={{ background: active.glow }} />
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── How It Works — 3-Step Cards ─────────────────────────
function HowItWorksSection({ t }: { t: (k: any) => string }) {
  const navigate = useNavigate();
  const steps = [
    {
      step: '01',
      title: t('diff.find.title'),
      desc: t('diff.find.desc'),
      icon: <Search size={28} />,
      color: '#16856A',
      bg: 'linear-gradient(135deg, rgba(22,133,106,0.12) 0%, rgba(30,185,147,0.06) 100%)',
      border: 'rgba(22,133,106,0.25)',
    },
    {
      step: '02',
      title: t('diff.prepare.title'),
      desc: t('diff.prepare.desc'),
      icon: <FileText size={28} />,
      color: '#3B82F6',
      bg: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(103,217,255,0.06) 100%)',
      border: 'rgba(59,130,246,0.2)',
    },
    {
      step: '03',
      title: t('diff.apply.title'),
      desc: t('diff.apply.desc'),
      icon: <ArrowUpRight size={28} />,
      color: '#1EB993',
      bg: 'linear-gradient(135deg, rgba(30,185,147,0.1) 0%, rgba(22,133,106,0.06) 100%)',
      border: 'rgba(30,185,147,0.2)',
    },
  ];

  return (
    <section className="how-section" id="how-it-works-steps">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <RevealSection>
          <div className="text-center mb-12">
            <span className="section-eyebrow section-eyebrow--green">Simple. Fast. Free.</span>
            <h2 className="section-heading section-heading--dark">
              {t('diff.heading')}
            </h2>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((item, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div
                className="how-card"
                style={{ '--card-bg': item.bg, '--card-border': item.border } as React.CSSProperties}
              >
                <div className="how-card__step">{item.step}</div>
                <div
                  className="how-card__icon"
                  style={{ color: item.color, background: item.bg, border: `1px solid ${item.border}` }}
                >
                  {item.icon}
                </div>
                <h3 className="how-card__title">{item.title}</h3>
                <p className="how-card__desc">{item.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Form Explainer Preview ────────────────────────────────
function FormExplainerSection({ t, language }: { t: (k: any) => string; language: string }) {
  const navigate = useNavigate();
  return (
    <section className="form-section" id="form-explainer">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <RevealSection>
          <div className="text-center mb-10">
            <span className="section-eyebrow section-eyebrow--blue">Jargon Buster</span>
            <h2 className="section-heading section-heading--dark">
              {t('formPreview.heading')}
            </h2>
          </div>
        </RevealSection>

        <RevealSection delay={150}>
          <div className="form-explainer-card">
            {/* Depth layer behind */}
            <div className="form-explainer-card__depth-1" />
            <div className="form-explainer-card__depth-2" />

            {/* Main card */}
            <div className="form-explainer-card__main">
              {/* Government field */}
              <div className="form-explainer-card__gov">
                <span className="form-explainer-card__gov-label">
                  {language === 'te' ? 'ప్రభుత్వ ఫారమ్ ఫీల్డ్' : 'Government form field (Official wording)'}
                </span>
                <p className="form-explainer-card__gov-text">{t('formPreview.govWording')}</p>
              </div>

              {/* Arrow connector */}
              <div className="form-explainer-card__arrow">
                <div className="form-explainer-card__arrow-line" />
                <ArrowRight size={14} className="text-[#16856A]" />
              </div>

              {/* SevaPath explanation */}
              <div className="form-explainer-card__seva">
                <div className="form-explainer-card__seva-icon">i</div>
                <div>
                  <span className="form-explainer-card__seva-q">{t('formPreview.question')}</span>
                  <p className="form-explainer-card__seva-a">{t('formPreview.answer')}</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={300}>
          <div className="text-center mt-8">
            <button
              id="form-explainer-cta"
              onClick={() => navigate('/form-explainer')}
              className="how-card__cta-btn"
            >
              <BookOpen size={16} />
              <span>{t('formPreview.cta')}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Trust Section ─────────────────────────────────────────
function TrustSection({ t }: { t: (k: any) => string }) {
  return (
    <section className="trust-section" id="trust">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <RevealSection>
          <div className="trust-card">
            <div className="trust-card__glow" />
            <div className="trust-card__content">
              <div className="trust-card__heading">
                Built for Citizens. Trusted by Design.
              </div>
              <div className="trust-card__pillars">
                {[
                  { icon: <Shield size={20} />, label: t('trust.sources'), color: '#16856A' },
                  { icon: <LinkIcon size={20} />, label: t('trust.links'), color: '#3B82F6' },
                  { icon: <CalendarCheck size={20} />, label: t('trust.verified'), color: '#1EB993' },
                  { icon: <Lock size={20} />, label: 'Zero Server Storage', color: '#67D9FF' },
                ].map((item, i) => (
                  <div key={i} className="trust-pillar" style={{ '--pillar-color': item.color } as React.CSSProperties}>
                    <div className="trust-pillar__icon" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <span className="trust-pillar__label">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="trust-card__disclaimer">
                {t('trust.disclaimer')}
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Final CTA Section ─────────────────────────────────────
function FinalCTASection({ t }: { t: (k: any) => string }) {
  const navigate = useNavigate();
  return (
    <section className="final-cta-section" id="final-cta">
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <RevealSection>
          <div className="final-cta-card">
            <div className="final-cta-card__glow-1" />
            <div className="final-cta-card__glow-2" />
            <div className="final-cta-card__content">
              <span className="section-eyebrow section-eyebrow--green mb-6 block">
                Your journey starts here
              </span>
              <h2 className="final-cta-heading">
                FIND THE SUPPORT<br />
                <span className="final-cta-heading__accent">YOU'RE ENTITLED TO.</span>
              </h2>
              <p className="final-cta-sub">
                It takes less than 3 minutes to discover every government benefit you qualify for.
              </p>
              <div className="final-cta-btns">
                <button
                  id="final-cta-primary"
                  onClick={() => navigate('/questionnaire')}
                  className="cinema-btn cinema-btn--primary cinema-btn--lg"
                >
                  <Sparkles size={18} />
                  <span>{t('hero.cta.primary')}</span>
                  <ChevronRight size={18} className="cinema-btn__arrow" />
                </button>
                <button
                  id="final-cta-secondary"
                  onClick={() => navigate('/find')}
                  className="cinema-btn cinema-btn--ghost"
                >
                  <Search size={16} />
                  <span>{t('hero.cta.secondary')}</span>
                </button>
              </div>
              <div className="final-cta-trust">
                <CheckCircle2 size={13} className="text-[#16856A]" />
                <span>100% Free &amp; Open Public Good</span>
                <span className="mx-2 text-[#475569]">·</span>
                <Lock size={13} className="text-[#16856A]" />
                <span>Zero Data Stored on Server</span>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Main HomePage ─────────────────────────────────────────
export default function HomePage() {
  const { t, language } = useApp();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ── 1. HERO — Full Viewport Cinematic ── */}
      <CinematicHero />

      {/* ── Transition: dark→light ── */}
      <div className="home-transition-zone" aria-hidden="true" />

      {/* ── 2. PROBLEM SECTION ── */}
      <ProblemSection />

      {/* ── 3. CATEGORIES ── */}
      <section className="categories-section" id="categories">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <RevealSection>
            <div className="text-center mb-10">
              <span className="section-eyebrow section-eyebrow--navy">Direct Support Domains</span>
              <h2 className="section-heading section-heading--dark">{t('categories.title')}</h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <RevealSection key={cat.id} delay={i * 60}>
                <CategoryCard
                  name={language === 'te' ? cat.nameTe : cat.name}
                  description={language === 'te' ? cat.descriptionTe : cat.description}
                  icon={iconMap[cat.icon]}
                  onClick={() => navigate(`/find?category=${cat.id}`)}
                />
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={400}>
            <div className="text-center mt-10 p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-[#E2E6EA] max-w-xl mx-auto shadow-sm">
              <p className="text-sm font-medium text-[#66727E] mb-3">{t('categories.notSure')}</p>
              <button
                id="categories-find-all-cta"
                onClick={() => navigate('/questionnaire')}
                className="btn btn-primary shadow-md shadow-[#173B5F]/20"
              >
                <Sparkles size={16} className="text-[#1EB993]" />
                <span>{t('categories.findAll')}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 4. JOURNEY — 6-stage interactive ── */}
      <JourneySection />

      {/* ── 5. HOW IT WORKS ── */}
      <HowItWorksSection t={t} />

      {/* ── 6. FORM EXPLAINER ── */}
      <FormExplainerSection t={t} language={language} />

      {/* ── 7. TRUST ── */}
      <TrustSection t={t} />

      {/* ── 8. FINAL CTA ── */}
      <FinalCTASection t={t} />
    </div>
  );
}
