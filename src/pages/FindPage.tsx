// ============================================================
// SevaPath — Premium Find Help Page (Category Browse)
// ============================================================

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CategoryCard } from '../components/UI';
import BenefitCard from '../components/BenefitCard';
import JourneyNextStepBanner from '../components/JourneyNextStepBanner';
import { categories } from '../data/benefits';
import { getBenefitsByNeed } from '../services/matchingEngine';
import {
  GraduationCap, Briefcase, Wallet, Home as HomeIcon,
  Wheat, Heart, Users, Store,
  ChevronLeft, ChevronRight, Search, Sparkles, ShieldCheck
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

export default function FindPage() {
  const { t, language } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  if (selectedCategory) {
    const cat = categories.find((c) => c.id === selectedCategory);
    const benefits = getBenefitsByNeed(selectedCategory);
    const catName = cat ? (language === 'te' ? cat.nameTe : cat.name) : selectedCategory;

    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
          
          <button onClick={() => navigate('/find')} className="btn btn-ghost btn-sm mb-6 -ml-2 text-[#66727E]">
            <ChevronLeft size={16} /> {language === 'te' ? 'అన్ని వర్గాలు' : 'All categories'}
          </button>
          
          <div className="mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85F45]/10 text-[#B85F45] text-xs font-bold mb-2">
              <span>Category Focus</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719] mb-1">{catName}</h1>
            <p className="text-sm text-[#728477] font-medium">
              {language === 'te'
                ? `${catName} కేటగిరీలో ప్రయోజనాలు బ్రౌజ్ చేస్తోంది`
                : `Browsing all available schemes and entitlements in ${catName}`}
            </p>
          </div>

          <JourneyNextStepBanner currentStage="discover" />

          {/* Personalization prompt */}
          <div className="p-6 rounded-3xl mb-8 bg-gradient-to-r from-white via-white to-[#EAF2F8] border border-[#173B5F]/20 shadow-md shadow-[#173B5F]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#173B5F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles size={20} className="text-[#D99A24]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#173B5F]">
                  {language === 'te'
                    ? 'మీ కోసం వ్యక్తిగతీకరించిన ఫలితాలు కావాలా?'
                    : 'Want personalized eligibility calculation?'}
                </p>
                <p className="text-xs text-[#66727E] mt-0.5">
                  {language === 'te'
                    ? 'ప్రశ్నాపత్రం పూర్తి చేయడం ద్వారా ఖచ్చితమైన మ్యాచ్‌లను పొందండి.'
                    : 'Answer 6 quick questions to see your exact match confidence.'}
                </p>
              </div>
            </div>
            <button onClick={() => navigate('/questionnaire')} className="btn btn-primary btn-sm shrink-0 shadow-md shadow-[#173B5F]/20">
              <span>{t('hero.cta.primary')}</span> <ChevronRight size={14} />
            </button>
          </div>

          {benefits.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((result) => (
                <BenefitCard key={result.benefit.id} result={result} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-3xl bg-white/70 border border-[#E2E6EA]">
              <p className="text-[#66727E] text-sm font-medium">
                {language === 'te' ? 'ఈ వర్గంలో ప్రయోజనాలు లేవు.' : 'No benefits found in this category.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold mb-3">
            <ShieldCheck size={14} />
            <span>Civic Directory</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#173B5F] mb-2">
            {t('categories.title')}
          </h1>
          <p className="text-sm text-[#66727E] max-w-lg mx-auto font-medium">
            {language === 'te'
              ? 'ప్రయోజనాలను బ్రౌజ్ చేయడానికి ఒక వర్గాన్ని ఎంచుకోండి లేదా వ్యక్తిగతీకరించిన ఫలితాల కోసం ప్రశ్నాపత్రాన్ని ఉపయోగించండి.'
              : 'Select a domain to explore verified government support programs.'}
          </p>
        </div>

        <JourneyNextStepBanner currentStage="discover" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={language === 'te' ? cat.nameTe : cat.name}
              description={language === 'te' ? cat.descriptionTe : cat.description}
              icon={iconMap[cat.icon]}
              onClick={() => navigate(`/find?category=${cat.id}`)}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#E2E6EA] max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF2F8] text-[#173B5F] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Search size={22} />
            </div>
            <p className="text-sm font-bold text-[#173B5F] mb-1">
              {t('categories.notSure')}
            </p>
            <p className="text-xs text-[#66727E] mb-4">
              Let SevaPath cross-match your occupation, income, and needs automatically.
            </p>
            <button onClick={() => navigate('/questionnaire')} className="btn btn-primary shadow-md shadow-[#173B5F]/20">
              <Sparkles size={15} className="text-[#D99A24]" />
              <span>{t('hero.cta.primary')}</span> <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
