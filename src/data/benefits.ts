// ============================================================
// SevaPath — Verified Government Benefits Data
// All 20 schemes verified against official .gov.in / .nic.in portals
// ============================================================

import { Benefit, Category, CategoryId } from '../types';

export const categories: Category[] = [
  {
    "id": "education",
    "name": "Education",
    "nameTe": "విద్య",
    "description": "Scholarships & student support",
    "descriptionTe": "స్కాలర్‌షిప్‌లు & విద్యార్థి సహాయం",
    "icon": "GraduationCap"
  },
  {
    "id": "jobs-skills",
    "name": "Jobs & Skills",
    "nameTe": "ఉద్యోగాలు & నైపుణ్యాలు",
    "description": "Jobs, training & employment",
    "descriptionTe": "ఉద్యోగాలు, శిక్షణ & ఉపాధి",
    "icon": "Briefcase"
  },
  {
    "id": "financial-support",
    "name": "Financial Support",
    "nameTe": "ఆర్థిక సహాయం",
    "description": "Pensions, assistance & subsidies",
    "descriptionTe": "పెన్షన్‌లు, సహాయం & సబ్సిడీలు",
    "icon": "Wallet"
  },
  {
    "id": "housing",
    "name": "Housing",
    "nameTe": "గృహ నిర్మాణం",
    "description": "Housing-related support",
    "descriptionTe": "గృహ సంబంధిత సహాయం",
    "icon": "Home"
  },
  {
    "id": "farming",
    "name": "Farming",
    "nameTe": "వ్యవసాయం",
    "description": "Farmer & agriculture support",
    "descriptionTe": "రైతు & వ్యవసాయ సహాయం",
    "icon": "Wheat"
  },
  {
    "id": "health",
    "name": "Health",
    "nameTe": "ఆరోగ్యం",
    "description": "Healthcare assistance",
    "descriptionTe": "ఆరోగ్య సంరక్షణ సహాయం",
    "icon": "Heart"
  },
  {
    "id": "women-family",
    "name": "Women & Family",
    "nameTe": "మహిళలు & కుటుంబం",
    "description": "Women, children & family support",
    "descriptionTe": "మహిళలు, పిల్లలు & కుటుంబ సహాయం",
    "icon": "Users"
  },
  {
    "id": "business",
    "name": "Business",
    "nameTe": "వ్యాపారం",
    "description": "Loans & entrepreneurship",
    "descriptionTe": "రుణాలు & వ్యవసాయదారిత్వం",
    "icon": "Store"
  }
];

