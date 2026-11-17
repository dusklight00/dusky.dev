"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_DUSK } from "@/lib/utils";

type BlurFadeProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Animate when scrolled into view (default) or immediately on mount. */
  inView?: boolean;
  y?: number;
};

/** Signature entrance: fade up from a soft blur. */
export function BlurFade({ delay = 0, inView = true, y = 12, children, ...rest }: BlurFadeProps) {
  const hidden = { opacity: 0, y, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <motion.div
      initial={hidden}
      {...(inView
        ? { whileInView: shown, viewport: { once: true, amount: 0.1 } }
        : { animate: shown })}
      transition={{ duration: 0.8, ease: EASE_DUSK, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
