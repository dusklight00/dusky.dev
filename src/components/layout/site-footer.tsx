import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { Horizon } from "@/components/ui/horizon";
import { SocialIcon } from "@/components/ui/social-icon";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();

  return (
    <footer className="border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-8 sm:px-6 sm:pt-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">signing off</p>
            <p className="mt-3 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink text-balance sm:text-[2.6rem]">
              Thanks for scrolling. Let&apos;s build <span className="text-dusk pr-1">something good.</span>
            </p>
            <div className="mt-5 w-full max-w-[13rem]">
              <Horizon trigger="view" />
            </div>
          </div>

          <ul className="-ml-3 flex flex-wrap items-center md:-mr-3 md:ml-0">
            {socials.map((s) => {
              const external = !s.href.startsWith("mailto:");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex h-11 items-center gap-2 rounded-full px-3 text-[14px] text-muted transition-colors duration-300 ease-dusk hover:bg-surface hover:text-ink"
                  >
                    <SocialIcon label={s.label} className="size-4" />
                    {s.label}
                    {external && (
                      <>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 text-faint transition-transform duration-300 ease-dusk group-hover:-translate-y-px group-hover:translate-x-px"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-[13px] text-muted">
              © {year} {profile.name}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              Built with Next.js · Bangalore
            </p>
          </div>
          <a
            href="#top"
            className="group -ml-3 inline-flex h-11 w-fit items-center gap-2 rounded-full px-3 text-[13px] text-muted transition-colors duration-300 ease-dusk hover:bg-surface hover:text-ink sm:-mr-3 sm:ml-0"
          >
            Back to top
            <span className="flex size-6 items-center justify-center rounded-full border border-line bg-elevated transition-transform duration-300 ease-dusk group-hover:-translate-y-0.5">
              <ArrowUp aria-hidden className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
