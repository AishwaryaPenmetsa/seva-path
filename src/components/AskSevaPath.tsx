// ============================================================
// SevaPath — Ask SevaPath Assistant
// Local-only retrieval over benefits + resources + help guides.
// Supports English, Telugu, and Hindi (Devanagari). No external APIs.
// ============================================================

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { demoBenefits } from '../data/benefits';
import { resources, scoreResource } from '../data/resources';
import { Sparkles, X, Send, ArrowRight, ShieldCheck, MessageSquare, ExternalLink } from 'lucide-react';

// ── Tokeniser (EN + Telugu + Hindi Devanagari) ─────────────────
function tokenise(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z\u0C00-\u0C7F\u0900-\u097F\s0-9]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

// Synonym/intent map → tokens we inject
const INTENT_TOKENS: { pattern: RegExp; inject: string[] }[] = [
  { pattern: /student|scholar|college|degree|study|చదువు|విద్యార్థి|స్కాలర్|छात्र|विद्यार्थी|छात्रवृत्ति|स्कॉलरशिप/i, inject: ['student', 'scholarship'] },
  { pattern: /internship|intern|ఇంటర్న్|इन्टर्नशिप/i, inject: ['internship'] },
  { pattern: /hackathon|hack|coding|develop|devfolio|unstop|హ్యాకథాన్|हैकाथॉन/i, inject: ['hackathon'] },
  { pattern: /farmer|farm|krishi|rythu|రైతు|వ్యవసాయ|किसान|कृषि|खेती/i, inject: ['farmer'] },
  { pattern: /senior|old age|elderly|pension|వృద్ధ|పెన్షన్|वरिष्ठ|पेंशन|वृद्ध/i, inject: ['senior', 'pension'] },
  { pattern: /woman|women|mahila|mata|మహిళ|తల్లి|महिला|नारी|माता/i, inject: ['woman'] },
  { pattern: /job|employment|work|career|ఉద్యోగ|వృత్తి|नौकरी|रोजगार|काम/i, inject: ['job-seeker'] },
  { pattern: /document|aadhaar|certificate|caste|income|పత్రాలు|ఆధార్|ధృవీకరణ|दस्तावेज|प्रमाण पत्र|आधार/i, inject: ['document', 'certificate'] },
  { pattern: /loan|money|finance|రుణం|ఆర్థిక|ऋण|लोन|पैसा/i, inject: ['loan'] },
  { pattern: /health|hospital|ayushman|ఆరోగ్య|ఆసుపత్రి|स्वास्थ्य|अस्पताल|आयुष्मान/i, inject: ['health', 'ayushman'] },
  { pattern: /NSP|national scholarship|scholarships.gov/i, inject: ['scholarship', 'nsp'] },
  { pattern: /skill india|pmkvy|training|శిక్షణ|నైపుణ్య|प्रशिक्षण|कौशल/i, inject: ['training', 'skill'] },
  { pattern: /SIH|smart india/i, inject: ['hackathon', 'SIH'] },
  { pattern: /pm internship|pminternship/i, inject: ['internship', 'PM Internship'] },
  { pattern: /how to apply|apply|దరఖాస్తు ఎలా|आवेदन कैसे करें/i, inject: ['apply', 'how'] },
  { pattern: /where|portal|site|website|ఎక్కడ|पोर्टल/i, inject: ['portal', 'official'] },
  { pattern: /telangana|hyderabad|ts/i, inject: ['Telangana'] },
  { pattern: /andhra|AP/i, inject: ['Andhra Pradesh'] },
];

function enrichTokens(query: string, tokens: string[]): string[] {
  const extra: string[] = [];
  for (const { pattern, inject } of INTENT_TOKENS) {
    if (pattern.test(query)) extra.push(...inject);
  }
  return [...new Set([...tokens, ...extra])];
}

