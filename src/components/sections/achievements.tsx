import { achievements } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Tier = "first" | "second" | "other";

function tierOf(place: string): Tier {
  if (place === "1st") return "first";
  if (place === "2nd") return "second";
  return "other";
}

const BADGE: Record<Tier, string> = {
  first: "border-accent/25 bg-accent-soft",
  second: "border-dusk-3/25 bg-violet-soft text-[color-mix(in_oklab,var(--dusk-3)_78%,var(--ink))]",
  other: "border-line bg-surface text-muted",
};

function PlaceBadge({ place }: { place: string }) {
  const tier = tierOf(place);
  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-[4.25rem] items-center justify-center rounded-full border px-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
        BADGE[tier],
      )}
    >
      <span className={tier === "first" ? "text-dusk font-semibold" : undefined}>{place}</span>
    </span>
  );
}

export function Achievements() {
  const wins = achievements.filter((a) => tierOf(a.place) === "first").length;
  const podiums = achievements.filter((a) => tierOf(a.place) !== "other").length;

  return (
    <Section id="achievements" eyebrow="07 — recognition" title="Hackathons & awards">
      <BlurFade>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          <span className="text-ink">{podiums}</span> podium finishes
          <span aria-hidden className="mx-2">·</span>
          <span className="text-ink">{wins}</span> first places
          <span aria-hidden className="mx-2">·</span>
          <span className="text-ink">{achievements.length}</span> recognitions
        </p>
      </BlurFade>

      <ul className="group/awards border-t border-line">
        {achievements.map((a, i) => (
          <li key={`${a.event}-${a.where}`} className="border-b border-line">
            <BlurFade delay={0.04 * i} y={8}>
              <div
                className={cn(
                  "-mx-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-0.5 rounded-lg px-3 py-3.5 sm:grid-cols-[auto_minmax(0,1fr)_auto]",
                  "transition-[opacity,transform,background-color] duration-500 ease-dusk",
                  "[@media(hover:hover)]:group-has-[li:hover]/awards:opacity-45",
                  "[@media(hover:hover)]:hover:translate-x-1 [@media(hover:hover)]:hover:bg-surface [@media(hover:hover)]:hover:opacity-100!",
                )}
              >
                <span className="row-span-2 self-start pt-0.5 sm:row-span-1 sm:self-center sm:pt-0">
                  <PlaceBadge place={a.place} />
                </span>
                <span className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink">{a.event}</span>
                <span className="font-mono text-[11px] leading-snug text-faint sm:text-right">{a.where}</span>
              </div>
            </BlurFade>
          </li>
        ))}
      </ul>
    </Section>
  );
}
