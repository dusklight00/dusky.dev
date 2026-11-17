import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ScrollToEnd } from "./github-activity/scroll-to-end";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Contributions = { total: number; days: Day[] };

const USER = profile.handle;
const PROFILE_URL = socials.find((s) => s.label === "GitHub")?.href ?? `https://github.com/${USER}`;

/**
 * Public contribution calendar for the last year, cached for a day.
 * Throws on failure so a bad response is never cached; the caller renders a fallback.
 */
async function getContributions(user: string): Promise<Contributions> {
  "use cache";
  cacheLife("days");

  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`GitHub contributions request failed: ${res.status}`);

  const json: unknown = await res.json();
  const data = json as { total?: { lastYear?: unknown }; contributions?: unknown };
  if (!Array.isArray(data.contributions)) throw new Error("Unexpected contributions payload");

  const days: Day[] = [];
  for (const raw of data.contributions as Record<string, unknown>[]) {
    const { date, count, level } = raw ?? {};
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const c = typeof count === "number" && Number.isFinite(count) ? Math.max(0, count) : 0;
    const l = typeof level === "number" ? Math.min(4, Math.max(0, Math.round(level))) : 0;
    days.push({ date, count: c, level: l as Day["level"] });
  }
  if (days.length === 0) throw new Error("Empty contributions payload");
  days.sort((a, b) => a.date.localeCompare(b.date));
  const continuous = fillGaps(days);

  const total =
    typeof data.total?.lastYear === "number" ? data.total.lastYear : continuous.reduce((sum, d) => sum + d.count, 0);
  return { total, days: continuous };
}

/* ---------- helpers (UTC throughout: the API dates are UTC days, whatever the build server's time zone) ---------- */

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const fmtDay = (iso: string) =>
  toDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const fmtMonth = (iso: string) => toDate(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
const nf = new Intl.NumberFormat("en-US");

/**
 * Dedupe by date and insert empty days for any gaps, so the grid stays aligned:
 * toWeeks() places days by position, and one missing date would shift every later weekday.
 */
function fillGaps(sorted: Day[]): Day[] {
  const byDate = new Map(sorted.map((d) => [d.date, d]));
  const out: Day[] = [];
  const end = toDate(sorted[sorted.length - 1].date).getTime();
  for (let t = toDate(sorted[0].date).getTime(); t <= end; t += 86_400_000) {
    const date = new Date(t).toISOString().slice(0, 10);
    out.push(byDate.get(date) ?? { date, count: 0, level: 0 });
  }
  return out;
}

/** Group days into Sunday-first week columns, padding the first week. */
function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = Array.from({ length: toDate(days[0].date).getUTCDay() }, () => null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array.from({ length: 7 - week.length }, () => null)]);
  return weeks;
}

/** Column index where each month first appears (skip a label too close to the previous). */
function monthLabels(weeks: (Day | null)[][]) {
  const labels: { col: number; label: string }[] = [];
  let lastMonth = "";
  weeks.forEach((week, col) => {
    const first = week.find((d): d is Day => d !== null && toDate(d.date).getUTCDate() <= 7);
    if (!first || col > weeks.length - 3) return;
    const month = first.date.slice(0, 7);
    if (month === lastMonth) return;
    lastMonth = month;
    const prev = labels.at(-1);
    if (prev && col - prev.col < 3) return;
    labels.push({ col, label: fmtMonth(first.date) });
  });
  return labels;
}

function stats(days: Day[]) {
  let longest = 0;
  let run = 0;
  let active = 0;
  let best: Day = days[0];
  for (const d of days) {
    if (d.count > 0) {
      active++;
      run++;
      longest = Math.max(longest, run);
    } else run = 0;
    if (d.count > best.count) best = d;
  }
  return { longest, active, best };
}

const LEVEL_BG = [
  "bg-line",
  "bg-[color-mix(in_oklab,var(--accent)_15%,var(--line))]",
  "bg-[color-mix(in_oklab,var(--accent)_35%,var(--line))]",
  "bg-[color-mix(in_oklab,var(--accent)_60%,var(--line))]",
  "bg-[color-mix(in_oklab,var(--accent)_90%,var(--line))]",
] as const;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/* ---------- shared frame ---------- */