// ── Search Result Structure ────────────────────────────────────
interface SearchResult {
  type: 'scheme' | 'resource';
  id: string;
  title: string;
  titleTe: string;
  titleHi?: string;
  description: string;
  descriptionTe: string;
  descriptionHi?: string;
  url?: string;
  hasUrl: boolean;
  score: number;
}

function searchAll(query: string): SearchResult[] {
  const raw = tokenise(query);
  const tokens = enrichTokens(query, raw);

  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  // Score resources
  for (const r of resources) {
    const score = scoreResource(r, tokens);
    if (score > 0) {
      results.push({
        type: 'resource',
        id: r.id,
        title: r.title,
        titleTe: r.titleTe,
        titleHi: r.title,
        description: r.description,
        descriptionTe: r.descriptionTe,
        descriptionHi: r.description,
        url: r.hasApplyLink ? r.officialUrl : undefined,
        hasUrl: r.hasApplyLink,
        score,
      });
    }
  }

  // Score benefits
  for (const b of demoBenefits) {
    const haystack = [b.name, b.nameTe, b.nameHi || '', b.description, b.descriptionTe, b.category, b.department]
      .join(' ')
      .toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score++;
      if (b.name.toLowerCase().includes(token)) score += 2;
    }
    const url = b.officialApplicationUrl && b.officialApplicationUrl !== '#demo'
      ? b.officialApplicationUrl
      : undefined;
    if (score > 0) {
      results.push({
        type: 'scheme',
        id: b.id,
        title: b.name,
        titleTe: b.nameTe,
        titleHi: b.nameHi || b.name,
        description: b.description,
        descriptionTe: b.descriptionTe,
        descriptionHi: b.descriptionHi || b.description,
        url,
        hasUrl: !!url,
        score,
      });
    }
  }

  // Sort by score descending and return top 3
  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

// ── Chat Message Types ─────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  results?: SearchResult[];
  showFallbackLinks?: boolean;
}

