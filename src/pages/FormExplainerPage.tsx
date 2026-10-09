// ============================================================
// SevaPath — Form Guides Page
// Replaces fake upload with curated form guides library
// ============================================================

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  FileText, Info, AlertTriangle,
  ChevronDown, ChevronUp, CheckCircle2,
  HelpCircle, Sparkles, BookOpen
} from 'lucide-react';

// ── Form Guides Data ─────────────────────────────────────────
interface FormField {
  id: string;
  governmentWording: string;
  governmentWordingTe: string;
  whatItMeans: string;
  whatItMeansTe: string;
  whatToEnter: string;
  whatToEnterTe: string;
  whereToFind: string;
  whereToFindTe: string;
  warning?: string;
  warningTe?: string;
}

interface FormGuide {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  context: string;
  contextTe: string;
  fields: FormField[];
}

const FORM_GUIDES: FormGuide[] = [
  {
    id: 'income-certificate',
    title: 'Income Certificate Application',
    titleTe: 'ఆదాయ ధృవీకరణ పత్రం దరఖాస్తు',
    description: 'General guidance on filling the income certificate application form at MeeSeva / Tahsildar office.',
    descriptionTe: 'MeeSeva / తహసీల్దార్ కార్యాలయంలో ఆదాయ ధృవీకరణ పత్రం దరఖాస్తు ఫారమ్ నింపడానికి సాధారణ మార్గదర్శకత.',
    context: 'Required for most government scholarships and benefits. Issued by the Tahsildar.',
    contextTe: 'చాలా ప్రభుత్వ స్కాలర్‌షిప్‌లు మరియు ప్రయోజనాల కోసం అవసరం. తహసీల్దార్ జారీ చేస్తారు.',
    fields: [
      {
        id: 'inc-1',
        governmentWording: 'Annual Family Income (in Rupees)',
        governmentWordingTe: 'వార్షిక కుటుంబ ఆదాయం (రూపాయలలో)',
        whatItMeans: 'The combined total income earned by all earning members of your household in one year.',
        whatItMeansTe: 'ఒక సంవత్సరంలో మీ కుటుంబంలో అన్ని సంపాదించే సభ్యుల మొత్తం ఆదాయం.',
        whatToEnter: 'Write the sum of income from all sources: salary, agriculture, business, pension, etc. Round off to nearest rupee.',
        whatToEnterTe: 'అన్ని వనరుల నుండి ఆదాయం యొక్క మొత్తం రాయండి: జీతం, వ్యవసాయం, వ్యాపారం, పెన్షన్, మొదలైనవి. సమీపంలోని రూపాయికి గుండ్రంగా చేయండి.',
        whereToFind: 'Salary certificate from employer, bank statements, Form 16, or self-declaration for agricultural income.',
        whereToFindTe: 'యజమాని నుండి వేతన సర్టిఫికేట్, బ్యాంక్ స్టేట్‌మెంట్‌లు, ఫారమ్ 16, లేదా వ్యవసాయ ఆదాయానికి స్వయం-ప్రకటన.',
        warning: 'Write the correct annual (not monthly) figure. Incorrect income may make you ineligible.',
        warningTe: 'సరైన వార్షిక (నెలవారీ కాదు) మొత్తం రాయండి. తప్పుడు ఆదాయం మిమ్మల్ని అర్హత లేకుండా చేయవచ్చు.',
      },
      {
        id: 'inc-2',
        governmentWording: 'Name of Applicant (as per Aadhaar)',
        governmentWordingTe: 'దరఖాస్తుదారు పేరు (ఆధార్ ప్రకారం)',
        whatItMeans: 'Your full legal name exactly as printed on your Aadhaar card.',
        whatItMeansTe: 'మీ ఆధార్ కార్డులో ముద్రించిన విధంగా మీ పూర్తి చట్టపరమైన పేరు.',
        whatToEnter: 'Copy your name exactly from Aadhaar — including initials, father\'s name prefix, and spelling. No nicknames.',
        whatToEnterTe: 'ఆధార్ నుండి మీ పేరును అక్షరాలా కాపీ చేయండి — ఆద్యక్షరాలు, తండ్రి పేరు ఉపసర్గ మరియు స్పెల్లింగ్‌తో సహా.',
        whereToFind: 'Your Aadhaar card or the Aadhaar PDF downloaded from uidai.gov.in.',
        whereToFindTe: 'మీ ఆధార్ కార్డు లేదా uidai.gov.in నుండి డౌన్‌లోడ్ చేయబడిన ఆధార్ PDF.',
      },
      {
        id: 'inc-3',
        governmentWording: 'Residential Address (Permanent)',
        governmentWordingTe: 'నివాస చిరునామా (శాశ్వత)',
        whatItMeans: 'The address where you permanently reside, as recorded in official documents.',
        whatItMeansTe: 'అధికారిక పత్రాలలో నమోదు చేయబడిన, మీరు శాశ్వతంగా నివసించే చిరునామా.',
        whatToEnter: 'Full address: house number, street, village/locality, mandal/taluk, district, state, PIN code.',
        whatToEnterTe: 'పూర్తి చిరునామా: ఇంటి నంబర్, వీధి, గ్రామం/ప్రాంతం, మండలం, జిల్లా, రాష్ట్రం, PIN కోడ్.',
        whereToFind: 'Aadhaar card, ration card, or voter ID.',
        whereToFindTe: 'ఆధార్ కార్డు, రేషన్ కార్డు, లేదా ఓటర్ ID.',
      },
    ],
  },
  {
    id: 'category-certificate',
    title: 'Category / Caste Certificate Application',
    titleTe: 'కేటగిరీ / కుల ధృవీకరణ పత్రం దరఖాస్తు',
    description: 'Guidance for filling the caste/category certificate application — SC/ST/BC/OBC. Required for reserved category scholarships.',
    descriptionTe: 'కుల/కేటగిరీ ధృవీకరణ పత్రం దరఖాస్తు పూరించడానికి మార్గదర్శకత — SC/ST/BC/OBC. రిజర్వు వర్గ స్కాలర్‌షిప్‌లకు అవసరం.',
    context: 'This certificate confirms your social category for government scheme benefits. Issued by the Tahsildar.',
    contextTe: 'ఈ సర్టిఫికేట్ ప్రభుత్వ పథక ప్రయోజనాల కోసం మీ సామాజిక వర్గాన్ని నిర్ధారిస్తుంది. తహసీల్దార్ జారీ చేస్తారు.',
    fields: [
      {
        id: 'cat-1',
        governmentWording: 'Caste / Community',
        governmentWordingTe: 'కులం / సమాజం',
        whatItMeans: 'Your caste or community name as it appears in official government caste lists.',
        whatItMeansTe: 'అధికారిక ప్రభుత్వ కులం జాబితాలలో కనిపించే విధంగా మీ కులం లేదా సమాజం పేరు.',
        whatToEnter: 'Write the exact caste name from the official list. Do not abbreviate or paraphrase.',
        whatToEnterTe: 'అధికారిక జాబితా నుండి ఖచ్చితమైన కులం పేరు రాయండి. సంక్షేపించవద్దు లేదా మార్చి చెప్పవద్దు.',
        whereToFind: 'Your parents\' caste certificate or school records showing community.',
        whereToFindTe: 'మీ తల్లిదండ్రుల కుల సర్టిఫికేట్ లేదా సమాజాన్ని చూపించే పాఠశాల రికార్డులు.',
        warning: 'Submitting incorrect caste information is a legal offence. Verify carefully before submission.',
        warningTe: 'తప్పుడు కుల సమాచారం సమర్పించడం చట్టపరమైన నేరం. సమర్పణకు ముందు జాగ్రత్తగా ధృవీకరించండి.',
      },
      {
        id: 'cat-2',
        governmentWording: 'Category (SC / ST / BC / OBC / General)',
        governmentWordingTe: 'కేటగిరీ (SC / ST / BC / OBC / జనరల్)',
        whatItMeans: 'The reservation category your caste falls under as per the central or state government list.',
        whatItMeansTe: 'కేంద్ర లేదా రాష్ట్ర ప్రభుత్వ జాబితా ప్రకారం మీ కులం ఏ రిజర్వేషన్ వర్గం కిందకు వస్తుందో.',
        whatToEnter: 'Write SC (Scheduled Caste), ST (Scheduled Tribe), BC (Backward Class), or OBC as applicable.',
        whatToEnterTe: 'వర్తించే విధంగా SC (షెడ్యూల్డ్ కులాలు), ST (షెడ్యూల్డ్ తెగలు), BC (వెనుకబడిన తరగతులు), లేదా OBC రాయండి.',
        whereToFind: 'Central Government notification or state government GO (Government Order) listing your caste.',
        whereToFindTe: 'కేంద్ర ప్రభుత్వ నోటిఫికేషన్ లేదా మీ కులాన్ని జాబితా చేసే రాష్ట్ర ప్రభుత్వ GO.',
      },
    ],
  },
  {
    id: 'scholarship-registration',
    title: 'National Scholarship Portal — Registration Guide',
    titleTe: 'జాతీయ స్కాలర్‌షిప్ పోర్టల్ — నమోదు మార్గదర్శకత',
    description: 'Step-by-step guidance for NSP (scholarships.gov.in) registration and scholarship application form fields.',
    descriptionTe: 'NSP (scholarships.gov.in) నమోదు మరియు స్కాలర్‌షిప్ దరఖాస్తు ఫారమ్ ఫీల్డ్‌లకు దశలవారీ మార్గదర్శకత.',
    context: 'Apply online at scholarships.gov.in. You need Aadhaar, bank account, and institute details.',
    contextTe: 'scholarships.gov.in లో ఆన్‌లైన్‌లో దరఖాస్తు చేయండి. మీకు ఆధార్, బ్యాంక్ ఖాతా మరియు సంస్థ వివరాలు అవసరం.',
    fields: [
      {
        id: 'nsp-1',
        governmentWording: 'Academic Year',
        governmentWordingTe: 'విద్యా సంవత్సరం',
        whatItMeans: 'The year of your current course for which you are applying for scholarship.',
        whatItMeansTe: 'మీరు స్కాలర్‌షిప్ కోసం దరఖాస్తు చేస్తున్న మీ ప్రస్తుత కోర్సు సంవత్సరం.',
        whatToEnter: 'Select the academic year from the dropdown (e.g., 2024–25). Must match your current enrollment year.',
        whatToEnterTe: 'డ్రాప్‌డౌన్ నుండి విద్యా సంవత్సరాన్ని ఎంచుకోండి (ఉదా. 2024–25). మీ ప్రస్తుత నమోదు సంవత్సరంతో సరిపోవాలి.',
        whereToFind: 'Your college admission letter or fee receipt.',
        whereToFindTe: 'మీ కళాశాల ప్రవేశ లేట్టర్ లేదా ఫీజు రశీదు.',
      },
      {
        id: 'nsp-2',
        governmentWording: 'Institute/School Code (DISE / AISHE)',
        governmentWordingTe: 'సంస్థ/పాఠశాల కోడ్ (DISE / AISHE)',
        whatItMeans: 'A unique government code assigned to your school or college in the national education database.',
        whatItMeansTe: 'జాతీయ విద్యా డేటాబేస్‌లో మీ పాఠశాల లేదా కళాశాలకు కేటాయించిన ప్రత్యేక ప్రభుత్వ కోడ్.',
        whatToEnter: 'Enter the DISE code (school) or AISHE code (college) provided by your institution.',
        whatToEnterTe: 'మీ సంస్థ అందించిన DISE కోడ్ (పాఠశాల) లేదా AISHE కోడ్ (కళాశాల) నమోదు చేయండి.',
        whereToFind: 'Ask your school/college office. They will provide this code. It is also available on UDISE+ portal.',
        whereToFindTe: 'మీ పాఠశాల/కళాశాల కార్యాలయాన్ని అడగండి. వారు ఈ కోడ్‌ను అందిస్తారు. UDISE+ పోర్టల్‌లో కూడా అందుబాటులో ఉంది.',
        warning: 'Wrong institute code will cause your application to fail. Confirm with your institution before submission.',
        warningTe: 'తప్పుడు సంస్థ కోడ్ మీ దరఖాస్తు విఫలమవుతుంది. సమర్పణకు ముందు మీ సంస్థతో నిర్ధారించండి.',
      },
      {
        id: 'nsp-3',
        governmentWording: 'Bank Account Number (Beneficiary)',
        governmentWordingTe: 'బ్యాంక్ ఖాతా నంబర్ (లబ్ధిదారు)',
        whatItMeans: 'Your personal bank account number where the scholarship amount will be directly transferred.',
        whatItMeansTe: 'స్కాలర్‌షిప్ మొత్తం నేరుగా బదిలీ చేయబడే మీ వ్యక్తిగత బ్యాంక్ ఖాతా నంబర్.',
        whatToEnter: 'Enter your own bank account number. Must be linked to Aadhaar. Joint accounts are generally not accepted.',
        whatToEnterTe: 'మీ స్వంత బ్యాంక్ ఖాతా నంబర్ నమోదు చేయండి. ఆధార్‌తో అనుసంధానించబడి ఉండాలి. ఉమ్మడి ఖాతాలు సాధారణంగా అంగీకరించబడవు.',
        whereToFind: 'Your bank passbook (first page) or cheque book.',
        whereToFindTe: 'మీ బ్యాంక్ పాస్‌బుక్ (మొదటి పేజీ) లేదా చెక్ బుక్.',
        warning: 'The account must be in YOUR name. Scholarship cannot be sent to a parent or guardian\'s account.',
        warningTe: 'ఖాతా మీ పేరు మీద ఉండాలి. స్కాలర్‌షిప్‌ను తల్లిదండ్రులు లేదా సంరక్షకుని ఖాతాకు పంపడం సాధ్యం కాదు.',
      },
    ],
  },
  {
    id: 'pm-kisan-registration',
    title: 'PM-KISAN Farmer Registration Guide',
    titleTe: 'PM-కిసాన్ రైతు నమోదు మార్గదర్శకత',
    description: 'Guidance for filling the PM-KISAN Samman Nidhi registration form at the local agriculture office or Common Service Centre.',
    descriptionTe: 'స్థానిక వ్యవసాయ కార్యాలయం లేదా కామన్ సర్వీస్ సెంటర్‌లో PM-కిసాన్ సమ్మాన్ నిధి నమోదు ఫారమ్ పూరించడానికి మార్గదర్శకత.',
    context: 'Apply at pmkisan.gov.in or through local agriculture office / CSC centre.',
    contextTe: 'pmkisan.gov.in లేదా స్థానిక వ్యవసాయ కార్యాలయం / CSC కేంద్రం ద్వారా దరఖాస్తు చేయండి.',
    fields: [
      {
        id: 'pkisan-1',
        governmentWording: 'Khasra / Survey Number',
        governmentWordingTe: 'ఖసరా / సర్వే నంబర్',
        whatItMeans: 'The unique identification number for your agricultural land plot as recorded in revenue records.',
        whatItMeansTe: 'రెవెన్యూ రికార్డులలో నమోదు చేయబడిన మీ వ్యవసాయ భూమి ప్లాట్‌కు ప్రత్యేక గుర్తింపు నంబర్.',
        whatToEnter: 'Enter the survey or Khasra number from your land documents (pattadar passbook or ROR).',
        whatToEnterTe: 'మీ భూమి పత్రాల నుండి సర్వే లేదా ఖసరా నంబర్ నమోదు చేయండి (పట్టాదార్ పాస్‌బుక్ లేదా ROR).',
        whereToFind: 'Pattadar Passbook, Adangal/ROR from the MeeSeva portal or your mandal office.',
        whereToFindTe: 'పట్టాదార్ పాస్‌బుక్, MeeSeva పోర్టల్ లేదా మీ మండల కార్యాలయం నుండి అడంగల్/ROR.',
      },
      {
        id: 'pkisan-2',
        governmentWording: 'Land Area (in Hectares)',
        governmentWordingTe: 'భూమి విస్తీర్ణం (హెక్టార్లలో)',
        whatItMeans: 'The total area of your agricultural land measured in hectares.',
        whatItMeansTe: 'హెక్టార్లలో కొలవబడిన మీ వ్యవసాయ భూమి మొత్తం విస్తీర్ణం.',
        whatToEnter: 'Convert acres to hectares if needed: 1 acre = 0.4047 hectares. Enter up to 2 decimal places.',
        whatToEnterTe: 'అవసరమైతే ఎకరాలను హెక్టార్లుగా మార్చండి: 1 ఎకరా = 0.4047 హెక్టార్లు. 2 దశాంశ స్థానాల వరకు నమోదు చేయండి.',
        whereToFind: 'Pattadar Passbook or land registration document.',
        whereToFindTe: 'పట్టాదార్ పాస్‌బుక్ లేదా భూమి నమోదు పత్రం.',
        warning: 'Only agricultural land counts. Homestead (Vasathi) land should not be included.',
        warningTe: 'వ్యవసాయ భూమి మాత్రమే లెక్కించబడుతుంది. నివాస (వాసతి) భూమిని చేర్చకూడదు.',
      },
    ],
  },
];

