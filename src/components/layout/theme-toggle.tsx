"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn, EASE_DUSK } from "@/lib/utils";

const noopSubscribe = () => () => {};

/** Light/dark switch with a circular view-transition reveal from the button. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  // false during SSR + hydration, true afterwards: avoids an aria-label mismatch.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const apply = () => {
      // Flip the class synchronously so the view transition snapshots the new theme;
      // next-themes then persists the choice and settles on the same class.
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduce || !ref.current) {
      apply();
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 450, easing: `cubic-bezier(${EASE_DUSK.join(", ")})`, pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-300 ease-dusk hover:bg-surface hover:text-ink",
        // extend the hit area to 44px without growing the visual
        "after:absolute after:-inset-1 after:content-['']",
        className,
      )}
    >
      {/* Icons swap purely via the `.dark` class, so SSR markup is stable. */}
      <Sun
        aria-hidden
        strokeWidth={1.75}
        className="absolute size-[18px] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-500 ease-dusk dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden
        strokeWidth={1.75}
        className="absolute size-[17px] rotate-90 scale-50 opacity-0 transition-[transform,opacity] duration-500 ease-dusk dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
