"use client";
import * as React from "react";
import { cn } from "../lib/util";

export interface TextRevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  revealText: string;
}

export const TextRevealCard = React.forwardRef<HTMLDivElement, TextRevealCardProps>(
  ({ className, text, revealText, children, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative group bg-[#18181b] rounded-2xl overflow-hidden border border-white/10 p-8 min-h-[240px] flex flex-col justify-end transition-shadow duration-300 shadow hover:shadow-2xl",
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
        <div className="absolute left-0 right-0 bottom-8 flex flex-col items-center select-none pointer-events-none">
          <AnimatedParticles show={hovered} />
          <span
            className={cn(
              "text-3xl font-bold transition-all duration-500 text-white/80 tracking-tight mt-4",
              hovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
            )}
          >
            {text}
          </span>
          <span
            className={cn(
              "absolute left-0 right-0 mx-auto text-3xl font-bold text-white tracking-tight mt-4 transition-all duration-500",
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ transitionDelay: hovered ? "200ms" : "0ms" }}
          >
            {revealText}
          </span>
        </div>
      </div>
    );
  }
);
TextRevealCard.displayName = "TextRevealCard";

export function TextRevealCardTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-lg font-semibold text-white mb-1">{children}</div>;
}
export function TextRevealCardDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-neutral-300">{children}</div>;
}

function AnimatedParticles({ show }: { show: boolean }) {
  // Partículas simples: no usan canvas (más liviano, optimizado)
  const [dots] = React.useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      left: `${Math.random() * 95}%`,
      top: `${Math.random() * 30 + 5}%`,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 0.5,
    }))
  );
  return (
    <span className="absolute left-0 right-0 h-14 mx-auto pointer-events-none">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute bg-white/70 rounded-full opacity-0 transition-all duration-300"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            opacity: show ? 0.8 : 0,
            transitionDelay: show ? `${dot.delay}s` : "0s",
            filter: "blur(0.5px)"
          }}
        />
      ))}
    </span>
  );
}
