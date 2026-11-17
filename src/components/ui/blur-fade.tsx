"use client";

import { useRef } from "react";
import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { EASE_DUSK } from "@/lib/utils";
import { useIntroDone } from "@/components/intro/intro";

type BlurFadeProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Animate when scrolled into view (default) or immediately on mount. */
  inView?: boolean;
  y?: number;
};

/**
 * Signature entrance: fade up from a soft blur. Waits for the intro overlay to
 * finish so entrances never play hidden behind it.
 */
export function BlurFade({ delay = 0, inView = true, y = 12, children, ...rest }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });
  const introDone = useIntroDone();
  const hidden = { opacity: 0, y, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  const visible = introDone && (!inView || seen);
  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{ duration: 0.8, ease: EASE_DUSK, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
