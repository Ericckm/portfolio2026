"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "#work", label: "work()" },
  { href: "#stack", label: "stack()" },
  { href: "#experience", label: "experience()" },
  { href: "#contact", label: "contact()" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-bg/90 backdrop-blur-md border-b border-border"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          aria-label="Erick Martins — Home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image src="/logo_nobg.png" alt="EM logo" width={64} height={48} style={{ width: "64px", height: "auto", filter: "brightness(2)" }} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs text-muted hover:text-amber transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/cv/Erick_Martins_Baptista.pdf"
            download
            className="font-body text-xs font-500 text-bg bg-amber hover:bg-amber/90 px-4 py-2 rounded-full transition-colors duration-200"
          >
            Resume ↓
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-text transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface mt-3">
          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-sm text-muted hover:text-amber transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/cv/Erick_Martins_Baptista.pdf"
              download
              className="font-body text-sm font-500 text-bg bg-amber px-5 py-2.5 rounded-full text-center mt-2"
            >
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
