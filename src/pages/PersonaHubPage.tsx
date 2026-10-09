// ============================================================
// SevaPath — Persona Hub Page
// /for/:persona — deep resource listings for each persona
// ============================================================

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { resources, type Resource, type PersonaId } from '../data/resources';
import { startApplication } from '../services/startApplication';
import JourneyNextStepBanner from '../components/JourneyNextStepBanner';
import {
  GraduationCap, Wheat, Users, Briefcase, Heart,
  ExternalLink, BookmarkPlus, BookmarkCheck, Calendar,
  CheckCircle2, Info, ChevronRight, ArrowLeft, Globe
} from 'lucide-react';

// ── Persona Meta ─────────────────────────────────────────────
const personaMeta: Record<PersonaId, {
  icon: React.ReactNode;
  label: string;
  labelTe: string;
  tagline: string;
  taglineTe: string;
  tabs?: { id: string; label: string; labelTe: string; type: string }[];
  color: string;
}> = {
  student: {
    icon: <GraduationCap size={28} />,
    label: 'Students',
    labelTe: 'విద్యార్థులు',
    tagline: 'Scholarships, internships, hackathons and more',
    taglineTe: 'స్కాలర్‌షిప్‌లు, ఇంటర్న్‌షిప్‌లు, హ్యాకథాన్‌లు మరియు మరిన్నింటి',
    tabs: [
      { id: 'all', label: 'All', labelTe: 'అన్నీ', type: '' },
      { id: 'scholarship', label: 'Scholarships', labelTe: 'స్కాలర్‌షిప్‌లు', type: 'scholarship' },
      { id: 'internship', label: 'Internships', labelTe: 'ఇంటర్న్‌షిప్‌లు', type: 'internship' },
      { id: 'hackathon', label: 'Hackathons', labelTe: 'హ్యాకథాన్‌లు', type: 'hackathon' },
      { id: 'training', label: 'Training', labelTe: 'శిక్షణ', type: 'training' },
    ],
    color: '#16856A',
  },
  farmer: {
    icon: <Wheat size={28} />,
    label: 'Farmers',
    labelTe: 'రైతులు',
    tagline: 'Crop support, insurance and income schemes',
    taglineTe: 'పంట మద్దతు, బీమా మరియు ఆదాయ పథకాలు',
    color: '#B85F45',
  },
  senior: {
    icon: <Heart size={28} />,
    label: 'Senior Citizens',
    labelTe: 'వృద్ధ పౌరులు',
    tagline: 'Pensions, health insurance and welfare schemes',
    taglineTe: 'పెన్షన్లు, ఆరోగ్య బీమా మరియు సంక్షేమ పథకాలు',
    color: '#30364F',
  },
  'job-seeker': {
    icon: <Briefcase size={28} />,
    label: 'Job Seekers',
    labelTe: 'ఉద్యోగ అన్వేషకులు',
    tagline: 'Employment portals, skill training and self-employment loans',
    taglineTe: 'ఉద్యోగ పోర్టల్‌లు, నైపుణ్య శిక్షణ మరియు స్వయం ఉపాధి రుణాలు',
    color: '#728477',
  },
  woman: {
    icon: <Users size={28} />,
    label: 'Women',
    labelTe: 'మహిళలు',
    tagline: 'Maternity support, entrepreneurship and education schemes',
    taglineTe: 'మాతృత్వ మద్దతు, వ్యవసాయదారిత్వం మరియు విద్యా పథకాలు',
    color: '#B85F45',
  },
};

const TYPE_LABELS: Record<string, { en: string; te: string }> = {
  scholarship: { en: 'Scholarship', te: 'స్కాలర్‌షిప్' },
  internship: { en: 'Internship', te: 'ఇంటర్న్‌షిప్' },
  hackathon: { en: 'Hackathon', te: 'హ్యాకథాన్' },
  training: { en: 'Training', te: 'శిక్షణ' },
  benefit: { en: 'Benefit', te: 'ప్రయోజనం' },
  loan: { en: 'Loan', te: 'రుణం' },
  portal: { en: 'Portal', te: 'పోర్టల్' },
};

