import Reveal from "@/components/Reveal";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2022 — Present",
    location: "Remote",
    description:
      "Building web applications and marketing sites for select clients. Handled everything from architecture to deployment, including SEO-focused Next.js sites and REST APIs.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    role: "Senior Front-End Developer",
    company: "CulturaSoft · Client: Sunny Brinquedos",
    period: "2022 — Present",
    location: "São Paulo, BR",
    description:
      "Led front-end modernization of a large-scale product catalog portal used by resellers nationwide for one of Brazil's largest toy importers. Migrated legacy jQuery interfaces to React and Next.js, restructured data schemas for advanced filtering and searchability, and collaborated across teams on sprint planning and feature delivery. Mentored junior developers on React patterns and code review practices.",
    stack: ["React.js", "Next.js", "TypeScript", "JavaScript", "jQuery", "HTML", "CSS", "REST APIs", "Git"],
  },
];

const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "Universidade Paulista (UNIP)",
    period: "2012 — 2018",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32" aria-label="Experience">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2
            className="font-display font-700 text-text leading-tight mb-16"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Where I&apos;ve
            <br />
            <span className="text-amber">worked</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Work timeline */}
          <div className="lg:col-span-2 flex flex-col gap-1">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 100}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  {/* Timeline line */}
                  {i < experiences.length - 1 && (
                    <div className="absolute left-[7px] top-4 bottom-0 w-px bg-border" aria-hidden="true" />
                  )}
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-amber bg-bg" aria-hidden="true" />

                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-display font-700 text-lg text-text">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-muted">{exp.period}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-sm font-600 text-amber">{exp.company}</span>
                    <span className="text-muted">·</span>
                    <span className="font-mono text-xs text-muted">{exp.location}</span>
                  </div>

                  <p className="font-body text-sm text-muted leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-muted bg-surface border border-border px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education sidebar */}
          <Reveal delay={200}>
            <div>
              <p className="font-mono text-[10px] text-amber tracking-widest uppercase mb-6">
                Education
              </p>
              <div className="flex flex-col gap-6">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-5 rounded-xl border border-border bg-surface"
                  >
                    <p className="font-mono text-xs text-muted mb-1">{edu.period}</p>
                    <p className="font-display font-600 text-sm text-text mb-1">
                      {edu.degree}
                    </p>
                    <p className="font-body text-xs text-muted">{edu.school}</p>
                  </div>
                ))}

                {/* Location signal */}
                <div className="p-5 rounded-xl border border-amber/20 bg-amber-dim">
                  <p className="font-mono text-[10px] text-amber tracking-widest uppercase mb-2">
                    Looking for
                  </p>
                  <p className="font-body text-sm text-text font-500 mb-1">
                    Remote · Hybrid · Relocation
                  </p>
                  <p className="font-body text-xs text-muted">
                    Open to remote and on-site opportunities.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
