import { leadership } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { emphasizeNumbers } from "./emphasize";

export function Community() {
  return (
    <Section id="community" eyebrow="06 — community" title="Leadership & community">
      <ul className="group/lead grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {leadership.map((item, i) => {
          const current = item.period.includes("Present");
          return (
            <li
              key={`${item.role}-${item.period}`}
              className={cn(
                "transition-opacity duration-500 ease-dusk",
                "[@media(hover:hover)]:group-has-[>li:hover]/lead:opacity-60 [@media(hover:hover)]:hover:opacity-100!",
              )}
            >
              <BlurFade delay={0.06 * i} className="h-full">
                <article
                  className={cn(
                    "group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-elevated p-5",
                    "transition-[transform,border-color,box-shadow] duration-500 ease-dusk",
                    "hover:border-line-strong hover:shadow-card [@media(hover:hover)]:hover:-translate-y-0.5",
                  )}
                >
                  {/* Dusk horizon that draws in on hover */}
                  <span
                    aria-hidden
                    className="bg-dusk absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-dusk group-hover/card:scale-x-100"
                  />
                  <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-1.5">
                      {current && (
                        <span aria-hidden className="relative grid size-1.5 place-items-center">
                          <span className="absolute inset-0 rounded-full bg-green animate-ping-soft" />
                          <span className="relative size-1.5 rounded-full bg-green" />
                        </span>
                      )}
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-tight tracking-[-0.03em] text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-[0.95rem] text-muted">{item.org}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[14px] leading-relaxed text-muted">
                    {emphasizeNumbers(item.detail)}
                  </p>
                </article>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
