"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_DUSK } from "@/lib/utils";
import { useIntroDone } from "@/components/intro/intro";

/**
 * Renders a stat such as "500+" and counts the numeric part up from 0 the first
 * time it scrolls into view. SSR / no-JS / reduced motion show the final value.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const introDone = useIntroDone();

  useEffect(() => {
    const node = ref.current;
    const match = /^(\D*)(\d+)(.*)$/.exec(value);
    if (!inView || !introDone || reduce || !node || !match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const controls = animate(0, target, {
      duration: Math.min(1.6, 0.6 + target / 400),
      ease: EASE_DUSK,
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = value;
    };
  }, [inView, introDone, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
