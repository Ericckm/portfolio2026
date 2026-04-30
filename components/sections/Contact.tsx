"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:ericckm@outlook.com.br?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface" aria-label="Contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <Reveal>
            <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
              Contact
            </p>
            <h2
              className="font-display font-700 text-text leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Let&apos;s build
              <br />
              <span className="text-amber">something</span>
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-10 max-w-sm">
              I&apos;m actively looking for full-time roles and contract opportunities —
              fully remote or on-site. Drop me a message or reach out directly.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Email", value: "ericckm@outlook.com.br", href: "mailto:ericckm@outlook.com.br" },
                { label: "GitHub", value: "github.com/Ericckm", href: "https://github.com/Ericckm" },
                { label: "LinkedIn", value: "in/ericckm", href: "https://linkedin.com/in/ericckm" },
                { label: "Based in", value: "São Paulo, Brazil · Open to relocation", href: undefined },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-muted tracking-widest uppercase w-16 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-body text-sm text-muted hover:text-amber transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-body text-sm text-muted">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the project or opportunity..."
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="font-body font-600 text-sm text-bg bg-amber hover:bg-amber/90 px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                Send message →
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
