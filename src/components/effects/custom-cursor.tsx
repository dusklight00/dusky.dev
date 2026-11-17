"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Accent cursor: a dot that tracks the pointer exactly and a ring that eases after it.
 * The native cursor stays visible; this is decoration only (pointer-events: none).
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  return enabled ? <CursorLayer /> : null;
}

type Kind = "" | "link" | "external" | "text";

const INTERACTIVE = 'a, button, summary, label, select, [role="button"], [role="tab"], [data-cursor="link"]';
const TEXT = "p, li, h1, h2, h3, h4, blockquote, dd, dt, figcaption";
const FIELD = "input, textarea, [contenteditable='true']";

function kindFor(target: EventTarget | null): Kind {
  if (!(target instanceof Element)) return "";
  if (target.closest('[data-cursor="none"]')) return "";
  const interactive = target.closest(INTERACTIVE);
  if (interactive) {
    return interactive.matches("a[target='_blank']") ? "external" : "link";
  }
  if (target.closest(FIELD)) return "text";
  if (target.closest(TEXT)) return "text";
  return "";
}

function CursorLayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let seen = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!seen) {
        // first move: jump the ring into place instead of sweeping from the corner
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
      }
      root.dataset.visible = "true";
      if (!raf) raf = requestAnimationFrame(tick);
    };

    let lastEl: EventTarget | null = null;
    const onOver = (e: PointerEvent) => {
      if (e.target === lastEl) return;
      lastEl = e.target;
      root.dataset.kind = kindFor(e.target);
    };
    const onDown = () => (root.dataset.down = "true");
    const onUp = () => delete root.dataset.down;
    const onLeave = () => {
      root.dataset.visible = "false";
      // A release outside the window never fires pointerup here; reset the pressed state too.
      delete root.dataset.down;
    };
    const onDocOut = (e: PointerEvent) => {
      if (!e.relatedTarget) onLeave();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onDocOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onDocOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-visible="false"
      data-kind=""
      className="group/cursor pointer-events-none fixed inset-0 z-[55] opacity-0 transition-opacity duration-300 ease-dusk data-[visible=true]:opacity-100"
    >
      {/* easing ring */}
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={[
            "absolute left-0 top-0 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30",
            "transition-[width,height,border-radius,background-color,border-color,scale] duration-300 ease-dusk",
            "group-data-[kind=link]/cursor:size-11 group-data-[kind=link]/cursor:border-accent/40 group-data-[kind=link]/cursor:bg-accent/10",
            "group-data-[kind=external]/cursor:size-11 group-data-[kind=external]/cursor:border-accent/40 group-data-[kind=external]/cursor:bg-accent/10",
            "group-data-[kind=text]/cursor:h-5 group-data-[kind=text]/cursor:w-[2px] group-data-[kind=text]/cursor:border-transparent group-data-[kind=text]/cursor:bg-ink/25",
            "group-data-[down=true]/cursor:scale-[0.82]",
          ].join(" ")}
        >
          <span className="translate-y-[-0.5px] text-[13px] font-medium leading-none text-accent opacity-0 transition-opacity duration-200 group-data-[kind=external]/cursor:opacity-100">
            ↗
          </span>
        </div>
      </div>
      {/* exact dot */}
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div className="absolute left-0 top-0 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[scale,opacity] duration-300 ease-dusk group-data-[kind=external]/cursor:scale-0 group-data-[kind=link]/cursor:scale-0 group-data-[kind=text]/cursor:scale-0" />
      </div>
    </div>
  );
}
