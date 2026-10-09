// ============================================================
// SevaPath — Resources Data
// Real government & platform resources for persona hubs
// All URLs verified against official domains as of Oct 2025
// ============================================================

export type ResourceType = 'scholarship' | 'internship' | 'hackathon' | 'training' | 'benefit' | 'loan' | 'portal';

export type PersonaId = 'student' | 'farmer' | 'senior' | 'job-seeker' | 'woman';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  titleTe: string;
  provider: string;
  description: string;
  descriptionTe: string;
  eligibility: string;
  eligibilityTe: string;
  deadline: 'rolling' | string;
  officialUrl: string;
  lastVerified: string; // ISO date
  tags: string[];
  state?: string; // undefined = central; otherwise state-specific
  personas: PersonaId[];
  /** If true, there is a verified apply link. If false, hide apply button. */
  hasApplyLink: boolean;
}

export const resources: Resource[] = [
  // ── SCHOLARSHIPS ──────────────────────────────────────────

  {
    id: 'nsp-central',
    type: 'scholarship',
    title: 'National Scholarship Portal (NSP)',
    titleTe: 'జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)',
    provider: 'Ministry of Electronics & IT, Govt. of India',
    description:
      'One-stop platform for central government scholarships covering pre-matric, post-matric, merit-cum-means, and minority scholarships. Over 100 lakh students receive scholarships annually.',
    descriptionTe:
      'కేంద్ర ప్రభుత్వ స్కాలర్‌షిప్‌ల కోసం ఏకైక వేదిక. ప్రీ-మెట్రిక్, పోస్ట్-మెట్రిక్, మెరిట్-కమ్-మీన్స్ మరియు మైనారిటీ స్కాలర్‌షిప్‌లు అందుబాటులో ఉన్నాయి.',
    eligibility:
      'Indian citizen studying in recognized institution; income/category criteria vary by scheme.',
    eligibilityTe:
      'గుర్తింపు పొందిన సంస్థలో చదువుతున్న భారత పౌరులు; ఆదాయ/వర్గ ప్రమాణాలు పథకం వారీగా మారుతాయి.',
    deadline: 'rolling',
    officialUrl: 'https://scholarships.gov.in',
    lastVerified: '2025-10-01',
    tags: ['scholarship', 'central', 'pre-matric', 'post-matric', 'merit', 'minority', 'OBC', 'SC', 'ST'],
    personas: ['student'],
    hasApplyLink: true,
  },
  {
    id: 'ap-jagananna-vidya-deevena',
    type: 'scholarship',
    title: 'Jagananna Vidya Deevena',
    titleTe: 'జగనన్న విద్యా దీవెన',
    provider: 'Government of Andhra Pradesh',
    description:
      'Andhra Pradesh scheme providing full tuition fee reimbursement for BC, SC, ST, EBC, Kapu and minority students in government and private colleges.',
    descriptionTe:
      'ఆంధ్రప్రదేశ్ ప్రభుత్వ పథకం: BC, SC, ST, EBC, కాపు మరియు మైనారిటీ విద్యార్థులకు ప్రభుత్వ మరియు ప్రైవేట్ కళాశాలలలో పూర్తి ట్యూషన్ ఫీజు చెల్లింపు.',
    eligibility:
      'Student in AP; belongs to BC/SC/ST/EBC/Kapu/minority community; enrolled in recognized college in AP.',
    eligibilityTe:
      'AP లో విద్యార్థి; BC/SC/ST/EBC/కాపు/మైనారిటీ వర్గానికి చెందినవారు; AP లో గుర్తింపు పొందిన కళాశాలలో నమోదు.',
    deadline: 'rolling',
    officialUrl: 'https://apsche.ap.gov.in',
    lastVerified: '2025-10-01',
    tags: ['scholarship', 'Andhra Pradesh', 'tuition fee', 'BC', 'SC', 'ST', 'EBC', 'Kapu', 'minority'],
    state: 'Andhra Pradesh',
    personas: ['student'],
    hasApplyLink: true,
  },
  {
    id: 'ts-ews-scholarship',
    type: 'scholarship',
    title: 'Telangana State Scholarships (TGSCHE)',
    titleTe: 'తెలంగాణ రాష్ట్ర స్కాలర్‌షిప్‌లు (TGSCHE)',
    provider: 'Telangana State Council of Higher Education',
    description:
      'Telangana scholarships for BC, SC, ST, EBC, and minority students pursuing higher education in the state; includes fee reimbursement and maintenance allowance.',
    descriptionTe:
      'తెలంగాణలో ఉన్నత విద్య అభ్యసిస్తున్న BC, SC, ST, EBC మరియు మైనారిటీ విద్యార్థులకు స్కాలర్‌షిప్‌లు; ఫీజు చెల్లింపు మరియు నిర్వహణ భత్యం.',
    eligibility:
      'Student enrolled in Telangana; belongs to BC/SC/ST/EBC/minority; family income criteria apply.',
    eligibilityTe:
      'తెలంగాణలో నమోదు అయిన విద్యార్థి; BC/SC/ST/EBC/మైనారిటీ; కుటుంబ ఆదాయ ప్రమాణాలు వర్తిస్తాయి.',
    deadline: 'rolling',
    officialUrl: 'https://tgsche.ac.in',
    lastVerified: '2025-10-01',
    tags: ['scholarship', 'Telangana', 'fee reimbursement', 'BC', 'SC', 'ST', 'EBC', 'minority'],
    state: 'Telangana',
    personas: ['student'],
    hasApplyLink: true,
  },
  {
    id: 'pm-vidyalaxmi',
    type: 'scholarship',
    title: 'PM Vidyalaxmi Scheme',
    titleTe: 'PM విద్యాలక్ష్మి పథకం',
    provider: 'Ministry of Education, Govt. of India',
    description:
      'Provides education loans with interest subvention and collateral-free loans up to ₹10 lakh for meritorious students from families with annual income up to ₹8 lakh.',
    descriptionTe:
      'మెరిట్ గల విద్యార్థులకు ₹8 లక్షల వరకు వార్షిక ఆదాయ ఉన్న కుటుంబాలకు ₹10 లక్షల వరకు వడ్డీ రాయితీతో కూడిన విద్యా రుణాలు.',
    eligibility:
      'Merit admission to Top Institutions (NIRF ranked or QS listed); family income up to ₹8 lakh per year.',
    eligibilityTe:
      'NIRF/QS జాబితాలో ఉన్న సంస్థలో మెరిట్ ప్రవేశం; కుటుంబ ఆదాయం ₹8 లక్షల వరకు.',
    deadline: 'rolling',
    officialUrl: 'https://www.education.gov.in/vidyalaxmi',
    lastVerified: '2025-10-01',
    tags: ['education loan', 'scholarship', 'merit', 'central', 'higher education', 'interest subvention'],
    personas: ['student'],
    hasApplyLink: true,
  },

  // ── INTERNSHIPS ───────────────────────────────────────────

  {
    id: 'pm-internship-scheme',
    type: 'internship',
    title: 'PM Internship Scheme',
    titleTe: 'PM ఇంటర్న్‌షిప్ పథకం',
    provider: 'Ministry of Corporate Affairs, Govt. of India',
    description:
      'Government scheme providing 12-month internships in top 500 companies to youth aged 21–24. Stipend of ₹5,000/month with ₹6,000 one-time grant. 1 crore internships over 5 years.',
    descriptionTe:
      'భారత అగ్రశ్రేణి 500 కంపెనీలలో 21-24 సంవత్సరాల వయస్సులో ఉన్న యువతకు 12 నెలల ఇంటర్న్‌షిప్‌లు. నెలకు ₹5,000 స్టైపెండ్ మరియు ₹6,000 ఒక్కసారి గ్రాంట్.',
    eligibility:
      'Indian citizen aged 21–24; not currently in full-time education; family income below specified limit; not employed in central/state government.',
    eligibilityTe:
      'వయస్సు 21–24; పూర్తి-కాల విద్యలో లేనివారు; నిర్దిష్ట పరిమితి కింద కుటుంబ ఆదాయం; కేంద్ర/రాష్ట్ర ప్రభుత్వంలో ఉద్యోగం చేయనివారు.',
    deadline: 'rolling',
    officialUrl: 'https://pminternship.mca.gov.in',
    lastVerified: '2025-10-01',
    tags: ['internship', 'government', 'stipend', 'youth', 'employment', 'corporate', 'central'],
    personas: ['student', 'job-seeker'],
    hasApplyLink: true,
  },
  {
    id: 'internshala',
    type: 'internship',
    title: 'Internshala — Internship & Training Portal',
    titleTe: 'ఇంటర్న్‌షాలా — ఇంటర్న్‌షిప్ & శిక్షణ పోర్టల్',
    provider: 'Internshala (Private Platform)',
    description:
      'India\'s leading internship platform with thousands of listings across engineering, management, arts, and more. Free to apply; many internships offer stipends.',
    descriptionTe:
      'ఇంజినీరింగ్, మేనేజ్‌మెంట్, కళలు మరియు మరిన్నింటిలో వేలాది జాబితాలతో భారత అగ్రగామి ఇంటర్న్‌షిప్ వేదిక.',
    eligibility:
      'Open to students and recent graduates; eligibility varies by individual listing.',
    eligibilityTe:
      'విద్యార్థులు మరియు ఇటీవలి గ్రాడ్యుయేట్‌లకు తెరిచి ఉంది; అర్హత వ్యక్తిగత జాబితా వారీగా మారుతుంది.',
    deadline: 'rolling',
    officialUrl: 'https://internshala.com',
    lastVerified: '2025-10-01',
    tags: ['internship', 'training', 'engineering', 'management', 'stipend', 'platform'],
    personas: ['student', 'job-seeker'],
    hasApplyLink: true,
  },
  {
    id: 'skill-india-portal',
    type: 'training',
    title: 'Skill India Digital Hub',
    titleTe: 'స్కిల్ ఇండియా డిజిటల్ హబ్',
    provider: 'Ministry of Skill Development & Entrepreneurship, Govt. of India',
    description:
      'Free skill development courses, certification, and placement opportunities under PMKVY and other central schemes. Courses in IT, manufacturing, healthcare, and more.',
    descriptionTe:
      'PMKVY మరియు ఇతర కేంద్ర పథకాల కింద ఉచిత నైపుణ్య అభివృద్ధి కోర్సులు, సర్టిఫికేషన్ మరియు ఉద్యోగ అవకాశాలు.',
    eligibility:
      'Indian citizen; age 15–45 (varies by scheme); varying income/education requirements per course.',
    eligibilityTe:
      'భారత పౌరుడు; వయస్సు 15–45 (పథకం వారీగా మారుతుంది); కోర్సు వారీగా విభిన్న ఆదాయ/విద్య అవసరాలు.',
    deadline: 'rolling',
    officialUrl: 'https://www.skillindiadigital.gov.in',
    lastVerified: '2025-10-01',
    tags: ['skill', 'training', 'PMKVY', 'certification', 'placement', 'free', 'central'],
    personas: ['student', 'job-seeker'],
    hasApplyLink: true,
  },

  // ── HACKATHONS ────────────────────────────────────────────

  {
    id: 'smart-india-hackathon',
    type: 'hackathon',
    title: 'Smart India Hackathon (SIH)',
    titleTe: 'స్మార్ట్ ఇండియా హ్యాకథాన్ (SIH)',
    provider: 'Ministry of Education, Govt. of India',
    description:
      'India\'s biggest open innovation platform. Teams of 6 solve real government problem statements. Winners receive cash prizes up to ₹1 lakh per team. Both Software and Hardware editions.',
    descriptionTe:
      'భారత అతిపెద్ద ఓపెన్ ఇన్నోవేషన్ వేదిక. 6 సభ్యుల బృందాలు వాస్తవ ప్రభుత్వ సమస్యలను పరిష్కరిస్తాయి. విజేతలకు బృందానికి ₹1 లక్ష వరకు నగదు బహుమతులు.',
    eligibility:
      'Students enrolled in recognized colleges/universities in India (undergraduate, postgraduate, diploma).',
    eligibilityTe:
      'భారతదేశంలో గుర్తింపు పొందిన కళాశాలలు/విశ్వవిద్యాలయాలలో చేరిన విద్యార్థులు (అండర్‌గ్రాడ్యుయేట్, పోస్ట్‌గ్రాడ్యుయేట్, డిప్లొమా).',
    deadline: 'Check official site',
    officialUrl: 'https://www.sih.gov.in',
    lastVerified: '2025-10-01',
    tags: ['hackathon', 'innovation', 'coding', 'government', 'cash prize', 'SIH', 'central', 'team'],
    personas: ['student'],
    hasApplyLink: true,
  },
  {
    id: 'devfolio',
    type: 'hackathon',
    title: 'Devfolio — Hackathon Platform',
    titleTe: 'డెవ్‌ఫోలియో — హ్యాకథాన్ వేదిక',
    provider: 'Devfolio (Private Platform)',
    description:
      'India\'s leading hackathon discovery and registration platform. Lists 100+ hackathons per year including ETHIndia, national-level events, and college hackathons with prizes.',
    descriptionTe:
      'భారత అగ్రగామి హ్యాకథాన్ డిస్కవరీ మరియు రిజిస్ట్రేషన్ వేదిక. ETHIndia, జాతీయ స్థాయి కార్యక్రమాలు మరియు కళాశాల హ్యాకథాన్‌లు సహా 100+ హ్యాకథాన్‌లు.',
    eligibility:
      'Open to all; individual events set their own eligibility (student, professional, open).',
    eligibilityTe:
      'అందరికీ తెరిచి ఉంది; ప్రత్యేక కార్యక్రమాలు వారి స్వంత అర్హత నిర్ణయిస్తాయి.',
    deadline: 'rolling',
    officialUrl: 'https://devfolio.co',
    lastVerified: '2025-10-01',
    tags: ['hackathon', 'coding', 'startup', 'tech', 'prize', 'developer', 'platform'],
    personas: ['student'],
    hasApplyLink: true,
  },
  {
    id: 'unstop-platform',
    type: 'hackathon',
    title: 'Unstop — Competitions & Opportunities',
    titleTe: 'అన్‌స్టాప్ — పోటీలు & అవకాశాలు',
    provider: 'Unstop (Private Platform)',
    description:
      'Platform listing hackathons, case competitions, quizzes, and scholarships from top companies and colleges. Over 10,000 opportunities posted annually across disciplines.',
    descriptionTe:
      'అగ్రగామి కంపెనీలు మరియు కళాశాలల నుండి హ్యాకథాన్‌లు, కేస్ పోటీలు, క్విజ్‌లు మరియు స్కాలర్‌షిప్‌లు జాబితా చేసే వేదిక.',
    eligibility:
      'Open to all; each competition has its own eligibility criteria.',
    eligibilityTe:
      'అందరికీ తెరిచి ఉంది; ప్రతి పోటీకి స్వంత అర్హత ప్రమాణాలు ఉన్నాయి.',
    deadline: 'rolling',
    officialUrl: 'https://unstop.com',
    lastVerified: '2025-10-01',
    tags: ['hackathon', 'competition', 'quiz', 'case study', 'scholarship', 'platform', 'campus'],
    personas: ['student'],
    hasApplyLink: true,
  },

  // ── FARMER RESOURCES ──────────────────────────────────────

  {
    id: 'pm-kisan',
    type: 'benefit',
    title: 'PM-KISAN Samman Nidhi',
    titleTe: 'PM-కిసాన్ సమ్మాన్ నిధి',
    provider: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    description:
      'Direct income support of ₹6,000 per year (in 3 instalments of ₹2,000) to eligible farmer families across India. Transferred directly to bank accounts.',
    descriptionTe:
      'అర్హత ఉన్న రైతు కుటుంబాలకు సంవత్సరానికి ₹6,000 (₹2,000 చొప్పున 3 వాయిదాలలో) నేరుగా బ్యాంక్ ఖాతాలకు.',
    eligibility:
      'Small and marginal farmer families with cultivable land; Aadhaar and bank linkage required.',
    eligibilityTe:
      'సేద్యపు భూమి ఉన్న చిన్న మరియు సన్నకారు రైతు కుటుంబాలు; ఆధార్ మరియు బ్యాంక్ అనుసంధానం అవసరం.',
    deadline: 'rolling',
    officialUrl: 'https://pmkisan.gov.in',
    lastVerified: '2025-10-01',
    tags: ['farmer', 'income support', 'PM-KISAN', 'central', 'direct benefit transfer'],
    personas: ['farmer'],
    hasApplyLink: true,
  },
  {
    id: 'rythu-bharosa-ap',
    type: 'benefit',
    title: 'AP Rythu Bharosa',
    titleTe: 'ఆంధ్రప్రదేశ్ రైతు భరోసా',
    provider: 'Government of Andhra Pradesh',
    description:
      'Investment support of ₹13,500 per year to AP farmers. Combined with PM-KISAN, eligible farmers receive ₹20,000 total per year from state and central governments.',
    descriptionTe:
      'AP రైతులకు సంవత్సరానికి ₹13,500 పెట్టుబడి మద్దతు. PM-KISAN తో కలిపి, అర్హత ఉన్న రైతులు రాష్ట్ర మరియు కేంద్ర ప్రభుత్వాల నుండి మొత్తం ₹20,000 పొందుతారు.',
    eligibility: 'Farmer with land registered in AP.',
    eligibilityTe: 'AP లో నమోదైన భూమి ఉన్న రైతు.',
    deadline: 'rolling',
    officialUrl: 'https://apagrisnet.gov.in',
    lastVerified: '2025-10-01',
    tags: ['farmer', 'Andhra Pradesh', 'investment support', 'state scheme'],
    state: 'Andhra Pradesh',
    personas: ['farmer'],
    hasApplyLink: true,
  },
  {
    id: 'rythu-bandhu-ts',
    type: 'benefit',
    title: 'Telangana Rythu Bandhu',
    titleTe: 'తెలంగాణ రైతు బంధు',
    provider: 'Government of Telangana',
    description:
      'Investment support scheme providing ₹10,000 per acre per year (₹5,000 per Kharif and Rabi season) to Telangana farmers for agricultural inputs.',
    descriptionTe:
      'తెలంగాణ రైతులకు వ్యవసాయ సామగ్రి కోసం ఎకరాకు సంవత్సరానికి ₹10,000 (ఖరీఫ్ మరియు రబీ సీజన్లలో ₹5,000 చొప్పున) పెట్టుబడి మద్దతు పథకం.',
    eligibility: 'Farmer with registered agricultural land in Telangana.',
    eligibilityTe: 'తెలంగాణలో నమోదైన వ్యవసాయ భూమి ఉన్న రైతు.',
    deadline: 'rolling',
    officialUrl: 'https://rythubandhu.telangana.gov.in',
    lastVerified: '2025-10-01',
    tags: ['farmer', 'Telangana', 'investment support', 'per acre', 'state scheme'],
    state: 'Telangana',
    personas: ['farmer'],
    hasApplyLink: true,
  },
  {
    id: 'fasal-bima',
    type: 'benefit',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    titleTe: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన',
    provider: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    description:
      'Crop insurance scheme protecting farmers against crop loss from natural calamities. Farmers pay a very low premium (2% for kharif, 1.5% for rabi crops).',
    descriptionTe:
      'ప్రకృతి విపత్తుల వల్ల పంట నష్టం నుండి రైతులను రక్షించే పంట బీమా పథకం. రైతులు చాలా తక్కువ ప్రీమియం చెల్లిస్తారు (ఖరీఫ్‌కు 2%, రబీ పంటలకు 1.5%).',
    eligibility: 'All farmers growing notified crops in notified areas.',
    eligibilityTe: 'నోటిఫై చేయబడిన ప్రాంతాలలో నోటిఫై చేయబడిన పంటలు పండించే అన్ని రైతులు.',
    deadline: 'rolling',
    officialUrl: 'https://pmfby.gov.in',
    lastVerified: '2025-10-01',
    tags: ['farmer', 'crop insurance', 'Fasal Bima', 'central', 'disaster relief'],
    personas: ['farmer'],
    hasApplyLink: true,
  },

  // ── SENIOR CITIZEN RESOURCES ──────────────────────────────

  {
    id: 'ignoaps',
    type: 'benefit',
    title: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    titleTe: 'ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పెన్షన్ పథకం',
    provider: 'Ministry of Rural Development, Govt. of India',
    description:
      'Monthly pension for senior citizens aged 60+ from BPL households. ₹200/month for those aged 60–79, ₹500/month for those aged 80 and above.',
    descriptionTe:
      'BPL కుటుంబాల నుండి 60+ వయస్సు ఉన్న వృద్ధులకు నెలసరి పెన్షన్. 60-79 సంవత్సరాల వయస్సువారికి నెలకు ₹200, 80 మరియు అంతకు మించిన వయస్సువారికి ₹500.',
    eligibility:
      'Age 60+; BPL (Below Poverty Line) household; not receiving any other pension.',
    eligibilityTe:
      'వయస్సు 60+; BPL కుటుంబం; మరే పెన్షన్ పొందనివారు.',
    deadline: 'rolling',
    officialUrl: 'https://nsap.nic.in',
    lastVerified: '2025-10-01',
    tags: ['senior', 'pension', 'BPL', 'old age', 'central', 'NSAP'],
    personas: ['senior'],
    hasApplyLink: true,
  },
  {
    id: 'pmvvy',
    type: 'benefit',
    title: 'PM Vaya Vandana Yojana (PMVVY)',
    titleTe: 'పీఎం వయ వందనా యోజన (PMVVY)',
    provider: 'Ministry of Finance / LIC of India',
    description:
      'Guaranteed pension scheme for senior citizens aged 60+ via LIC of India. Assured return of up to 7.4% p.a. payable monthly. Investment up to ₹15 lakh.',
    descriptionTe:
      'LIC ఆఫ్ ఇండియా ద్వారా 60+ వయస్సు ఉన్న వృద్ధులకు హామీ పెన్షన్ పథకం. నెలవారీ చెల్లించే 7.4% వరకు నిశ్చిత రాబడి. ₹15 లక్ష వరకు పెట్టుబడి.',
    eligibility: 'Age 60+ (no upper age limit); Indian citizen.',
    eligibilityTe: 'వయస్సు 60+ (గరిష్ట వయస్సు పరిమితి లేదు); భారత పౌరుడు.',
    deadline: 'rolling',
    officialUrl: 'https://licindia.in/Home/PMVVY',
    lastVerified: '2025-10-01',
    tags: ['senior', 'pension', 'LIC', 'investment', 'guaranteed return', 'central'],
    personas: ['senior'],
    hasApplyLink: true,
  },
  {
    id: 'ayushman-bharat',
    type: 'benefit',
    title: 'Ayushman Bharat PM-JAY',
    titleTe: 'ఆయుష్మాన్ భారత్ PM-JAY',
    provider: 'National Health Authority, Govt. of India',
    description:
      'Health insurance coverage up to ₹5 lakh per year per family for secondary and tertiary care hospitalisation. Covers over 1,500 medical procedures across empanelled hospitals.',
    descriptionTe:
      'ద్వితీయ మరియు తృతీయ స్థాయి ఆసుపత్రిలో చేరిక కోసం కుటుంబానికి సంవత్సరానికి ₹5 లక్ష వరకు ఆరోగ్య బీమా. ఎంపానెల్ చేయబడిన ఆసుపత్రులలో 1,500+ వైద్య విధానాలు.',
    eligibility:
      'BPL and low-income households as per SECC database; families listed in PMJAY list.',
    eligibilityTe:
      'SECC డేటాబేస్ ప్రకారం BPL మరియు తక్కువ ఆదాయ కుటుంబాలు; PMJAY జాబితాలో పేర్కొనబడిన కుటుంబాలు.',
    deadline: 'rolling',
    officialUrl: 'https://pmjay.gov.in',
    lastVerified: '2025-10-01',
    tags: ['health', 'insurance', 'BPL', 'hospitalisation', 'Ayushman', 'central', 'senior', 'family'],
    personas: ['senior', 'woman', 'farmer'],
    hasApplyLink: true,
  },

  // ── WOMEN RESOURCES ───────────────────────────────────────

  {
    id: 'pm-matru-vandana',
    type: 'benefit',
    title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    titleTe: 'ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)',
    provider: 'Ministry of Women & Child Development, Govt. of India',
    description:
      'Maternity benefit programme providing ₹5,000 in three instalments for first live birth. Compensates wage loss for pregnant women from low-income families.',
    descriptionTe:
      'మొదటి జీవంతో జన్మించిన శిశువు కోసం 3 వాయిదాలలో ₹5,000 అందించే మాతృత్వ ప్రయోజన కార్యక్రమం. తక్కువ ఆదాయ కుటుంబాల నుండి గర్భిణీ స్త్రీలకు వేతన నష్ట భర్తీ.',
    eligibility:
      'Pregnant women and lactating mothers; first live birth; aged 19+; Aadhaar required.',
    eligibilityTe:
      'గర్భిణీ స్త్రీలు మరియు పాలిచ్చే తల్లులు; మొదటి జీవంతో జన్మించిన శిశువు; వయస్సు 19+; ఆధార్ అవసరం.',
    deadline: 'rolling',
    officialUrl: 'https://pmmvy.wcd.gov.in',
    lastVerified: '2025-10-01',
    tags: ['woman', 'maternity', 'pregnancy', 'central', 'direct benefit transfer'],
    personas: ['woman'],
    hasApplyLink: true,
  },
  {
    id: 'mudra-loan-women',
    type: 'loan',
    title: 'PM Mudra Yojana — Women Entrepreneurs',
    titleTe: 'PM ముద్ర యోజన — మహిళా వ్యవసాయదారులు',
    provider: 'Ministry of Finance, Govt. of India',
    description:
      'Collateral-free loans under Shishu (up to ₹50K), Kishore (₹50K–₹5L), and Tarun (₹5L–₹10L) categories for micro-enterprises. Women entrepreneurs get preferential rates.',
    descriptionTe:
      'సూక్ష్మ వ్యవసాయ సంస్థలకు శిశు (₹50K వరకు), కిశోర్ (₹50K–₹5L), మరియు తరుణ్ (₹5L–₹10L) వర్గాలలో తనఖా లేని రుణాలు. మహిళా వ్యవసాయదారులకు ప్రాధాన్య రేట్లు.',
    eligibility:
      'Non-farm micro/small enterprise; no existing default; Aadhaar required.',
    eligibilityTe:
      'నాన్-ఫార్మ్ సూక్ష్మ/చిన్న వ్యాపార సంస్థ; ఇప్పటికే డిఫాల్ట్ లేదు; ఆధార్ అవసరం.',
    deadline: 'rolling',
    officialUrl: 'https://www.mudra.org.in',
    lastVerified: '2025-10-01',
    tags: ['woman', 'loan', 'entrepreneur', 'business', 'MUDRA', 'central', 'SHG'],
    personas: ['woman'],
    hasApplyLink: true,
  },
  {
    id: 'ys-amma-vodi',
    type: 'benefit',
    title: 'YSR Amma Vodi (AP)',
    titleTe: 'YSR అమ్మ వోడి (AP)',
    provider: 'Government of Andhra Pradesh',
    description:
      'Annual assistance of ₹15,000 to mothers/guardians sending children to government schools in Andhra Pradesh. Aims to reduce dropout rates.',
    descriptionTe:
      'ఆంధ్రప్రదేశ్‌లో ప్రభుత్వ పాఠశాలలకు పిల్లలను పంపే తల్లులు/సంరక్షకులకు వార్షికంగా ₹15,000 సహాయం. ఔట్ డ్రాప్‌అవుట్ రేట్లు తగ్గించడం లక్ష్యం.',
    eligibility:
      'Mother/guardian of student studying in government school in AP; enrolled in white ration card or BPL.',
    eligibilityTe:
      'AP లో ప్రభుత్వ పాఠశాలలో చదువుతున్న విద్యార్థి తల్లి/సంరక్షకుడు; తెల్ల రేషన్ కార్డు లేదా BPL.',
    deadline: 'rolling',
    officialUrl: 'https://ammavodi.ap.gov.in',
    lastVerified: '2025-10-01',
    tags: ['woman', 'Andhra Pradesh', 'education support', 'state scheme', 'mothers'],
    state: 'Andhra Pradesh',
    personas: ['woman'],
    hasApplyLink: true,
  },

  // ── JOB SEEKER RESOURCES ──────────────────────────────────

  {
    id: 'ncs-portal',
    type: 'portal',
    title: 'National Career Service (NCS) Portal',
    titleTe: 'జాతీయ కెరీర్ సేవ (NCS) పోర్టల్',
    provider: 'Ministry of Labour & Employment, Govt. of India',
    description:
      'Government job portal listing vacancies across central and state government departments, PSUs, private sector, and apprenticeships. Free registration.',
    descriptionTe:
      'కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ విభాగాలు, PSUలు, ప్రైవేట్ రంగం మరియు అప్రెంటిస్‌షిప్‌లలో ఖాళీలు జాబితా చేసే ప్రభుత్వ ఉద్యోగ పోర్టల్.',
    eligibility: 'Open to all Indian citizens; free registration.',
    eligibilityTe: 'అన్ని భారత పౌరులకు; ఉచిత రిజిస్ట్రేషన్.',
    deadline: 'rolling',
    officialUrl: 'https://www.ncs.gov.in',
    lastVerified: '2025-10-01',
    tags: ['job', 'employment', 'career', 'central', 'government jobs', 'apprenticeship'],
    personas: ['job-seeker', 'student'],
    hasApplyLink: true,
  },
  {
    id: 'pmegp',
    type: 'benefit',
    title: 'PM Employment Generation Programme (PMEGP)',
    titleTe: 'PM ఉపాధి కల్పన కార్యక్రమం (PMEGP)',
    provider: 'Ministry of MSME, Govt. of India',
    description:
      'Credit-linked subsidy for setting up micro-enterprises in manufacturing, service, and agro-based sectors. Subsidy of 15–35% of project cost depending on category and location.',
    descriptionTe:
      'తయారీ, సేవ, మరియు వ్యవసాయ ఆధారిత రంగాలలో సూక్ష్మ వ్యాపార సంస్థలు స్థాపించడానికి రుణ-సంబంధ సబ్సిడీ. వర్గం మరియు స్థానం ఆధారంగా ప్రాజెక్ట్ ఖర్చులో 15-35% సబ్సిడీ.',
    eligibility:
      'Age 18+; 8th pass for project above ₹10L; not availed of any govt subsidy before.',
    eligibilityTe:
      'వయస్సు 18+; ₹10L కంటే ఎక్కువ ప్రాజెక్ట్ కోసం 8వ తరగతి పాస్; ముందు ఏ ప్రభుత్వ సబ్సిడీ పొందనివారు.',
    deadline: 'rolling',
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    lastVerified: '2025-10-01',
    tags: ['job-seeker', 'entrepreneur', 'MSME', 'subsidy', 'self-employment', 'central'],
    personas: ['job-seeker'],
    hasApplyLink: true,
  },
];

// Helper: get resources by persona
export function getResourcesByPersona(persona: PersonaId): Resource[] {
  return resources.filter((r) => r.personas.includes(persona));
}

// Helper: get resources by type
export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter((r) => r.type === type);
}

// Helper: get resource by id
export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

// Tokenized search — score a resource against a query
export function scoreResource(resource: Resource, tokens: string[]): number {
  const haystack = [
    resource.title,
    resource.titleTe,
    resource.description,
    resource.descriptionTe,
    resource.provider,
    resource.eligibility,
    resource.type,
    ...resource.tags,
    ...(resource.state ? [resource.state] : []),
    ...resource.personas,
  ]
    .join(' ')
    .toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) score++;
    // Boost exact title match
    if (resource.title.toLowerCase().includes(token)) score += 2;
    if (resource.titleTe.includes(token)) score += 2;
    // Boost tag match
    if (resource.tags.some((t) => t.toLowerCase().includes(token))) score++;
    // Boost type match
    if (resource.type === token) score += 3;
    // Boost persona match
    if (resource.personas.some((p) => p === token)) score += 2;
  }
  return score;
}
