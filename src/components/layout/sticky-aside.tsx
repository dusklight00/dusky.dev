"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Fixed header height (4rem) plus breathing room: where the column sticks when it fits. */
const STICK_TOP = 96;
/** Space kept below the column when it is taller than the viewport. */
const BOTTOM_GAP = 24;

/**
 * Sticky identity column (lg+). When the column fits the viewport it sticks under the
 * header; when it is taller (short laptop screens) its sticky offset goes negative so
 * the column scrolls until its last line is visible and then stays put, instead of
 * clipping the bottom (socials, clock) out of reach.
 */
export function StickyAside({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const top = Math.min(STICK_TOP, window.innerHeight - el.offsetHeight - BOTTOM_GAP);
      el.style.setProperty("--aside-top", `${top}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside ref={ref} className={cn("lg:sticky lg:top-(--aside-top,6rem) lg:self-start", className)}>
      {children}
    </aside>
  );
}
