import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import { CopyEmail } from "./contact/copy-email";

const ghost =
  "group/btn inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-elevated/70 px-4 text-[13px] font-medium text-ink-soft backdrop-blur-sm transition-colors duration-300 ease-dusk hover:border-line-strong hover:bg-elevated hover:text-ink";

export function Contact() {
  const mailto = `mailto:${profile.email}`;
  const profiles = socials.filter((s) => s.label !== "Email");

  return (
    <Section id="contact" eyebrow="08 — contact" title="Let's build something">
      <BlurFade delay={0.05}>
        <div className="@container relative isolate overflow-hidden rounded-[22px] border border-line bg-elevated px-5 py-8 shadow-card sm:px-10 sm:py-12">
          {/* Dusk backdrop: soft glow, horizon line and a half-set sun. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -bottom-1/2 left-1/2 h-[120%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--dusk-1)_22%,transparent),color-mix(in_oklab,var(--dusk-2)_12%,transparent)_45%,color-mix(in_oklab,var(--dusk-3)_8%,transparent)_70%,transparent)] blur-2xl" />
            <div className="absolute bottom-4 right-[8%] size-40 translate-y-1/2 sm:bottom-6 sm:size-56">
              <div className="size-full rounded-full bg-[linear-gradient(180deg,var(--dusk-1),var(--dusk-2)_55%,var(--dusk-3))] opacity-[0.16] [mask-image:linear-gradient(to_bottom,black_50%,transparent_50%)]" />
            </div>
            <div className="absolute inset-x-0 bottom-4 h-px sm:bottom-6 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--dusk-2)_45%,transparent)_30%,color-mix(in_oklab,var(--dusk-3)_45%,transparent)_70%,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-4 sm:h-6 bg-[repeating-linear-gradient(to_bottom,color-mix(in_oklab,var(--line)_70%,transparent)_0_1px,transparent_1px_10px)] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          </div>

          {profile.available && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-green opacity-60" />
                <span className="relative size-2 rounded-full bg-green" />
              </span>
              Available for new work · {profile.location}
            </p>
          )}

          <p className="mt-6 max-w-xl font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.6rem]">
            Got an idea that needs <span className="text-dusk pr-[0.08em]">building</span>? I&apos;d love to hear it.
          </p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
            LLM features, RAG pipelines or a full product from 0 → 1. Drop a line and I&apos;ll get back to you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={mailto}
              className="group/email inline-flex min-h-11 w-fit max-w-full items-center font-display text-[clamp(1.15rem,6.2cqi,2.1rem)] font-semibold leading-tight tracking-[-0.035em] text-ink [overflow-wrap:anywhere]"
            >
              <span className="bg-[linear-gradient(90deg,var(--dusk-1),var(--dusk-2),var(--dusk-3))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-dusk group-hover/email:bg-[length:100%_2px] group-focus-visible/email:bg-[length:100%_2px]">
                {profile.email}
              </span>
            </a>
            <CopyEmail email={profile.email} className="w-fit" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href={mailto}
              className="group/btn inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-bg shadow-card transition-[transform,background-color] duration-300 ease-dusk hover:-translate-y-px hover:bg-ink-soft active:translate-y-0"
            >
              <Mail className="size-4" aria-hidden />
              Email me
              <ArrowUpRight
                className="size-3.5 opacity-70 transition-transform duration-300 ease-dusk group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a href={profile.resume} download className={ghost}>
              <Download className="size-4 text-faint transition-colors group-hover/btn:text-accent" aria-hidden />
              Download CV
            </a>
            {profiles.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={ghost}>
                <SocialIcon label={s.label} className="size-4 text-faint transition-colors group-hover/btn:text-ink" />
                {s.label}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}
