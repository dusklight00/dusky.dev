"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn, EASE_DUSK } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Signature motif: a thin horizon line with a half-set sun.                  */
/* -------------------------------------------------------------------------- */

type HorizonProps = {
  className?: string;
  /** Draw on mount (default) or when scrolled into view. */
  trigger?: "mount" | "view";
  delay?: number;
};

export function Horizon({ className, trigger = "mount", delay = 0 }: HorizonProps) {
  const id = useId();
  const lineId = `hz-line-${id}`;
  const sunId = `hz-sun-${id}`;

  const draw = (d: number, duration = 1.4) => ({
    initial: { pathLength: 0, opacity: 0 },
    ...(trigger === "mount"
      ? { animate: { pathLength: 1, opacity: 1 } }
      : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: "0px 0px -10% 0px" } }),
    transition: {
      pathLength: { duration, ease: EASE_DUSK, delay: delay + d },
      opacity: { duration: 0.2, delay: delay + d },
    },
  });

  return (
    <svg
      viewBox="0 0 240 44"
      fill="none"
      aria-hidden
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={lineId} x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--dusk-1)" stopOpacity="0" />
          <stop offset="0.3" stopColor="var(--dusk-1)" />
          <stop offset="0.55" stopColor="var(--dusk-2)" />
          <stop offset="0.85" stopColor="var(--dusk-3)" />
          <stop offset="1" stopColor="var(--dusk-3)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={sunId} x1="104" y1="0" x2="136" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--dusk-1)" />
          <stop offset="0.5" stopColor="var(--dusk-2)" />
          <stop offset="1" stopColor="var(--dusk-3)" />
        </linearGradient>
      </defs>
      {/* half-set sun */}
      <motion.path
        d="M102 30 A18 18 0 0 1 138 30"
        stroke={`url(#${sunId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        {...draw(0.35, 1.1)}
      />
      {/* horizon */}
      <motion.path
        d="M2 30 H238"
        stroke={`url(#${lineId})`}
        strokeWidth="1"
        strokeLinecap="round"
        {...draw(0, 1.6)}
      />
      {/* reflections on the water */}
      <motion.path d="M108 35.5 H132" stroke={`url(#${sunId})`} strokeOpacity="0.55" strokeLinecap="round" {...draw(0.8, 0.8)} />
      <motion.path d="M114 40 H126" stroke={`url(#${sunId})`} strokeOpacity="0.3" strokeLinecap="round" {...draw(0.95, 0.8)} />
    </svg>
  );
}
