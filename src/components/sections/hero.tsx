"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { ArrowDownToLine, ArrowRight, Clock3 } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Horizon } from "@/components/ui/horizon";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Live local clock (Bangalore).                                              */
/* -------------------------------------------------------------------------- */

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribeClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const getClock = () => timeFormat.format(Date.now());
const getServerClock = () => "--:--";

function LocalClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribeClock, getClock, getServerClock);
  return (
    <p className={cn("flex items-center gap-2 font-mono text-[11.5px] tracking-tight text-muted", className)}>
      <Clock3 aria-hidden className="size-3.5 text-faint" strokeWidth={1.75} />
      <span>
        <time className="tabular-nums text-ink-soft" suppressHydrationWarning>
          {time}
        </time>{" "}
        IST
      </span>
      <span aria-hidden className="text-faint">
        ·
      </span>
      <span>{profile.location}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero / identity column                                                      */
/* -------------------------------------------------------------------------- */

const STEP = 0.07;

export function Hero() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {/* Taped photo card */}
        <BlurFade inView={false} delay={0}>
          <div className="group relative w-fit pt-2.5">
            <div
              className={cn(
                "relative rotate-[-3.5deg] rounded-[12px] border border-line bg-elevated p-1.5 pb-6 shadow-card",
                "transition-transform duration-500 ease-dusk group-hover:rotate-0 group-hover:-translate-y-0.5",
              )}
            >
              <span
                aria-hidden
                className="absolute -top-2.5 left-1/2 z-10 h-[18px] w-14 -translate-x-1/2 rotate-[4deg] rounded-[2px] border border-white/40 bg-[color-mix(in_oklab,var(--dusk-1)_26%,var(--bg-elevated)_40%)] opacity-90 shadow-[0_1px_2px_rgb(0_0_0/0.06)] backdrop-blur-[2px] dark:border-white/5"
              />
              <div className="relative size-[104px] overflow-hidden rounded-[8px] bg-surface sm:size-[116px] short-desk:size-[84px]">
                <Image
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  preload
                  sizes="116px"
                  className="object-cover object-[50%_28%] transition-transform duration-500 ease-dusk group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[11px] tracking-tight text-muted">
                @{profile.handle}
              </span>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView={false} delay={STEP * 1}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint short-desk:mt-5">hi, i&apos;m</p>
          <h1 className="mt-1 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-ink sm:text-[2.9rem]">
            {profile.name}
          </h1>
        </BlurFade>

        <BlurFade inView={false} delay={STEP * 2}>
          <p className="mt-2 text-[1.1rem] font-medium leading-tight tracking-[-0.015em] text-muted">{profile.role}</p>
        </BlurFade>

        <div className="mt-3 w-full max-w-[16rem]">
          <Horizon delay={0.25} />
        </div>

        <BlurFade inView={false} delay={STEP * 3}>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-muted text-pretty short-desk:mt-2">{profile.tagline}</p>
        </BlurFade>

        {profile.available && (
          <BlurFade inView={false} delay={STEP * 4}>
            <p className="mt-5 inline-flex items-center gap-2 short-desk:mt-4 rounded-full border border-line bg-elevated py-1 pl-2.5 pr-3 text-[12.5px] font-medium text-ink-soft shadow-[0_1px_0_rgb(0_0_0/0.02)]">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-green opacity-60" />
                <span className="relative size-2 rounded-full bg-green" />
              </span>
              Open to opportunities
            </p>
          </BlurFade>
        )}

        <BlurFade inView={false} delay={STEP * 5}>
          <div className="mt-6 flex flex-wrap gap-2 short-desk:mt-4">
            <a
              href="#contact"
              data-cursor="link"
              className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-[14px] sm:px-5 lg:px-4 font-medium text-bg transition-[transform,background-color] duration-300 ease-dusk hover:bg-ink-soft active:scale-[0.98]"
            >
              Get in touch
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-dusk group-hover/cta:translate-x-0.5"
              />
            </a>
            <a
              href={profile.resume}
              download
              className="group/cv inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 text-[14px] sm:px-5 lg:px-4 font-medium text-ink transition-[transform,border-color] duration-300 ease-dusk hover:border-faint active:scale-[0.98]"
            >
              <ArrowDownToLine
                aria-hidden
                className="size-4 text-muted transition-transform duration-300 ease-dusk group-hover/cv:translate-y-0.5"
              />
              Download CV
              <span className="sr-only">(PDF)</span>
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Bottom of the identity column: socials + local time */}
      <BlurFade inView={false} delay={STEP * 6} className="mt-8 short-desk:mt-4">
        <ul className="-ml-3 flex items-center">
          {socials.map((s) => {
            const external = !s.href.startsWith("mailto:");
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={external ? `${s.label} (opens in a new tab)` : `Email ${profile.name}`}
                  title={s.label}
                  className="flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-300 ease-dusk hover:bg-surface hover:text-ink"
                >
                  <SocialIcon label={s.label} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 border-t border-line pt-3">
          <LocalClock />
        </div>
      </BlurFade>
    </div>
  );
}
