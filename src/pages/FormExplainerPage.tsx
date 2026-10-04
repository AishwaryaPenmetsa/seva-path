// ============================================================
// SevaPath — Premium Form Explainer Page
// ============================================================

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { demoFormFields } from '../data/benefits';
import FormExplainer3D from '../components/FormExplainer3D';
import {
  Upload, FileText, Info, AlertTriangle,
  ChevronDown, ChevronUp, HelpCircle, Sparkles,
  CheckCircle2, ArrowRight
} from 'lucide-react';

export default function FormExplainerPage() {
  const { t, language } = useApp();
  const [showDemo, setShowDemo] = useState(false);
  const [expandedField, setExpandedField] = useState<string | null>('field-1');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleTryDemo = () => {
    setShowDemo(true);
    setUploadedFile('telangana_rythu_bharosa_application.pdf');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setShowDemo(true);
    }
  };

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B5F]/10 text-[#173B5F] text-xs font-bold mb-3">
            <Sparkles size={13} className="text-[#D99A24]" />
            <span>AI-Assisted Form Decoding</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#173B5F] mb-2">
            {t('form.title')}
          </h1>
          <p className="text-sm text-[#66727E] max-w-lg mx-auto font-medium">
            {t('form.subtitle')}
          </p>
        </div>

        {/* ── 3D Visual Concept Banner ── */}
        <FormExplainer3D />

        {!showDemo ? (
          <div className="max-w-md mx-auto animate-fade-in-up mt-8">
            {/* Upload Zone */}
            <label className="upload-zone block mb-4 cursor-pointer p-8 rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed border-[#CBD5E1] hover:border-[#173B5F] transition-all text-center">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#173B5F] flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Upload size={24} />
              </div>
              <p className="text-sm font-bold text-[#17212B] mb-1">{t('form.upload')}</p>
              <p className="text-xs text-[#9AA5B1]">{t('form.uploadFormats')}</p>
            </label>

            {/* Try Demo */}
            <div className="text-center">
              <button 
                onClick={handleTryDemo} 
                className="btn btn-secondary shadow-sm"
              >
                <HelpCircle size={16} />
                <span>{t('form.tryDemo')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up mt-8 space-y-6">
            
            {/* File info bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#EAF2F8] border border-[#173B5F]/20 text-xs font-medium">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#173B5F] text-white flex items-center justify-center">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-bold text-[#173B5F]">{uploadedFile}</p>
                  <p className="text-[#66727E]">{t('form.fieldsFound', { count: demoFormFields.length.toString() })}</p>
                </div>
              </div>
              <button 
                onClick={() => { setShowDemo(false); setUploadedFile(null); }} 
                className="btn btn-ghost btn-sm text-[#173B5F] font-bold"
              >
                {language === 'te' ? 'మరొకటి ఎంచుకోండి' : 'Choose another'}
              </button>
            </div>

            {/* Form Fields Explainer List */}
            <div className="space-y-4">
              {demoFormFields.map((field) => {
                const expanded = expandedField === field.id;
                const govWording = language === 'te' ? field.governmentWordingTe : field.governmentWording;
                const whatMeans = language === 'te' ? field.whatItMeansTe : field.whatItMeans;
                const whatEnter = language === 'te' ? field.whatToEnterTe : field.whatToEnter;
                const whereFind = language === 'te' ? field.whereToFindTe : field.whereToFind;
                const warning = language === 'te' ? field.warningTe : field.warning;

                return (
                  <div 
                    key={field.id} 
                    className="card p-0 overflow-hidden rounded-3xl border border-[#E2E6EA] shadow-md transition-all"
                  >
                    {/* Official wording row */}
                    <div
                      className="p-5 cursor-pointer flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors"
                      onClick={() => setExpandedField(expanded ? null : field.id)}
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-[10px] font-bold text-[#9AA5B1] uppercase tracking-wider block mb-1">
                          {t('form.govForm')}
                        </span>
                        <p className="text-sm font-bold text-[#17212B]">{govWording}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E2E6EA] flex items-center justify-center text-[#66727E] shrink-0">
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {/* SevaPath plain language translation */}
                    {expanded && (
                      <div className="p-6 bg-gradient-to-br from-[#EAF2F8]/70 via-white to-white border-t border-[#E2E6EA] animate-fade-in space-y-4">
                        <span className="text-[11px] font-extrabold text-[#173B5F] uppercase tracking-wider block">
                          {t('form.sevaExplanation')}
                        </span>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-white border border-[#E2E6EA]">
                            <div className="flex items-center gap-1.5 mb-1.5 text-[#173B5F] font-bold text-xs">
                              <Info size={14} />
                              <span>{t('form.whatMeans')}</span>
                            </div>
                            <p className="text-xs text-[#17212B] leading-relaxed pl-5">{whatMeans}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-white border border-[#E2E6EA]">
                            <div className="flex items-center gap-1.5 mb-1.5 text-[#16856A] font-bold text-xs">
                              <CheckCircle2 size={14} />
                              <span>{t('form.whatEnter')}</span>
                            </div>
                            <p className="text-xs text-[#17212B] leading-relaxed pl-5">{whatEnter}</p>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#E2E6EA]">
                          <div className="flex items-center gap-1.5 mb-1.5 text-[#173B5F] font-bold text-xs">
                            <HelpCircle size={14} />
                            <span>{t('form.whereFind')}</span>
                          </div>
                          <p className="text-xs text-[#17212B] leading-relaxed pl-5">{whereFind}</p>
                        </div>

                        {warning && (
                          <div className="p-3.5 rounded-2xl bg-[#FEF3CD] border border-[#D99A24]/30 flex items-start gap-2.5 text-xs text-[#7C5B00]">
                            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#D99A24]" />
                            <div>
                              <span className="font-bold">{t('form.important')}: </span>
                              <span>{warning}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
