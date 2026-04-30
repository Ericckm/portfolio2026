"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Full Stack Developer",
  "React Specialist",
  "Next.js Engineer",
  "Open to Remote",
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[titleIdx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
  }, [displayed, deleting, titleIdx]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden ambient-grid"
      aria-label="Erick Martins — Full Stack Developer"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32">
        {/* Left — text */}
        <div>
          {/* Status badge */}
          <div className="hero-label inline-flex items-center gap-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
            </span>
            <span className="font-mono text-xs text-amber tracking-widest uppercase">
              Available for new projects
            </span>
          </div>

          {/* Code line */}
          <p className="hero-label font-mono text-xs text-muted mb-3">
            <span className="text-muted">const</span>{" "}
            <span className="text-amber">developer</span>{" "}
            <span className="text-muted">=</span>{" "}
            <span className="text-text">&quot;Erick Martins&quot;</span>
            <span className="text-muted"> // available()</span>
          </p>

          {/* Name */}
          <h1
            className="hero-name font-display font-800 text-text leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Erick
            <br />
            <span className="text-amber">Martins</span>
          </h1>

          {/* Typewriter title */}
          <div className="hero-title h-8 flex items-center mb-6">
            <span className="font-mono text-lg text-muted">
              {displayed}
              <span className="cursor-blink text-amber">|</span>
            </span>
          </div>

          {/* Bio */}
          <p className="hero-bio font-body text-base text-muted leading-relaxed max-w-md mb-10">
            I build fast, accessible, and scalable web applications.
            3+ years shipping production code with React, Next.js and Node.js —
            looking for my next challenge.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="#work"
              className="font-body font-600 text-sm text-bg bg-amber hover:bg-amber/90 px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="font-body font-500 text-sm text-text border border-border hover:border-amber hover:text-amber px-6 py-3 rounded-full transition-all duration-200"
            >
              Get in touch →
            </a>
          </div>

          {/* Social row */}
          <div className="hero-cta flex items-center gap-5 mt-10 pt-8 border-t border-border">
            <a
              href="https://github.com/Ericckm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-amber transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/ericckm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-amber transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:ericckm@outlook.com.br"
              className="font-mono text-xs text-muted hover:text-amber transition-colors"
            >
              ericckm@outlook.com.br
            </a>
          </div>
        </div>

        {/* Right — profile photo */}
        <div className="hero-visual hidden lg:flex items-center justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(232,197,71,0.15) 0%, transparent 70%)", transform: "scale(1.2)" }}
              aria-hidden="true"
            />
            <div className="relative z-10 rounded-full overflow-hidden border-2 border-amber/40 drop-shadow-2xl">
              <Image
                src="/erick.png"
                alt="Erick Martins"
                width={460}
                height={460}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll button */}
      <button
        onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-amber transition-colors duration-200 group"
        aria-label="Scroll to work section"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent group-hover:from-amber transition-colors duration-200" />
      </button>
    </section>
  );
}