export const demoBenefits: Benefit[] = [
  {
    "id": "edu-post-matric",
    "name": "Post-Matric Scholarship Scheme (NSP)",
    "nameTe": "పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ పథకం (NSP)",
    "category": "education",
    "description": "Central scholarship providing financial assistance for students from economically weaker sections pursuing Class 11 through post-graduate education.",
    "descriptionTe": "11వ తరగతి నుండి పోస్ట్-గ్రాడ్యుయేట్ వరకు విద్యను అభ్యసిస్తున్న బలహీన వర్గాల విద్యార్థులకు కేంద్ర స్కాలర్‌షిప్ సహాయం.",
    "benefit": "Full or partial tuition fee reimbursement and monthly maintenance allowance.",
    "benefitTe": "పూర్తి లేదా పాక్షిక ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు నెలవారీ నిర్వహణ భత్యం.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Student",
        "labelTe": "విద్యార్థి",
        "condition": "Must be an enrolled student",
        "conditionTe": "నమోదైన విద్యార్థి అయి ఉండాలి",
        "matchKey": "student"
      },
      {
        "field": "educationLevel",
        "label": "Post-matric level",
        "labelTe": "పోస్ట్-మెట్రిక్ స్థాయి",
        "condition": "Studying at post-matric level (Class 11+)",
        "conditionTe": "పోస్ట్-మెట్రిక్ స్థాయి లేదా అంతకంటే ఎక్కువ చదువుతున్నారు",
        "matchKey": "post-matric"
      },
      {
        "field": "income",
        "label": "Family income criteria",
        "labelTe": "కుటుంబ ఆదాయ ప్రమాణాలు",
        "condition": "Family annual income within ₹2.5 lakh limit",
        "conditionTe": "కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల పరిమితిలో ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Unique identification document",
        "descriptionTe": "ప్రత్యేక గుర్తింపు పత్రం",
        "whyNeeded": "Identity and DBT authentication",
        "whyNeededTe": "గుర్తింపు మరియు DBT ధృవీకరణ",
        "howToGet": "Apply at nearest Aadhaar enrollment center or online at myaadhaar.uidai.gov.in.",
        "howToGetTe": "సమీపంలోని ఆధార్ కేంద్రంలో లేదా myaadhaar.uidai.gov.in లో దరఖాస్తు చేయండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "15–30 days"
      },
      {
        "id": "student-id",
        "name": "Bonafide / Enrollment Certificate",
        "nameTe": "బోనాఫైడ్ / నమోదు ధృవీకరణ పత్రం",
        "description": "Proof of enrollment in recognized institution",
        "descriptionTe": "గుర్తింపు పొందిన విద్యా సంస్థలో నమోదు రుజువు",
        "whyNeeded": "To verify current academic enrollment",
        "whyNeededTe": "ప్రస్తుత విద్యా నమోదును ధృవీకరించడానికి",
        "howToGet": "Request from your college or institution administration.",
        "howToGetTe": "మీ కళాశాల పరిపాలన నుండి పొందండి.",
        "estimatedTime": "1–3 days"
      },
      {
        "id": "income-cert",
        "name": "Income Certificate",
        "nameTe": "ఆదాయ ధృవీకరణ పత్రం",
        "description": "Certificate issued by Tahsildar / Revenue Authority",
        "descriptionTe": "తహసీల్దార్ జారీ చేసిన కుటుంబ ఆదాయ పత్రం",
        "whyNeeded": "Income verification for eligibility",
        "whyNeededTe": "అర్హత కోసం ఆదాయ ధృవీకరణ",
        "howToGet": "Apply at MeeSeva / e-Seva portal or local Tahsildar office.",
        "howToGetTe": "మీసేవ పోర్టల్ లేదా తహసీల్దార్ కార్యాలయంలో దరఖాస్తు చేయండి.",
        "officialLink": "https://onlineap.meeseva.gov.in",
        "estimatedTime": "7–15 days"
      },
      {
        "id": "caste-cert",
        "name": "Community / Category Certificate",
        "nameTe": "సామాజిక వర్గ ధృవీకరణ పత్రం",
        "description": "Certificate showing SC/ST/OBC community category",
        "descriptionTe": "SC/ST/OBC సామాజిక వర్గాన్ని తెలిపే ధృవీకరణ పత్రం",
        "whyNeeded": "Reservation category verification",
        "whyNeededTe": "రిజర్వేషన్ వర్గ ధృవీకరణ కోసం",
        "howToGet": "Apply at MeeSeva portal or local revenue office.",
        "howToGetTe": "మీసేవ పోర్టల్ లేదా స్థానిక రెవెన్యూ కార్యాలయంలో దరఖాస్తు చేయండి.",
        "officialLink": "https://onlineap.meeseva.gov.in",
        "estimatedTime": "7–15 days"
      }
    ],
    "preparationTime": "~15–20 min",
    "effortLevel": "moderate",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "One-Time Registration (OTR)",
        "titleTe": "వన్-టైమ్ రిజిస్ట్రేషన్ (OTR)",
        "description": "Register on NSP portal with your Aadhaar and mobile number.",
        "descriptionTe": "ఆధార్ మరియు మొబైల్ నంబర్‌తో NSP పోర్టల్‌లో నమోదు చేసుకోండి."
      },
      {
        "step": 2,
        "title": "Fill Scholarship Application",
        "titleTe": "స్కాలర్‌షిప్ దరఖాస్తును నింపండి",
        "description": "Fill institutional, academic, and bank account details.",
        "descriptionTe": "సంస్థాగత, విద్యా మరియు బ్యాంక్ ఖాతా వివరాలను నింపండి."
      },
      {
        "step": 3,
        "title": "Upload Documents",
        "titleTe": "పత్రాలను అప్‌లోడ్ చేయండి",
        "description": "Upload income certificate, marksheet, and fee receipt.",
        "descriptionTe": "ఆదాయ ధృవీకరణ పత్రం, మార్కుల జాబితా మరియు ఫీజు రశీదును అప్‌లోడ్ చేయండి."
      },
      {
        "step": 4,
        "title": "Institutional Verification",
        "titleTe": "సంస్థాగత ధృవీకరణ",
        "description": "Your institute verifies application before state nodal scrutiny.",
        "descriptionTe": "రాష్ట్ర పరిశీలనకు ముందు మీ సంస్థ దరఖాస్తును ధృవీకరిస్తుంది."
      }
    ],
    "officialSource": "National Scholarship Portal (NSP)",
    "officialSourceTe": "జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "sourceUrl": "https://scholarships.gov.in",
    "department": "Ministry of Social Justice and Empowerment / Tribal Affairs, Govt. of India",
    "departmentTe": "సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against official NSP portal guidelines.",
    "verificationNotesTe": "అధికారిక NSP పోర్టల్ మార్గదర్శకాల ఆధారంగా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "edu-vidyalaxmi",
    "name": "PM Vidyalaxmi / Vidya Lakshmi Scheme",
    "nameTe": "పిఎం విద్యాలక్ష్మి విద్యా రుణ పథకం",
    "category": "education",
    "description": "First-of-its-kind portal for students seeking education loans and government interest subvention schemes across all Indian banks.",
    "descriptionTe": "భారతదేశంలోని అన్ని బ్యాంకులలో విద్యా రుణాలు మరియు ప్రభుత్వ వడ్డీ రాయితీ కోసం సింగిల్ విండో పోర్టల్.",
    "benefit": "Education loan processing and interest subvention up to ₹10 lakh without collateral.",
    "benefitTe": "₹10 లక్షల వరకు పూచీకత్తు లేని విద్యా రుణం మరియు వడ్డీ రాయితీ.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Student",
        "labelTe": "విద్యార్థి",
        "condition": "Must be an enrolled student",
        "conditionTe": "నమోదైన విద్యార్థి అయి ఉండాలి",
        "matchKey": "student"
      },
      {
        "field": "educationLevel",
        "label": "Higher education",
        "labelTe": "ఉన్నత విద్య",
        "condition": "Pursuing higher education in India or abroad",
        "conditionTe": "భారతదేశంలో లేదా విదేశాలలో ఉన్నత విద్యను అభ్యసిస్తున్నారు",
        "matchKey": "higher-edu"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity proof of student and co-borrower",
        "descriptionTe": "విద్యార్థి మరియు సహ-రుణగ్రహీత గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "Download e-Aadhaar from myaadhaar.uidai.gov.in.",
        "howToGetTe": "myaadhaar.uidai.gov.in నుండి e-ఆధార్ డౌన్‌లోడ్ చేసుకోండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "Instant / 1 day"
      },
      {
        "id": "admission-letter",
        "name": "Admission Offer Letter",
        "nameTe": "అడ్మిషన్ ఆఫర్ లెటర్",
        "description": "Official letter of admission from accredited institution",
        "descriptionTe": "గుర్తింపు పొందిన విద్యా సంస్థ నుండి ప్రవేశ పత్రం",
        "whyNeeded": "Proof of admission into higher education",
        "whyNeededTe": "ఉన్నత విద్యలో ప్రవేశ రుజువు",
        "howToGet": "Obtained from your college/university.",
        "howToGetTe": "మీ కళాశాల నుండి పొందండి.",
        "estimatedTime": "Upon admission"
      },
      {
        "id": "fee-structure",
        "name": "Course Fee Structure",
        "nameTe": "కోర్సు ఫీజు వివరాలు",
        "description": "Detailed semester/annual fee schedule issued by institute",
        "descriptionTe": "సంస్థ జారీ చేసిన వివరణాత్మక ఫీజు షెడ్యూల్",
        "whyNeeded": "Determines the loan eligibility amount",
        "whyNeededTe": "రుణ అర్హత మొత్తాన్ని నిర్ణయిస్తుంది",
        "howToGet": "Obtain official fee structure from accounts department.",
        "howToGetTe": "ఖాతాల విభాగం నుండి ఫీజు షెడ్యూల్ పొందండి.",
        "estimatedTime": "1–2 days"
      }
    ],
    "preparationTime": "~20–30 min",
    "effortLevel": "moderate",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register on Vidya Lakshmi",
        "titleTe": "విద్యాలక్ష్మిలో నమోదు చేయండి",
        "description": "Create applicant account with email and mobile number.",
        "descriptionTe": "ఇమెయిల్ మరియు మొబైల్ నంబర్‌తో దరఖాస్తుదారు ఖాతాను సృష్టించండి."
      },
      {
        "step": 2,
        "title": "Fill CELAF Form",
        "titleTe": "CELAF ఫారమ్ నింపండి",
        "description": "Fill the Common Education Loan Application Form.",
        "descriptionTe": "కామన్ ఎడ్యుకేషన్ లోన్ అప్లికేషన్ ఫారమ్ (CELAF) నింపండి."
      },
      {
        "step": 3,
        "title": "Select Banks & Schemes",
        "titleTe": "బ్యాంకులు & పథకాలను ఎంచుకోండి",
        "description": "Apply to up to 3 banks and schemes simultaneously.",
        "descriptionTe": "ఒకేసారి 3 బ్యాంకులు మరియు పథకాలకు దరఖాస్తు చేయండి."
      }
    ],
    "officialSource": "Department of Higher Education, Ministry of Education, Govt. of India",
    "officialSourceTe": "ఉన్నత విద్యా శాఖ, విద్యా మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pmvidyalaxmi.co.in",
    "sourceUrl": "https://pmvidyalaxmi.co.in",
    "department": "Ministry of Education & Indian Banks Association",
    "departmentTe": "విద్యా మంత్రిత్వ శాఖ & ఇండియన్ బ్యాంక్స్ అసోసియేషన్",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to PM Vidyalaxmi new official portal (pmvidyalaxmi.co.in). Old vidyalakshmi.co.in domain discontinued.",
    "verificationNotesTe": "PM విద్యాలక్ష్మి కొత్త అధికారిక పోర్టల్ (pmvidyalaxmi.co.in)కి నవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "jobs-skill-dev",
    "name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    "nameTe": "ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన (PMKVY)",
    "category": "jobs-skills",
    "description": "Flagship skill certification scheme of the Ministry of Skill Development to enable Indian youth to take up industry-relevant training for better livelihoods.",
    "descriptionTe": "భారతీయ యువత మెరుగైన ఉపాధి కోసం పరిశ్రమ-సంబంధిత నైపుణ్య శిక్షణ పొందేందుకు కేంద్ర ఫ్లాగ్‌షిప్ పథకం.",
    "benefit": "Free industry-certified vocational training, stipend, and placement assistance.",
    "benefitTe": "ఉచిత పరిశ్రమ-ధృవీకృత వృత్తి శిక్షణ, స్టైపెండ్ మరియు ప్లేస్‌మెంట్ సహాయం.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Job seeker / Youth",
        "labelTe": "ఉద్యోగార్ధి / యువత",
        "condition": "Indian youth looking for skills or employment",
        "conditionTe": "నైపుణ్యాలు లేదా ఉపాధి కోరుకునే భారతీయ యువత",
        "matchKey": "job-seeker"
      },
      {
        "field": "age",
        "label": "Age 15–45 years",
        "labelTe": "వయస్సు 15–45 సంవత్సరాలు",
        "condition": "Must be between 15 and 45 years of age",
        "conditionTe": "15 నుండి 45 సంవత్సరాల మధ్య వయస్సు ఉండాలి",
        "matchKey": "age-youth"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Proof of identity and Indian citizenship",
        "descriptionTe": "గుర్తింపు మరియు భారత పౌరసత్వ రుజువు",
        "whyNeeded": "Trainee biometric authentication",
        "whyNeededTe": "శిక్షణార్థి బయోమెట్రిక్ ధృవీకరణ",
        "howToGet": "From UIDAI portal.",
        "howToGetTe": "UIDAI పోర్టల్ నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "edu-cert",
        "name": "Educational Certificate (10th/12th/Diploma)",
        "nameTe": "విద్యా ధృవీకరణ పత్రం (10వ/12వ/డిప్లొమా)",
        "description": "Proof of highest completed educational qualification",
        "descriptionTe": "పూర్తయిన అత్యున్నత విద్యా అర్హత రుజువు",
        "whyNeeded": "Course prerequisites verification",
        "whyNeededTe": "కోర్సు ముందస్తు అర్హతల ధృవీకరణ",
        "howToGet": "From your school board or institution.",
        "howToGetTe": "మీ పాఠశాల బోర్డు లేదా సంస్థ నుండి.",
        "estimatedTime": "1–2 days"
      }
    ],
    "preparationTime": "~10–15 min",
    "effortLevel": "easy",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Find Training Center",
        "titleTe": "శిక్షణ కేంద్రాన్ని కనుగొనండి",
        "description": "Search accredited PMKVY centers on Skill India Digital.",
        "descriptionTe": "స్కిల్ ఇండియా డిజిటల్‌లో గుర్తింపు పొందిన PMKVY కేంద్రాలను శోధించండి."
      },
      {
        "step": 2,
        "title": "Select Job Role",
        "titleTe": "జాబ్ రోల్ ఎంచుకోండి",
        "description": "Select an in-demand sector: IT, healthcare, manufacturing, etc.",
        "descriptionTe": "ఐటీ, హెల్త్‌కేర్, తయారీ వంటి డిమాండ్ ఉన్న రంగాన్ని ఎంచుకోండి."
      },
      {
        "step": 3,
        "title": "Enroll & Attend Training",
        "titleTe": "నమోదు చేసుకుని శిక్షణకు హాజరవ్వండి",
        "description": "Complete coursework, practical assessment, and get certified.",
        "descriptionTe": "కోర్సువర్క్, ప్రాక్టికల్ అసెస్‌మెంట్ పూర్తి చేసి సర్టిఫికేట్ పొందండి."
      }
    ],
    "officialSource": "Skill India Digital Hub",
    "officialSourceTe": "స్కిల్ ఇండియా డిజిటల్ హబ్",
    "officialApplicationUrl": "https://www.skillindiadigital.gov.in",
    "sourceUrl": "https://www.skillindiadigital.gov.in",
    "department": "Ministry of Skill Development & Entrepreneurship, Govt. of India",
    "departmentTe": "నైపుణ్యాభివృద్ధి మరియు వ్యవస్థాపకత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against Skill India Digital portal.",
    "verificationNotesTe": "స్కిల్ ఇండియా డిజిటల్ పోర్టల్ ఆధారంగా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "jobs-employment-exchange",
    "name": "National Career Service (NCS)",
    "nameTe": "జాతీయ కెరీర్ సేవ (NCS)",
    "category": "jobs-skills",
    "description": "Mission Mode project under Ministry of Labour and Employment providing job matching, career counseling, vocational guidance, and job fair listings nationwide.",
    "descriptionTe": "దేశవ్యాప్తంగా ఉద్యోగ సమాచారం, కెరీర్ కౌన్సెలింగ్ మరియు జాబ్ మేళాల సమాచారం అందించే కేంద్ర ప్రాజెక్ట్.",
    "benefit": "Direct access to verified government and private job openings without intermediaries.",
    "benefitTe": "మధ్యవర్తులు లేకుండా ధృవీకరించబడిన ప్రభుత్వ మరియు ప్రైవేట్ ఉద్యోగ అవకాశాలకు ప్రత్యక్ష ప్రాప్యత.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Job seeker",
        "labelTe": "ఉద్యోగాన్వేషి",
        "condition": "Looking for employment or career transition",
        "conditionTe": "ఉపాధి లేదా కెరీర్ మార్పు కోసం వెతుకుతున్నారు",
        "matchKey": "looking-for-work"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar / Voter ID",
        "nameTe": "ఆధార్ / ఓటర్ ID",
        "description": "Proof of identity",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI or Election Commission.",
        "howToGetTe": "UIDAI లేదా ఎన్నికల సంఘం నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "edu-cert",
        "name": "Educational Documents",
        "nameTe": "విద్యా పత్రాలు",
        "description": "Marksheets and degree certificates",
        "descriptionTe": "మార్కుల పత్రాలు మరియు డిగ్రీ సర్టిఫికేట్లు",
        "whyNeeded": "Qualification verification for recruiters",
        "whyNeededTe": "నియామకాల కోసం అర్హత ధృవీకరణ",
        "howToGet": "From issuing board/university.",
        "howToGetTe": "బోర్డు/విశ్వవిద్యాలయం నుండి.",
        "estimatedTime": "1–2 days"
      }
    ],
    "preparationTime": "~10–15 min",
    "effortLevel": "easy",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register as Jobseeker",
        "titleTe": "ఉద్యోగాన్వేషిగా నమోదు చేసుకోండి",
        "description": "Create profile with personal, education, and skill details.",
        "descriptionTe": "వ్యక్తిగత, విద్యా మరియు నైపుణ్య వివరాలతో ప్రొఫైల్ సృష్టించండి."
      },
      {
        "step": 2,
        "title": "Search & Apply",
        "titleTe": "శోధించండి & దరఖాస్తు చేసుకోండి",
        "description": "Filter vacancies by location, sector, and salary.",
        "descriptionTe": "ప్రాంతం, రంగం మరియు జీతం ఆధారంగా ఖాళీలను ఫిల్టర్ చేయండి."
      }
    ],
    "officialSource": "Ministry of Labour and Employment, Govt. of India",
    "officialSourceTe": "కార్మిక మరియు ఉపాధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://www.ncs.gov.in",
    "sourceUrl": "https://www.ncs.gov.in",
    "department": "Directorate General of Employment",
    "departmentTe": "ఉపాధి డైరెక్టరేట్ జనరల్",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against NCS portal.",
    "verificationNotesTe": "NCS పోర్టల్ ఆధారంగా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "pm-internship",
    "name": "PM Internship Scheme (MCA)",
    "nameTe": "పిఎం ఇంటర్న్‌షిప్ పథకం",
    "category": "jobs-skills",
    "description": "Government initiative offering 12-month paid internships in top 500 Indian companies to youth aged 21–24.",
    "descriptionTe": "21-24 సంవత్సరాల వయస్సు గల యువతకు అగ్రశ్రేణి 500 భారతీయ కంపెనీలలో 12 నెలల చెల్లింపు ఇంటర్న్‌షిప్‌లను అందించే కేంద్ర పథకం.",
    "benefit": "Monthly stipend of ₹5,000 plus ₹6,000 one-time contingency grant directly into bank account.",
    "benefitTe": "నెలకు ₹5,000 స్టైపెండ్ మరియు ₹6,000 ఒకసారి ఆకస్మిక గ్రాంట్ నేరుగా బ్యాంక్ ఖాతాలో జమ.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Youth / Job seeker",
        "labelTe": "యువత / ఉద్యోగార్ధి",
        "condition": "Not in full-time education or regular government job",
        "conditionTe": "పూర్తి-కాల చదువు లేదా ప్రభుత్వ ఉద్యోగంలో లేనివారు",
        "matchKey": "job-seeker"
      },
      {
        "field": "age",
        "label": "Age 21–24 years",
        "labelTe": "వయస్సు 21–24 సంవత్సరాలు",
        "condition": "Candidate must be between 21 and 24 years old",
        "conditionTe": "అభ్యర్థి వయస్సు 21 నుండి 24 సంవత్సరాల మధ్య ఉండాలి",
        "matchKey": "age-youth"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity and age verification",
        "descriptionTe": "గుర్తింపు మరియు వయస్సు ధృవీకరణ",
        "whyNeeded": "e-KYC authentication",
        "whyNeededTe": "e-KYC ధృవీకరణ",
        "howToGet": "From UIDAI portal.",
        "howToGetTe": "UIDAI పోర్టల్ నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "edu-cert",
        "name": "High School / Degree Certificate",
        "nameTe": "డిగ్రీ / డిప్లొమా సర్టిఫికేట్",
        "description": "Proof of educational qualification",
        "descriptionTe": "విద్యా అర్హత రుజువు",
        "whyNeeded": "Eligibility assessment",
        "whyNeededTe": "అర్హత అంచనా",
        "howToGet": "From college/university.",
        "howToGetTe": "కళాశాల నుండి.",
        "estimatedTime": "1–2 days"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "easy",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Portal Registration",
        "titleTe": "పోర్టల్ రిజిస్ట్రేషన్",
        "description": "Sign up on pminternship.mca.gov.in using Aadhaar.",
        "descriptionTe": "ఆధార్ ఉపయోగించి pminternship.mca.gov.in లో సైన్ అప్ అవ్వండి."
      },
      {
        "step": 2,
        "title": "Browse Opportunities",
        "titleTe": "అవకాశాలను బ్రౌజ్ చేయండి",
        "description": "Review internship slots by industry and location.",
        "descriptionTe": "పరిశ్రమ మరియు ప్రాంతం వారీగా ఇంటర్న్‌షిప్ స్లాట్‌లను సమీక్షించండి."
      },
      {
        "step": 3,
        "title": "Submit Choices",
        "titleTe": "ఎంపికలను సమర్పించండి",
        "description": "Select up to 5 internship preferences.",
        "descriptionTe": "గరిష్టంగా 5 ఇంటర్న్‌షిప్ ప్రాధాన్యతలను ఎంచుకోండి."
      }
    ],
    "officialSource": "Ministry of Corporate Affairs, Govt. of India",
    "officialSourceTe": "కార్పొరేట్ వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pminternship.mca.gov.in",
    "sourceUrl": "https://pminternship.mca.gov.in",
    "department": "Ministry of Corporate Affairs",
    "departmentTe": "కార్పొరేట్ వ్యవహారాల మంత్రిత్వ శాఖ",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against MCA PM Internship portal.",
    "verificationNotesTe": "MCA PM ఇంటర్న్‌షిప్ పోర్టల్ ఆధారంగా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "fin-pension",
    "name": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    "nameTe": "ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పింఛను పథకం (IGNOAPS)",
    "category": "financial-support",
    "description": "National Social Assistance Programme scheme providing monthly social security pensions to senior citizens living below poverty line.",
    "descriptionTe": "దారిద్య్రరేఖకు దిగువన ఉన్న వృద్ధులకు నెలవారీ సామాజిక భద్రతా పింఛను అందించే జాతీయ సామాజిక సహాయ కార్యక్రమం.",
    "benefit": "Monthly pension direct-benefit-transfer into beneficiary bank or post office account.",
    "benefitTe": "లబ్ధిదారుని బ్యాంక్ లేదా పోస్టాఫీసు ఖాతాలో ప్రత్యక్ష నెలవారీ పెన్షన్ జమ.",
    "eligibilityCriteria": [
      {
        "field": "age",
        "label": "Senior citizen (60+ years)",
        "labelTe": "వృద్ధ పౌరుడు (60+ సంవత్సరాలు)",
        "condition": "Applicant must be 60 years of age or older",
        "conditionTe": "దరఖాస్తుదారునికి 60 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు ఉండాలి",
        "matchKey": "senior"
      },
      {
        "field": "income",
        "label": "BPL / Low income criteria",
        "labelTe": "దారిద్య్రరేఖకు దిగువన / తక్కువ ఆదాయం",
        "condition": "Belongs to below poverty line household",
        "conditionTe": "దారిద్య్రరేఖకు దిగువన ఉన్న కుటుంబానికి చెందినవారై ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Proof of identity and age",
        "descriptionTe": "గుర్తింపు మరియు వయస్సు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "age-proof",
        "name": "Age Proof (Birth cert / Voter card)",
        "nameTe": "వయస్సు రుజువు (జనన ధృవీకరణ / ఓటర్ కార్డు)",
        "description": "Document verifying age is 60 or above",
        "descriptionTe": "వయస్సు 60 లేదా అంతకంటే ఎక్కువ ఉన్నట్లు తెలిపే పత్రం",
        "whyNeeded": "Age eligibility check",
        "whyNeededTe": "వయస్సు అర్హత తనిఖీ",
        "howToGet": "From local municipal / revenue office.",
        "howToGetTe": "స్థానిక మునిసిపల్/రెవెన్యూ కార్యాలయం నుండి.",
        "estimatedTime": "3–7 days"
      },
      {
        "id": "bank-passbook",
        "name": "Bank / Post Office Passbook",
        "nameTe": "బ్యాంక్ / పోస్టాఫీసు పాస్‌బుక్",
        "description": "Aadhaar-linked active savings account passbook",
        "descriptionTe": "ఆధార్-లింక్ చేయబడిన పొదుపు ఖాతా పాస్‌బుక్",
        "whyNeeded": "Direct Benefit Transfer (DBT)",
        "whyNeededTe": "ప్రత్యక్ష నగదు బదిలీ కోసం",
        "howToGet": "From your local bank or post office branch.",
        "howToGetTe": "మీ స్థానిక బ్యాంక్ లేదా పోస్టాఫీసు శాఖ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~20 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Obtain Form",
        "titleTe": "ఫారమ్ పొందండి",
        "description": "Download NSAP form or collect from Gram Panchayat / Ward Office / MeeSeva.",
        "descriptionTe": "గ్రామ పంచాయతీ / వార్డు కార్యాలయం / మీసేవ నుండి ఫారమ్ తీసుకోండి."
      },
      {
        "step": 2,
        "title": "Submit Documents",
        "titleTe": "పత్రాలను సమర్పించండి",
        "description": "Submit along with age proof, BPL card, and bank account copy.",
        "descriptionTe": "వయస్సు రుజువు, BPL కార్డు మరియు బ్యాంక్ ఖాతా కాపీతో సమర్పించండి."
      },
      {
        "step": 3,
        "title": "Field Verification",
        "titleTe": "క్షేత్ర ధృవీకరణ",
        "description": "Local revenue inspector verifies eligibility.",
        "descriptionTe": "స్థానిక రెవెన్యూ ఇన్‌స్పెక్టర్ అర్హతను ధృవీకరిస్తారు."
      }
    ],
    "officialSource": "National Social Assistance Programme (NSAP), Govt. of India",
    "officialSourceTe": "జాతీయ సామాజిక సహాయ కార్యక్రమం (NSAP)",
    "officialApplicationUrl": "https://nsap.dord.gov.in",
    "sourceUrl": "https://nsap.dord.gov.in",
    "department": "Ministry of Rural Development, Dept. of Rural Development, Govt. of India",
    "departmentTe": "గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to new NSAP portal nsap.dord.gov.in (migrated from nsap.nic.in). Apply via Gram Panchayat or UMANG app.",
    "verificationNotesTe": "కొత్త NSAP పోర్టల్ nsap.dord.gov.in కి నవీకరించబడింది. గ్రామ పంచాయతీ లేదా UMANG యాప్ ద్వారా దరఖాస్తు చేయవచ్చు.",
    "isDemoData": false
  },
  {
    "id": "fin-widow-pension",
    "name": "Indira Gandhi National Widow Pension Scheme (IGNWPS)",
    "nameTe": "ఇందిరా గాంధీ జాతీయ వితంతువు పింఛను పథకం (IGNWPS)",
    "category": "financial-support",
    "description": "Social security pension providing monthly financial support to widows living below the poverty line.",
    "descriptionTe": "దారిద్య్రరేఖకు దిగువన ఉన్న వితంతువులకు నెలవారీ ఆర్థిక సహాయం అందించే సామాజిక భద్రతా పథకం.",
    "benefit": "Monthly pension credited directly to beneficiary account.",
    "benefitTe": "లబ్ధిదారు ఖాతాలో నేరుగా నెలవారీ పింఛను జమ.",
    "eligibilityCriteria": [
      {
        "field": "additionalCircumstances",
        "label": "Widowed status",
        "labelTe": "వితంతువు స్థితి",
        "condition": "Widow aged 40–79 living below poverty line",
        "conditionTe": "దారిద్య్రరేఖకు దిగువన నివసించే 40–79 సంవత్సరాల వయస్సు గల వితంతువు",
        "matchKey": "widow"
      },
      {
        "field": "income",
        "label": "BPL / Low income",
        "labelTe": "BPL / తక్కువ ఆదాయం",
        "condition": "Family income within BPL criteria",
        "conditionTe": "కుటుంబ ఆదాయం BPL ప్రమాణాల పరిధిలో ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Proof of identity",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "death-cert",
        "name": "Husband Death Certificate",
        "nameTe": "భర్త మరణ ధృవీకరణ పత్రం",
        "description": "Official death certificate issued by municipal/panchayat authority",
        "descriptionTe": "మునిసిపాలిటీ లేదా పంచాయతీ జారీ చేసిన మరణ ధృవీకరణ పత్రం",
        "whyNeeded": "Marital status verification",
        "whyNeededTe": "వైవాహిక స్థితి ధృవీకరణ",
        "howToGet": "From municipal birth/death registrar office.",
        "howToGetTe": "జనన/మరణ రిజిస్ట్రార్ కార్యాలయం నుండి.",
        "estimatedTime": "7–15 days"
      },
      {
        "id": "bank-passbook",
        "name": "Bank Passbook",
        "nameTe": "బ్యాంక్ పాస్‌బుక్",
        "description": "Individual savings account passbook",
        "descriptionTe": "వ్యక్తిగత పొదుపు ఖాతా పాస్‌బుక్",
        "whyNeeded": "DBT pension credit",
        "whyNeededTe": "పెన్షన్ క్రెడిట్ కోసం",
        "howToGet": "From your bank branch.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~20 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Fill Application",
        "titleTe": "దరఖాస్తు నింపండి",
        "description": "Submit NSAP application through local revenue/panchayat office or state portal.",
        "descriptionTe": "స్థానిక రెవెన్యూ కార్యాలయం లేదా పోర్టల్ ద్వారా సమర్పించండి."
      },
      {
        "step": 2,
        "title": "Submit Proofs",
        "titleTe": "రుజువులను సమర్పించండి",
        "description": "Attach husband death certificate and income proof.",
        "descriptionTe": "భర్త మరణ ధృవీకరణ పత్రం మరియు ఆదాయ రుజువును జతచేయండి."
      }
    ],
    "officialSource": "Ministry of Rural Development, Govt. of India",
    "officialSourceTe": "గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://nsap.dord.gov.in",
    "sourceUrl": "https://nsap.dord.gov.in",
    "department": "National Social Assistance Programme, Ministry of Rural Development",
    "departmentTe": "జాతీయ సామాజిక సహాయ కార్యక్రమం",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to new NSAP portal nsap.dord.gov.in. Apply via Gram Panchayat / District Social Welfare office.",
    "verificationNotesTe": "కొత్త NSAP పోర్టల్ nsap.dord.gov.in కి నవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "housing-support",
    "name": "Pradhan Mantri Awas Yojana (PMAY)",
    "nameTe": "ప్రధాన మంత్రి ఆవాస్ యోజన (PMAY)",
    "category": "housing",
    "description": "Flagship mission to provide pucca houses with basic amenities to all eligible urban and rural families.",
    "descriptionTe": "అర్హులైన పట్టణ మరియు గ్రామీణ కుటుంబాలన్నింటికీ ప్రాథమిక సౌకర్యాలతో కూడిన పక్కా ఇళ్లను అందించే ప్రధాన పథకం.",
    "benefit": "Direct subsidy / financial assistance of ₹1.2 lakh to ₹2.5 lakh for house construction.",
    "benefitTe": "గృహ నిర్మాణానికి ₹1.2 లక్షల నుండి ₹2.5 లక్షల వరకు ప్రత్యక్ష రాయితీ/ఆర్థిక సహాయం.",
    "eligibilityCriteria": [
      {
        "field": "needs",
        "label": "Housing need",
        "labelTe": "గృహ అవసరం",
        "condition": "Family does not own a pucca house in India",
        "conditionTe": "భారతదేశంలో కుటుంబానికి స్వంత పక్కా ఇల్లు ఉండకూడదు",
        "matchKey": "housing-need"
      },
      {
        "field": "income",
        "label": "EWS / LIG income criteria",
        "labelTe": "EWS / LIG ఆదాయ ప్రమాణాలు",
        "condition": "Annual family income within EWS/LIG limits",
        "conditionTe": "కుటుంబ ఆదాయం EWS/LIG పరిమితుల పరిధిలో ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar of all family members",
        "nameTe": "కుటుంబ సభ్యులందరి ఆధార్ కార్డులు",
        "description": "Identity proof for all household members",
        "descriptionTe": "కుటుంబ సభ్యులందరి గుర్తింపు రుజువు",
        "whyNeeded": "Beneficiary deduplication",
        "whyNeededTe": "డూప్లికేషన్ నివారణకు",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "income-cert",
        "name": "Income Certificate",
        "nameTe": "ఆదాయ ధృవీకరణ పత్రం",
        "description": "Proof of annual household income",
        "descriptionTe": "కుటుంబ వార్షిక ఆదాయ రుజువు",
        "whyNeeded": "Income category eligibility",
        "whyNeededTe": "ఆదాయ వర్గ అర్హత కోసం",
        "howToGet": "From Tahsildar / Revenue department.",
        "howToGetTe": "తహసీల్దార్ కార్యాలయం నుండి.",
        "officialLink": "https://onlineap.meeseva.gov.in",
        "estimatedTime": "7–15 days"
      },
      {
        "id": "land-docs",
        "name": "Land / Site Documents",
        "nameTe": "స్థల పత్రాలు / పట్టా",
        "description": "Title deed, pattadar passbook, or municipal plot allotment",
        "descriptionTe": "యాజమాన్య హక్కు పత్రం లేదా పట్టా",
        "whyNeeded": "Proof of land possession for construction",
        "whyNeededTe": "నిర్మాణం కోసం భూమి స్వాధీన రుజువు",
        "howToGet": "From local revenue authority or registrar.",
        "howToGetTe": "స్థానిక రెవెన్యూ అధికారం నుండి.",
        "estimatedTime": "3–7 days"
      }
    ],
    "preparationTime": "~25 min",
    "effortLevel": "higher",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Citizen Assessment",
        "titleTe": "పౌర అంచనా",
        "description": "Apply on pmaymis.gov.in or via Common Service Centre (CSC).",
        "descriptionTe": "pmaymis.gov.in లేదా CSC కేంద్రం ద్వారా దరఖాస్తు చేసుకోండి."
      },
      {
        "step": 2,
        "title": "Geo-Tagging & Verification",
        "titleTe": "జియో-ట్యాగింగ్ & ధృవీకరణ",
        "description": "Physical inspection and geo-tagging of construction site.",
        "descriptionTe": "నిర్మాణ స్థలం భౌతిక తనిఖీ మరియు జియో-ట్యాగింగ్."
      },
      {
        "step": 3,
        "title": "Stage-wise Disbursement",
        "titleTe": "దశలవారీ నిధుల విడుదల",
        "description": "Funds released directly to bank account across build milestones.",
        "descriptionTe": "నిర్మాణ మైలురాళ్ల ఆధారంగా నేరుగా బ్యాంక్ ఖాతాలో నిధుల విడుదల."
      }
    ],
    "officialSource": "Ministry of Housing and Urban Affairs / Ministry of Rural Development",
    "officialSourceTe": "గృహనిర్మాణ మరియు పట్టణ వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pmay-urban.gov.in",
    "sourceUrl": "https://pmay-urban.gov.in",
    "department": "Ministry of Housing & Urban Affairs / Ministry of Rural Development, Govt. of India",
    "departmentTe": "గృహనిర్మాణ మరియు పట్టణ వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to pmay-urban.gov.in (PMAY-U 2.0 portal). pmaymis.gov.in returned 404. Rural applications via pmayg.dord.gov.in.",
    "verificationNotesTe": "pmay-urban.gov.in కి నవీకరించబడింది. pmaymis.gov.in 404 ఇచ్చింది.",
    "isDemoData": false
  },
  {
    "id": "farm-income-support",
    "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    "nameTe": "పిఎం-కిసాన్ సమ్మాన్ నిధి",
    "category": "farming",
    "description": "Central sector scheme providing income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.",
    "descriptionTe": "భారతదేశంలోని భూమిగల రైతు కుటుంబాలన్నింటికీ మూడు సమాన వాయిదాలలో సంవత్సరానికి ₹6,000 ఆదాయ సహాయాన్ని అందించే పథకం.",
    "benefit": "₹6,000 per year directly transferred to farmer Aadhaar-seeded bank account.",
    "benefitTe": "రైతు ఆధార్-లింక్డ్ బ్యాంక్ ఖాతాకు నేరుగా సంవత్సరానికి ₹6,000 జమ.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Farmer",
        "labelTe": "రైతు",
        "condition": "Landholding farmer family with cultivable land",
        "conditionTe": "సాగుభూమి ఉన్న భూమిగల రైతు కుటుంబం",
        "matchKey": "farmer"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Aadhaar linked with mobile and bank account",
        "descriptionTe": "మొబైల్ మరియు బ్యాంక్‌తో లింక్ చేయబడిన ఆధార్",
        "whyNeeded": "Mandatory e-KYC authentication",
        "whyNeededTe": "తప్పనిసరి e-KYC ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "land-records",
        "name": "Land Ownership Record (Pattadar / RoR 1-B)",
        "nameTe": "భూ యాజమాన్య రికార్డు (పట్టాదార్ / RoR 1-B)",
        "description": "Certified land title record showing farmer name",
        "descriptionTe": "రైతు పేరుతో కూడిన ధృవీకరించబడిన భూమి హక్కు రికార్డు",
        "whyNeeded": "Cultivable land ownership verification",
        "whyNeededTe": "సాగుభూమి యాజమాన్య ధృవీకరణ",
        "howToGet": "From MeeBhoomi / Dharani / Tahsildar portal.",
        "howToGetTe": "మీభూమి / ధరణి / తహసీల్దార్ నుండి.",
        "officialLink": "https://meebhoomi.ap.gov.in",
        "estimatedTime": "Instant / 3 days"
      },
      {
        "id": "bank-passbook",
        "name": "Aadhaar-seeded Bank Account",
        "nameTe": "ఆధార్-సీడెడ్ బ్యాంక్ ఖాతా",
        "description": "Active NPCI-mapped bank account",
        "descriptionTe": "యాక్టివ్ NPCI-మ్యాప్ చేయబడిన బ్యాంక్ ఖాతా",
        "whyNeeded": "DBT installment transfer",
        "whyNeededTe": "DBT వాయిదాల బదిలీ కోసం",
        "howToGet": "From your bank.",
        "howToGetTe": "మీ బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~10–15 min",
    "effortLevel": "easy",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "New Farmer Registration",
        "titleTe": "కొత్త రైతు నమోదు",
        "description": "Visit pmkisan.gov.in and select New Farmer Registration.",
        "descriptionTe": "pmkisan.gov.in సందర్శించి కొత్త రైతు నమోదు ఎంచుకోండి."
      },
      {
        "step": 2,
        "title": "Enter Land & Bank Details",
        "titleTe": "భూమి & బ్యాంక్ వివరాలను నమోదు చేయండి",
        "description": "Enter survey number, Khata number, and Aadhaar-seeded bank account.",
        "descriptionTe": "సర్వే నంబర్, ఖాతా నంబర్ మరియు ఆధార్-సీడెడ్ బ్యాంక్ ఖాతా నమోదు చేయండి."
      },
      {
        "step": 3,
        "title": "Complete e-KYC",
        "titleTe": "e-KYC పూర్తి చేయండి",
        "description": "Complete OTP-based e-KYC directly on the portal.",
        "descriptionTe": "పోర్టల్‌లో నేరుగా OTP ఆధారిత e-KYC పూర్తి చేయండి."
      }
    ],
    "officialSource": "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    "officialSourceTe": "వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pmkisan.gov.in",
    "sourceUrl": "https://pmkisan.gov.in",
    "department": "Department of Agriculture & Farmers Welfare",
    "departmentTe": "వ్యవసాయ మరియు రైతు సంక్షేమ విభాగం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against official PM-KISAN portal.",
    "verificationNotesTe": "అధికారిక పిఎం-కిసాన్ పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "farm-crop-insurance",
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "nameTe": "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)",
    "category": "farming",
    "description": "Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest at minimal farmer premium rates.",
    "descriptionTe": "విత్తనం వేయడం నుండి పంట కోత అనంతర నష్టాల వరకు సహజ విపత్తుల నుండి రక్షణ కల్పించే సమగ్ర పంట బీమా పథకం.",
    "benefit": "Claim payout covering total crop loss at nominal premium (1.5%–2% of sum insured).",
    "benefitTe": "నామమాత్రపు ప్రీమియంతో మొత్తం పంట నష్టాన్ని కవర్ చేసే క్లెయిమ్ చెల్లింపు.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Farmer (Owner or Tenant)",
        "labelTe": "రైతు (యజమాని లేదా కౌలుదారు)",
        "condition": "Farmer growing notified crops in notified areas",
        "conditionTe": "నోటిఫై చేసిన ప్రాంతాలలో పంటలు పండించే రైతు",
        "matchKey": "farmer"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Farmer identity proof",
        "descriptionTe": "రైతు గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "land-records",
        "name": "Land Record / Sowing Certificate",
        "nameTe": "భూ రికార్డు / విత్తన ధృవీకరణ పత్రం",
        "description": "Pattadar passbook or village revenue officer tenancy certificate",
        "descriptionTe": "పట్టాదార్ పాస్‌బుక్ లేదా VRO కౌలు ధృవీకరణ పత్రం",
        "whyNeeded": "Cultivation and insurable interest proof",
        "whyNeededTe": "సాగు మరియు బీమా ఆసక్తి రుజువు",
        "howToGet": "From local agriculture or revenue office.",
        "howToGetTe": "వ్యవసాయ లేదా రెవెన్యూ కార్యాలయం నుండి.",
        "estimatedTime": "1–3 days"
      },
      {
        "id": "bank-passbook",
        "name": "Bank Passbook Copy",
        "nameTe": "బ్యాంక్ పాస్‌బుక్ కాపీ",
        "description": "Active bank account details",
        "descriptionTe": "యాక్టివ్ బ్యాంక్ ఖాతా వివరాలు",
        "whyNeeded": "Claim settlement credit",
        "whyNeededTe": "క్లెయిమ్ పరిష్కార క్రెడిట్ కోసం",
        "howToGet": "From bank.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Portal Application",
        "titleTe": "పోర్టల్ దరఖాస్తు",
        "description": "Apply on pmfby.gov.in, via bank branch, or through CSC.",
        "descriptionTe": "pmfby.gov.in, బ్యాంక్ శాఖ లేదా CSC ద్వారా దరఖాస్తు చేసుకోండి."
      },
      {
        "step": 2,
        "title": "Premium Payment",
        "titleTe": "ప్రీమియం చెల్లింపు",
        "description": "Pay nominal farmer premium before cut-off date.",
        "descriptionTe": "గడువు తేదీకి ముందు నామమాత్రపు రైతు ప్రీమియం చెల్లించండి."
      }
    ],
    "officialSource": "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    "officialSourceTe": "వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pmfby.gov.in",
    "sourceUrl": "https://pmfby.gov.in",
    "department": "Department of Agriculture & Farmers Welfare",
    "departmentTe": "వ్యవసాయ విభాగం",
    "lastVerified": "2025-10-01",
    "deadline": "Season-based (Kharif / Rabi)",
    "verificationNotes": "Verified against PMFBY national portal.",
    "verificationNotesTe": "PMFBY జాతీయ పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "health-insurance",
    "name": "Ayushman Bharat PM-JAY",
    "nameTe": "ఆయుష్మాన్ భారత్ పిఎం-జెవై",
    "category": "health",
    "description": "World's largest government-funded health assurance scheme providing health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    "descriptionTe": "సెకండరీ మరియు టెర్షియరీ సంరక్షణ కోసం కుటుంబానికి సంవత్సరానికి ₹5 లక్షల ఆరోగ్య రక్షణను అందించే ప్రపంచంలోనే అతిపెద్ద ప్రభుత్వ ఆరోగ్య హామీ పథకం.",
    "benefit": "Cashless and paperless inpatient medical treatment up to ₹5 lakh per year in empaneled hospitals.",
    "benefitTe": "ఎంప్యానెల్డ్ ఆసుపత్రులలో సంవత్సరానికి ₹5 లక్షల వరకు నగదు రహిత మరియు కాగిత రహిత ఆసుపత్రి చికిత్స.",
    "eligibilityCriteria": [
      {
        "field": "needs",
        "label": "Healthcare assistance",
        "labelTe": "ఆరోగ్య సంరక్షణ సహాయం",
        "condition": "Eligible based on SECC criteria or RSBY card",
        "conditionTe": "SECC ప్రమాణాలు లేదా రేషన్ కార్డు ఆధారంగా అర్హులు",
        "matchKey": "health-need"
      },
      {
        "field": "income",
        "label": "BPL / Low income criteria",
        "labelTe": "BPL / తక్కువ ఆదాయం",
        "condition": "Belongs to low-income / vulnerable household",
        "conditionTe": "తక్కువ ఆదాయం లేదా బలహీన కుటుంబానికి చెందినవారై ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Biometric identification",
        "descriptionTe": "బయోమెట్రిక్ గుర్తింపు",
        "whyNeeded": "e-KYC and Ayushman card generation",
        "whyNeededTe": "e-KYC మరియు ఆయుష్మాన్ కార్డు తయారీ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "ration-card",
        "name": "Ration Card / Family ID",
        "nameTe": "రేషన్ కార్డు / కుటుంబ ID",
        "description": "Government food security ration card",
        "descriptionTe": "ప్రభుత్వ ఆహార భద్రతా రేషన్ కార్డు",
        "whyNeeded": "Proof of family entitlement",
        "whyNeededTe": "కుటుంబ అర్హత రుజువు",
        "howToGet": "From Food & Civil Supplies department.",
        "howToGetTe": "పౌర సరఫరాల శాఖ నుండి.",
        "estimatedTime": "7–15 days"
      }
    ],
    "preparationTime": "~10 min",
    "effortLevel": "easy",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Check Eligibility",
        "titleTe": "అర్హతను తనిఖీ చేయండి",
        "description": "Check your mobile/ration number on beneficiary.nha.gov.in.",
        "descriptionTe": "beneficiary.nha.gov.in లో మీ నంబర్‌ను తనిఖీ చేయండి."
      },
      {
        "step": 2,
        "title": "Create Ayushman Card",
        "titleTe": "ఆయుష్మాన్ కార్డు పొందండి",
        "description": "Complete Aadhaar e-KYC and download Ayushman card instantly.",
        "descriptionTe": "ఆధార్ e-KYC పూర్తి చేసి తక్షణమే కార్డును డౌన్‌లోడ్ చేసుకోండి."
      },
      {
        "step": 3,
        "title": "Present at Hospital",
        "titleTe": "ఆసుపత్రిలో సమర్పించండి",
        "description": "Show card at any empaneled government or private hospital for cashless care.",
        "descriptionTe": "నగదు రహిత చికిత్స కోసం ఏదైనా ఎంప్యానెల్డ్ ఆసుపత్రిలో కార్డును చూపించండి."
      }
    ],
    "officialSource": "National Health Authority (NHA), Govt. of India",
    "officialSourceTe": "జాతీయ ఆరోగ్య ప్రాధికార సంస్థ (NHA)",
    "officialApplicationUrl": "https://beneficiary.nha.gov.in",
    "sourceUrl": "https://pmjay.gov.in",
    "department": "Ministry of Health and Family Welfare, Govt. of India",
    "departmentTe": "ఆరోగ్య మరియు కుటుంబ సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against NHA Ayushman Bharat portal.",
    "verificationNotesTe": "NHA ఆయుష్మాన్ భారత్ పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "health-disability",
    "name": "Unique Disability ID (UDID) / Swavlamban Card",
    "nameTe": "ప్రత్యేక వైకల్య గుర్తింపు కార్డు (UDID)",
    "category": "health",
    "description": "National database and single document for persons with disabilities, enabling transparent delivery of government benefits, travel concessions, and reservations.",
    "descriptionTe": "వికలాంగులకు ప్రభుత్వ ప్రయోజనాలు, ప్రయాణ రాయితీలు మరియు రిజర్వేషన్లను పారదర్శకంగా అందించే ఏకైక జాతీయ కార్డు.",
    "benefit": "Universal disability identification valid across India for government welfare schemes.",
    "benefitTe": "సంక్షేమ పథకాల కోసం భారతదేశమంతటా చెల్లుబాటు అయ్యే సార్వత్రిక వైకల్య గుర్తింపు.",
    "eligibilityCriteria": [
      {
        "field": "additionalCircumstances",
        "label": "Disability certification",
        "labelTe": "వైకల్య ధృవీకరణ",
        "condition": "Person with 40% or more certified disability",
        "conditionTe": "40% లేదా అంతకంటే ఎక్కువ ధృవీకరించబడిన వైకల్యం ఉన్న వ్యక్తి",
        "matchKey": "disability"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity and address proof",
        "descriptionTe": "గుర్తింపు మరియు చిరునామా రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "disability-cert",
        "name": "Hospital Disability Certificate",
        "nameTe": "వైద్య వైకల్య ధృవీకరణ పత్రం",
        "description": "Assessment report from district medical board or civil surgeon",
        "descriptionTe": "జిల్లా మెడికల్ బోర్డు నుండి అంచనా నివేదిక",
        "whyNeeded": "Disability percentage evaluation",
        "whyNeededTe": "వైకల్య శాతం అంచనా కోసం",
        "howToGet": "From District Government Hospital.",
        "howToGetTe": "జిల్లా ప్రభుత్వ ఆసుపత్రి నుండి.",
        "estimatedTime": "7–15 days"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "moderate",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register Online",
        "titleTe": "ఆన్‌లైన్‌లో నమోదు చేయండి",
        "description": "Apply on swavlambancard.gov.in with personal & medical details.",
        "descriptionTe": "వ్యక్తిగత మరియు వైద్య వివరాలతో swavlambancard.gov.in లో దరఖాస్తు చేసుకోండి."
      },
      {
        "step": 2,
        "title": "Medical Assessment",
        "titleTe": "వైద్య అంచనా",
        "description": "Visit designated government hospital on appointed date.",
        "descriptionTe": "నిర్దేశించిన తేదీన ప్రభుత్వ ఆసుపత్రిని సందర్శించండి."
      },
      {
        "step": 3,
        "title": "Download UDID",
        "titleTe": "UDID కార్డు డౌన్‌లోడ్ చేయండి",
        "description": "Download e-UDID card after verification.",
        "descriptionTe": "ధృవీకరణ తర్వాత e-UDID కార్డును డౌన్‌లోడ్ చేసుకోండి."
      }
    ],
    "officialSource": "Department of Empowerment of Persons with Disabilities, Govt. of India",
    "officialSourceTe": "వికలాంగుల సాధికారత విభాగం, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://www.swavlambancard.gov.in",
    "sourceUrl": "https://www.swavlambancard.gov.in",
    "department": "Ministry of Social Justice and Empowerment",
    "departmentTe": "సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against official Swavlamban portal.",
    "verificationNotesTe": "అధికారిక స్వావలంబన్ పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "women-maternity",
    "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "nameTe": "ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)",
    "category": "women-family",
    "description": "Direct Benefit Transfer maternal health scheme providing cash incentives to pregnant women and lactating mothers for health seeking and wage loss compensation.",
    "descriptionTe": "గర్భిణీ స్త్రీలు మరియు బాలింతలకు ఆరోగ్య సంరక్షణ మరియు వేతన నష్ట పరిహారం కోసం నగదు ప్రోత్సాహకాలను అందించే కేంద్ర పథకం.",
    "benefit": "Cash incentive of ₹5,000 for first child and ₹6,000 for second girl child in installments.",
    "benefitTe": "మొదటి బిడ్డకు ₹5,000 మరియు రెండవ ఆడబిడ్డకు ₹6,000 వాయిదాలలో నగదు ప్రోత్సాహకం.",
    "eligibilityCriteria": [
      {
        "field": "additionalCircumstances",
        "label": "Pregnant / Lactating mother",
        "labelTe": "గర్భిణీ / బాలింత",
        "condition": "Pregnant women and lactating mothers (except government employees)",
        "conditionTe": "గర్భిణీ స్త్రీలు మరియు బాలింతలు (ప్రభుత్వ ఉద్యోగులు మినహా)",
        "matchKey": "pregnant"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar of Mother and Husband",
        "nameTe": "తల్లి మరియు భర్త ఆధార్ కార్డులు",
        "description": "Identity and marriage linkage proof",
        "descriptionTe": "గుర్తింపు మరియు వివాహ అనుసంధాన రుజువు",
        "whyNeeded": "DBT and identity authentication",
        "whyNeededTe": "DBT మరియు గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "mcp-card",
        "name": "MCP (Mother and Child Protection) Card",
        "nameTe": "MCP (తల్లి మరియు పిల్లల రక్షణ) కార్డు",
        "description": "Card issued at Anganwadi / Primary Health Centre",
        "descriptionTe": "అంగన్‌వాడీ / ప్రాథమిక ఆరోగ్య కేంద్రంలో జారీ చేసిన కార్డు",
        "whyNeeded": "Antenatal checkup registration proof",
        "whyNeededTe": "గర్భధారణ పరీక్షల నమోదు రుజువు",
        "howToGet": "From your local Anganwadi worker or ASHA.",
        "howToGetTe": "మీ స్థానిక అంగన్‌వాడీ కార్యకర్త లేదా ఆశా నుండి.",
        "estimatedTime": "Immediate upon registration"
      },
      {
        "id": "bank-passbook",
        "name": "Mother Bank Account Passbook",
        "nameTe": "తల్లి బ్యాంక్ ఖాతా పాస్‌బుక్",
        "description": "Aadhaar-linked individual bank account",
        "descriptionTe": "ఆధార్-లింక్ చేయబడిన వ్యక్తిగత బ్యాంక్ ఖాతా",
        "whyNeeded": "Direct Benefit Transfer credit",
        "whyNeededTe": "ప్రత్యక్ష నగదు బదిలీ క్రెడిట్ కోసం",
        "howToGet": "From bank.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "easy",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register at Anganwadi",
        "titleTe": "అంగన్‌వాడీలో నమోదు చేయండి",
        "description": "Register pregnancy at local Anganwadi centre or apply on pmmvy.wcd.gov.in.",
        "descriptionTe": "అంగన్‌వాడీ కేంద్రంలో నమోదు చేయండి లేదా pmmvy.wcd.gov.in లో దరఖాస్తు చేసుకోండి."
      },
      {
        "step": 2,
        "title": "Submit Form with MCP Card",
        "titleTe": "MCP కార్డుతో ఫారమ్ సమర్పించండి",
        "description": "Provide ANC checkup details and baby immunization proofs as scheduled.",
        "descriptionTe": "షెడ్యూల్ ప్రకారం పరీక్షల వివరాలు మరియు టీకా రుజువులను అందించండి."
      }
    ],
    "officialSource": "Ministry of Women and Child Development, Govt. of India",
    "officialSourceTe": "మహిళా మరియు శిశు అభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://pmmvy.wcd.gov.in",
    "sourceUrl": "https://pmmvy.wcd.gov.in",
    "department": "Ministry of Women and Child Development",
    "departmentTe": "మహిళా మరియు శిశు అభివృద్ధి మంత్రిత్వ శాఖ",
    "lastVerified": "2025-10-01",
    "deadline": "Within 270 days of LMP",
    "verificationNotes": "Verified against PMMVY portal.",
    "verificationNotesTe": "PMMVY పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "women-single-parent",
    "name": "Mission Shakti (SAMBAL Support)",
    "nameTe": "మిషన్ శక్తి (సంబల్ సహాయం)",
    "category": "women-family",
    "description": "Umbrella scheme for safety, security, and empowerment of women, including emergency shelter, single mother rehabilitation, and legal aid.",
    "descriptionTe": "మహిళల భద్రత, రక్షణ మరియు సాధికారత కోసం ఉద్దేశించిన సమగ్ర కేంద్ర పథకం.",
    "benefit": "Emergency assistance, shelter, skill counseling, and integrated social security.",
    "benefitTe": "అత్యవసర సహాయం, వసతి, నైపుణ్య కౌన్సెలింగ్ మరియు సమగ్ర సామాజిక భద్రత.",
    "eligibilityCriteria": [
      {
        "field": "additionalCircumstances",
        "label": "Single mother / Woman in distress",
        "labelTe": "ఒంటరి తల్లి / ఆపదలో ఉన్న మహిళ",
        "condition": "Single parent, deserted woman, or woman in distress",
        "conditionTe": "ఒంటరి తల్లి, పరిత్యక్త మహిళ లేదా ఆపదలో ఉన్న మహిళ",
        "matchKey": "single-parent"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Proof of identity",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "residence-proof",
        "name": "Residence Proof",
        "nameTe": "నివాస రుజువు",
        "description": "Voter card, electricity bill, or ration card",
        "descriptionTe": "ఓటర్ కార్డు, విద్యుత్ బిల్లు లేదా రేషన్ కార్డు",
        "whyNeeded": "Local jurisdiction verification",
        "whyNeededTe": "స్థానిక పరిధి ధృవీకరణ",
        "howToGet": "From relevant utility or department.",
        "howToGetTe": "సంబంధిత విభాగం నుండి.",
        "estimatedTime": "1–2 days"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Visit One Stop Centre (OSC)",
        "titleTe": "వన్ స్టాప్ సెంటర్‌ను సందర్శించండి",
        "description": "Approach district One Stop Centre (Sakhi) or call toll-free helpline 181.",
        "descriptionTe": "జిల్లా వన్ స్టాప్ సెంటర్ (సఖి) ని సంప్రదించండి లేదా 181 కి కాల్ చేయండి."
      },
      {
        "step": 2,
        "title": "Avail Integrated Support",
        "titleTe": "సమగ్ర మద్దతును పొందండి",
        "description": "Access counseling, legal aid, shelter, and scheme link-up.",
        "descriptionTe": "కౌన్సెలింగ్, న్యాయ సహాయం, వసతి మరియు పథకాల అనుసంధానాన్ని పొందండి."
      }
    ],
    "officialSource": "Ministry of Women and Child Development, Govt. of India",
    "officialSourceTe": "మహిళా మరియు శిశు అభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://missionshakti.wcd.gov.in",
    "sourceUrl": "https://wcd.gov.in",
    "department": "Mission Shakti Division, Ministry of Women & Child Development",
    "departmentTe": "మిషన్ శక్తి విభాగం, మహిళా మరియు శిశు అభివృద్ధి మంత్రిత్వ శాఖ",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to missionshakti.wcd.gov.in (dedicated Mission Shakti portal). wcd.nic.in DNS failed. Access via nearest One Stop Centre (Sakhi) or helpline 181.",
    "verificationNotesTe": "missionshakti.wcd.gov.in కి నవీకరించబడింది. సమీప వన్ స్టాప్ సెంటర్ (సఖి) ద్వారా లేదా 181 హెల్ప్‌లైన్ ద్వారా పొందవచ్చు.",
    "isDemoData": false
  },
  {
    "id": "biz-mudra-loan",
    "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "nameTe": "ప్రధాన మంత్రి ముద్రా యోజన (PMMY)",
    "category": "business",
    "description": "Scheme providing loans up to ₹20 lakh to non-corporate, non-farm small/micro enterprises across Shishu, Kishore, and Tarun categories.",
    "descriptionTe": "కార్పొరేట్-యేతర, వ్యవసాయేతర సూక్ష్మ సంస్థలకు శిశు, కిషోర్ మరియు తరుణ్ కేటగిరీలలో ₹20 లక్షల వరకు రుణాలు అందించే పథకం.",
    "benefit": "Collateral-free institutional micro-credit at affordable interest rates.",
    "benefitTe": "సరసమైన వడ్డీ రేట్లతో పూచీకత్తు లేని సంస్థాగత సూక్ష్మ రుణం.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Business owner / Entrepreneur",
        "labelTe": "వ్యాపార యజమాని / వ్యవస్థాపకుడు",
        "condition": "Engaged in manufacturing, trading, or service business",
        "conditionTe": "తయారీ, వ్యాపారం లేదా సేవా వ్యాపారంలో నిమగ్నమై ఉన్నారు",
        "matchKey": "business-owner"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar and PAN Card",
        "nameTe": "ఆధార్ మరియు పాన్ కార్డు",
        "description": "Identity and tax identification",
        "descriptionTe": "గుర్తింపు మరియు పన్ను గుర్తింపు",
        "whyNeeded": "KYC and credit check",
        "whyNeededTe": "KYC మరియు క్రెడిట్ తనిఖీ",
        "howToGet": "From UIDAI / Income Tax department.",
        "howToGetTe": "UIDAI / ఆదాయపు పన్ను శాఖ నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "biz-proof",
        "name": "Business Registration / Udyam Certificate",
        "nameTe": "వ్యాపార నమోదు / ఉద్యమ్ సర్టిఫికేట్",
        "description": "Udyam registration or trade license",
        "descriptionTe": "ఉద్యమ్ రిజిస్ట్రేషన్ లేదా ట్రేడ్ లైసెన్స్",
        "whyNeeded": "Proof of business operation",
        "whyNeededTe": "వ్యాపార నిర్వహణ రుజువు",
        "howToGet": "Free online registration on udyamregistration.gov.in.",
        "howToGetTe": "udyamregistration.gov.in లో ఉచిత నమోదు.",
        "officialLink": "https://udyamregistration.gov.in",
        "estimatedTime": "Instant"
      },
      {
        "id": "bank-statement",
        "name": "Bank Account Statements (Past 6 months)",
        "nameTe": "బ్యాంక్ స్టేట్‌మెంట్‌లు (గత 6 నెలలు)",
        "description": "Bank statement of current or savings account",
        "descriptionTe": "ప్రస్తుత లేదా పొదుపు ఖాతా యొక్క బ్యాంక్ స్టేట్‌మెంట్",
        "whyNeeded": "Cash flow and turnover evaluation",
        "whyNeededTe": "నగదు ప్రవాహం మరియు టర్నోవర్ అంచనా",
        "howToGet": "From your bank.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "Instant"
      }
    ],
    "preparationTime": "~20 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Apply on Udyamimitra",
        "titleTe": "ఉద్యమిమిత్రలో దరఖాస్తు చేసుకోండి",
        "description": "Submit loan application online at udyamimitra.in or visit any bank branch.",
        "descriptionTe": "udyamimitra.in లో ఆన్‌లైన్‌లో సమర్పించండి లేదా ఏదైనా బ్యాంక్ శాఖను సందర్శించండి."
      },
      {
        "step": 2,
        "title": "Submit Business Plan",
        "titleTe": "వ్యాపార ప్రణాళికను సమర్పించండి",
        "description": "Provide estimate of machinery, stock, or working capital needs.",
        "descriptionTe": "యంత్రాలు, స్టాక్ లేదా వర్కింగ్ క్యాపిటల్ అవసరాల అంచనాను అందించండి."
      }
    ],
    "officialSource": "Micro Units Development & Refinance Agency (MUDRA)",
    "officialSourceTe": "ముద్రా బ్యాంక్ (MUDRA)",
    "officialApplicationUrl": "https://www.jansamarth.in",
    "sourceUrl": "https://www.jansamarth.in",
    "department": "Department of Financial Services, Ministry of Finance, Govt. of India",
    "departmentTe": "ఆర్థిక సేవల విభాగం, ఆర్థిక మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to JanSamarth (jansamarth.in) — the official Government of India portal for MUDRA and credit-linked scheme applications. mudra.org.in DNS failed.",
    "verificationNotesTe": "JanSamarth (jansamarth.in) — కేంద్ర ప్రభుత్వం యొక్క MUDRA రుణాల అధికారిక పోర్టల్‌కు నవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "biz-women-entrepreneur",
    "name": "Stand-Up India Scheme",
    "nameTe": "స్టాండ్-అప్ ఇండియా పథకం",
    "category": "business",
    "description": "Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    "descriptionTe": "కొత్త సంస్థల ఏర్పాటు కోసం ప్రతి బ్యాంక్ శాఖకు కనీసం ఒక SC/ST లేదా మహిళా రుణం కింద ₹10 లక్షల నుండి ₹1 కోటి వరకు బ్యాంక్ రుణాలను సులభతరం చేసే పథకం.",
    "benefit": "Bank composite loan (term loan + working capital) covering up to 85% of project cost.",
    "benefitTe": "ప్రాజెక్ట్ వ్యయంలో 85% వరకు కవర్ చేసే బ్యాంక్ కాంపోజిట్ లోన్.",
    "eligibilityCriteria": [
      {
        "field": "needs",
        "label": "Business need / Woman entrepreneur",
        "labelTe": "వ్యాపార అవసరం / మహిళా పారిశ్రామికవేత్త",
        "condition": "Woman or SC/ST entrepreneur setting up greenfield project",
        "conditionTe": "కొత్త ప్రాజెక్ట్ ఏర్పాటు చేస్తున్న మహిళ లేదా SC/ST పారిశ్రామికవేత్త",
        "matchKey": "business-need"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar and PAN Card",
        "nameTe": "ఆధార్ మరియు పాన్ కార్డు",
        "description": "Identity proof",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "KYC authentication",
        "whyNeededTe": "KYC ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "project-report",
        "name": "Detailed Project Report (DPR)",
        "nameTe": "వివరణాత్మక ప్రాజెక్ట్ నివేదిక (DPR)",
        "description": "Business viability and financial projection report",
        "descriptionTe": "వ్యాపార సాధ్యత మరియు ఆర్థిక అంచనా నివేదిక",
        "whyNeeded": "Loan appraisal by lending bank",
        "whyNeededTe": "రుణ మూల్యాంకనం కోసం",
        "howToGet": "Prepared with CA or District Industries Centre (DIC).",
        "howToGetTe": "CA లేదా DIC సహాయంతో సిద్ధం చేయండి.",
        "estimatedTime": "7–15 days"
      }
    ],
    "preparationTime": "~30 min",
    "effortLevel": "higher",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register on Stand-Up Mitra",
        "titleTe": "స్టాండ్-అప్ మిత్రలో నమోదు చేయండి",
        "description": "Create account on standupmitra.in portal.",
        "descriptionTe": "standupmitra.in పోర్టల్‌లో ఖాతాను సృష్టించండి."
      },
      {
        "step": 2,
        "title": "Select Bank & Handholding",
        "titleTe": "బ్యాంక్ & సహాయాన్ని ఎంచుకోండి",
        "description": "Select desired bank or request handholding support through SIDBI/NABARD.",
        "descriptionTe": "బ్యాంక్‌ను ఎంచుకోండి లేదా SIDBI ద్వారా సహాయాన్ని అభ్యర్థించండి."
      }
    ],
    "officialSource": "Small Industries Development Bank of India (SIDBI) / Ministry of Finance",
    "officialSourceTe": "సిడ్బీ (SIDBI) / ఆర్థిక మంత్రిత్వ శాఖ",
    "officialApplicationUrl": "https://www.standupmitra.in",
    "sourceUrl": "https://www.standupmitra.in",
    "department": "Department of Financial Services, Govt. of India",
    "departmentTe": "ఆర్థిక సేవల విభాగం, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against Stand-Up Mitra portal.",
    "verificationNotesTe": "స్టాండ్-అప్ మిత్ర పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "edu-merit-scholarship",
    "name": "PM-USP: Central Sector Scheme of Scholarship for College Students",
    "nameTe": "కళాశాల విద్యార్థుల కోసం సెంట్రల్ సెక్టార్ స్కాలర్‌షిప్ (PM-USP)",
    "category": "education",
    "description": "Financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing graduate and professional studies.",
    "descriptionTe": "గ్రాడ్యుయేట్ మరియు వృత్తిపరమైన విద్యను అభ్యసించే ప్రతిభావంతులైన తక్కువ ఆదాయ విద్యార్థులకు ఆర్థిక సహాయం.",
    "benefit": "₹12,000/year for graduation and ₹20,000/year for post-graduation directly transferred.",
    "benefitTe": "గ్రాడ్యుయేషన్‌కు సంవత్సరానికి ₹12,000 మరియు పీజీకి ₹20,000 నేరుగా జమ.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Student",
        "labelTe": "విద్యార్థి",
        "condition": "Enrolled in regular degree program",
        "conditionTe": "రెగ్యులర్ డిగ్రీ ప్రోగ్రామ్‌లో నమోదు అయ్యారు",
        "matchKey": "student"
      },
      {
        "field": "educationLevel",
        "label": "Undergraduate / Postgraduate",
        "labelTe": "అండర్‌గ్రాడ్యుయేట్ / పోస్ట్‌గ్రాడ్యుయేట్",
        "condition": "Top 80th percentile in Class 12 board examinations",
        "conditionTe": "12వ తరగతి బోర్డు పరీక్షల్లో టాప్ 80వ పర్సంటైల్‌లో ఉత్తీర్ణత",
        "matchKey": "post-matric"
      },
      {
        "field": "income",
        "label": "Family income criteria",
        "labelTe": "కుటుంబ ఆదాయ ప్రమాణాలు",
        "condition": "Annual gross family income up to ₹4.5 lakh",
        "conditionTe": "కుటుంబ వార్షిక ఆదాయం ₹4.5 లక్షల వరకు",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity proof",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "class-12-marksheet",
        "name": "Class 12 Marksheet",
        "nameTe": "12వ తరగతి మార్కుల జాబితా",
        "description": "Marksheet showing percentile in state/CBSE board",
        "descriptionTe": "బోర్డు పరీక్షల్లో పర్సంటైల్ చూపే మార్కుల జాబితా",
        "whyNeeded": "Merit criteria verification",
        "whyNeededTe": "మెరిట్ అర్హత ధృవీకరణ",
        "howToGet": "From school education board.",
        "howToGetTe": "పాఠశాల బోర్డు నుండి.",
        "estimatedTime": "1–2 days"
      },
      {
        "id": "income-cert",
        "name": "Income Certificate",
        "nameTe": "ఆదాయ ధృవీకరణ పత్రం",
        "description": "Revenue certificate showing family annual income",
        "descriptionTe": "కుటుంబ వార్షిక ఆదాయ పత్రం",
        "whyNeeded": "Income criteria verification",
        "whyNeededTe": "ఆదాయ పరిమితి ధృవీకరణ",
        "howToGet": "From Tahsildar / Revenue office.",
        "howToGetTe": "తహసీల్దార్ కార్యాలయం నుండి.",
        "officialLink": "https://onlineap.meeseva.gov.in",
        "estimatedTime": "7–15 days"
      }
    ],
    "preparationTime": "~20 min",
    "effortLevel": "moderate",
    "applicationMode": "online",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Apply on NSP",
        "titleTe": "NSP లో దరఖాస్తు చేసుకోండి",
        "description": "Login to scholarships.gov.in and select Department of Higher Education scheme.",
        "descriptionTe": "scholarships.gov.in లో లాగిన్ అయి ఉన్నత విద్యా శాఖ పథకాన్ని ఎంచుకోండి."
      },
      {
        "step": 2,
        "title": "College Verification",
        "titleTe": "కళాశాల ధృవీకరణ",
        "description": "Your college nodal officer verifies your regular enrollment.",
        "descriptionTe": "మీ కళాశాల నోడల్ అధికారి మీ రెగ్యులర్ నమోదును ధృవీకరిస్తారు."
      }
    ],
    "officialSource": "Department of Higher Education, Ministry of Education, Govt. of India",
    "officialSourceTe": "ఉన్నత విద్యా శాఖ, విద్యా మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "sourceUrl": "https://scholarships.gov.in",
    "department": "Ministry of Education, Govt. of India",
    "departmentTe": "విద్యా మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-01",
    "deadline": "rolling",
    "verificationNotes": "Verified against NSP portal.",
    "verificationNotesTe": "NSP పోర్టల్ ద్వారా ధృవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "fin-disability-pension",
    "name": "Indira Gandhi National Disability Pension Scheme (IGNDPS)",
    "nameTe": "ఇందిరా గాంధీ జాతీయ వైకల్య పెన్షన్ పథకం (IGNDPS)",
    "category": "financial-support",
    "description": "Component of National Social Assistance Programme providing social security pension to persons with severe disabilities living below poverty line.",
    "descriptionTe": "దారిద్య్రరేఖకు దిగువన ఉన్న తీవ్ర వైకల్యం కలిగిన వ్యక్తులకు నెలవారీ సామాజిక భద్రతా పెన్షన్ అందించే కేంద్ర పథకం.",
    "benefit": "Monthly pension directly credited into beneficiary bank account.",
    "benefitTe": "లబ్ధిదారు బ్యాంక్ ఖాతాలో నేరుగా నెలవారీ పింఛను జమ.",
    "eligibilityCriteria": [
      {
        "field": "additionalCircumstances",
        "label": "Severe disability (80%+ or multiple)",
        "labelTe": "తీవ్ర వైకల్యం (80%+ లేదా బహుళ)",
        "condition": "Person aged 18–79 with severe or multiple disabilities",
        "conditionTe": "18–79 సంవత్సరాల వయస్సు గల తీవ్ర వైకల్యం కలిగిన వ్యక్తి",
        "matchKey": "disability"
      },
      {
        "field": "income",
        "label": "BPL criteria",
        "labelTe": "BPL ప్రమాణాలు",
        "condition": "Belongs to below poverty line household",
        "conditionTe": "దారిద్య్రరేఖకు దిగువన ఉన్న కుటుంబానికి చెందినవారు",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity proof",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "disability-cert",
        "name": "Disability Certificate / UDID Card",
        "nameTe": "వైకల్య సర్టిఫికేట్ / UDID కార్డు",
        "description": "Medical board certificate indicating severe disability percentage",
        "descriptionTe": "తీవ్ర వైకల్య శాతాన్ని సూచించే మెడికల్ బోర్డు సర్టిఫికేట్",
        "whyNeeded": "Disability threshold check",
        "whyNeededTe": "వైకల్య పరిమితి తనిఖీ",
        "howToGet": "From government hospital medical board.",
        "howToGetTe": "ప్రభుత్వ ఆసుపత్రి మెడికల్ బోర్డు నుండి.",
        "officialLink": "https://www.swavlambancard.gov.in",
        "estimatedTime": "7–15 days"
      },
      {
        "id": "bank-passbook",
        "name": "Bank Passbook",
        "nameTe": "బ్యాంక్ పాస్‌బుక్",
        "description": "Active bank account details",
        "descriptionTe": "యాక్టివ్ బ్యాంక్ ఖాతా వివరాలు",
        "whyNeeded": "Pension DBT credit",
        "whyNeededTe": "పెన్షన్ బదిలీ కోసం",
        "howToGet": "From bank.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~20 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Submit Form",
        "titleTe": "ఫారమ్ సమర్పించండి",
        "description": "Submit through Panchayat Secretary / Ward Office or MeeSeva.",
        "descriptionTe": "పంచాయతీ కార్యదర్శి / వార్డు కార్యాలయం లేదా మీసేవ ద్వారా సమర్పించండి."
      },
      {
        "step": 2,
        "title": "Verification",
        "titleTe": "ధృవీకరణ",
        "description": "Local authority verifies medical certificate and residence.",
        "descriptionTe": "స్థానిక అధికారం వైద్య ధృవీకరణ పత్రాన్ని ధృవీకరిస్తుంది."
      }
    ],
    "officialSource": "National Social Assistance Programme (NSAP), Govt. of India",
    "officialSourceTe": "జాతీయ సామాజిక సహాయ కార్యక్రమం (NSAP)",
    "officialApplicationUrl": "https://nsap.dord.gov.in",
    "sourceUrl": "https://nsap.dord.gov.in",
    "department": "Ministry of Rural Development, Dept. of Rural Development, Govt. of India",
    "departmentTe": "గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to new NSAP portal nsap.dord.gov.in. Applications via Gram Panchayat/District Social Welfare Office or UMANG app.",
    "verificationNotesTe": "కొత్త NSAP పోర్టల్ nsap.dord.gov.in కి నవీకరించబడింది.",
    "isDemoData": false
  },
  {
    "id": "ap-vidya-deevena",
    "name": "Jagananna Vidya Deevena (Andhra Pradesh)",
    "nameTe": "జగనన్న విద్యా దీవెన (ఆంధ్రప్రదేశ్)",
    "category": "education",
    "description": "Government of Andhra Pradesh flagship scheme providing complete fee reimbursement for students pursuing polytechnic, ITI, degree, and professional courses.",
    "descriptionTe": "పాలిటెక్నిక్, ఐటీఐ, డిగ్రీ మరియు వృత్తి విద్యా కోర్సులు చదువుతున్న విద్యార్థులకు పూర్తి ఫీజు రీయింబర్స్‌మెంట్ అందించే ఆంధ్రప్రదేశ్ ప్రభుత్వ పథకం.",
    "benefit": "100% tuition fee reimbursement credited quarterly to student's mother's bank account.",
    "benefitTe": "విద్యార్థి తల్లి బ్యాంక్ ఖాతాలో త్రైమాసికంగా 100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ జమ.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Student",
        "labelTe": "విద్యార్థి",
        "condition": "Student enrolled in recognized college in Andhra Pradesh",
        "conditionTe": "ఆంధ్రప్రదేశ్‌లోని గుర్తింపు పొందిన కళాశాలలో విద్యార్థి",
        "matchKey": "student"
      },
      {
        "field": "educationLevel",
        "label": "Post-matric / Higher education",
        "labelTe": "పోస్ట్-మెట్రిక్ / ఉన్నత విద్య",
        "condition": "Pursuing ITI, Polytechnic, Degree, Engineering, Medicine, PG",
        "conditionTe": "ఐటీఐ, పాలిటెక్నిక్, డిగ్రీ, ఇంజనీరింగ్, మెడిసిన్, పీజీ చదువుతున్నారు",
        "matchKey": "post-matric"
      },
      {
        "field": "income",
        "label": "Family annual income under ₹2.5 lakh",
        "labelTe": "కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు",
        "condition": "Annual family income within ₹2.5 lakh",
        "conditionTe": "కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉండాలి",
        "matchKey": "income-low"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar of Student and Mother",
        "nameTe": "విద్యార్థి మరియు తల్లి ఆధార్ కార్డులు",
        "description": "Biometric identification",
        "descriptionTe": "బయోమెట్రిక్ గుర్తింపు",
        "whyNeeded": "Identity authentication",
        "whyNeededTe": "గుర్తింపు ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "income-cert",
        "name": "Integrated Certificate / Income Certificate",
        "nameTe": "సమీకృత ధృవీకరణ పత్రం / ఆదాయ పత్రం",
        "description": "MeeSeva income certificate",
        "descriptionTe": "మీసేవ ఆదాయ ధృవీకరణ పత్రం",
        "whyNeeded": "Income verification",
        "whyNeededTe": "ఆదాయ ధృవీకరణ",
        "howToGet": "From MeeSeva portal or Grama Sachivalayam.",
        "howToGetTe": "మీసేవ లేదా గ్రామ సచివాలయం నుండి.",
        "officialLink": "https://onlineap.meeseva.gov.in",
        "estimatedTime": "7 days"
      },
      {
        "id": "bank-passbook",
        "name": "Mother's Bank Passbook",
        "nameTe": "తల్లి బ్యాంక్ పాస్‌బుక్",
        "description": "Active bank account of mother",
        "descriptionTe": "తల్లి యాక్టివ్ బ్యాంక్ ఖాతా",
        "whyNeeded": "Direct Benefit Transfer credit",
        "whyNeededTe": "ప్రత్యక్ష నగదు బదిలీ కోసం",
        "howToGet": "From bank.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "moderate",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Apply via Grama / Ward Sachivalayam",
        "titleTe": "గ్రామ / వార్డు సచివాలయం ద్వారా దరఖాస్తు",
        "description": "Submit through college admission desk and village/ward education assistant.",
        "descriptionTe": "కళాశాల మరియు సచివాలయ విద్యా సహాయకుడి ద్వారా సమర్పించండి."
      },
      {
        "step": 2,
        "title": "Biometric Authentication",
        "titleTe": "బయోమెట్రిక్ ధృవీకరణ",
        "description": "Mother and student complete biometric authentication each quarter.",
        "descriptionTe": "తల్లి మరియు విద్యార్థి ప్రతి త్రైమాసికంలో బయోమెట్రిక్ ధృవీకరణ పూర్తి చేస్తారు."
      }
    ],
    "officialSource": "Higher Education Department, Government of Andhra Pradesh",
    "officialSourceTe": "ఉన్నత విద్యా శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
    "officialApplicationUrl": "https://jaganannavidyadeevena.ap.gov.in",
    "sourceUrl": "https://jnanabhumi.ap.gov.in",
    "department": "Social Welfare & Higher Education Department, Govt of AP",
    "departmentTe": "సాంఘిక సంక్షేమ & ఉన్నత విద్యా శాఖ, ఆంధ్రప్రదేశ్",
    "state": "Andhra Pradesh",
    "lastVerified": "2025-10-10",
    "deadline": "rolling",
    "verificationNotes": "Updated to dedicated scheme portal jaganannavidyadeevena.ap.gov.in. apsche.ap.gov.in DNS failed. Applications processed via colleges and Grama/Ward Sachivalayam.",
    "verificationNotesTe": "అధికారిక పోర్టల్ jaganannavidyadeevena.ap.gov.in కి నవీకరించబడింది. దరఖాస్తులు కళాశాల మరియు సచివాలయం ద్వారా ప్రాసెస్ చేయబడతాయి.",
    "isDemoData": false
  },
  {
    "id": "ts-rythu-bandhu",
    "name": "Rythu Bandhu / Rythu Bharosa (Telangana)",
    "nameTe": "రైతు బంధు / రైతు భరోసా (తెలంగాణ)",
    "category": "farming",
    "description": "Government of Telangana investment support scheme providing financial grant directly to patta landholder farmers to meet agricultural input costs.",
    "descriptionTe": "వ్యవసాయ పెట్టుబడి ఖర్చుల కోసం పట్టా భూమి ఉన్న రైతులకు నేరుగా ఆర్థిక సహాయం అందించే తెలంగాణ ప్రభుత్వ పథకం.",
    "benefit": "Investment support grant of up to ₹5,000–₹7,500 per acre per season.",
    "benefitTe": "సీజన్‌కు ఎకరానికి ₹5,000–₹7,500 వరకు పెట్టుబడి మద్దతు గ్రాంట్.",
    "eligibilityCriteria": [
      {
        "field": "occupation",
        "label": "Farmer in Telangana",
        "labelTe": "తెలంగాణలో రైతు",
        "condition": "Patta landholding farmer in Telangana state",
        "conditionTe": "తెలంగాణ రాష్ట్రంలో పట్టా భూమి ఉన్న రైతు",
        "matchKey": "farmer"
      }
    ],
    "documents": [
      {
        "id": "aadhaar",
        "name": "Aadhaar Card",
        "nameTe": "ఆధార్ కార్డు",
        "description": "Identity proof",
        "descriptionTe": "గుర్తింపు రుజువు",
        "whyNeeded": "Identity and biometric authentication",
        "whyNeededTe": "గుర్తింపు మరియు బయోమెట్రిక్ ధృవీకరణ",
        "howToGet": "From UIDAI.",
        "howToGetTe": "UIDAI నుండి.",
        "officialLink": "https://myaadhaar.uidai.gov.in",
        "estimatedTime": "1 day"
      },
      {
        "id": "pattadar-passbook",
        "name": "Dharani Pattadar Passbook",
        "nameTe": "ధరణి పట్టాదార్ పాస్‌బుక్",
        "description": "Digital pattadar passbook issued via Dharani portal",
        "descriptionTe": "ధరణి పోర్టల్ ద్వారా జారీ చేసిన డిజిటల్ పట్టాదార్ పాస్‌బుక్",
        "whyNeeded": "Land extent and title verification",
        "whyNeededTe": "భూమి విస్తీర్ణం మరియు హక్కు ధృవీకరణ",
        "howToGet": "From Dharani portal or Tahsildar.",
        "howToGetTe": "ధరణి పోర్టల్ లేదా తహసీల్దార్ నుండి.",
        "officialLink": "https://dharani.telangana.gov.in",
        "estimatedTime": "Instant / 3 days"
      },
      {
        "id": "bank-passbook",
        "name": "Bank Passbook Copy",
        "nameTe": "బ్యాంక్ పాస్‌బుక్ కాపీ",
        "description": "Aadhaar-seeded bank account",
        "descriptionTe": "ఆధార్-లింక్ చేయబడిన బ్యాంక్ ఖాతా",
        "whyNeeded": "DBT credit transfer",
        "whyNeededTe": "DBT క్రెడిట్ బదిలీ కోసం",
        "howToGet": "From bank branch.",
        "howToGetTe": "బ్యాంక్ నుండి.",
        "estimatedTime": "1 day"
      }
    ],
    "preparationTime": "~15 min",
    "effortLevel": "easy",
    "applicationMode": "both",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Verify on Dharani",
        "titleTe": "ధరణిలో ధృవీకరించండి",
        "description": "Verify land details on Dharani portal.",
        "descriptionTe": "ధరణి పోర్టల్‌లో భూమి వివరాలను ధృవీకరించండి."
      },
      {
        "step": 2,
        "title": "Submit to AEO",
        "titleTe": "AEO కి సమర్పించండి",
        "description": "Provide Aadhaar and bank details to Village Agriculture Extension Officer.",
        "descriptionTe": "గ్రామ వ్యవసాయ విస్తరణ అధికారి (AEO) కి ఆధార్ మరియు బ్యాంక్ వివరాలను అందించండి."
      }
    ],
    "officialSource": "Agriculture Department, Government of Telangana",
    "officialSourceTe": "వ్యవసాయ శాఖ, తెలంగాణ ప్రభుత్వం",
    "officialApplicationUrl": "https://rythubharosa.telangana.gov.in",
    "sourceUrl": "https://rythubharosa.telangana.gov.in",
    "department": "Department of Agriculture, Govt of Telangana",
    "departmentTe": "వ్యవసాయ శాఖ, తెలంగాణ ప్రభుత్వం",
    "state": "Telangana",
    "lastVerified": "2025-10-10",
    "deadline": "Season-based (Kharif / Rabi)",
    "verificationNotes": "Updated to rythubharosa.telangana.gov.in — Rythu Bandhu was renamed Rythu Bharosa under the current Telangana government. Old portal rythubandhu.telangana.gov.in DNS failed.",
    "verificationNotesTe": "rythubharosa.telangana.gov.in కి నవీకరించబడింది. రైతు బంధు పేరు రైతు భరోసాగా మార్చబడింది.",
    "isDemoData": false
  }
];

// Helper to get benefits by category
export function getBenefitsByCategory(categoryId: CategoryId): Benefit[] {
  return demoBenefits.filter((b) => b.category === categoryId);
}

// Helper to get benefit by ID
export function getBenefitById(id: string): Benefit | undefined {
  return demoBenefits.find((b) => b.id === id);
}

// Indian states list for questionnaire
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman & Nicobar Islands",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Lakshadweep"
];
