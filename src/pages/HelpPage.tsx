// ============================================================
// SevaPath — Help, Guides & Civic Glossary (/help)
// Step-by-step verified civic walkthroughs and printable checklist
// ============================================================

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  HelpCircle, FileText, CheckSquare, Printer,
  BookOpen, ChevronDown, ChevronUp, ExternalLink,
  ShieldCheck, Phone, MapPin, Building2, Search
} from 'lucide-react';

interface CivicGuide {
  id: string;
  title: string;
  titleTe: string;
  titleHi: string;
  summary: string;
  summaryTe: string;
  summaryHi: string;
  lastVerified: string;
  officialPortal: string;
  steps: { step: number; title: string; titleTe: string; titleHi: string; detail: string; detailTe: string; detailHi: string }[];
}

const CIVIC_GUIDES: CivicGuide[] = [
  {
    id: 'income-certificate',
    title: 'How to Obtain an Income Certificate',
    titleTe: 'ఆదాయ ధృవీకరణ పత్రం ఎలా పొందాలి',
    titleHi: 'आय प्रमाण पत्र कैसे प्राप्त करें',
    summary: 'Standard state revenue procedure for getting Tahsildar-attested family income verification.',
    summaryTe: 'కుటుంబ ఆదాయ ధృవీకరణ కోసం తహసీల్దార్ ద్వారా జారీ చేయబడే రెవెన్యూ విధానం.',
    summaryHi: 'तहसीलदार द्वारा प्रमाणित पारिवारिक आय सत्यापन प्राप्त करने की मानक राजस्व प्रक्रिया।',
    lastVerified: '2025-10-01',
    officialPortal: 'https://onlineap.meeseva.gov.in',
    steps: [
      {
        step: 1,
        title: 'Gather Baseline Proofs',
        titleTe: 'ప్రాథమిక ఆధారాలను సిద్ధం చేసుకోండి',
        titleHi: 'बुनियादी दस्तावेज एकत्र करें',
        detail: 'Prepare applicant Aadhaar, Ration Card / Rice Card, and salary slip or self-declaration affidavit.',
        detailTe: 'దరఖాస్తుదారు ఆధార్, రేషన్ కార్డు మరియు జీతం స్లిప్ లేదా స్వీయ డిక్లరేషన్ అఫిడవిట్ సిద్ధం చేయండి.',
        detailHi: 'आवेदक आधार, राशन कार्ड और वेतन पर्ची या स्व-घोषणा शपथ पत्र तैयार करें।'
      },
      {
        step: 2,
        title: 'Apply via Citizen Seva Kendra / MeeSeva',
        titleTe: 'మీసేవ / పౌర సేవా కేంద్రంలో దరఖాస్తు చేయండి',
        titleHi: 'नागरिक सेवा केंद्र / मीसेवा के माध्यम से आवेदन करें',
        detail: 'Visit nearest MeeSeva or state online citizen portal (e.g., onlineap.meeseva.gov.in or ts.meeseva.telangana.gov.in).',
        detailTe: 'సమీపంలోని మీసేవ లేదా ఆన్‌లైన్ పోర్టల్‌ను సందర్శించి ఫారమ్ నింపండి.',
        detailHi: 'निकटतम सीएससी या राज्य पोर्टल पर जाकर आवेदन पत्र जमा करें।'
      },
      {
        step: 3,
        title: 'Village Revenue Officer (VRO) Enquiry',
        titleTe: 'గ్రామ రెవెన్యూ అధికారి (VRO) విచారణ',
        titleHi: 'ग्राम राजस्व अधिकारी (VRO) जांच',
        detail: 'Local VRO / Revenue Inspector conducts field verification and submits report to Tahsildar within 7–15 working days.',
        detailTe: 'క్షేత్ర విచారణ పూర్తయిన తర్వాత తహసీల్దార్‌కు నివేదిక సమర్పించబడుతుంది (7–15 రోజులు).',
        detailHi: 'स्थानीय राजस्व निरीक्षक सत्यापन करता है और 7-15 दिनों में रिपोर्ट भेजता है।'
      },
      {
        step: 4,
        title: 'Download Digitally Signed Certificate',
        titleTe: 'డిజిటల్ సంతకం చేసిన పత్రాన్ని డౌన్‌లోడ్ చేయండి',
        titleHi: 'डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें',
        detail: 'Download the approved certificate containing official government QR code and digital signature.',
        detailTe: 'అధికారిక QR కోడ్ మరియు డిజిటల్ సంతకం కలిగిన పత్రాన్ని పోర్టల్ నుండి డౌన్‌లోడ్ చేయండి.',
        detailHi: 'आधिकारिक क्यूआर कोड युक्त प्रमाणित प्रमाण पत्र पोर्टल से डाउनलोड करें।'
      }
    ]
  },
  {
    id: 'nsp-application',
    title: 'Applying on National Scholarship Portal (NSP)',
    titleTe: 'జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP) లో దరఖాస్తు చేయడం',
    titleHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर आवेदन प्रक्रिया',
    summary: 'Centralized government scholarship application flow for pre-matric, post-matric, and higher education.',
    summaryTe: 'కేంద్ర ప్రభుత్వ స్కాలర్‌షిప్‌ల కోసం వన్-టైమ్ రిజిస్ట్రేషన్ మరియు దరఖాస్తు ప్రక్రియ.',
    summaryHi: 'मैट्रिक-पूर्व, मैट्रिक के बाद और उच्च शिक्षा के लिए केंद्रीकृत सरकारी छात्रवृत्ति आवेदन।',
    lastVerified: '2025-10-01',
    officialPortal: 'https://scholarships.gov.in',
    steps: [
      {
        step: 1,
        title: 'Complete One-Time Registration (OTR)',
        titleTe: 'వన్-టైమ్ రిజిస్ట్రేషన్ (OTR) పూర్తి చేయండి',
        titleHi: 'वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें',
        detail: 'Generate reference number on scholarships.gov.in using Aadhaar eKYC and linked mobile number.',
        detailTe: 'ఆధార్ eKYC మరియు లింక్ చేయబడిన మొబైల్ నంబర్‌తో scholarships.gov.in లో రిజిస్ట్రేషన్ చేయండి.',
        detailHi: 'आधार eKYC का उपयोग करके scholarships.gov.in पर OTR नंबर बनाएं।'
      },
      {
        step: 2,
        title: 'Fill Academic & Scheme Form',
        titleTe: 'విద్యా మరియు పథక వివరాలను నింపండి',
        titleHi: 'शैक्षणिक और योजना विवरण भरें',
        detail: 'Select your institution using AISHE/DISE code. Ensure course and roll number exactly match college records.',
        detailTe: 'కళాశాల రికార్డులతో సరిపోయేలా మీ కోర్సు మరియు రోల్ నంబర్‌ను ఎంచుకోండి.',
        detailHi: 'संस्थान कोड का चयन करें और अपने कॉलेज रिकॉर्ड के अनुसार विवरण भरें।'
      },
      {
        step: 3,
        title: 'Upload Verification Documents',
        titleTe: 'ధృవీకరణ పత్రాలను అప్‌లోడ్ చేయండి',
        titleHi: 'सत्यापन दस्तावेज अपलोड करें',
        detail: 'Upload scanned income certificate, previous year marksheet, and bonafide student slip.',
        detailTe: 'ఆదాయ పత్రం, మునుపటి మార్కుల పత్రం మరియు బోనాఫైడ్ సర్టిఫికెట్ అప్‌లోడ్ చేయండి.',
        detailHi: 'आय प्रमाण पत्र, पिछली अंकतालिका और बोनाफाइड पर्ची अपलोड करें।'
      },
      {
        step: 4,
        title: 'Submit & Track Institute Verification',
        titleTe: 'సమర్పించి సంస్థాగత ధృవీకరణను ట్రాక్ చేయండి',
        titleHi: 'जमा करें और संस्थान सत्यापन ट्रैक करें',
        detail: 'Submit online. Provide printed acknowledgement to your college nodal officer for institutional sign-off.',
        detailTe: 'ఆన్‌లైన్‌లో సమర్పించి, రసీదును మీ కళాశాల నోడల్ అధికారికి అందజేయండి.',
        detailHi: 'ऑनलाइन सबमिट करें और कॉलेज के नोडल अधिकारी से संपर्क करें।'
      }
    ]
  },
  {
    id: 'reading-forms',
    title: 'How to Read an Official Application Form',
    titleTe: 'అధికారిక దరఖాస్తు ఫారమ్‌ను ఎలా చదవాలి',
    titleHi: 'सरकारी आवेदन पत्र को सही तरीके से कैसे समझें',
    summary: 'De-mystifying government terminology, asterisk marks, and mandatory proofs.',
    summaryTe: 'ప్రభుత్వ పారిభాషిక పదాలు, తప్పనిసరి ఫీల్డ్‌లు మరియు సాధారణ తప్పులను నివారించే మార్గదర్శకాలు.',
    summaryHi: 'सरकारी शब्दावली, अनिवार्य फ़ील्ड और सामान्य गलतियों से बचने की गाइड।',
    lastVerified: '2025-10-01',
    officialPortal: 'https://scholarships.gov.in',
    steps: [
      {
        step: 1,
        title: 'Check Name Spelling against Aadhaar',
        titleTe: 'ఆధార్ కార్డుతో పేరు సరిపోల్చండి',
        titleHi: 'आधार से नाम की वर्तनी जांचें',
        detail: 'Official portals compare names character-by-character with UIDAI. Even minor initials variations can delay DBT approval.',
        detailTe: 'పేరులోని అక్షరాలు ఆధార్ కార్డుతో ఖచ్చితంగా సరిపోలాలి. తేడాలు ఉంటే DBT ప్రక్రియ ఆలస్యమవుతుంది.',
        detailHi: 'नाम के अक्षर आधार से पूर्ण रूप से मेल खाने चाहिए ताकि डीबीटी में बाधा न आए।'
      },
      {
        step: 2,
        title: 'Verify Bank Account Seeded with NPCI',
        titleTe: 'బ్యాంక్ ఖాతా NPCI మ్యాపింగ్ తనిఖీ చేయండి',
        titleHi: 'बैंक खाते की NPCI सीडिंग जांचें',
        detail: 'Direct Benefit Transfer (DBT) requires your savings bank account to be actively Aadhaar-seeded via NPCI mapper.',
        detailTe: 'ప్రభుత్వ నగదు బదిలీ నేరుగా NPCI లింక్ అయిన బ్యాంక్ ఖాతాకు మాత్రమే జమ అవుతుంది.',
        detailHi: 'सरकारी सहायता सीधे NPCI से जुड़े आधार लिंक्ड बैंक खाते में भेजी जाती है।'
      },
      {
        step: 3,
        title: 'Review Validity Date of Income / Caste Proof',
        titleTe: 'ఆదాయ/కులా పత్రాల గడువు తేదీని పరిశీలించండి',
        titleHi: 'आय व जाति प्रमाण पत्र की वैधता जांचें',
        detail: 'Most state income certificates are valid for 1 fiscal year. Ensure the certificate has not expired.',
        detailTe: 'ఆదాయ ధృవీకరణ పత్రాలు సాధారణంగా ఒక ఆర్థిక సంవత్సరానికి మాత్రమే చెల్లుబాటు అవుతాయి.',
        detailHi: 'अधिकांश राज्यों में आय प्रमाण पत्र 1 वित्तीय वर्ष के लिए वैध होता है।'
      }
    ]
  },
  {
    id: 'find-csc',
    title: 'Locating Your Nearest Common Service Centre (CSC)',
    titleTe: 'మీ సమీప కామన్ సర్వీస్ సెంటర్ (CSC) ను కనుగొనడం',
    titleHi: 'निकटतम कॉमन सर्विस सेंटर (CSC) खोजें',
    summary: 'Find authorized village and municipal kiosks for digital assistance with biometric devices.',
    summaryTe: 'బయోమెట్రిక్ పరికరాలతో డిజిటల్ సేవల కోసం అధికారిక ప్రభుత్వ కియోస్క్‌లను కనుగొనండి.',
    summaryHi: 'बायोमेट्रिक उपकरणों के साथ डिजिटल सहायता हेतु अधिकृत सरकारी कियोस्क खोजें।',
    lastVerified: '2025-10-01',
    officialPortal: 'https://locator.csccloud.in',
    steps: [
      {
        step: 1,
        title: 'Open Official CSC Locator',
        titleTe: 'అధికారిక CSC లొకేటర్ పోర్టల్ తెరవండి',
        titleHi: 'आधिकारिक सीएससी लोकेटर खोलें',
        detail: 'Navigate to https://locator.csccloud.in on mobile or desktop.',
        detailTe: 'https://locator.csccloud.in పోర్టల్‌ను తెరవండి.',
        detailHi: 'https://locator.csccloud.in पोर्टल पर जाएं।'
      },
      {
        step: 2,
        title: 'Select State, District and Block',
        titleTe: 'రాష్ట్రం, జిల్లా మరియు మండలాన్ని ఎంచుకోండి',
        titleHi: 'राज्य, जिला और ब्लॉक का चयन करें',
        detail: 'Filter by your PIN code or Gram Panchayat to find authorized VLE (Village Level Entrepreneur) contact and address.',
        detailTe: 'మీ పిన్ కోడ్ లేదా పంచాయతీ ద్వారా శోధించి నమోదైన కేంద్రం వివరాలు పొందండి.',
        detailHi: 'अपने पिन कोड या ग्राम पंचायत द्वारा खोजें।'
      }
    ]
  }
];

