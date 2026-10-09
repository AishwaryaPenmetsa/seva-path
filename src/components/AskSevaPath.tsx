// ============================================================
// SevaPath — Ask SevaPath Assistant
// Real retrieval over benefits + resources. No API.
// ============================================================

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { demoBenefits } from '../data/benefits';
import { resources, scoreResource } from '../data/resources';
import { Sparkles, X, Send, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

// ── Tokeniser ─────────────────────────────────────────────────
function tokenise(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z\u0C00-\u0C7F\s0-9]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

// Synonym/intent map → tokens we inject
const INTENT_TOKENS: { pattern: RegExp; inject: string[] }[] = [
  { pattern: /student|scholar|college|degree|study|చదువు|విద్యార్థి|స్కాలర్/i, inject: ['student', 'scholarship'] },
  { pattern: /internship|intern|ఇంటర్న్/i, inject: ['internship'] },
  { pattern: /hackathon|hack|coding|develop|devfolio|unstop|హ్యాకథాన్/i, inject: ['hackathon'] },
  { pattern: /farmer|farm|krishi|rythu|రైతు|వ్యవసాయ/i, inject: ['farmer'] },
  { pattern: /senior|old age|elderly|pension|వృద్ధ|పెన్షన్/i, inject: ['senior', 'pension'] },
  { pattern: /woman|women|mahila|mata|మహిళ|తల్లి/i, inject: ['woman'] },
  { pattern: /job|employment|work|career|ఉద్యోగ|వృత్తి/i, inject: ['job-seeker'] },
  { pattern: /document|aadhaar|certificate|caste|income|పత్రాలు|ఆధార్|ధృవీకరణ/i, inject: ['document', 'certificate'] },
  { pattern: /loan|money|finance|రుణం|ఆర్థిక/i, inject: ['loan'] },
  { pattern: /health|hospital|ayushman|ఆరోగ్య|ఆసుపత్రి/i, inject: ['health', 'ayushman'] },
  { pattern: /NSP|national scholarship|scholarships.gov/i, inject: ['scholarship', 'nsp'] },
  { pattern: /skill india|pmkvy|training|శిక్షణ|నైపుణ్య/i, inject: ['training', 'skill'] },
  { pattern: /SIH|smart india/i, inject: ['hackathon', 'SIH'] },
  { pattern: /pm internship|pminternship/i, inject: ['internship', 'PM Internship'] },
  { pattern: /how to apply|apply|దరఖాస్తు ఎలా/i, inject: ['apply', 'how'] },
  { pattern: /where|portal|site|website|ఎక్కడ/i, inject: ['portal', 'official'] },
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

// ── Scoring ────────────────────────────────────────────────────
interface SearchResult {
  type: 'resource';
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  url?: string;
  hasUrl: boolean;
  score: number;
}

function searchAll(query: string, te: boolean): SearchResult[] {
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
        description: r.description,
        descriptionTe: r.descriptionTe,
        url: r.hasApplyLink ? r.officialUrl : undefined,
        hasUrl: r.hasApplyLink,
        score,
      });
    }
  }

  // Score benefits (from existing data)
  for (const b of demoBenefits) {
    const haystack = [b.name, b.nameTe, b.description, b.descriptionTe, b.category, b.department]
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
        type: 'resource',
        id: b.id,
        title: b.name,
        titleTe: b.nameTe,
        description: b.description,
        descriptionTe: b.descriptionTe,
        url,
        hasUrl: !!url,
        score,
      });
    }
  }

  // Sort by score descending, return top 3
  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

// ── Chat Message Types ─────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  results?: SearchResult[];
}

