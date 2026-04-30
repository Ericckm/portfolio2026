"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  rounded?: "rounded-2xl" | "rounded-xl";
  bg?: string;
};

export default function GlowCard({
  children,
  className = "",
  rounded = "rounded-2xl",
  bg = "bg-surface",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - top}px`);
    el.style.setProperty("--glow-opacity", "1");
  }

  function onMouseLeave() {
    ref.current?.style.setProperty("--glow-opacity", "0");
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden p-[1px] ${rounded}`}
      style={{ background: "#2E2E40" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Border glow — visible only in the 1px padding gap */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background:
            "radial-gradient(circle 380px at var(--glow-x, -999px) var(--glow-y, -999px), rgba(232,197,71,0.55) 0%, transparent 50%)",
        }}
      />
      {/* Inner card surface */}
      <div className={`relative ${rounded} ${bg} h-full ${className}`}>
        {/* Interior spotlight — behind children, subtle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background:
              "radial-gradient(circle 380px at var(--glow-x, -999px) var(--glow-y, -999px), rgba(232,197,71,0.08) 0%, transparent 65%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
