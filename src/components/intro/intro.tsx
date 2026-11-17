"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_DUSK } from "@/lib/utils";

/**
 * First-visit loading screen: a hexagon draws itself, the "R" monogram fades in,
 * the logo shrinks away, then the overlay fades and the page's own entrances play.
 *
 * It runs once per browser session. The inline script in <head> (INTRO_SCRIPT)
 * sets `data-intro="skip"` before first paint when the session cookie exists or
 * reduced motion is on, and CSS hides the server-rendered overlay in that case,
 * so repeat visits never flash it.
 */

export const INTRO_COOKIE = "intro_seen";

/** Runs in <head> before paint. Keep it tiny and dependency-free. */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(document.cookie.indexOf("${INTRO_COOKIE}=1")>-1||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="skip"}else{d.dataset.intro="play";document.cookie="${INTRO_COOKIE}=1; path=/; SameSite=Lax"}}catch(e){}`;

/** Total time before page entrances start (seconds); matches the timeline below. */
const DONE_AT = 2.05;

const IntroContext = createContext(true);

/** True once the intro has finished (or was skipped); gate entrance animations on it. */
export function useIntroDone() {
  return useContext(IntroContext);
}

const noopSubscribe = () => () => {};
/** Set by INTRO_SCRIPT before hydration; the server can't know, so it assumes the intro plays. */
const readSkip = () => document.documentElement.dataset.intro !== "play";

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const skipped = useSyncExternalStore(noopSubscribe, readSkip, () => false);
  const [finished, setFinished] = useState(false);
  const done = skipped || finished;

  useEffect(() => {
    if (skipped) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const id = window.setTimeout(() => {
      root.style.overflow = "";
      setFinished(true);
    }, DONE_AT * 1000);
    return () => {
      window.clearTimeout(id);
      root.style.overflow = "";
    };
  }, [skipped]);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <IntroOverlay done={done} />
    </IntroContext.Provider>
  );
}

function IntroOverlay({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          aria-hidden
          className="intro-overlay fixed inset-0 z-[65] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE_DUSK } }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            fill="none"
            className="size-24 sm:size-28"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.82, opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.4, ease: EASE_DUSK }}
          >
            <defs>
              <linearGradient id="intro-dusk" x1="11" y1="5" x2="89" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="var(--dusk-1)" />
                <stop offset="0.5" stopColor="var(--dusk-2)" />
                <stop offset="1" stopColor="var(--dusk-3)" />
              </linearGradient>
            </defs>
            {/* Hexagon outline (from the previous site's logo), drawn in the dusk gradient. */}
            <motion.path
              d="M50 5L11 27V72L50 95L89 73V28L50 5Z"
              stroke="url(#intro-dusk)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15, duration: 0.95, ease: EASE_DUSK }}
            />
            {/* "R" monogram. */}
            <motion.path
              d="M40.0128 66V35.4545H51.4673C53.8139 35.4545 55.7827 35.8622 57.3736 36.6776C58.9744 37.4929 60.1825 38.6364 60.9979 40.108C61.8232 41.5696 62.2358 43.2749 62.2358 45.2237C62.2358 47.1825 61.8182 48.8828 60.983 50.3246C60.1577 51.7564 58.9396 52.8651 57.3288 53.6506C55.718 54.4261 53.7393 54.8139 51.3928 54.8139H43.2344V50.2202H50.647C52.0192 50.2202 53.1428 50.0312 54.0178 49.6534C54.8928 49.2656 55.5391 48.7038 55.9567 47.968C56.3842 47.2223 56.598 46.3075 56.598 45.2237C56.598 44.1399 56.3842 43.2152 55.9567 42.4496C55.5291 41.674 54.8778 41.0874 54.0028 40.6896C53.1278 40.282 51.9993 40.0781 50.6172 40.0781H45.5462V66H40.0128ZM55.7926 52.1591L63.3544 66H57.1797L49.7521 52.1591H55.7926Z"
              fill="var(--ink)"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: EASE_DUSK }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
