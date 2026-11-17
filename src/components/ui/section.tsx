import { cn } from "@/lib/utils";
import { BlurFade } from "./blur-fade";

type SectionProps = {
  id: string;
  /** Small mono eyebrow, e.g. "02 — experience". */
  eyebrow: string;
  title: string;
  /** Optional right-aligned slot next to the title (e.g. a "view all" link). */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** Standard content section: mono eyebrow, display title, hairline rule. */
export function Section({ id, eyebrow, title, action, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-24", className)}>
      <BlurFade>
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{eyebrow}</p>
            <h2
              id={`${id}-title`}
              className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[1.7rem]"
            >
              {title}
            </h2>
          </div>
          {action}
        </div>
      </BlurFade>
      {children}
    </section>
  );
}