const CIVIC_GLOSSARY = [
  { term: 'DBT', expansion: 'Direct Benefit Transfer', desc: 'Government system transferring welfare money directly to a citizen\'s Aadhaar-linked bank account without middlemen.' },
  { term: 'NPCI Seeding', expansion: 'National Payments Corporation of India Bank Mapping', desc: 'Linking your bank account number with your Aadhaar inside the national payments switch to receive government subsidies.' },
  { term: 'AISHE Code', expansion: 'All India Survey on Higher Education Code', desc: 'A unique identifier assigned to colleges and universities, required during scholarship applications.' },
  { term: 'OTR', expansion: 'One-Time Registration', desc: 'A permanent digital profile on central scholarship or exam portals eliminating redundant document uploads.' },
  { term: 'MeeSeva / e-Seva', expansion: 'Citizen Services Portal (AP & Telangana)', desc: 'Official single-window portal delivering revenue certificates, land extracts, and utility services.' },
  { term: 'RoR 1-B', expansion: 'Record of Rights Form 1-B', desc: 'Official revenue document showing agricultural land ownership details, survey numbers, and extents.' }
];

const OFFICIAL_HELPLINES = [
  { service: 'National Scholarship Portal (NSP)', number: '0120-6619540', hours: '24/7 (Mon-Sun)', portal: 'https://scholarships.gov.in' },
  { service: 'PM-KISAN Helpline', number: '155261 / 011-24300606', hours: '10:00 AM – 5:00 PM (Working days)', portal: 'https://pmkisan.gov.in' },
  { service: 'Ayushman Bharat PM-JAY Call Centre', number: '14555', hours: 'Toll-free 24/7', portal: 'https://pmjay.gov.in' },
  { service: 'National Career Service (NCS)', number: '1800-425-1514', hours: '8:00 AM – 8:00 PM (Tue-Sun)', portal: 'https://www.ncs.gov.in' },
  { service: 'MeeSeva Citizen Helpline (AP)', number: '1100', hours: 'Toll-free (AP Citizens)', portal: 'https://onlineap.meeseva.gov.in' }
];

