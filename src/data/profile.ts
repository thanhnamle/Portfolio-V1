// All portfolio content lives here, so updating the site never means touching components.
// Fields marked TODO still need real values; empty optional links are hidden automatically.

import projectTbrgs from "@/assets/project-tbrgs.webp";
import projectCybersecurity from "@/assets/project-cybersecurity.webp";
import projectAirbnb from "@/assets/project-airbnb.webp";
import logoSwinburne from "@/assets/logo-swinburne.webp";
import logoPayoo from "@/assets/logo-payoo.webp";
import avatar from "@/assets/avatar.webp";
import { timelinePhotos, type Photo } from "./images";

export type Logo = {
  src: string;
  alt: string;
  // "plate" puts the logo on a white tile so dark marks stay visible in dark mode.
  plate?: boolean;
};

export const logos = {
  swinburne: { src: logoSwinburne, alt: "Swinburne University of Technology logo" },
  payoo: { src: logoPayoo, alt: "Payoo logo", plate: true },
} satisfies Record<string, Logo>;

export const profile = {
  name: "Le Thanh Nam",
  initials: "LN",
  avatar,
  role: "Backend-focused Full-Stack Developer",
  tagline: "I build backend services — and the interfaces on top of them.",
  location: "Vietnam · GMT+7",
  status: "Open to backend & full-stack internships",
  email: "thanhnam0810.tnl@gmail.com",
  github: "https://github.com/thanhnamle",
  // TODO: confirm this is your public LinkedIn URL.
  linkedin: "https://www.linkedin.com/in/namle123",
  // TODO: drop your CV into /public (e.g. public/resume.pdf) and set "/resume.pdf". Empty hides the button.
  resumeUrl: "",
};

// Copy for the cinematic intro screen.
export const intro = {
  headline: ["What powers the apps", "you use every day?"],
  blurb:
    "I'm a Computer Science student at Swinburne Vietnam building the APIs, databases and services behind the screen — and the interfaces on top of them. This is how I build.",
};

export const about = [
  "I'm a Computer Science student at Swinburne Vietnam who enjoys the server side of software: designing REST APIs, modelling data and building pipelines that turn raw data into decisions.",
  "I've worked as an intern backend developer at Payoo (VietUnion), a payments company, and I'm currently writing a systematic literature review to sharpen my research skills. My goal is to grow from backend into a senior full-stack engineer who owns features end to end.",
];

export const quickFacts = {
  education: {
    school: "Swinburne Vietnam",
    degree: "Computer Science - Software Development",
    graduation: "Expected Jul 2027",
  },
  // TODO: add the year and your official intern title.
  internship: {
    company: "Payoo (VietUnion)",
    title: "Intern Backend Developer",
    period: "May – Nov 2026",
  },
  research: "Writing a Systematic Literature Review (SLR)",
  path: ["Backend", "Full-Stack", "Senior Full-Stack"],
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags?: string[];
  current?: boolean;
  logo?: Logo;
  url?: string;
  photo?: Photo;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    title: "Research — Systematic Literature Review",
    org: "Independent / academic",
    // TODO: name the SLR topic in one line.
    description: "Planning, screening and synthesising published studies in a structured SLR to build rigorous research habits.",
    tags: ["Research", "Academic writing"],
    current: true,
    photo: timelinePhotos.research,
  },
  {
    period: "May – Nov 2026",
    title: "Intern",
    org: "Payoo (VietUnion)",
    // TODO: one or two lines on what you built and the result.
    description: "Internship at a Vietnamese payments company.",
    tags: [],
    logo: logos.payoo,
    url: "https://payoo.vn",
    photo: timelinePhotos.payoo,
  },
  {
    period: "Sep 2023 – Jul 2027",
    title: "Computer Science",
    org: "Swinburne Vietnam",
    description: "Expected graduation July 2027.",
    tags: ["Data structures", "Databases", "AI"],
    logo: logos.swinburne,
    url: "https://swinburne-vn.edu.vn",
    photo: timelinePhotos.swinburne,
  },
];

