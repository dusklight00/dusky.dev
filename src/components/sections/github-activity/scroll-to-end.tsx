"use client";

import { useEffect, useRef } from "react";

/** Horizontally scrollable region that starts scrolled to its most recent (right) end. */
export function ScrollToEnd({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    // Focusable so keyboard users can scroll it; labelled for screen readers.
    <div ref={ref} role="region" aria-label={label} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