// ── Main Component ────────────────────────────────────────────
export default function FormExplainerPage() {
  const { t, language } = useApp();
  const te = language === 'te';

  const [selectedGuide, setSelectedGuide] = useState<FormGuide | null>(null);
  const [expandedField, setExpandedField] = useState<string | null>(null);

  if (selectedGuide) {
    return (
      <div className="min-h-[80vh] pb-20 md:pb-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Back button */}
          <button
            onClick={() => { setSelectedGuide(null); setExpandedField(null); }}
            className="flex items-center gap-1.5 text-xs text-[#728477] hover:text-[#151719] mb-6 transition-colors font-semibold"
          >
            ← {te ? 'అన్ని ఫారమ్ గైడ్‌లు' : 'All Form Guides'}
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDE4] text-[#B85F45] text-xs font-bold mb-2 border border-[#D8CDBB]">
              <BookOpen size={12} />
              <span>{te ? 'సాధారణ మార్గదర్శకత' : 'General guidance'}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#151719] mb-1">
              {te ? selectedGuide.titleTe : selectedGuide.title}
            </h1>
            <p className="text-sm text-[#728477] leading-relaxed mb-3">
              {te ? selectedGuide.descriptionTe : selectedGuide.description}
            </p>
            <div className="p-3 rounded-xl bg-[#F1EDE4] border border-[#D8CDBB] text-xs text-[#3B3F4A] leading-relaxed">
              <Info size={13} className="inline mr-1.5 text-[#728477]" />
              {te ? selectedGuide.contextTe : selectedGuide.context}
            </div>
          </div>

          <div className="space-y-3">
            {selectedGuide.fields.map((field) => {
              const expanded = expandedField === field.id;
              return (
                <div
                  key={field.id}
                  className="bg-white rounded-2xl border border-[#E8E3DA] shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full p-4 cursor-pointer flex items-center justify-between bg-[#FAF8F3] hover:bg-[#F1EDE4] transition-colors text-left"
                    onClick={() => setExpandedField(expanded ? null : field.id)}
                    aria-expanded={expanded}
                    id={`field-toggle-${field.id}`}
                  >
                    <div className="flex-1 pr-4">
                      <span className="text-[10px] font-bold text-[#9AA5B1] uppercase tracking-wider block mb-0.5">
                        {te ? 'అధికారిక ఫారమ్ ఫీల్డ్' : 'Official form field'}
                      </span>
                      <p className="text-sm font-bold text-[#151719]">
                        {te ? field.governmentWordingTe : field.governmentWording}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-[#E8E3DA] flex items-center justify-center text-[#728477] shrink-0">
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {expanded && (
                    <div
                      className="p-5 border-t border-[#E8E3DA] space-y-3 animate-fade-in"
                      role="region"
                      aria-labelledby={`field-toggle-${field.id}`}
                    >
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-[#F1EDE4] border border-[#D8CDBB]">
                          <div className="flex items-center gap-1.5 mb-1.5 text-[#728477] font-bold text-xs">
                            <Info size={13} />
                            <span>{te ? 'దీని అర్థం ఏమిటి?' : 'What does this mean?'}</span>
                          </div>
                          <p className="text-xs text-[#151719] leading-relaxed">
                            {te ? field.whatItMeansTe : field.whatItMeans}
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#EAF4F0] border border-[#16856A]/20">
                          <div className="flex items-center gap-1.5 mb-1.5 text-[#16856A] font-bold text-xs">
                            <CheckCircle2 size={13} />
                            <span>{te ? 'ఏమి నమోదు చేయాలి?' : 'What to enter?'}</span>
                          </div>
                          <p className="text-xs text-[#151719] leading-relaxed">
                            {te ? field.whatToEnterTe : field.whatToEnter}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-[#E8E3DA]">
                        <div className="flex items-center gap-1.5 mb-1.5 text-[#30364F] font-bold text-xs">
                          <HelpCircle size={13} />
                          <span>{te ? 'ఎక్కడ కనుగొనాలి?' : 'Where to find it?'}</span>
                        </div>
                        <p className="text-xs text-[#3B3F4A] leading-relaxed">
                          {te ? field.whereToFindTe : field.whereToFind}
                        </p>
                      </div>

                      {(field.warning || field.warningTe) && (
                        <div className="p-3 rounded-xl bg-[#FEF3CD] border border-[#D99A24]/30 flex items-start gap-2 text-xs text-[#7C5B00]">
                          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[#D99A24]" />
                          <p>
                            <span className="font-bold">{te ? 'జాగ్రత్త: ' : 'Important: '}</span>
                            {te ? field.warningTe : field.warning}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB] text-xs text-[#728477] leading-relaxed">
            <Sparkles size={12} className="inline mr-1.5 text-[#B85F45]" />
            <span className="font-bold text-[#3B3F4A]">
              {te ? 'ముఖ్యమైన గమనిక: ' : 'Disclaimer: '}
            </span>
            {te
              ? 'ఇది సాధారణ మార్గదర్శకత మాత్రమే. అధికారిక ఫారమ్ అవసరాలు మారవచ్చు. ఎప్పుడూ అధికారిక ప్రభుత్వ సూచనలను అనుసరించండి.'
              : 'This is general guidance only. Official form requirements may vary. Always follow the official government instructions.'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] pb-20 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDE4] text-[#B85F45] text-xs font-bold mb-3 border border-[#D8CDBB]">
            <BookOpen size={13} />
            <span>{te ? 'ఫారమ్ గైడ్‌లు లైబ్రరీ' : 'Form Guides Library'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#151719] mb-2">
            {te ? 'ప్రభుత్వ ఫారమ్‌లు సులభంగా అర్థం చేసుకోండి' : 'Understand Government Forms Easily'}
          </h1>
          <p className="text-sm text-[#728477] max-w-lg mx-auto leading-relaxed">
            {te
              ? 'సాధారణ దరఖాస్తు ఫారమ్‌లలో ఉన్న ప్రతి ఫీల్డ్‌ను సాధారణ భాషలో వివరించే గైడ్‌లు ఎంచుకోండి.'
              : 'Select a guide to see every field in common application forms explained in plain language — English and Telugu.'}
          </p>
        </div>

        {/* Guide cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {FORM_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => { setSelectedGuide(guide); setExpandedField(guide.fields[0]?.id || null); }}
              className="group text-left p-5 bg-white rounded-2xl border border-[#E8E3DA] shadow-sm hover:shadow-md hover:border-[#D8CDBB] transition-all active:scale-[0.99]"
              aria-label={`Open form guide: ${te ? guide.titleTe : guide.title}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1EDE4] flex items-center justify-center mb-3 text-[#B85F45] group-hover:bg-[#D8CDBB] transition-colors">
                <FileText size={20} />
              </div>
              <h2 className="text-sm font-bold text-[#151719] mb-1">
                {te ? guide.titleTe : guide.title}
              </h2>
              <p className="text-xs text-[#728477] leading-relaxed mb-3">
                {te ? guide.descriptionTe : guide.description}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#B85F45]">
                <span>{te ? `${guide.fields.length} ఫీల్డ్‌లు వివరించబడ్డాయి` : `${guide.fields.length} fields explained`}</span>
                <ChevronDown size={13} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-[#F1EDE4] border border-[#D8CDBB] text-xs text-[#728477] leading-relaxed text-center">
          {te
            ? 'ఈ గైడ్‌లు సాధారణ అవగాహన కోసం మాత్రమే. అధికారిక ఫారమ్ ప్రయోజనాల కోసం ఎప్పుడూ సంబంధిత ప్రభుత్వ కార్యాలయాన్ని సంప్రదించండి.'
            : 'These guides are for general understanding only. For official form purposes, always consult the relevant government office.'}
        </div>
      </div>
    </div>
  );
}
