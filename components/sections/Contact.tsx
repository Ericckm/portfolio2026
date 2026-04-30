"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Reveal from "@/components/Reveal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});
type FormData = z.infer<typeof schema>;

const EMAILJS_SERVICE  = "service_5xybux5";
const EMAILJS_TEMPLATE = "template_3h0zrvn";
const EMAILJS_KEY      = "5Zy9FYWT-qPCpF1jj";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, data, EMAILJS_KEY);
      setStatus("ok");
      reset();
    } catch {
      setStatus("err");
    }
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
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Your name"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors"
                />
                {errors.name && (
                  <span className="font-mono text-xs text-red-400">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@company.com"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors"
                />
                {errors.email && (
                  <span className="font-mono text-xs text-red-400">{errors.email.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  placeholder="Tell me about the project or opportunity..."
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-amber/60 transition-colors resize-none"
                />
                {errors.message && (
                  <span className="font-mono text-xs text-red-400">{errors.message.message}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-body font-600 text-sm text-bg bg-amber hover:bg-amber/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                {status === "sending" ? "Sending..." : "Send message →"}
              </button>

              {/* Status messages */}
              {status === "ok" && (
                <p className="font-mono text-xs text-amber text-center">
                  ✓ Message sent — I&apos;ll get back to you shortly.
                </p>
              )}
              {status === "err" && (
                <p className="font-mono text-xs text-red-400 text-center">
                  Something went wrong. Email me directly at ericckm@outlook.com.br
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
