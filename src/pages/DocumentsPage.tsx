// ============================================================
// SevaPath — Document Preparation Page with IndexedDB Local Attachments
// Files stay strictly in client IndexedDB. No network calls. Max 5 MB.
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import DocumentStack3D from '../components/DocumentStack3D';
import { getBenefitById } from '../data/benefits';
import * as storage from '../services/storage';
import { continueToApplication } from '../services/startApplication';
import {
  saveDocumentFile,
  getDocumentFile,
  removeDocumentFile,
  clearAllDocumentFiles,
  MAX_FILE_SIZE_BYTES,
  type StoredDocumentFile
} from '../services/documentStore';
import {
  ChevronLeft, Check, X, Upload, FileText,
  ChevronDown, ChevronUp, ExternalLink, Info, AlertTriangle,
  Lock, Sparkles, ShieldCheck, Trash2, Eye
} from 'lucide-react';

export default function DocumentsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, addApplication, updateApplication, applications } = useApp();
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<Record<string, StoredDocumentFile>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<StoredDocumentFile | null>(null);
  const [, forceUpdate] = useState(0);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const benefit = getBenefitById(id || '');

  // Load existing files from IndexedDB on mount
  useEffect(() => {
    if (!benefit) return;
    let isMounted = true;

    async function loadFiles() {
      const map: Record<string, StoredDocumentFile> = {};
      for (const doc of benefit!.documents) {
        try {
          const file = await getDocumentFile(benefit!.id, doc.id);
          if (file && isMounted) {
            map[doc.id] = file;
          }
        } catch {
          // Ignore
        }
      }
      if (isMounted) setAttachedFiles(map);
    }

    loadFiles();
    return () => { isMounted = false; };
  }, [benefit]);

  if (!benefit) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-12">
        <div className="text-center">
          <p className="text-lg font-bold text-[#151719]">{t('general.error')}</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">
            <ChevronLeft size={16} /> {t('q.back')}
          </button>
        </div>
      </div>
    );
  }

  const b = benefit;
  const name = isTe ? b.nameTe : isHi ? (b.nameHi || b.name) : b.name;
  const readyCount = b.documents.filter((d) => storage.isDocumentReady(d.id, b.id)).length;

  const handleToggleReady = (docId: string) => {
    storage.toggleDocumentReady(docId, b.id);
    forceUpdate((n) => n + 1);
  };

  const handleFileUpload = async (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileError(null);

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        isTe
          ? 'ఫైల్ పరిమాణం 5 MB కంటే తక్కువగా ఉండాలి.'
          : isHi
          ? 'फ़ाइल का आकार 5 MB से कम होना चाहिए।'
          : 'File exceeds maximum allowed size of 5 MB.'
      );
      return;
    }

    try {
      const saved = await saveDocumentFile(b.id, docId, file);
      setAttachedFiles((prev) => ({ ...prev, [docId]: saved }));
      // Automatically mark as ready if not already marked
      if (!storage.isDocumentReady(docId, b.id)) {
        storage.toggleDocumentReady(docId, b.id);
      }
      forceUpdate((n) => n + 1);
    } catch (err: any) {
      setFileError(err.message || 'Failed to save file');
    }
  };

  const handleRemoveFile = async (docId: string) => {
    try {
      await removeDocumentFile(b.id, docId);
      setAttachedFiles((prev) => {
        const next = { ...prev };
        delete next[docId];
        return next;
      });
      forceUpdate((n) => n + 1);
    } catch {
      // Ignore
    }
  };

  const handleClearAllFiles = async () => {
    const confirmed = window.confirm(
      isTe
        ? 'ఈ పరికరంలో సేవ్ చేసిన అన్ని పత్రాలను తొలగించాలనుకుంటున్నారా?'
        : isHi
        ? 'क्या आप इस डिवाइस पर सहेजी गई सभी फ़ाइलों को हटाना चाहते हैं?'
        : 'Are you sure you want to delete all stored files from this device?'
    );
    if (!confirmed) return;

    try {
      await clearAllDocumentFiles();
      setAttachedFiles({});
      forceUpdate((n) => n + 1);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
        
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <button onClick={() => navigate(`/benefit/${b.id}`)} className="btn btn-ghost btn-sm -ml-2 text-[#728477]">
            <ChevronLeft size={16} /> {isTe ? 'వెనుకకు' : isHi ? 'वापस' : 'Back to Scheme'}
          </button>
          {Object.keys(attachedFiles).length > 0 && (
            <button
              onClick={handleClearAllFiles}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B85F45] bg-[#F1EDE4] hover:bg-[#D8CDBB] transition-colors"
            >
              <Trash2 size={13} />
              <span>{isTe ? 'అన్ని ఫైళ్ళను తొలగించండి' : isHi ? 'सभी फ़ाइलें हटाएं' : 'Clear all files'}</span>
            </button>
          )}
        </div>

        {/* ── 3D Visual Document Stack ── */}
        <DocumentStack3D 
          readyCount={readyCount} 
          totalCount={b.documents.length} 
          benefitName={name} 
        />

        {/* ── Local Device Security Notice ── */}
        <div className="p-4 rounded-2xl mb-6 bg-[#FAF8F3] border border-[#D8CDBB] text-xs text-[#30364F] flex items-start gap-3">
          <Lock size={16} className="text-[#B85F45] mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="font-bold block text-[#151719]">
              {isTe
                ? 'ఫైల్ భద్రతా హెచ్చరిక'
                : isHi
                ? 'फ़ाइल सुरक्षा चेतावनी'
                : 'Local Device Storage Warning'}
            </span>
            <p className="leading-relaxed">
              {isTe
                ? 'ఫైళ్లు ఈ పరికరంలో మాత్రమే సేవ్ చేయబడతాయి (IndexedDB). ఏమీ అప్‌లోడ్ చేయబడదు. పబ్లిక్ లేదా షేర్డ్ కంప్యూటర్‌లో ఉపయోగించవద్దు.'
                : isHi
                ? 'फ़ाइलें केवल इसी डिवाइस पर रहती हैं। कुछ भी अपलोड नहीं किया जाता है। साझा कंप्यूटर पर उपयोग न करें।'
                : 'Files stay on this device only. Nothing is uploaded. Don\'t use on a shared computer.'}
            </p>
          </div>
        </div>

        {fileError && (
          <div className="p-3.5 rounded-2xl bg-[#FEF3CD] text-[#7C5B00] border border-[#D99A24]/30 text-xs mb-4 flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>{fileError}</span>
          </div>
        )}

        {/* ── Document Checklist Accordion ── */}
        <div className="space-y-3">
          {b.documents.map((doc) => {
            const ready = storage.isDocumentReady(doc.id, b.id);
            const expanded = expandedDoc === doc.id;
            const attached = attachedFiles[doc.id];
            const docName = isTe ? doc.nameTe : doc.name;
            const docDesc = isTe ? doc.descriptionTe : doc.description;
            const whyNeeded = isTe ? doc.whyNeededTe : doc.whyNeeded;
            const howToGet = isTe ? doc.howToGetTe : doc.howToGet;

            return (
              <div 
                key={doc.id} 
                className={`card p-0 overflow-hidden transition-all duration-300 rounded-2xl border ${
                  ready ? 'border-[#728477] bg-white' : 'border-[#D8CDBB] bg-[#FAF8F3]'
                }`}
              >
                {/* Header */}
                <div 
                  className="flex items-center gap-3.5 p-4 sm:p-5 cursor-pointer hover:bg-[#F1EDE4]/50 transition-colors" 
                  onClick={() => setExpandedDoc(expanded ? null : doc.id)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleReady(doc.id); }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      ready 
                        ? 'bg-[#B85F45] text-white shadow-xs' 
                        : 'border-2 border-[#D8CDBB] hover:border-[#151719]'
                    }`}
                    aria-label={ready ? t('docs.markNotReady') : t('docs.markReady')}
                  >
                    {ready && <Check size={16} className="stroke-[3]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#151719]">{docName}</p>
                    <p className="text-xs text-[#728477] mt-0.5 line-clamp-1">{docDesc}</p>
                    {attached && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#728477] mt-1">
                        <FileText size={11} />
                        {attached.fileName} ({(attached.fileSize / 1024).toFixed(0)} KB)
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    ready ? 'bg-[#EAF4F0] text-[#728477]' : 'bg-[#F1EDE4] text-[#151719]'
                  }`}>
                    {ready ? t('docs.docReady') : t('docs.docMissing')}
                  </span>

                  {expanded ? <ChevronUp size={18} className="text-[#728477]" /> : <ChevronDown size={18} className="text-[#728477]" />}
                </div>

                {/* Expanded Details */}
                {expanded && (
                  <div className="border-t border-[#D8CDBB] p-5 bg-white animate-fade-in space-y-4">
                    <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#D8CDBB] text-xs space-y-3">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[#728477] text-[10px] block mb-1">
                          {t('docs.whyNeeded')}
                        </span>
                        <p className="text-[#151719] leading-relaxed">{whyNeeded}</p>
                      </div>

                      <div>
                        <span className="font-bold uppercase tracking-wider text-[#728477] text-[10px] block mb-1">
                          {t('docs.howToGet')}
                        </span>
                        <p className="text-[#151719] leading-relaxed">{howToGet}</p>
                        {doc.estimatedTime && (
                          <p className="text-[11px] text-[#B85F45] font-semibold mt-1">
                            {t('docs.estTime')}: {doc.estimatedTime}
                          </p>
                        )}
                        {doc.officialLink && (
                          <a 
                            href={doc.officialLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#30364F] mt-2 hover:underline"
                          >
                            <ExternalLink size={12} /> {t('docs.officialLink')}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* File Attachment & Actions */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F1EDE4] hover:bg-[#D8CDBB] text-[#151719] text-xs font-bold transition-colors">
                          <Upload size={14} className="text-[#B85F45]" />
                          <span>{attached ? (isTe ? 'ఫైల్ మార్చండి' : isHi ? 'फ़ाइल बदलें' : 'Replace file') : (isTe ? 'ఫైల్ జతచేయండి (5 MB)' : isHi ? 'फ़ाइल जोड़ें (5 MB)' : 'Attach file (PDF/JPG/PNG)')}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileUpload(doc.id, e)}
                          />
                        </label>

                        {attached && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPreviewFile(attached)}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#D8CDBB] text-xs font-bold text-[#30364F] hover:bg-[#F1EDE4]"
                            >
                              <Eye size={13} />
                              <span>{isTe ? 'ప్రివ్యూ' : isHi ? 'पूर्वावलोकन' : 'Preview'}</span>
                            </button>
                            <button
                              onClick={() => handleRemoveFile(doc.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-[#B85F45] hover:bg-[#F1EDE4]"
                              aria-label="Remove attached file"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleToggleReady(doc.id)} 
                          className={`btn btn-sm ${ready ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          {ready ? (
                            <><X size={14} /> {t('docs.markNotReady')}</>
                          ) : (
                            <><Check size={14} /> {t('docs.markReady')}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue button */}
        <div className="mt-6">
          <button
            id="docs-continue-to-application"
            disabled={readyCount !== b.documents.length}
            onClick={() => continueToApplication({
              benefit: b,
              existing: applications.find((a) => a.benefitId === b.id),
              addApplication,
              updateApplication,
              navigate,
            })}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isTe ? 'దరఖాస్తుకు కొనసాగండి' : isHi ? 'आवेदन जारी रखें' : 'Continue to application'}</span>
          </button>
          {readyCount !== b.documents.length && (
            <p className="text-xs text-[#728477] mt-2 text-center">
              {isTe ? 'కొనసాగడానికి అన్ని పత్రాలను సిద్ధంగా గుర్తించండి.' : isHi ? 'जारी रखने के लिए सभी दस्तावेजों को तैयार चिह्नित करें।' : 'Mark all documents as ready to continue.'}
            </p>
          )}
        </div>

      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#D8CDBB]">
            <div className="p-4 bg-[#151719] text-white flex items-center justify-between">
              <span className="text-xs font-bold truncate">{previewFile.fileName}</span>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-white/70 hover:text-white p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto flex items-center justify-center bg-[#FAF8F3]">
              {previewFile.fileType.startsWith('image/') ? (
                <img src={previewFile.dataUrl} alt={previewFile.fileName} className="max-w-full max-h-[60vh] rounded-lg object-contain" />
              ) : (
                <iframe src={previewFile.dataUrl} title={previewFile.fileName} className="w-full h-[60vh] rounded-lg" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
