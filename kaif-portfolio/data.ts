export const PROFILE = {
  name: 'Muhammad Kaif',
  role: 'Full Stack AI Engineer',
  city: 'Faisalabad, Pakistan',
  email: '2004mkaif@gmail.com',
  phone: '+92 334 6510599',
  phoneHref: 'tel:+923346510599',
  github: 'https://github.com/Kaifi1199',
  linkedin: 'https://www.linkedin.com/in/muhammad-kaif-7a8a18286/',
  // Lives in /public, so it's served from the site root.
  resume: '/Muhammad-Kaif-Resume.pdf',
};

export type Project = {
  no: string;
  name: string;
  kind: string;
  year: string;
  line: string;
  points: string[];
  stack: string[];
  live?: string;
  code?: string;
  tone: string; // preview card colour
  ink: string;
};

export const PROJECTS: Project[] = [
  {
    no: '01',
    name: 'AasaanLearn',
    kind: 'Final year project, AI platform',
    year: '2025 – 26',
    line: 'Reading, listening and visual-story tools for students with dyslexia, autism and visual impairments.',
    points: [
      'Upload a PDF or Word file and get it back simplified, narrated as audio, or turned into a visual story with images and symbols.',
      'Next.js front end talking to a FastAPI service that runs the OpenAI-powered simplification, quizzes and chat.',
      'Firebase handles sign-in (email and Google), Firestore data and file storage.',
      'Won 1st position in the BS Artificial Intelligence final year project category.',
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'OpenAI API', 'Firebase', 'Tailwind', 'Framer Motion'],
    live: 'https://aasaanlearn.vercel.app',
    code: 'https://github.com/Kaifi1199/AasaanLearn',
    tone: '#2F4A3F',
    ink: '#EDE6D6',
  },
  {
    no: '02',
    name: 'NextGen Tech',
    kind: 'Full-stack startup platform',
    year: '2025',
    line: 'A company site with a working back office: blog publishing, contact inbox and user management.',
    points: [
      'Public site for services, team and blog, plus an admin dashboard behind Clerk authentication.',
      'Middleware-protected routes and Next.js API routes over MongoDB with Mongoose models.',
      'Deployed on Vercel; motion built with GSAP and Framer Motion.',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Clerk', 'MongoDB', 'Mongoose', 'Tailwind', 'Vercel'],
    live: 'https://nextgentech-solution.vercel.app',
    code: 'https://github.com/Kaifi1199/NextGen-Tech',
    tone: '#1E2433',
    ink: '#E9E4DA',
  },
  {
    no: '03',
    name: 'Habiti',
    kind: 'Mobile app',
    year: '2026',
    line: 'A small, friendly habit tracker for Android and web, with streaks and a 9 am nudge.',
    points: [
      'One-tap starter habits (water, exercise, fruit, a walk) or your own custom routines.',
      'Firebase email auth with session persistence and an onboarding flow that routes by auth state.',
      'Daily local notifications, timezone-aware for Asia/Karachi, toggled from settings.',
    ],
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Provider', 'Local Notifications'],
    code: 'https://github.com/Kaifi1199/Habiti--Habit-Tracking-Mobile-App',
    tone: '#D9A441',
    ink: '#1A1712',
  },
  {
    no: '04',
    name: 'Resume Screener',
    kind: 'NLP tool',
    year: '2025',
    line: 'Reads PDF and DOCX resumes, pulls out skills and experience, and predicts the job domain.',
    points: [
      'Text extraction with PyMuPDF and python-docx, entity and skill extraction with spaCy.',
      'TF-IDF features feeding a scikit-learn classifier for job-domain prediction.',
      'Interactive Streamlit app for screening candidates and viewing profiles.',
    ],
    stack: ['Python', 'spaCy', 'scikit-learn', 'TF-IDF', 'Streamlit'],
    tone: '#8E3B2A',
    ink: '#F1E8DB',
  },
];

export const EXPERIENCE = [
  {
    company: 'CodeCelix',
    role: 'AI Automation Engineer',
    when: 'Aug 2025 – Nov 2025',
    points: [
      'Built recruitment automation end to end: resume parsing, semantic job matching and proposal generation.',
      'Wired Gmail, WhatsApp, Firebase and REST APIs together so business processes ran without hand-offs.',
      'Shipped full-stack AI apps with Next.js, FastAPI, Streamlit and LLM APIs, from UI through deployment and testing.',
    ],
  },
  {
    company: 'CosmiCode',
    role: 'AI & ML Engineer',
    when: '2025',
    points: [
      'Worked through applied machine learning and deep learning, from fundamentals to shipped notebooks.',
      'Built an image caption generator, a music genre classifier, an SVD-based movie recommender and customer segmentation models.',
    ],
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Front end', items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Streamlit'] },
  { group: 'Back end', items: ['FastAPI', 'REST APIs', 'Firebase', 'MongoDB', 'Mongoose', 'Clerk'] },
  { group: 'AI / ML', items: ['LLM integration', 'NLP', 'Computer vision', 'Deep learning', 'n8n automation'] },
  { group: 'Libraries', items: ['TensorFlow', 'scikit-learn', 'spaCy', 'Pandas', 'NumPy'] },
  { group: 'Ship it', items: ['Git', 'GitHub', 'Vercel', 'Railway', 'Flutter'] },
];

export const EDUCATION = [
  {
    what: 'BS Artificial Intelligence',
    where: 'National Textile University, Faisalabad',
    when: '2022 – 2026',
    note: 'CGPA 3.15. Thesis: AasaanLearn, 1st position in the FYP category.',
  },
  { what: 'FSc Pre-Engineering', where: 'Punjab Group of Colleges', when: '2020 – 2022', note: '' },
  { what: 'Matriculation', where: 'Sandal College, Faisalabad', when: '2018 – 2020', note: '' },
];
