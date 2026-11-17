import { skills } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";

// Keyframes scoped to this component; React 19 hoists and dedupes <style href precedence>.
const MARQUEE_CSS = `
@keyframes skills-marquee { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }
.skills-marquee-track { animation: skills-marquee 48s linear infinite; }
.skills-marquee:hover .skills-marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .skills-marquee-track { animation: none !important; transform: none; }
}
`;

const allSkills = Array.from(new Set(skills.flatMap((g) => g.items)));

export function Skills() {
  return (
    <Section id="skills" eyebrow="04 — stack" title="Tools I reach for">
      <style href="dusk-skills-marquee" precedence="default">
        {MARQUEE_CSS}
      </style>

      {/* Decorative ticker; the grouped list below is the accessible content. */}
      <BlurFade delay={0.05}>
        <div
          aria-hidden
          className="skills-marquee relative mb-8 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="skills-marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {allSkills.map((s) => (
                  <span key={s} className="flex items-center">
                    <span className="whitespace-nowrap font-display text-xl font-medium tracking-[-0.02em] text-ink-soft sm:text-2xl">
                      {s}
                    </span>
                    <span className="mx-5 size-1.5 rounded-full bg-dusk opacity-70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      <dl className="divide-y divide-line border-y border-line">
        {skills.map((group, i) => (
          <BlurFade
            key={group.group}
            delay={0.08 + i * 0.06}
            className="grid gap-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
          >
              <dt className="flex items-baseline justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-col sm:justify-start sm:gap-1 sm:pt-1">
                <span className="text-ink-soft">{group.group}</span>
                <span className="tabular-nums">{String(group.items.length).padStart(2, "0")} tools</span>
              </dt>
              <dd className="flex min-w-0 flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip
                    key={item}
                    className="cursor-default px-3 py-1 text-[12px] text-ink-soft transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-dusk hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_40%,var(--line))] hover:bg-accent-soft hover:text-ink hover:shadow-card"
                  >
                    {item}
                  </Chip>
                ))}
              </dd>
          </BlurFade>
        ))}
      </dl>
    </Section>
  );
}