// ── Resource Card ─────────────────────────────────────────────
function ResourceCard({
  resource,
  language,
  onTrack,
  isTracked,
  personaColor,
}: {
  resource: Resource;
  language: string;
  onTrack: (r: Resource) => void;
  isTracked: boolean;
  personaColor: string;
}) {
  const te = language === 'te';
  const typeLabel = TYPE_LABELS[resource.type] || { en: resource.type, te: resource.type };

  return (
    <article
      className="resource-card group bg-white rounded-2xl border border-[#E8E3DA] shadow-sm hover:shadow-md transition-all overflow-hidden"
      aria-label={te ? resource.titleTe : resource.title}
    >
      {/* Type badge + state badge */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-0">
        <span
          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
          style={{ background: personaColor }}
        >
          {te ? typeLabel.te : typeLabel.en}
        </span>
        {resource.state && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F1EDE4] text-[#151719]">
            <Globe size={10} />
            {resource.state}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-[#151719] mb-1 leading-snug">
          {te ? resource.titleTe : resource.title}
        </h3>
        <p className="text-[11px] text-[#728477] font-medium mb-2">{resource.provider}</p>
        <p className="text-xs text-[#3B3F4A] leading-relaxed mb-3">
          {te ? resource.descriptionTe : resource.description}
        </p>

        {/* Eligibility */}
        <div className="p-2.5 rounded-xl bg-[#F1EDE4] border border-[#D8CDBB] mb-3">
          <div className="flex items-start gap-1.5">
            <Info size={12} className="mt-0.5 shrink-0 text-[#728477]" />
            <p className="text-[11px] text-[#3B3F4A] leading-relaxed">
              <span className="font-bold">
                {te ? 'అర్హత: ' : 'Eligibility: '}
              </span>
              {te ? resource.eligibilityTe : resource.eligibility}
            </p>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#728477] mb-4">
          <Calendar size={12} />
          <span>
            {te ? 'గడువు: ' : 'Deadline: '}
            <span className="font-semibold">
              {resource.deadline === 'rolling'
                ? (te ? 'అప్లికేషన్లు అందుబాటులో ఉన్నాయి' : 'Applications open (rolling)')
                : resource.deadline}
            </span>
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {resource.hasApplyLink ? (
            <a
              href={resource.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: personaColor }}
              id={`open-${resource.id}`}
              aria-label={`Open official site for ${resource.title}`}
            >
              <ExternalLink size={13} />
              {te ? 'అధికారిక సైట్ తెరవండి' : 'Open official site'}
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#F1EDE4] text-[#728477] border border-[#D8CDBB]">
              <Info size={13} />
              {te ? 'అధికారిక విభాగాన్ని తనిఖీ చేయండి' : 'Check the official department'}
            </span>
          )}

          <button
            onClick={() => onTrack(resource)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
              isTracked
                ? 'bg-[#EAF4F0] border-[#16856A]/30 text-[#16856A]'
                : 'bg-white border-[#E8E3DA] text-[#728477] hover:bg-[#F1EDE4]'
            }`}
            id={`track-${resource.id}`}
            aria-label={isTracked ? 'Already tracked' : 'Track this application'}
          >
            {isTracked ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
            <span className="hidden sm:inline">
              {isTracked
                ? (te ? 'ట్రాక్ చేస్తున్నారు' : 'Tracked')
                : (te ? 'ట్రాక్ చేయండి' : 'Track this')}
            </span>
          </button>
        </div>

        {/* Last verified */}
        <p className="text-[10px] text-[#9AA5B1] mt-3 flex items-center gap-1">
          <CheckCircle2 size={10} className="text-[#16856A]" />
          {te ? 'చివరిగా ధృవీకరించబడింది: ' : 'Last verified: '}
          {new Date(resource.lastVerified).toLocaleDateString('en-IN', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </p>
      </div>
    </article>
  );
}

// ── Main Persona Hub Page ─────────────────────────────────────
export default function PersonaHubPage() {
  const { persona } = useParams<{ persona: string }>();
  const navigate = useNavigate();
  const { language, addApplication, isBenefitSaved, toggleSavedBenefit } = useApp();
  const te = language === 'te';

  const personaId = persona as PersonaId;
  const meta = personaMeta[personaId];

  const [activeTab, setActiveTab] = useState('all');
  const [tracked, setTracked] = useState<Set<string>>(new Set());

  if (!meta) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center p-6">
        <div>
          <p className="text-[#728477] mb-4">
            {te ? 'పర్సోనా కనుగొనబడలేదు.' : 'Persona not found.'}
          </p>
          <Link to="/" className="btn btn-primary">
            {te ? 'హోమ్‌కు వెళ్లండి' : 'Go Home'}
          </Link>
        </div>
      </div>
    );
  }

  const allResources = resources.filter((r) => r.personas.includes(personaId));
  const tabs = meta.tabs || [{ id: 'all', label: 'All', labelTe: 'అన్నీ', type: '' }];

  const filtered =
    activeTab === 'all'
      ? allResources
      : allResources.filter((r) => r.type === activeTab);

  const handleTrack = (r: Resource) => {
    if (tracked.has(r.id)) return;
    setTracked((prev) => new Set([...prev, r.id]));
    // Create a tracked application from this resource
    const app = startApplication(
      {
        id: r.id,
        name: r.title,
        nameTe: r.titleTe,
        category: 'jobs-skills', // generic fallback category for resources
        description: r.description,
        descriptionTe: r.descriptionTe,
        benefit: '',
        benefitTe: '',
        eligibilityCriteria: [],
        documents: [],
        preparationTime: '',
        effortLevel: 'moderate',
        applicationMode: 'online',
        applicationSteps: [],
        officialSource: r.provider,
        officialSourceTe: r.provider,
        officialApplicationUrl: r.officialUrl,
        department: r.provider,
        departmentTe: r.provider,
        lastVerified: r.lastVerified,
        verificationNotes: '',
        verificationNotesTe: '',
        isDemoData: false,
      } as any,
      language as 'en' | 'te'
    );
    addApplication(app);
  };

  return (
    <div className="min-h-[80vh] pb-24 md:pb-12">
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${meta.color}15 0%, ${meta.color}08 100%)` }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-[#728477] hover:text-[#151719] mb-6 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={15} />
            {te ? 'వెనక్కు' : 'Back'}
          </button>

          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{ background: meta.color }}
              >
                {meta.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719]">
                  {te ? `${meta.labelTe} కోసం` : `For ${meta.label}`}
                </h1>
                <p className="text-sm text-[#728477] mt-0.5">
                  {te ? meta.taglineTe : meta.tagline}
                </p>
              </div>
            </div>

            <div className="hidden sm:block shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/${persona}-hero.svg`}
                alt={te ? `${meta.labelTe} వర్గ అధికారిక చిత్రం` : `${meta.label} persona category visual`}
                className="w-16 h-16 rounded-2xl object-cover border border-[#D8CDBB]/60 shadow-xs"
                loading="lazy"
              />
            </div>
          </div>

          <JourneyNextStepBanner currentStage="discover" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Tabs (only for student who has more complex sub-categories) */}
        {tabs.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
            role="tablist"
            aria-label="Resource categories"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white border-[#E8E3DA] text-[#728477] hover:border-[#D8CDBB]'
                }`}
                style={activeTab === tab.id ? { background: meta.color } : {}}
              >
                {te ? tab.labelTe : tab.label}
                <span className="ml-1.5 opacity-70">
                  ({tab.id === 'all' ? allResources.length : allResources.filter((r) => r.type === tab.id).length})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Resource grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#728477]">
            <p>{te ? 'ఈ వర్గంలో వనరులు లేవు.' : 'No resources in this category.'}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <ResourceCard
                key={r.id}
                resource={r}
                language={language}
                onTrack={handleTrack}
                isTracked={tracked.has(r.id)}
                personaColor={meta.color}
              />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB] text-xs text-[#728477] leading-relaxed">
          <span className="font-bold text-[#3B3F4A]">
            {te ? 'ముఖ్యమైన గమనిక: ' : 'Important note: '}
          </span>
          {te
            ? 'SevaPath అధికారిక ప్రభుత్వ సైట్ కాదు. ఇది మీకు అర్హత అయిన పథకాలను కనుగొనడంలో సహాయపడటానికి రూపొందించబడింది. అర్హత మరియు అనుమతి అంతిమంగా సంబంధిత ప్రభుత్వ అధికారం ద్వారా నిర్ణయించబడతాయి.'
            : 'SevaPath is not an official government site. It is designed to help you discover schemes you may be eligible for. Final eligibility and approval are determined by the relevant government authority.'}
        </div>
      </div>
    </div>
  );
}