export default function AskSevaPath() {
  const { language } = useApp();
  const navigate = useNavigate();

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: isTe
        ? 'నమస్తే! నేను SevaPath అసిస్టెంట్‌ని. ప్రభుత్వ పథకాలు, స్కాలర్‌షిప్‌లు, ఇంటర్న్‌షిప్‌లు లేదా అర్హత గురించి మీకు సహాయం చేయగలను. ఏదైనా అడగండి!'
        : isHi
        ? 'नमस्ते! मैं SevaPath सहायक हूँ। मैं आपको सरकारी योजनाओं, छात्रवृत्तियों, इंटर्नशिप या पात्रता खोजने में मदद कर सकता हूँ। कुछ भी पूछें!'
        : 'Hi! I\'m the SevaPath assistant. I can help you find government schemes, scholarships, internships, or check eligibility. Ask me anything!',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const query = inputQuery.trim();
    if (!query) return;
    setInputQuery('');

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: query };
    const results = searchAll(query);

    let botText: string;
    let showFallback = false;

    if (results.length === 0) {
      showFallback = true;
      botText = isTe
        ? 'క్షమించండి, మీ శోధనకు సరిపోలే ఫలితాలు ఏవీ కనుగొనబడలేదు. నిర్దిష్ట వర్గం లేదా పర్సోనా లింక్‌లను అన్వేషించండి:'
        : isHi
        ? 'क्षमा करें, आपके प्रश्न से मेल खाने वाले परिणाम नहीं मिले। कृपया नीचे दिए गए श्रेणियों या सहायता पृष्ठों को देखें:'
        : 'Sorry, I couldn\'t find direct results matching your query. Explore relevant personas, categories, or civic guides below:';
    } else {
      botText = isTe
        ? `మీ ప్రశ్నకు సంబంధించి ${results.length} ఖచ్చితమైన ఫలితాలను కనుగొన్నాను:`
        : isHi
        ? `आपके प्रश्न के लिए ${results.length} प्रासंगिक परिणाम मिले:`
        : `I found ${results.length} result${results.length > 1 ? 's' : ''} from SevaPath's verified data:`;
    }

    const botMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      sender: 'assistant',
      text: botText,
      results: results.length > 0 ? results : undefined,
      showFallbackLinks: showFallback,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    { en: 'Scholarships for students', te: 'విద్యార్థులకు స్కాలర్‌షిప్‌లు', hi: 'छात्रों के लिए छात्रवृत्ति' },
    { en: 'PM Internship scheme', te: 'పిఎం ఇంటర్న్‌షిప్ పథకం', hi: 'पीएम इंटर्नशिप योजना' },
    { en: 'Farmer income support', te: 'రైతు ఆదాయ మద్దతు పథకాలు', hi: 'किसान आय सहायता' },
    { en: 'Health insurance for seniors', te: 'వృద్ధులకు ఆరోగ్య బీమా', hi: 'वरिष्ठ नागरिकों के लिए स्वास्थ्य बीमा' },
  ];

  const fallbackPersonas = [
    { to: '/for/student', label: isTe ? 'విద్యార్థి హబ్' : isHi ? 'छात्र हब' : 'Student Hub' },
    { to: '/for/farmer', label: isTe ? 'రైతు హబ్' : isHi ? 'किसान हब' : 'Farmer Hub' },
    { to: '/for/senior', label: isTe ? 'వృద్ధ పౌరుల హబ్' : isHi ? 'वरिष्ठ नागरिक हब' : 'Senior Hub' },
    { to: '/for/job-seeker', label: isTe ? 'ఉద్యోగ అన్వేషకులు' : isHi ? 'रोजगार हब' : 'Job Seekers' },
    { to: '/find', label: isTe ? 'అన్ని వర్గాలు' : isHi ? 'सभी श्रेणियां' : 'All Categories' },
    { to: '/help', label: isTe ? 'సహాయ గైడ్లు & CSC' : isHi ? 'सहायता गाइड' : 'Civic Guides' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#151719] to-[#30364F] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs md:text-sm font-extrabold border border-white/20"
        aria-label={isTe ? 'SevaPath అసిస్టెంట్ తెరవండి' : isHi ? 'SevaPath सहायक खोलें' : 'Open SevaPath Assistant'}
        aria-expanded={isOpen}
        id="ask-sevapath-toggle"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-[#D99A24]" />
        </div>
        <span>{isTe ? 'సేవాపాత్‌ను అడగండి' : isHi ? 'SevaPath से पूछें' : 'Ask SevaPath'}</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SevaPath Assistant"
          aria-modal="true"
          className="fixed bottom-20 md:bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[82vh] bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#D8CDBB] flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#151719] to-[#30364F] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <Sparkles size={16} className="text-[#D99A24]" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold tracking-tight">
                  {isTe ? 'SevaPath అసిస్టెంట్' : isHi ? 'SevaPath सहायक' : 'SevaPath Assistant'}
                </h2>
                <span className="block text-[10px] text-white/70">
                  {isTe ? 'పథకాల ఆధారిత శోధన' : isHi ? 'योजनाओं और संसाधनों की खोज' : 'Retrieval over schemes & resources'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-all"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Exact Required Disclaimer */}
          <div className="px-3 py-2 bg-[#F1EDE4] border-b border-[#D8CDBB] flex items-center gap-1.5 text-[10px] text-[#30364F]">
            <ShieldCheck size={13} className="text-[#B85F45] shrink-0" />
            <span className="font-semibold leading-tight">
              {isTe
                ? 'సమాధానాలు SevaPath సేవ్ చేసిన డేటా నుండి వస్తాయి, ప్రత్యక్ష ప్రభుత్వ డేటా నుండి కాదు.'
                : isHi
                ? 'उत्तर SevaPath के सहेजे गए डेटा से आते हैं, लाइव सरकारी डेटा से नहीं।'
                : 'Answers come from SevaPath\'s saved data, not live government data.'}
            </span>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F3]"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#30364F] text-white rounded-br-sm font-medium'
                      : 'bg-white text-[#151719] border border-[#E8E3DA] shadow-xs rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Top 3 Result Cards */}
                  {m.results && m.results.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.results.map((r) => {
                        const title = isTe ? r.titleTe : isHi ? (r.titleHi || r.title) : r.title;
                        const desc = isTe ? r.descriptionTe : isHi ? (r.descriptionHi || r.description) : r.description;

                        return (
                          <div
                            key={r.id}
                            className="p-3 rounded-xl bg-[#F1EDE4] border border-[#D8CDBB] flex flex-col justify-between"
                          >
                            <div>
                              <p className="font-bold text-[#151719] text-xs mb-1">
                                {title}
                              </p>
                              <p className="text-[10px] text-[#728477] leading-snug mb-2.5">
                                {desc.slice(0, 110)}...
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {r.type === 'scheme' ? (
                                <button
                                  onClick={() => { setIsOpen(false); navigate(`/benefit/${r.id}`); }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#151719] text-white text-[10px] font-bold hover:bg-[#30364F] transition-all"
                                >
                                  <span>{isTe ? 'వివరాలు చూడండి' : isHi ? 'विवरण देखें' : 'View Details'}</span>
                                  <ArrowRight size={10} />
                                </button>
                              ) : null}

                              {r.hasUrl && r.url ? (
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#B85F45] text-white text-[10px] font-bold hover:bg-[#a05038] transition-all"
                                >
                                  <span>{isTe ? 'అధికారిక సైట్' : isHi ? 'आधिकारिक पोर्टल' : 'Official site'}</span>
                                  <ExternalLink size={10} />
                                </a>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Fallback category links when nothing matches */}
                  {m.showFallbackLinks && (
                    <div className="mt-3 pt-2 border-t border-[#E8E3DA] grid grid-cols-2 gap-1.5">
                      {fallbackPersonas.map((link) => (
                        <button
                          key={link.to}
                          onClick={() => { setIsOpen(false); navigate(link.to); }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#F1EDE4] border border-[#D8CDBB] text-[10px] font-bold text-[#151719] hover:bg-[#D8CDBB] text-left transition-colors flex items-center justify-between"
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={10} className="text-[#B85F45]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick questions (only on start) */}
            {messages.length <= 2 && (
              <div className="pt-1">
                <p className="text-[10px] font-bold text-[#728477] uppercase tracking-wider mb-2">
                  {isTe ? 'త్వరిత ప్రశ్నలు:' : isHi ? 'सुझाए गए प्रश्न:' : 'Quick questions:'}
                </p>
                <div className="grid gap-1.5">
                  {quickQuestions.map((q, i) => {
                    const text = isTe ? q.te : isHi ? q.hi : q.en;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setInputQuery(text);
                          inputRef.current?.focus();
                        }}
                        className="p-2 rounded-xl bg-white border border-[#E8E3DA] hover:border-[#D8CDBB] hover:bg-[#F1EDE4] text-left text-[11px] font-semibold text-[#30364F] transition-all flex items-center justify-between group"
                      >
                        <span>{text}</span>
                        <ArrowRight size={12} className="text-[#B85F45] opacity-60 group-hover:opacity-100 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-t border-[#E8E3DA] flex items-center gap-2 shrink-0"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTe ? 'ప్రశ్నను టైప్ చేయండి... (Enter)' : isHi ? 'योजना या छात्रवृत्ति के बारे में पूछें... (Enter)' : 'Ask about scholarships, schemes… (Enter to send)'}
              className="flex-1 px-3.5 py-2.5 bg-[#F1EDE4] border border-[#D8CDBB] rounded-xl text-xs font-medium text-[#151719] focus:outline-none focus:ring-2 focus:ring-[#B85F45]/30 focus:border-[#B85F45] transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-10 h-10 rounded-xl bg-[#B85F45] hover:bg-[#a05038] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#B85F45]/50"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