function ProfileLink() {
  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 ease-dusk hover:text-ink"
    >
      @{USER}
      <ArrowUpRight
        className="size-3.5 transition-transform duration-300 ease-dusk group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
      <span className="sr-only">(GitHub profile, opens in a new tab)</span>
    </a>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint" aria-hidden>
      Less
      {LEVEL_BG.map((bg, i) => (
        <span key={i} className={cn("size-[10px] rounded-[2px]", bg)} />
      ))}
      More
    </div>
  );
}

function Frame({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <Section id="activity" eyebrow="05 — activity" title="Shipping, consistently" action={<ProfileLink />}>
      <BlurFade delay={0.05}>
        <div className="rounded-[18px] border border-line bg-elevated p-4 sm:p-5">
          {children}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">{footer}</div>
        </div>
      </BlurFade>
    </Section>
  );
}

/* ---------- section ---------- */

export async function GithubActivity() {
  let data: Contributions;
  try {
    data = await getContributions(USER);
  } catch {
    return <GithubActivityUnavailable />;
  }

  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks);
  const { longest, active, best } = stats(data.days);
  const cols = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };

  return (
    <Frame
      footer={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="text-ink tabular-nums">{nf.format(data.total)}</span> contributions in the last year
          </p>
          <Legend />
        </>
      }
    >
      <dl className="mb-5 grid grid-cols-3 gap-3 sm:max-w-md">
        {[
          { label: "active days", value: nf.format(active) },
          { label: "longest streak", value: `${longest}d` },
          { label: "busiest day", value: nf.format(best.count), title: fmtDay(best.date) },
        ].map((s) => (
          <div key={s.label} title={s.title}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{s.label}</dt>
            <dd className="mt-0.5 font-display text-xl font-semibold tabular-nums tracking-[-0.03em] text-ink">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <ScrollToEnd
        className="-mx-1 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin]"
        label="Contribution calendar, scroll horizontally"
      >
        <div className="flex min-w-[44rem] gap-2">
          {/* Weekday labels stay pinned while the grid scrolls. */}
          <div
            className="sticky left-0 z-10 -ml-1 grid shrink-0 grid-rows-[1rem_repeat(7,minmax(0,1fr))] gap-[3px] bg-elevated pl-1 pr-1.5"
            aria-hidden
          >
            <span />
            {DAY_LABELS.map((d, i) => (
              <span key={i} className="flex items-center font-mono text-[9px] leading-none text-faint">
                {d}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div className="relative mb-[3px] grid h-4" style={cols} aria-hidden>
              {labels.map((m) => (
                <span
                  key={`${m.col}-${m.label}`}
                  className="whitespace-nowrap font-mono text-[10px] leading-none text-faint"
                  style={{ gridColumn: m.col + 1, gridRow: 1 }}
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div
              role="img"
              aria-label={`${nf.format(data.total)} contributions in the last year. Busiest day: ${fmtDay(best.date)} with ${best.count}.`}
              className="grid grid-flow-col grid-rows-7 gap-[3px]"
              style={{ gridTemplateColumns: cols.gridTemplateColumns }}
            >
              {weeks.flatMap((week, w) =>
                week.map((day, d) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${fmtDay(day.date)}`}
                      className={cn(
                        "aspect-square rounded-[2px] transition-transform duration-200 ease-dusk hover:scale-125",
                        LEVEL_BG[day.level],
                      )}
                    />
                  ) : (
                    <span key={`pad-${w}-${d}`} className="aspect-square" />
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </ScrollToEnd>
    </Frame>
  );
}

/** Shown when the contributions API is unreachable or returns junk. */
function GithubActivityUnavailable() {
  return (
    <Frame footer={<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Activity unavailable right now</p>}>
      <div className="flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-muted">
          The contribution graph couldn&apos;t load. The full history lives on{" "}
          <span className="text-ink">GitHub</span>.
        </p>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-bg px-4 text-[13px] font-medium text-ink-soft transition-colors duration-300 ease-dusk hover:border-line-strong hover:bg-surface hover:text-ink"
        >
          View profile
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </Frame>
  );
}
