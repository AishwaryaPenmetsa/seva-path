// ============================================================
// SevaPath — Universal Footer Component
// ============================================================

import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { FEEDBACK_URL } from '../constants/links';
import { ShieldCheck, MessageSquare, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const { language } = useApp();
  const te = language === 'te';

  return (
    <footer className="w-full bg-[#151719] text-[#FAF8F3] border-t border-[#30364F] py-12 px-4 md:px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#30364F]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B85F45] to-[#D99A24] flex items-center justify-center text-white shadow-md">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight block">SEVAPATH</span>
              <span className="text-[10px] uppercase font-bold text-[#D8CDBB]/70 tracking-wider">
                {te ? 'పౌర సాంకేతిక ప్రజా ప్రయోజనం' : 'Civic Tech for Indian Citizens'}
              </span>
            </div>
          </div>

          {/* Quick links & Give Feedback */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#D8CDBB]">
            <Link to="/" className="hover:text-white transition-colors">
              {te ? 'హోమ్' : 'Home'}
            </Link>
            <Link to="/find" className="hover:text-white transition-colors">
              {te ? 'సహాయం కనుగొనండి' : 'Find Help'}
            </Link>
            <Link to="/for/student" className="hover:text-white transition-colors">
              {te ? 'మీ కోసం' : 'For You'}
            </Link>
            <Link to="/form-explainer" className="hover:text-white transition-colors">
              {te ? 'ఫారమ్ గైడ్‌లు' : 'Form Guides'}
            </Link>
            <Link to="/applications" className="hover:text-white transition-colors">
              {te ? 'నా దరఖాస్తులు' : 'My Applications'}
            </Link>

            {/* Give feedback button */}
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B85F45] text-white hover:bg-[#a05038] text-xs font-bold transition-all shadow-xs ml-2"
              aria-label="Give feedback"
            >
              <MessageSquare size={13} />
              <span>{te ? 'ఫీడ్‌బ్యాక్ ఇవ్వండి' : 'Give Feedback'}</span>
              <ExternalLink size={11} className="opacity-70" />
            </a>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#728477]">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-[#D8CDBB]">
              {te ? 'ముఖ్యమైన గమనిక: ' : 'Important Disclaimer: '}
            </strong>
            {te
              ? 'SevaPath ఒక స్వతంత్ర పౌర వేదిక మరియు అధికారిక ప్రభుత్వ పోర్టల్ కాదు. తుది అర్హత మరియు ఆమోదాలు సంబంధిత ప్రభుత్వ మంత్రిత్వ శాఖల ద్వారా నిర్ణయించబడతాయి. అన్ని దరఖాస్తులు అధికారిక ప్రభుత్వ వెబ్‌సైట్లలో మాత్రమే చేయబడతాయి.'
              : 'SevaPath is an independent civic discovery platform and is NOT an official government website. Final eligibility and approvals are made exclusively by the respective government ministries. All applications are submitted directly on official government portals.'}
          </p>
          <div className="shrink-0 flex items-center gap-1 text-[11px] text-[#D8CDBB]/70">
            <span>Built with care for public good</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
