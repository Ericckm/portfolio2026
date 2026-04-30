const BASE_URL = "https://erickmartins.dev";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Erick Martins",
  url: BASE_URL,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js and Node.js. Building production-grade web applications. Open to remote opportunities.",
  email: "ericckm@outlook.com.br",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Full Stack Development",
    "Web Performance",
    "SEO",
  ],
  sameAs: [
    "https://github.com/Ericckm",
    "https://linkedin.com/in/ericckm",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Erick Martins — Full Stack Developer",
  url: BASE_URL,
  author: { "@type": "Person", name: "Erick Martins" },
};
