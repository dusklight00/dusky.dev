"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { cn, EASE_DUSK } from "@/lib/utils";

/** Legacy fallback for contexts without the async Clipboard API (e.g. insecure origins). */
function legacyCopy(text: string) {
  // select() moves focus into the temporary textarea; remember where it was so keyboard users keep their place.
  const previous = document.activeElement as HTMLElement | null;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  previous?.focus();
  return ok;
}

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        ok = true;
      } else {
        ok = legacyCopy(email);
      }
    } catch {
      ok = legacyCopy(email);
    }
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  const text = state === "copied" ? "Copied ✓" : state === "failed" ? "Couldn’t copy" : "Copy";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={state === "copied" ? "Email address copied" : `Copy email address ${email}`}
        className={cn(
          "relative inline-flex min-h-11 items-center gap-1.5 overflow-hidden rounded-full border px-4 text-[13px] font-medium transition-colors duration-300 ease-dusk active:scale-[0.98]",
          state === "copied"
            ? "border-[color-mix(in_oklab,var(--green)_40%,var(--line))] bg-green-soft text-green"
            : "border-line bg-elevated text-ink-soft hover:border-line-strong hover:text-ink",
          className,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE_DUSK }}
            className="inline-flex items-center gap-1.5"
          >
            {state === "copied" ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            <span aria-hidden>{text}</span>
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed, select the address to copy it" : ""}
      </span>
    </>
  );
}
