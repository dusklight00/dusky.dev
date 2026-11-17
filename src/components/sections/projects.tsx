import { ArrowUpRight } from "lucide-react";
import { profile, projects, socials } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { ProjectGrid } from "./projects/project-grid";

const github = socials.find((s) => s.label === "GitHub");

export function Projects() {
  return (
    <Section id="projects" eyebrow="03 — work" title="Projects & research">
      <BlurFade delay={0.05}>
        <ProjectGrid projects={projects} />
      </BlurFade>

      {github && (
        <BlurFade delay={0.1} className="mt-10 flex justify-center sm:justify-start">
          <a
            href={github.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 ease-dusk hover:text-ink"
          >
            <span className="h-px w-6 bg-line-strong transition-[width,background-color] duration-500 ease-dusk group-hover:w-10 group-hover:bg-accent" aria-hidden />
            More on GitHub
            <span className="normal-case tracking-normal text-faint">@{profile.handle}</span>
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 ease-dusk group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </BlurFade>
      )}
    </Section>
  );
}
