import Reveal from "@/components/Reveal";
import GlowCard from "@/components/GlowCard";

type Tech = { name: string; level: number };
type Category = { label: string; items: Tech[] };

const stack: Category[] = [
  {
    label: "Frontend",
    items: [
      { name: "TypeScript", level: 4 },
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "Redux Toolkit", level: 4 },
      { name: "Tailwind CSS", level: 5 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", level: 4 },
      { name: "Express", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "REST APIs", level: 5 },
      { name: "Zod", level: 4 },
    ],
  },
  {
    label: "Tooling & DevOps",
    items: [
      { name: "Git / GitHub", level: 5 },
      { name: "Docker", level: 3 },
      { name: "GitHub Actions", level: 3 },
      { name: "AWS", level: 3 },
      { name: "Jest / Testing", level: 3 },
    ],
  },
];

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            d <= level ? "bg-amber" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32 bg-surface" aria-label="Tech stack">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
            Tech stack
          </p>
          <h2
            className="font-display font-700 text-text leading-tight mb-16"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            What I
            <br />
            <span className="text-amber">work with</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stack.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 100}>
              <GlowCard bg="bg-bg" className="p-6 transition-colors duration-300">
                <p className="font-mono text-[10px] text-amber tracking-widest uppercase mb-5">
                  {cat.label}
                </p>
                <ul className="flex flex-col gap-4">
                  {cat.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <span className="font-body text-sm text-text font-500">
                        {item.name}
                      </span>
                      <LevelDots level={item.level} />
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* Currently learning strip */}
        <Reveal delay={300}>
          <div className="mt-10 p-5 rounded-xl border border-border/50 bg-amber-dim flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-amber tracking-widest uppercase shrink-0">
              Currently exploring →
            </span>
            {["AI", "Claude", "MCP", "Agents", "n8n"].map((item) => (
              <span
                key={item}
                className="font-mono text-xs text-muted border border-border px-2.5 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
