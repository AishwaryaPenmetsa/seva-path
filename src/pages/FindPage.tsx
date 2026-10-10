// ============================================================
// SevaPath — Premium Find Help Page (Category Browse)
// Routes /find and /find/:category with scheme counts
// ============================================================

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CategoryCard } from '../components/UI';
import BenefitCard from '../components/BenefitCard';
import JourneyNextStepBanner from '../components/JourneyNextStepBanner';
import { categories, demoBenefits } from '../data/benefits';
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
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const selectedCategory = routeCategory || searchParams.get('category');

  const isTe = language === 'te';
  const isHi = language === 'hi';

  if (selectedCategory) {
    const cat = categories.find((c) => c.id === selectedCategory);
    const benefits = getBenefitsByNeed(selectedCategory);
    const catName = cat ? (isTe ? cat.nameTe : isHi ? (cat.nameHi || cat.name) : cat.name) : selectedCategory;

    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
          
          <button onClick={() => navigate('/find')} className="btn btn-ghost btn-sm mb-6 -ml-2 text-[#728477]">
            <ChevronLeft size={16} /> {isTe ? 'అన్ని వర్గాలు' : isHi ? 'सभी श्रेणियां' : 'All categories'}
          </button>
          
          <div className="mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85F45]/10 text-[#B85F45] text-xs font-bold mb-2">
              <span>Category Focus</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719] mb-1">{catName}</h1>
            <p className="text-sm text-[#728477] font-medium">
              {isTe
                ? `${catName} కేటగిరీలో ${benefits.length} పథకాలు మరియు అర్హతలు అందుబాటులో ఉన్నాయి`
                : isHi
                ? `${catName} श्रेणी में ${benefits.length} योजनाएं उपलब्ध हैं`
                : `Browsing ${benefits.length} verified schemes and entitlements in ${catName}`}
            </p>
          </div>

          <JourneyNextStepBanner currentStage="discover" />

          {/* Personalization prompt */}
          <div className="p-6 rounded-3xl mb-8 bg-[#FAF8F3] border border-[#D8CDBB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#151719] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles size={20} className="text-[#D99A24]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#151719]">
                  {isTe
                    ? 'మీ కోసం వ్యక్తిగతీకరించిన ఫలితాలు కావాలా?'
                    : isHi
                    ? 'क्या आप व्यक्तिगत पात्रता देखना चाहते हैं?'
                    : 'Want personalized eligibility calculation?'}
                </p>
                <p className="text-xs text-[#728477] mt-0.5">
                  {isTe
                    ? 'ప్రశ్నాపత్రం పూర్తి చేయడం ద్వారా ఖచ్చితమైన మ్యాచ్‌లను పొందండి.'
                    : isHi
                    ? 'त्वरित प्रश्नावली का उत्तर देकर अपनी पात्रता जांचें।'
                    : 'Answer 6 quick questions to see your exact match confidence.'}
                </p>
              </div>
            </div>
            <button onClick={() => navigate('/questionnaire')} className="btn btn-primary btn-sm shrink-0 shadow-md">
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
            <div className="text-center py-16 rounded-3xl bg-white border border-[#D8CDBB]">
              <p className="text-[#728477] text-sm font-medium">
                {isTe ? 'ఈ వర్గంలో ప్రయోజనాలు లేవు.' : isHi ? 'इस श्रेणी में कोई योजना नहीं मिली।' : 'No benefits found in this category.'}
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#728477]/10 text-[#728477] text-xs font-bold mb-3">
            <ShieldCheck size={14} className="text-[#B85F45]" />
            <span>Civic Directory</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#151719] mb-2">
            {t('categories.title')}
          </h1>
          <p className="text-sm text-[#728477] max-w-lg mx-auto font-medium">
            {isTe
              ? 'ప్రయోజనాలను బ్రౌజ్ చేయడానికి ఒక వర్గాన్ని ఎంచుకోండి లేదా వ్యక్తిగతీకరించిన ఫలితాల కోసం ప్రశ్నాపత్రాన్ని ఉపయోగించండి.'
              : isHi
              ? 'योजनाओं को देखने के लिए एक श्रेणी चुनें या पात्रता जांचने के लिए प्रश्नावली का उपयोग करें।'
              : 'Select a domain to explore verified government support programs with exact counts.'}
          </p>
        </div>

        <JourneyNextStepBanner currentStage="discover" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => {
            const count = demoBenefits.filter((b) => b.category === cat.id || (b.tags && b.tags.includes(cat.id))).length;
            const catName = isTe ? cat.nameTe : isHi ? (cat.nameHi || cat.name) : cat.name;
            const catDesc = isTe ? cat.descriptionTe : isHi ? (cat.descriptionHi || cat.description) : cat.description;

            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/find/${cat.id}`)}
                className="card card-interactive p-5 rounded-3xl border border-[#D8CDBB] bg-[#FAF8F3] hover:bg-white transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#D8CDBB] flex items-center justify-center text-[#B85F45] shadow-2xs group-hover:bg-[#B85F45] group-hover:text-white transition-colors">
                      {iconMap[cat.icon]}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8E3DA] text-[#151719] text-xs font-bold">
                      {count} {count === 1 ? 'scheme' : 'schemes'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#151719] mb-1 group-hover:text-[#B85F45] transition-colors">
                    {catName}
                  </h3>
                  <p className="text-xs text-[#728477] leading-relaxed">
                    {catDesc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E3DA] flex items-center justify-between text-xs font-bold text-[#B85F45]">
                  <span>{isTe ? 'చూడండి' : isHi ? 'देखें' : 'Explore'}</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#D8CDBB] max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D8CDBB] text-[#151719] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Search size={22} className="text-[#B85F45]" />
            </div>
            <p className="text-sm font-bold text-[#151719] mb-1">
              {t('categories.notSure')}
            </p>
            <p className="text-xs text-[#728477] mb-4">
              Let SevaPath cross-match your occupation, income, and needs automatically.
            </p>
            <button onClick={() => navigate('/questionnaire')} className="btn btn-primary shadow-md">
              <Sparkles size={15} className="text-[#D99A24]" />
              <span>{t('hero.cta.primary')}</span> <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
