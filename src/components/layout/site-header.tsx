"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn, EASE_DUSK } from "@/lib/utils";

const NAV = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "work" },
  { id: "skills", label: "stack" },
  { id: "contact", label: "contact" },
] as const;

/** Every section on the page, in order; used to know which nav item is current.
 *  Must match the <Section id> values rendered by src/app/page.tsx. */
const SECTION_IDS = ["about", "experience", "projects", "skills", "activity", "community", "achievements", "contact"];
const NAV_IDS = new Set<string>(NAV.map((n) => n.id));

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const pick = () => {
      // Pinned to the last item once the page bottom is reached (contact is short).
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && document.getElementById("contact")) {
        setActive("contact");
        return;
      }
      const current = SECTION_IDS.find((id) => visible.get(id));
      if (current !== undefined) setActive(NAV_IDS.has(current) ? current : null);
      else if (window.scrollY < 200) setActive(null);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        pick();
      },
      // a thin band ~40% down the viewport decides the current section
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    window.addEventListener("scroll", pick, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, []);

  return [active, setActive] as const;
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Wordmark() {
  return (
    <Link
      href="/#top"
      aria-label={`${profile.name}: back to top`}
      className="-ml-1 flex h-11 items-center rounded-md px-1 font-display text-[20px] font-semibold leading-none tracking-[-0.04em] text-ink transition-colors duration-300 ease-dusk hover:text-accent"
    >
      {profile.handle}
    </Link>
  );
}

export function SiteHeader() {
  const [active, setActive] = useActiveSection();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Mobile menu: Esc closes, focus moves into the panel, Tab stays inside, closes past md.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [
        buttonRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const idx = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && idx === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && close(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    // Lock page scroll behind the open menu.
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      root.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const raised = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b bg-bg/70 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color] duration-500 ease-dusk",
          raised ? "border-line" : "border-transparent",
          open && "bg-bg/90",
        )}
      />
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={() => setActive(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex h-9 items-center rounded-full px-3.5 text-[14px] tracking-[-0.016em] transition-colors duration-300 ease-dusk",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-line bg-elevated shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="group hidden h-9 items-center gap-1 rounded-full border border-line-strong bg-elevated px-3.5 text-[13.5px] font-medium text-ink transition-colors duration-300 ease-dusk hover:border-faint sm:inline-flex"
          >
            Resume
            <ArrowUpRight
              aria-hidden
              className="size-3.5 text-muted transition-transform duration-300 ease-dusk group-hover:-translate-y-px group-hover:translate-x-px"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-1.5 flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-300 ease-dusk hover:bg-surface md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-[18px]">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-dusk",
                  open && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-dusk",
                  open && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden
              onClick={() => close()}
              className="fixed inset-0 top-16 bg-bg/40 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_DUSK }}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id={menuId}
              className="absolute inset-x-0 top-full md:hidden"
              initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: EASE_DUSK }}
            >
              <nav
                aria-label="Mobile"
                className="mx-3 mt-2 overflow-hidden rounded-[14px] border border-line bg-elevated/95 p-2 shadow-card backdrop-blur-xl"
              >
                <ul className="flex flex-col">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE_DUSK, delay: 0.04 + i * 0.035 }}
                    >
                      <a
                        href={`/#${item.id}`}
                        onClick={() => {
                          setActive(item.id);
                          close(false);
                        }}
                        aria-current={active === item.id ? "location" : undefined}
                        className={cn(
                          "flex h-12 items-center justify-between rounded-[10px] px-3 font-display text-[1.15rem] font-medium tracking-[-0.02em] transition-colors duration-300 ease-dusk hover:bg-surface",
                          active === item.id ? "text-ink" : "text-ink-soft",
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[10.5px] tracking-[0.1em] text-faint">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </span>
                        {active === item.id && <span aria-hidden className="size-1.5 rounded-full bg-dusk" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-line pt-2">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => close(false)}
                    className="flex h-12 items-center justify-between rounded-[10px] px-3 text-[15px] font-medium text-ink transition-colors duration-300 ease-dusk hover:bg-surface"
                  >
                    Resume (PDF)
                    <ArrowUpRight aria-hidden className="size-4 text-muted" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
