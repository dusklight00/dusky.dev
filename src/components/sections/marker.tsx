"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

type MarkerProps = {
  children: React.ReactNode;
  /** Delay (ms) before the highlight sweeps in once visible; use it to stagger. */
  delay?: number;
  className?: string;
};

/**
 * Hand-drawn style highlight that sweeps in the first time it scrolls into view.
 * Styling lives in `.marker` / `.marker.is-in` (globals.css), which already
 * shows the highlight statically under prefers-reduced-motion.
 */
export function Marker({ children, delay = 0, className }: MarkerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <span
      ref={ref}
      className={cn("marker", inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}
