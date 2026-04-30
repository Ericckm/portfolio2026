import Reveal from "@/components/Reveal";

type Tech = { name: string; level: number };
type Category = { label: string; items: Tech[] };

const stack: Category[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 3 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", level: 4 },
      { name: "Express", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "REST APIs", level: 4 },
      { name: "Zod", level: 4 },
    ],
  },
  {
    label: "Tooling & DevOps",
    items: [
      { name: "Git / GitHub", level: 5 },
      { name: "Vercel", level: 4 },
      { name: "VS Code / Claude Code", level: 5 },
      { name: "AI / LLM Tooling", level: 4 },
      { name: "Postman", level: 4 },
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
              <div className="p-6 rounded-2xl border border-border bg-bg hover:border-amber/20 transition-colors duration-300">
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
              </div>
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
