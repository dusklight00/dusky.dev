"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, BookOpen, Code2 } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { Chip } from "@/components/ui/chip";
import { cn, EASE_DUSK } from "@/lib/utils";
import { ProjectCover } from "./project-cover";

type Filter = "All" | Project["kind"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Project", label: "Projects" },
  { value: "Research", label: "Research" },
];

const linkIcon = (label: string) => (/paper/i.test(label) ? BookOpen : Code2);

/** Prefer the source repo as the card's primary destination; otherwise the first link. */
function primaryLink(project: Project) {
  return project.links.find((l) => /source/i.test(l.label)) ?? project.links[0];
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <LayoutGroup id="projects">
      <div
        role="group"
        aria-label="Filter projects"
        className="relative inline-flex max-w-full gap-1 rounded-full border border-line bg-surface/70 p-1"
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          const count = f.value === "All" ? projects.length : projects.filter((p) => p.kind === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 sm:min-h-9 text-[13px] font-medium transition-colors duration-300 ease-dusk active:scale-[0.98] sm:px-4",
                active ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="projects-filter-pill"
                  className="absolute inset-0 rounded-full border border-line-strong bg-elevated shadow-card"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  aria-hidden
                />
              )}
              <span className="relative">{f.label}</span>
              <span
                className={cn(
                  "relative font-mono text-[10px] tabular-nums transition-colors",
                  active ? "text-accent" : "text-faint",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "item" : "items"}
      </p>

      <motion.ul
        layout
        className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 pointer-fine:[&:has(>li:hover)>li:not(:hover)>article]:opacity-55"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: EASE_DUSK }}
            >
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primary = primaryLink(project);

  return (
    <article className="group/card relative flex h-full flex-col rounded-[18px] border border-line bg-elevated/60 p-2 transition-[border-color,box-shadow,opacity] duration-500 ease-dusk hover:border-[color-mix(in_oklab,var(--accent)_30%,var(--line-strong))] hover:shadow-card focus-within:border-line-strong">
      <ProjectCover project={project} index={index} />

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-4">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-[1.2rem]">
          {primary ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-[18px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            >
              {project.title}
              <ArrowUpRight
                className="ml-1 inline size-4 align-[-0.1em] text-faint transition-transform duration-300 ease-dusk group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
                aria-hidden
              />
              <span className="sr-only">({primary.label}, opens in a new tab)</span>
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] leading-snug text-ink-soft">
                <span className="mt-[0.45em] h-px w-2.5 shrink-0 bg-line-strong" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-5">
            {project.links.map((link) => {
              const Icon = linkIcon(link.label);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label}: ${project.title} (opens in a new tab)`}
                  className="group/link inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-bg px-3.5 text-[13px] font-medium text-ink-soft transition-colors duration-300 ease-dusk hover:border-line-strong hover:bg-surface hover:text-ink sm:min-h-9"
                >
                  <Icon className="size-3.5 text-faint transition-colors group-hover/link:text-accent" aria-hidden />
                  {link.label}
                  <ArrowUpRight
                    className="size-3 text-faint transition-transform duration-300 ease-dusk group-hover/link:-translate-y-px group-hover/link:translate-x-px"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
