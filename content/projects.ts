export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  live?: string;
  github?: string;
  image?: string;
  featured: boolean;
  year: number;
};

export const projects: Project[] = [
  {
    slug: "stella-fisio",
    title: "Stella Sobral Fisioterapia",
    tagline: "SEO-first marketing site for a home physiotherapist",
    description:
      "100% static Next.js site built to outrank competitors in local São Paulo search. JSON-LD schema, Tailwind v4, 6 service pages with unique copy, sitemap generation, and Core Web Vitals focus.",
    tags: ["Next.js", "TypeScript", "Tailwind v4", "SEO", "SSG", "Schema.org"],
    live: "https://stellasobral.com.br",
    github: "https://github.com/Ericckm/Stellafisio",
    featured: true,
    year: 2026,
  },
  {
    slug: "portfolio",
    title: "Developer Portfolio",
    tagline: "This site — dark editorial design system",
    description:
      "Personal portfolio built with Next.js 16, Tailwind v4, Framer Motion and TypeScript. Dark editorial aesthetic with Syne typography, amber accent, and animated orbit hero.",
    tags: ["Next.js", "TypeScript", "Tailwind v4", "Framer Motion", "EmailJS"],
    github: "https://github.com/Ericckm",
    image: "/work/portfolio/preview.png",
    featured: true,
    year: 2026,
  },
];
