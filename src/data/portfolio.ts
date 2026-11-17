// Single source of truth for all site content.
// Every fact here is taken from RahulCV.pdf (Nov 2026) or the public GitHub repos it links.

export const profile = {
  name: "Rahul Raj",
  handle: "dusklight00",
  role: "AI & Full-Stack Engineer",
  location: "Bangalore, India",
  avatar: "/images/rahul-raj.jpg",
  tagline:
    "I build AI-powered products from 0 → 1: LLM workflows, RAG systems and the full-stack apps around them.",
  summary: [
    "I'm a final-year Computer Science student at Cambridge Institute of Technology, Bangalore, and I ship production software for clients around the world.",
    "Most of my work sits where AI meets product engineering: Graph-RAG pipelines that cut hallucinations in health diagnostics, agentic research workflows, LLM features in React Native and Next.js apps, and the NestJS / FastAPI backends that keep them fast and secure.",
    "Outside of client work I publish research, run developer communities on campus and compete in hackathons.",
  ],
  email: "r.rahul.developer@gmail.com",
  resume: "/Rahul-Raj-Resume.pdf",
  available: true,
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/dusklight00" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dusklight00" },
  { label: "Email", href: "mailto:r.rahul.developer@gmail.com" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "SAITS",
    role: "Software Engineer (Contract)",
    period: "Apr 2026 — Present",
    location: "Remote · Switzerland",
    current: true,
    summary: "End-to-end ownership of AI-powered healthcare and real-estate platforms.",
    highlights: [
      "Own production features end to end (frontend, backend, deployment and AI integration) across healthcare and real-estate products.",
      "Optimised geospatial search and map rendering pipelines, improving performance by 40–60% through coordinate processing, query optimisation and rendering work.",
      "Engineered privacy-first authentication (biometrics, secure authorisation) and LLM-powered workflows, working directly with international clients.",
    ],
    stack: ["React Native", "Next.js", "NestJS", "Convex", "SurrealDB", "LangChain", "LangGraph"],
  },
  {
    company: "Heizen",
    role: "Software Engineer Intern",
    period: "Jul 2025 — Jan 2026",
    location: "Hyderabad, Telangana",
    summary: "Mobile health assistant backed by Graph-RAG diagnostics.",
    highlights: [
      "Built a mobile health assistant in React Native + FastAPI that talks to health bands through an MCP server to track metrics and send personalised nudges.",
      "Implemented a Graph-based RAG framework to reduce hallucinations in AI-driven diagnostics, improving response reliability and user trust.",
      "Designed an async FastAPI backend with efficient data models, cutting API response times by 40%.",
    ],
    stack: ["React Native", "FastAPI", "MCP", "Graph RAG", "Python"],
  },
  {
    company: "LogicFlo AI",
    role: "Full Stack Developer Intern",
    period: "Jul 2024 — Jul 2025",
    location: "Remote",
    summary: "Agentic research tooling for medical researchers.",
    highlights: [
      "Engineered AI-assisted idea generation, a medical-researcher agentic workflow and custom search tools, boosting research efficiency by 35%.",
      "Built internal project modules that improved code quality, readability and maintainability across the engineering team.",
    ],
    stack: ["ReactFlow", "Django", "Python", "LLMs"],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: "Project" | "Research";
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ai-evaluator",
    title: "AI Evaluator",
    kind: "Research",
    year: "2024",
    description:
      "Automated answer-sheet grading that reads handwritten exams and scores them with a RAG pipeline, published in an STM journal.",
    highlights: [
      "94% grading accuracy versus 25% with traditional OCR approaches.",
      "RAG-backed evaluation built to scale to government-level exams, cutting manual grading time by 70%+.",
    ],
    stack: ["RAG", "LLMs", "OCR", "JavaScript"],
    metric: { value: "94%", label: "grading accuracy" },
    links: [
      { label: "Paper", href: "https://journals.stmjournals.com/toeoc/article=2024/view=176042/" },
      { label: "Source", href: "https://github.com/pixelpartners00/ai-evaluator" },
    ],
  },
  {
    slug: "focus-meter",
    title: "Focus Meter",
    kind: "Project",
    year: "2023",
    description:
      "Real-time focus assessment for Google Meet classrooms, combining facial and audio cues to measure student engagement.",
    highlights: [
      "Fuses OpenCV + MediaPipe face signals with Librosa audio features and a PyTorch model.",
      "Django REST APIs with 30% faster data retrieval, ready to plug into analytics dashboards.",
    ],
    stack: ["OpenCV", "MediaPipe", "PyTorch", "Librosa", "Django REST"],
    metric: { value: "30%", label: "faster data retrieval" },
    links: [{ label: "Source", href: "https://github.com/the-amazing-team/focus-meter" }],
  },
  {
    slug: "kannada-checker",
    title: "Kannada Signboard Detector",
    kind: "Research",
    year: "2024",
    description:
      "Computer-vision tool that measures the share of Kannada text on commercial signboards for regional-language compliance audits. Copyrighted (ROC SW-19576/2024).",
    highlights: [
      "EasyOCR + language detection classifies multilingual signboard text with 92% accuracy.",
      "Turns a manual government compliance check into an automated audit.",
    ],
    stack: ["Computer Vision", "EasyOCR", "Python"],
    metric: { value: "92%", label: "classification accuracy" },
    links: [{ label: "Source", href: "https://github.com/the-amazing-team/kannada-checker" }],
  },
  {
    slug: "packet-check",
    title: "Packet Check",
    kind: "Project",
    year: "2023",
    description:
      "A web app that monitors live network traffic, flags malicious packets and visualises what is moving across your network.",
    highlights: [
      "Scapy + Flask capture and filter packets in real time.",
      "React + Chakra UI dashboard that improved threat-detection response time by 40%.",
    ],
    stack: ["React", "Chakra UI", "Flask", "Scapy"],
    metric: { value: "40%", label: "faster threat response" },
    links: [{ label: "Source", href: "https://github.com/dusklight00/packet-check" }],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI / ML",
    items: ["LangChain", "LangGraph", "RAG", "AI Agents", "LLM Apps", "Prompt Engineering", "MCP", "PyTorch", "TensorFlow", "OpenCV"],
  },
  {
    group: "Frontend & Mobile",
    items: ["Next.js", "React", "React Native", "TypeScript", "Angular", "Vue.js", "Electron", "Ionic"],
  },
  {
    group: "Backend & Data",
    items: ["NestJS", "FastAPI", "Django", "Flask", "Node.js", "Express", "Spring Boot", "Convex", "SurrealDB"],
  },
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++"],
  },
];