const CHECKLIST_ITEMS = [
  'Aadhaar Card (linked to current mobile number)',
  'Active Bank Account Passbook (with IFSC and NPCI seeding)',
  'Income Certificate issued within current financial year',
  'Caste / Community Certificate (if applying under SC/ST/OBC/EWS category)',
  'Recent Passport-size Photographs (clean white background)',
  'Previous Academic Marksheets & Bonafide Certificate (for students)',
  'Ration Card / Rice Card (for family welfare & food security schemes)',
  'Land Title Passbook / 1-B Record (for agricultural income support)'
];

export default function HelpPage() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'guides' | 'faq' | 'glossary' | 'checklist' | 'helplines'>('guides');
  const [expandedGuide, setExpandedGuide] = useState<string | null>('income-certificate');

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[85vh] pb-24 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85F45]/10 text-[#B85F45] text-xs font-bold mb-3">
            <HelpCircle size={14} />
            <span>{isTe ? 'పౌర సహాయ కేంద్రం' : isHi ? 'नागरिक सहायता केंद्र' : 'Civic Assistance Center'}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#151719] mb-2">
            {isTe ? 'సహాయం, మార్గదర్శకాలు & తరచుగా అడిగే ప్రశ్నలు' : isHi ? 'सहायता, मार्गदर्शिकाएं और अक्सर पूछे जाने वाले प्रश्न' : 'Help, Civic Guides & FAQs'}
          </h1>
          <p className="text-sm md:text-base text-[#728477] max-w-2xl font-medium">
            {isTe
              ? 'ప్రభుత్వ ప్రక్రియలను సులభంగా అర్థం చేసుకోండి. సర్టిఫికెట్లు పొందడం, స్కాలర్‌షిప్‌లకు దరఖాస్తు చేయడం మరియు అధికారిక నిబంధనలను పరిశీలించండి.'
              : isHi
              ? 'सरकारी प्रक्रियाओं को आसानी से समझें। प्रमाण पत्र प्राप्त करने और छात्रवृत्ति के लिए चरण-दर-चरण मार्गदर्शिका।'
              : 'Plain-language walkthroughs for official government procedures, key civic terminology, verified helplines, and printable checklists.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-[#D8CDBB]">
          {[
            { id: 'guides', label: isTe ? 'దశలవారీ గైడ్లు' : isHi ? 'चरणबद्ध गाइड' : 'Step-by-Step Guides', icon: <BookOpen size={16} /> },
            { id: 'checklist', label: isTe ? 'పత్రాల జాబితా (ప్రింట్)' : isHi ? 'चेकलिस्ट (प्रिंट)' : 'Printable Checklist', icon: <CheckSquare size={16} /> },
            { id: 'glossary', label: isTe ? 'పదకోశం' : isHi ? 'शब्दावली' : 'Civic Glossary', icon: <FileText size={16} /> },
            { id: 'helplines', label: isTe ? 'హెల్ప్‌లైన్లు' : isHi ? 'हेल्पलाइन' : 'Official Helplines', icon: <Phone size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#151719] text-white shadow-sm'
                  : 'bg-[#F1EDE4] text-[#728477] hover:bg-[#D8CDBB] hover:text-[#151719]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Step-by-Step Guides */}
        {activeTab === 'guides' && (
          <div className="space-y-4 animate-fade-in">
            {CIVIC_GUIDES.map((g) => {
              const isOpen = expandedGuide === g.id;
              const title = isTe ? g.titleTe : isHi ? g.titleHi : g.title;
              const summary = isTe ? g.summaryTe : isHi ? g.summaryHi : g.summary;

              return (
                <div
                  key={g.id}
                  className="rounded-3xl border border-[#D8CDBB] bg-[#FAF8F3] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setExpandedGuide(isOpen ? null : g.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#F1EDE4]/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#B85F45]/10 text-[#B85F45] text-[10px] font-extrabold uppercase">
                          Verified Procedure
                        </span>
                        <span className="text-[11px] text-[#728477] font-semibold">
                          Verified: {g.lastVerified}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-[#151719] mb-1">
                        {title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#728477]">
                        {summary}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-[#D8CDBB] text-[#151719] shrink-0 mt-1">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#D8CDBB] p-5 sm:p-6 bg-white space-y-6 animate-fade-in">
                      <div className="grid gap-4">
                        {g.steps.map((st) => (
                          <div key={st.step} className="flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-full bg-[#151719] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                              {st.step}
                            </span>
                            <div>
                              <h3 className="text-sm font-bold text-[#151719] mb-1">
                                {isTe ? st.titleTe : isHi ? st.titleHi : st.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-[#3B3F4A] leading-relaxed">
                                {isTe ? st.detailTe : isHi ? st.detailHi : st.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between flex-wrap gap-3">
                        <a
                          href={g.officialPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B85F45] text-white text-xs font-bold hover:bg-[#a05038] transition-all"
                        >
                          <ExternalLink size={14} />
                          <span>{isTe ? 'అధికారిక పోర్టల్ తెరవండి' : isHi ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                        </a>
                        <span className="text-[11px] text-[#728477]">
                          Informational walkthrough • Subject to state rules
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Printable Checklist */}
        {activeTab === 'checklist' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#151719]">
                  {isTe ? 'పౌర పత్రాల చెక్‌లిస్ట్' : isHi ? 'नागरिक दस्तावेज चेकलिस्ट' : 'Universal Civic Document Checklist'}
                </h2>
                <p className="text-xs text-[#728477]">
                  Keep physical and digital copies ready before applying for any government scheme.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#151719] text-white text-xs font-bold hover:bg-[#30364F] transition-all shadow-sm"
              >
                <Printer size={15} />
                <span>{isTe ? 'ప్రింట్ చేయండి / సేవ్ చేయండి' : isHi ? 'प्रिंट करें / सेव करें' : 'Print Checklist'}</span>
              </button>
            </div>

            {/* Printable Container */}
            <div id="printable-checklist" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8CDBB] shadow-sm space-y-4">
              <div className="border-b border-[#E8E3DA] pb-4 mb-4">
                <span className="text-[11px] font-bold text-[#B85F45] uppercase tracking-wider block mb-1">
                  SevaPath Civic Readiness
                </span>
                <h3 className="text-xl font-black text-[#151719]">
                  Pre-Application Document Verification Sheet
                </h3>
                <p className="text-xs text-[#728477] mt-1">
                  Ensure all records match spelling in your primary identification (Aadhaar).
                </p>
              </div>

              <div className="grid gap-3">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-[#E8E3DA] hover:bg-[#F1EDE4]/40 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-0.5 rounded text-[#B85F45] focus:ring-[#B85F45]"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[#151719] leading-snug">
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E3DA] text-[11px] text-[#728477] flex items-center justify-between">
                <span>Verified against official ministry guidelines (2025).</span>
                <span>https://aishwaryapenmetsa.github.io/seva-path/</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Civic Glossary */}
        {activeTab === 'glossary' && (
          <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
            {CIVIC_GLOSSARY.map((g) => (
              <div
                key={g.term}
                className="p-5 rounded-3xl bg-white border border-[#D8CDBB] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-[#B85F45] uppercase tracking-wider block mb-1">
                    {g.term}
                  </span>
                  <h3 className="text-sm font-bold text-[#151719] mb-2">
                    {g.expansion}
                  </h3>
                  <p className="text-xs text-[#728477] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Official Helplines */}
        {activeTab === 'helplines' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-4 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB] text-xs text-[#3B3F4A] mb-4">
              <span className="font-bold block mb-1">Official Government Support Channels:</span>
              <span>All helplines below are direct telephone numbers verified from central and state department portals. Standard call rates may apply where toll-free is not specified.</span>
            </div>

            <div className="grid gap-3">
              {OFFICIAL_HELPLINES.map((h, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8CDBB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[#151719]">{h.service}</h3>
                    <p className="text-xs text-[#728477] mt-0.5">Hours: {h.hours}</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <a
                      href={`tel:${h.number.split('/')[0].trim()}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1EDE4] text-[#151719] font-mono text-xs font-bold hover:bg-[#D8CDBB] transition-colors"
                    >
                      <Phone size={12} className="text-[#B85F45]" />
                      <span>{h.number}</span>
                    </a>
                    <a
                      href={h.portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#D8CDBB] text-[#728477] hover:text-[#151719] text-xs font-semibold"
                    >
                      <span>Portal</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
