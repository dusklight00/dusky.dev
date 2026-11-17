"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { experience, type Experience as Role } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { cn, EASE_DUSK } from "@/lib/utils";
import { emphasizeNumbers } from "./emphasize";

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 — experience" title="Where I've worked">
      <ol className="group/xp relative">
        {/* Timeline rail */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[7px] top-6 w-px bg-linear-to-b from-line-strong via-line to-transparent"
        />
        {experience.map((role, i) => (
          <TimelineEntry key={role.company} role={role} index={i} defaultOpen={i === 0 || !!role.current} />
        ))}
      </ol>
    </Section>
  );
}

function TimelineEntry({ role, index, defaultOpen }: { role: Role; index: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <li
      className={cn(
        "relative pb-3 pl-8 last:pb-0 sm:pl-10",
        "transition-opacity duration-500 ease-dusk",
        "[@media(hover:hover)]:group-has-[>li:hover]/xp:opacity-55 [@media(hover:hover)]:hover:opacity-100!",
      )}
    >
      <TimelineDot current={role.current} />

      <BlurFade delay={0.06 * index}>
        <article
          className={cn(
            "group/card -mx-1 rounded-xl border border-transparent px-1 py-1 sm:-mx-4 sm:px-4 sm:py-3",
            "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-dusk",
            "hover:border-line hover:bg-elevated hover:shadow-card [@media(hover:hover)]:hover:-translate-y-0.5",
          )}
        >
          <h3 className="m-0">
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              className="flex min-h-11 w-full items-start gap-3 rounded-lg text-left"
            >
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-[1.35rem]">
                    {role.company}
                  </span>
                  {role.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-green">
                      Now
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[0.98rem] font-medium leading-snug text-ink-soft">
                  {role.role}
                </span>
                <span className="mt-1.5 flex flex-wrap gap-x-2 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                  <span>{role.period}</span>
                  <span aria-hidden>·</span>
                  <span>{role.location}</span>
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted",
                  "transition-[transform,color,border-color,background-color] duration-500 ease-dusk",
                  "group-hover/card:border-line-strong group-hover/card:text-ink",
                  open && "rotate-45 border-line-strong bg-surface text-accent",
                )}
              >
                <Plus className="size-4" strokeWidth={1.75} />
              </span>
              <span className="sr-only">{open ? "Hide details" : "Show details"}</span>
            </button>
          </h3>

          <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{role.summary}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_DUSK }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 pt-3">
                  {role.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_DUSK, delay: 0.05 + i * 0.05 }}
                      className="relative pl-5 text-[14.5px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0.5 top-[0.7em] h-px w-2.5 bg-line-strong"
                      />
                      {emphasizeNumbers(h)}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <ul aria-label={`${role.company} stack`} className="mt-4 flex flex-wrap gap-1.5">
            {role.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        </article>
      </BlurFade>
    </li>
  );
}

function TimelineDot({ current }: { current?: boolean }) {
  return (
    <span aria-hidden className="absolute left-0 top-3.5 grid size-[15px] place-items-center sm:top-5">
      {current ? (
        <>
          <span className="absolute inset-0 rounded-full bg-green/40 animate-ping-soft" />
          <span className="relative size-[15px] rounded-full border-[3px] border-bg bg-green shadow-[0_0_0_1px_var(--green)]" />
        </>
      ) : (
        <span className="size-[11px] rounded-full border border-line-strong bg-bg shadow-[0_0_0_3px_var(--bg)]" />
      )}
    </span>
  );
}