export const education = {
  school: "Cambridge Institute of Technology",
  degree: "B.E. Computer Science",
  detail: "CGPA 8.1 · Final year",
  location: "Bangalore, Karnataka",
};

export const leadership = [
  {
    role: "GDG Co-Lead",
    org: "Google Developer Groups · CIT",
    period: "Apr 2024 — Present",
    detail: "Organised 10+ technical events and workshops for 500+ participants; marketing pushed attendance up 60%.",
  },
  {
    role: "IEEE Student Branch Chair",
    org: "IEEE · CIT",
    period: "Dec 2023 — Apr 2024",
    detail: "Led a team of 20+ members through 8+ professional development events; grew active engagement by 30%.",
  },
  {
    role: "IEEE Webmaster",
    org: "IEEE · CIT",
    period: "Feb 2023 — Dec 2023",
    detail: "Ran the branch website; SEO work increased site traffic by 45%.",
  },
];

export const achievements: { place: string; event: string; where: string }[] = [
  { place: "1st", event: "SIH Internal Hackathon", where: "CITNC" },
  { place: "2nd", event: "AT Makeathon 2024", where: "IIT Madras" },
  { place: "2nd", event: "Robo Wars, Celesta 2024", where: "IIT Patna" },
  { place: "1st", event: "Code Clash & Code to Decode", where: "GDSC, CITNC" },
  { place: "2nd", event: "Query Story 2K24 (MySQL)", where: "CITNC" },
  { place: "2nd", event: "Idea Presentation, IEEE RLJIT & Oxyignite 2K23", where: "Oxford Institute of Technology" },
  { place: "Top 7", event: "ReImagine Waste (finalist)", where: "InUnity, Bangalore" },
  { place: "Top 10", event: "Code to Debug, Oxyignite 2K23", where: "Oxford Institute of Technology" },
  { place: "Award", event: "Technical Innovation Recognition", where: "CMRIT Social Hackathon" },
];

export const stats = [
  { value: "3", label: "engineering roles" },
  { value: "2", label: "research works" },
  { value: "6", label: "hackathon podium finishes" },
  { value: "500+", label: "devs in community events" },
];
