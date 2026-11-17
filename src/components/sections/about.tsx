import { GraduationCap, MapPin } from "lucide-react";
import { education, profile, stats } from "@/data/portfolio";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/ui/section";
import { CountUp } from "./count-up";
import { Marker } from "./marker";

/** Phrases (verbatim from profile.summary) that get a marker highlight, in reading order. */
const HIGHLIGHTS = [
  "ship production software",
  "Graph-RAG pipelines",
  "agentic research workflows",
  "publish research",
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const HIGHLIGHT_RE = new RegExp(`(${HIGHLIGHTS.map(escape).join("|")})`, "g");

/** Marker sweeps start after the paragraph has faded in, then stagger. */
const MARKER_BASE_MS = 450;
const MARKER_STEP_MS = 220;

/** Splits each paragraph into plain text and highlighted phrases with a staggered delay. */
function segmentSummary(paragraphs: readonly string[]) {
  let index = 0;
  return paragraphs.map((paragraph) =>
    paragraph.split(HIGHLIGHT_RE).map((text, i) =>
      i % 2 === 1 ? { text, delay: MARKER_BASE_MS + MARKER_STEP_MS * index++ } : { text },
    ),
  );
}

export function About() {
  const paragraphs = segmentSummary(profile.summary);

  return (
    <Section id="about" eyebrow="01 — about" title="Where AI meets product">
      <div className="space-y-4 text-[15px] leading-[1.75] text-muted sm:text-base">
        {paragraphs.map((segments, p) => (
          <BlurFade key={p} delay={0.06 * (p + 1)}>
            <p className={p === 0 ? "text-ink-soft" : undefined}>
              {segments.map((seg, i) =>
                seg.delay === undefined ? (
                  seg.text
                ) : (
                  <Marker key={i} delay={seg.delay}>
                    {seg.text}
                  </Marker>
                ),
              )}
            </p>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={0.2}>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col-reverse justify-end gap-1.5 bg-bg px-4 py-5 transition-colors duration-500 ease-dusk hover:bg-elevated sm:px-5"
            >
              <dt className="font-mono text-[10.5px] uppercase leading-snug tracking-[0.12em] text-faint">
                {stat.label}
              </dt>
              <dd className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums sm:text-[2.6rem]">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </BlurFade>

      <BlurFade delay={0.26}>
        <div className="mt-4 flex items-start gap-4 rounded-xl border border-line bg-elevated p-4 shadow-card sm:items-center sm:p-5">
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent"
          >
            <GraduationCap className="size-5" strokeWidth={1.6} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Education</p>
            <p className="mt-0.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-base">
              {education.school}
            </p>
            <p className="text-sm text-muted">
              <span className="text-[0.95rem] text-ink-soft">{education.degree}</span>
              <span aria-hidden className="mx-2 text-faint">
                ·
              </span>
              <span className="font-mono text-xs">{education.detail}</span>
            </p>
          </div>
          <p className="hidden shrink-0 items-center gap-1.5 font-mono text-[11px] text-faint sm:flex">
            <MapPin aria-hidden className="size-3.5" strokeWidth={1.6} />
            {education.location}
          </p>
        </div>
      </BlurFade>
    </Section>
  );
}
