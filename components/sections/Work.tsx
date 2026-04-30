import Image from "next/image";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32" aria-label="Selected work">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
                Selected work
              </p>
              <h2
                className="font-display font-700 text-text leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Things I&apos;ve
                <br />
                <span className="text-amber">shipped</span>
              </h2>
            </div>
            <a
              href="https://github.com/Ericckm"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-mono text-xs text-muted hover:text-amber border border-border hover:border-amber px-4 py-2 rounded-full transition-all duration-200"
            >
              All on GitHub ↗
            </a>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <article className="group relative p-7 md:p-9 rounded-2xl border border-border bg-surface hover:border-amber/30 transition-all duration-300 hover:bg-surface-2">
                {/* Ambient hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(232,197,71,0.04) 0%, transparent 60%)" }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {project.image && (
                    <div className="shrink-0 w-full md:w-48 h-28 rounded-xl overflow-hidden border border-border">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={192}
                        height={112}
                        sizes="(max-width: 768px) 100vw, 192px"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {/* Year badge */}
                    <span className="font-mono text-[10px] text-muted tracking-widest mb-3 block">
                      {project.year}
                    </span>

                    <h3 className="font-display font-700 text-xl text-text group-hover:text-amber transition-colors duration-200 mb-2">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-muted mb-1 font-500">
                      {project.tagline}
                    </p>
                    <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-5">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-muted bg-surface-2 border border-border px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 shrink-0">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-muted hover:text-amber border border-border hover:border-amber/40 px-4 py-2 rounded-full transition-all duration-200"
                      >
                        Live ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-muted hover:text-amber border border-border hover:border-amber/40 px-4 py-2 rounded-full transition-all duration-200"
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
