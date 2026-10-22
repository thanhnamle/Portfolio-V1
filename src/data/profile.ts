// All portfolio content lives here, so updating the site never means touching components.
// Fields marked TODO still need real values; empty optional links are hidden automatically.

import projectTbrgs from "@/assets/project-tbrgs.webp";
import projectCybersecurity from "@/assets/project-cybersecurity.webp";
import projectAirbnb from "@/assets/project-airbnb.webp";

export const profile = {
  name: "Le Thanh Nam",
  initials: "LN",
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

export const about = [
  "I'm a Computer Science student at Swinburne Vietnam who enjoys the server side of software: designing REST APIs, modelling data and building pipelines that turn raw data into decisions.",
  "I've worked as an intern at Payoo (VietUnion), a payments company, and I'm currently writing a systematic literature review to sharpen my research skills. My goal is to grow from backend into a senior full-stack engineer who owns features end to end.",
];

export const quickFacts = {
  education: {
    school: "Swinburne Vietnam",
    degree: "Computer Science",
    graduation: "Expected Jul 2027",
  },
  // TODO: add the year and your official intern title.
  internship: {
    company: "Payoo (VietUnion)",
    title: "Intern",
    period: "Aug – Nov",
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
  },
  {
    // TODO: add the year, e.g. "Aug – Nov 2025".
    period: "Aug – Nov",
    title: "Intern",
    org: "Payoo (VietUnion)",
    // TODO: one or two lines on what you built and the result.
    description: "Internship at a Vietnamese payments company.",
    tags: [],
  },
  {
    period: "– Jul 2027",
    title: "Computer Science",
    org: "Swinburne Vietnam",
    description: "Expected graduation July 2027.",
    tags: ["Data structures", "Databases", "AI"],
  },
];

export type ArchitectureNode = {
  id: string;
  label: string;
  items: string[];
  note?: string;
  core?: boolean;
};

// Rendered as the blueprint request-flow diagram: client → api → (services, data).
export const architecture = {
  client: { id: "A", label: "Client", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
  api: {
    id: "B",
    label: "API layer",
    items: ["Node.js", "Express", "REST APIs"],
    note: "auth · validation · business logic",
    core: true,
  },
  services: { id: "C", label: "Services", items: ["Python", "scikit-learn", "Pandas"] },
  data: { id: "D", label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  infra: { id: "E", label: "Infra", items: ["Docker", "Vercel", "Git", "GitHub"] },
  tooling: { id: "F", label: "Tooling", items: ["Postman", "IntelliJ", "VS Code", "Figma"] },
} satisfies Record<string, ArchitectureNode>;

export type Project = {
  title: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  image: string;
  imageAlt: string;
  github?: string;
  live?: string;
};

// The first project is shown as the featured tile.
export const projects: Project[] = [
  {
    title: "Traffic-Based Route Guidance System",
    summary: "Calculates optimal travel routes from real-time traffic data, factoring in intersection delays and speed limits.",
    problem: "Fastest route under live traffic",
    approach: "Graph search with delay and speed-limit costs",
    stack: ["Python", "React", "TypeScript", "Tailwind CSS", "REST API"],
    image: projectTbrgs,
    imageAlt: "Map of a road network with a computed route highlighted",
    github: "", // TODO
  },
  {
    title: "Cybersecurity Threat Detection in Banking",
    summary: "A machine-learning pipeline that identifies transaction anomalies and potential security threats in banking operations.",
    problem: "Spot suspicious transactions",
    approach: "Anomaly detection with data analysis and visualisation",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    image: projectCybersecurity,
    imageAlt: "Charts from the transaction anomaly analysis",
    github: "", // TODO
  },
  {
    title: "Full-Stack Airbnb Clone",
    summary: "A property rental platform with secure authentication, dynamic listings, a booking system and payment integration.",
    problem: "Listings, bookings and payments",
    approach: "REST API with auth and a booking engine",
    stack: ["Node.js", "Express", "MongoDB", "React", "TypeScript"],
    image: projectAirbnb,
    imageAlt: "Listing page of the Airbnb clone",
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