// ── Main Component ─────────────────────────────────────────────
export default function AskSevaPath() {
  const { language } = useApp();
  const navigate = useNavigate();
  const te = language === 'te';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: te
        ? 'నమస్తే! నేను SevaPath అసిస్టెంట్‌ని. ప్రభుత్వ పథకాలు, స్కాలర్‌షిప్‌లు, ఇంటర్న్‌షిప్‌లు లేదా అర్హత గురించి మీకు సహాయం చేయగలను. ఏదైనా అడగండి!'
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

    const results = searchAll(query, te);

    let botText: string;
    if (results.length === 0) {
      botText = te
        ? 'క్షమించండి, నేను ఆ ప్రశ్నకు సరిపోలే ఫలితాలను కనుగొనలేదు. పర్సోనా ద్వారా బ్రౌజ్ చేయడానికి ప్రయత్నించండి: విద్యార్థి, రైతు, వృద్ధ పౌరుడు, ఉద్యోగ అన్వేషకుడు లేదా మహిళ.'
        : 'Sorry, I couldn\'t find results matching your query. Try browsing by persona: Student, Farmer, Senior Citizen, Job Seeker, or Woman — or use the "Find Help" page.';
    } else {
      botText = te
        ? `మీ ప్రశ్నకు ${results.length} ఫలితాలు కనుగొన్నాను:`
        : `I found ${results.length} result${results.length > 1 ? 's' : ''} for your query:`;
    }

    const botMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      sender: 'assistant',
      text: botText,
      results: results.length > 0 ? results : undefined,
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
    { en: 'Scholarships for students', te: 'విద్యార్థులకు స్కాలర్‌షిప్‌లు' },
    { en: 'Internships for college students', te: 'కళాశాల విద్యార్థులకు ఇంటర్న్‌షిప్‌లు' },
    { en: 'Farmer income support schemes', te: 'రైతు ఆదాయ మద్దతు పథకాలు' },
    { en: 'Health insurance for seniors', te: 'వృద్ధులకు ఆరోగ్య బీమా' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#151719] to-[#30364F] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs md:text-sm font-extrabold border border-white/20"
        aria-label={te ? 'SevaPath అసిస్టెంట్ తెరవండి' : 'Open SevaPath Assistant'}
        aria-expanded={isOpen}
        id="ask-sevapath-toggle"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-[#D99A24]" />
        </div>
        <span>{te ? 'సేవాపాత్‌ను అడగండి' : 'Ask SevaPath'}</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={te ? 'SevaPath అసిస్టెంట్' : 'SevaPath Assistant'}
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
                  {te ? 'SevaPath అసిస్టెంట్' : 'SevaPath Assistant'}
                </h2>
                <span className="block text-[10px] text-white/70">
                  {te ? 'పథకాల ఆధారిత శోధన' : 'Retrieval over schemes & resources'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-all"
              aria-label={te ? 'అసిస్టెంట్ మూసివేయండి' : 'Close Assistant'}
            >
              <X size={18} />
            </button>
          </div>

          {/* Safety badge */}
          <div className="px-3 py-1.5 bg-[#F1EDE4] border-b border-[#D8CDBB] flex items-center gap-1.5 text-[10px] text-[#728477]">
            <ShieldCheck size={12} className="text-[#B85F45]" />
            <span className="font-semibold text-[#3B3F4A]">
              {te ? 'ఇది అధికారిక ప్రభుత్వ సేవ కాదు. SevaPath డేటా ఆధారంగా మాత్రమే.' : 'Not an official government service. Based on SevaPath data only.'}
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

                  {/* Result cards */}
                  {m.results && m.results.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.results.map((r) => (
                        <div
                          key={r.id}
                          className="p-2.5 rounded-xl bg-[#F1EDE4] border border-[#D8CDBB]"
                        >
                          <p className="font-bold text-[#151719] mb-0.5">
                            {te ? r.titleTe : r.title}
                          </p>
                          <p className="text-[10px] text-[#728477] leading-snug mb-2">
                            {(te ? r.descriptionTe : r.description).slice(0, 90)}...
                          </p>
                          {r.hasUrl && r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#B85F45] text-white text-[10px] font-bold hover:opacity-90 transition-all"
                            >
                              {te ? 'అధికారిక సైట్' : 'Official site'}
                              <ArrowRight size={10} />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#728477]">
                              {te ? 'అధికారిక విభాగాన్ని తనిఖీ చేయండి' : 'Check the official department'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick questions (only if few messages) */}
            {messages.length <= 2 && (
              <div className="pt-1">
                <p className="text-[10px] font-bold text-[#9AA5B1] uppercase tracking-wider mb-2">
                  {te ? 'త్వరిత ప్రశ్నలు:' : 'Quick questions:'}
                </p>
                <div className="grid gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputQuery(te ? q.te : q.en);
                        inputRef.current?.focus();
                      }}
                      className="p-2 rounded-xl bg-white border border-[#E8E3DA] hover:border-[#D8CDBB] hover:bg-[#F1EDE4] text-left text-[11px] font-semibold text-[#30364F] transition-all flex items-center justify-between group"
                    >
                      <span>{te ? q.te : q.en}</span>
                      <ArrowRight size={12} className="text-[#B85F45] opacity-60 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
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
              {te ? 'ప్రశ్న నమోదు చేయండి' : 'Type your question'}
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={te ? 'ప్రశ్నను టైప్ చేయండి... (Enter పంపండి)' : 'Ask about scholarships, benefits… (Enter to send)'}
              className="flex-1 px-3.5 py-2.5 bg-[#F1EDE4] border border-[#D8CDBB] rounded-xl text-xs font-medium text-[#151719] focus:outline-none focus:ring-2 focus:ring-[#B85F45]/30 focus:border-[#B85F45] transition-all"
              aria-label={te ? 'ప్రశ్న నమోదు చేయండి' : 'Type your question'}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-10 h-10 rounded-xl bg-[#B85F45] hover:bg-[#a05038] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#B85F45]/50"
              aria-label={te ? 'సందేశం పంపండి' : 'Send message'}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
