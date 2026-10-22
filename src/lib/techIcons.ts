import {
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siIntellijidea,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

export type TechIconData = { title: string; path: string; hex: string };

// Brand marks from simple-icons, keyed by the names used in src/data/profile.ts.
// Names without an entry (e.g. "REST API", "VS Code") fall back to a generic icon.
export const techIcons: Record<string, TechIconData> = {
  React: siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  Express: siExpress,
  Python: siPython,
  "scikit-learn": siScikitlearn,
  Pandas: siPandas,
  NumPy: siNumpy,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Docker: siDocker,
  Vercel: siVercel,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
  "IntelliJ IDEA": siIntellijidea,
  Figma: siFigma,
};

const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Brand colour when it reads against the given background, otherwise undefined (use currentColor).
export const readableBrandColor = (hex: string, backgroundHex: string, minContrast = 3) => {
  const [a, b] = [luminance(hex), luminance(backgroundHex)];
  const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return contrast >= minContrast ? `#${hex}` : undefined;
};
