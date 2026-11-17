import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Horizon } from "@/components/ui/horizon";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="content"
      className="mx-auto flex min-h-[78dvh] w-full max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-6"
    >
      <BlurFade inView={false}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">404 — off the map</p>
      </BlurFade>

      <div className="mt-8 w-full max-w-[22rem]">
        <Horizon delay={0.1} />
      </div>

      <BlurFade inView={false} delay={0.12}>
        <h1 className="mt-8 font-display text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-ink text-balance sm:text-[3.4rem]">
          The sun already set here.
        </h1>
      </BlurFade>
      <BlurFade inView={false} delay={0.2}>
        <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-muted">
          This page doesn&apos;t exist, or it moved somewhere new.
        </p>
      </BlurFade>
      <BlurFade inView={false} delay={0.28}>
        <Link
          href="/"
          className="group mt-10 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-bg transition-colors duration-300 ease-dusk hover:bg-ink-soft"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-300 ease-dusk group-hover:-translate-x-0.5"
          />
          Back to home
        </Link>
      </BlurFade>
    </main>
  );
}
