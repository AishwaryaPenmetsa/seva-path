// ============================================================
// SevaPath — 404 Not Found Page
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { language } = useApp();
  const te = language === 'te';

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-[#F1EDE4] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Compass size={36} className="text-[#B85F45]" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#151719] mb-2">404</h1>
        <h2 className="text-xl font-bold text-[#3B3F4A] mb-3">
          {te ? 'పేజీ కనుగొనబడలేదు' : 'Page not found'}
        </h2>
        <p className="text-sm text-[#728477] mb-8 leading-relaxed">
          {te
            ? 'మీరు వెతుకుతున్న పేజీ అందుబాటులో లేదు. దయచేసి హోమ్‌కు వెళ్లండి.'
            : 'The page you\'re looking for doesn\'t exist. Let\'s get you back on track.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B85F45] text-white font-bold text-sm hover:opacity-90 transition-all"
          >
            <Home size={16} />
            {te ? 'హోమ్‌కు వెళ్లండి' : 'Go Home'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F1EDE4] text-[#3B3F4A] font-bold text-sm hover:bg-[#D8CDBB] transition-all"
          >
            {te ? 'వెనక్కు వెళ్లండి' : 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
}