export type ArchitectureNode = {
  id: string;
  label: string;
  purpose: string;
  items: string[];
  core?: boolean;
};

// Rendered as the blueprint request-flow diagram: client → api → (services, data),
// with infra and tooling as the delivery layer underneath.
// Item names must match keys in src/lib/techIcons.ts to get a logo.
export const architecture = {
  client: {
    id: "A",
    label: "Client",
    purpose: "Interfaces people see and use",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  api: {
    id: "B",
    label: "API layer",
    purpose: "Routing, auth, validation and business logic",
    items: ["Node.js", "Express", "REST API"],
    core: true,
  },
  services: {
    id: "C",
    label: "Services",
    purpose: "Data processing and machine-learning jobs",
    items: ["Python", "scikit-learn", "Pandas", "NumPy"],
  },
  data: {
    id: "D",
    label: "Data",
    purpose: "Relational and document storage",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  infra: {
    id: "E",
    label: "Infra",
    purpose: "Package, version and ship",
    items: ["Docker", "Vercel", "Git", "GitHub"],
  },
  tooling: {
    id: "F",
    label: "Tooling",
    purpose: "Test, debug and design",
    items: ["Postman", "IntelliJ IDEA", "VS Code", "Figma"],
  },
} satisfies Record<string, ArchitectureNode>;

// Labels drawn on the connectors between layers.
export const flows = {
  clientToApi: "HTTP · JSON",
  apiToServices: "jobs · calls",
  apiToData: "SQL · queries",
  delivery: "build · ship",
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  image: string;
  imageAlt: string;
  // Shown in the project dialog; hidden when empty.
  highlights?: string[];
  github?: string;
  live?: string;
};

// The first project is shown as the featured tile.
export const projects: Project[] = [
  {
    slug: "tbrgs",
    title: "Traffic-Based Route Guidance System",
    shortTitle: "TBRGS",
    summary: "Calculates optimal travel routes from real-time traffic data, factoring in intersection delays and speed limits.",
    problem: "Fastest route under live traffic",
    approach: "Graph search with delay and speed-limit costs",
    stack: ["Python", "React", "TypeScript", "Tailwind CSS", "REST API"],
    image: projectTbrgs,
    imageAlt: "Map of a road network with a computed route highlighted",
    github: "https://github.com/COS30019-IntroductiontoAI/Traffic-based-Route-Guidance-System",
    live: "https://cos30019-introductiontoai.github.io/Traffic-based-Route-Guidance-System/route-guidance",
    highlights: [], // TODO: 2–4 bullets on your role and results
  },
  {
    slug: "threat-detection",
    title: "Cybersecurity Threat Detection in Banking",
    shortTitle: "Threat detection",
    summary: "A machine-learning pipeline that identifies transaction anomalies and potential security threats in banking operations.",
    problem: "Spot suspicious transactions",
    approach: "Anomaly detection with data analysis and visualisation",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    image: projectCybersecurity,
    imageAlt: "Charts from the transaction anomaly analysis",
    github: "https://github.com/HCMComputingTechnologyInnovationProject/assignment3-hcmc1-8",
    highlights: [], // TODO
  },
  {
    slug: "airbnb-clone",
    title: "Full-Stack Airbnb Clone",
    shortTitle: "Airbnb clone",
    summary: "A property rental platform with secure authentication, dynamic listings, a booking system and payment integration.",
    problem: "Listings, bookings and payments",
    approach: "REST API with auth and a booking engine",
    stack: ["Node.js", "Express", "MongoDB", "React", "TypeScript"],
    image: projectAirbnb,
    imageAlt: "Listing page of the Airbnb clone",
    highlights: [], // TODO
    github: "", // TODO
    live: "", // TODO
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
