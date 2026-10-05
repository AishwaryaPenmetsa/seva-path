// ============================================================
// SevaPath — Floating Assistant ("Ask SevaPath")
// Lightweight guidance assistant using existing project data & routes.
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {
  Sparkles, X, Send, ArrowRight, MessageSquare,
  Search, FileText, Compass, ExternalLink, ShieldCheck, HelpCircle
} from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
  textTe: string;
  response: string;
  responseTe: string;
  actionLabel?: string;
  actionLabelTe?: string;
  actionPath?: string;
}

const SUGGESTED_QUESTIONS: QuestionOption[] = [
  {
    id: 'q1',
    text: 'What schemes might I be eligible for?',
    textTe: 'నేను ఏ పథకాలకు అర్హుడనయ్యే అవకాశం ఉంది?',
    response: 'SevaPath matches government schemes based on your age, income, category, and occupation. Answer our quick 2-minute questionnaire to view your personalized Help Map.',
    responseTe: 'SevaPath మీ వయస్సు, ఆదాయం, వర్గం మరియు వృత్తి ఆధారంగా ప్రభుత్వ పథకాలను సరిపోలుస్తుంది. మీ సహాయ మ్యాప్‌ను చూడటానికి 2 నిమిషాల ప్రశ్నపత్రాన్ని పూరించండి.',
    actionLabel: 'Go to Find Help / Questionnaire',
    actionLabelTe: 'ప్రశ్నాపత్రానికి వెళ్లండి',
    actionPath: '/questionnaire',
  },
  {
    id: 'q2',
    text: 'What documents do I need?',
    textTe: 'నాకు ఏ పత్రాలు అవసరం?',
    response: 'Standard documents required across schemes include Aadhaar Card, Income Certificate, Caste/Category Certificate, Bank Passbook, and Passport Photos. Each benefit page on SevaPath includes a dedicated Document Checklist.',
    responseTe: 'సాధారణంగా అవసరమైన పత్రాలు: ఆధార్ కార్డ్, ఆదాయ ప్రమాణపత్రం, కుల ధృవీకరణ పత్రం మరియు బ్యాంక్ పాస్‌బుక్. SevaPath లో ప్రతి ప్రయోజనానికి డాక్యుమెంట్ చెక్‌లిస్ట్ ఉంటుంది.',
    actionLabel: 'Browse Benefits & Documents',
    actionLabelTe: 'ప్రయోజనాలు & పత్రాలు చూడండి',
    actionPath: '/find',
  },
  {
    id: 'q3',
    text: 'How do I apply for this benefit?',
    textTe: 'ఈ ప్రయోజనం కోసం నేను ఎలా దరఖాస్తు చేయాలి?',
    response: 'The SevaPath application journey works in 4 simple steps:\n1. Discover matched schemes\n2. Prepare and mark required documents as ready\n3. Click "Continue to application" to launch the official government portal\n4. Track your milestones in My Applications.',
    responseTe: 'SevaPath దరఖాస్తు ప్రయాణంలో 4 సరళమైన దశలు ఉన్నాయి:\n1. సరిపోలిన పథకాలను కనుగొనండి\n2. పత్రాలను సిద్ధం చేయండి\n3. అధికారిక దరఖాస్తును తెరవండి\n4. పురోగతిని ట్రాక్ చేయండి.',
    actionLabel: 'Explore Application Journey',
    actionLabelTe: 'దరఖాస్తు ప్రయాణాన్ని చూడండి',
    actionPath: '/find',
  },
  {
    id: 'q4',
    text: 'Explain this government form',
    textTe: 'ఈ ప్రభుత్వ ఫారమ్‌ను వివరించండి',
    response: 'Government forms often use complicated official wording. The SevaPath Form Explainer breaks down official form questions into plain language with tips on what to enter and where to find documents.',
    responseTe: 'ప్రభుత్వ ఫారమ్‌లు సంక్లిష్టమైన పదిపదాలను ఉపయోగిస్తాయి. SevaPath ఫారమ్ ఎక్స్‌ప్లెయినర్ వాటిని సాధారణ భాషలోకి మారుస్తుంది.',
    actionLabel: 'Open Form Explainer',
    actionLabelTe: 'ఫారమ్ ఎక్స్‌ప్లెయినర్ తెరవండి',
    actionPath: '/form-explainer',
  },
  {
    id: 'q5',
    text: 'Where can I apply?',
    textTe: 'నేను ఎక్కడ దరఖాస్తు చేసుకోవచ్చు?',
    response: 'SevaPath guides you directly to official, authoritative government portals (such as National Scholarship Portal at scholarships.gov.in). Clicking "Continue to application" opens the official portal in a new tab while keeping SevaPath open for tracking.',
    responseTe: 'SevaPath ప్రతి ప్రయోజనం కోసం మిమ్మల్ని నేరుగా అధికారిక ప్రభుత్వ పోర్టల్‌కు అనుసంధానిస్తుంది (ఉదా. scholarships.gov.in).',
    actionLabel: 'View Official Applications',
    actionLabelTe: 'అధికారిక దరఖాస్తులు చూడండి',
    actionPath: '/applications',
  },
  {
    id: 'q6',
    text: 'What should I do after applying?',
    textTe: 'దరఖాస్తు చేసిన తర్వాత నేను ఏమి చేయాలి?',
    response: 'After applying on the official portal, return to SevaPath My Applications to manage your milestone steps: Submitted -> Verification -> Decision. SevaPath helps you track progress locally on your device.',
    responseTe: 'అధికారిక పోర్టల్‌లో దరఖాస్తు చేసిన తర్వాత, SevaPath My Applications కు తిరిగి రండి. మీరు సమర్పణ, ధృవీకరణ మరియు నిర్ణయాల పురోగతిని ట్రాక్ చేయవచ్చు.',
    actionLabel: 'Go to My Applications',
    actionLabelTe: 'నా దరఖాస్తులకు వెళ్లండి',
    actionPath: '/applications',
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLabel?: string;
  actionPath?: string;
}

export default function AskSevaPath() {
  const { language, helpMapResults, applications } = useApp();
  const navigate = useNavigate();
  const te = language === 'te';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: te
        ? 'నమస్తే! మీకు దేనితో సహాయం కావాలి?'
        : 'Hi! What do you need help with?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSelectQuestion = (q: QuestionOption) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: te ? q.textTe : q.text,
    };

    const botMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      sender: 'assistant',
      text: te ? q.responseTe : q.response,
      actionLabel: te ? q.actionLabelTe : q.actionLabel,
      actionPath: q.actionPath,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const query = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    // Keyword matching logic against project capabilities
    const qLower = query.toLowerCase();
    let matchedOption: QuestionOption = SUGGESTED_QUESTIONS[0];

    if (qLower.includes('doc') || qLower.includes('paper') || qLower.includes('certificate') || qLower.includes('aadhaar')) {
      matchedOption = SUGGESTED_QUESTIONS[1];
    } else if (qLower.includes('apply') || qLower.includes('how') || qLower.includes('process')) {
      matchedOption = SUGGESTED_QUESTIONS[2];
    } else if (qLower.includes('form') || qLower.includes('explain') || qLower.includes('mean')) {
      matchedOption = SUGGESTED_QUESTIONS[3];
    } else if (qLower.includes('where') || qLower.includes('link') || qLower.includes('site') || qLower.includes('portal')) {
      matchedOption = SUGGESTED_QUESTIONS[4];
    } else if (qLower.includes('after') || qLower.includes('track') || qLower.includes('status') || qLower.includes('verify')) {
      matchedOption = SUGGESTED_QUESTIONS[5];
    }

    const botMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      sender: 'assistant',
      text: te ? matchedOption.responseTe : matchedOption.response,
      actionLabel: te ? matchedOption.actionLabelTe : matchedOption.actionLabel,
      actionPath: matchedOption.actionPath,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#173B5F] to-[#16856A] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs md:text-sm font-extrabold border border-white/20"
        aria-label="Ask SevaPath Assistant"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
          <Sparkles size={14} className="text-[#D99A24]" />
        </div>
        <span>{te ? 'సేవాపాత్‌ను అడగండి' : 'Ask SevaPath'}</span>
      </button>

      {/* Floating Panel / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-[#E2E6EA] flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#173B5F] to-[#16856A] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Sparkles size={16} className="text-[#1EB993]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight">
                  {te ? 'సేవాపాత్ అసిస్టెంట్' : 'SevaPath Assistant'}
                </h3>
                <span className="block text-[10px] text-white/75">
                  {te ? 'లభ్యమయ్యే సమాచారం ఆధారంగా సహాయం' : 'Guidance based on SevaPath data'}
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

          {/* Safety badge */}
          <div className="px-3 py-1.5 bg-[#F8FAFC] border-b border-[#E2E6EA] flex items-center justify-between text-[10px] text-[#66727E]">
            <span className="flex items-center gap-1 font-semibold text-[#173B5F]">
              <ShieldCheck size={12} className="text-[#16856A]" />
              {te ? 'సేవాపాత్ సమాచార ఆధారిత సహాయకుడు' : 'Official SevaPath Guidance'}
            </span>
            <span>v1.0</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8FAFC]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#173B5F] text-white rounded-br-xs font-medium'
                      : 'bg-white text-[#17212B] border border-[#E2E6EA] shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.actionPath && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(m.actionPath!);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16856A] hover:bg-[#126d57] text-white text-[11px] font-bold shadow-xs transition-all"
                    >
                      <span>{m.actionLabel}</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Suggested Questions Grid (Show if few messages or at top) */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-[#66727E] uppercase tracking-wider block mb-2 px-1">
                {te ? 'సూచించిన ప్రశ్నలు:' : 'Suggested questions:'}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#EAF2F8] border border-[#E2E6EA] hover:border-[#173B5F]/30 text-left text-xs font-semibold text-[#173B5F] transition-all flex items-center justify-between group shadow-xs"
                  >
                    <span className="line-clamp-1">{te ? q.textTe : q.text}</span>
                    <ArrowRight size={13} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#16856A] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-[#E2E6EA] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={te ? 'ప్రశ్నను టైప్ చేయండి...' : 'Ask a question about benefits or documents...'}
              className="flex-1 px-3.5 py-2 bg-[#F8FAFC] border border-[#E2E6EA] rounded-xl text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#173B5F]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-9 h-9 rounded-xl bg-[#173B5F] hover:bg-[#122e4b] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
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
