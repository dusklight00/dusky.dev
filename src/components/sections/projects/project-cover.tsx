import {
  FolderGit2,
  GraduationCap,
  Languages,
  Radar,
  ScanFace,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Per-slug cover icon; unknown slugs fall back to a generic repo glyph. */
const ICONS: Record<string, LucideIcon> = {
  "ai-evaluator": GraduationCap,
  "focus-meter": ScanFace,
  "kannada-checker": Languages,
  "packet-check": Radar,
};

/** Cover tints rotate by index: panel background + ink used for icon/metric/motif. */
const TINTS = [
  { panel: "bg-accent-soft", ink: "text-accent" },
  { panel: "bg-violet-soft", ink: "text-dusk-3" },
  { panel: "bg-green-soft", ink: "text-green" },
  { panel: "bg-surface", ink: "text-ink-soft" },
] as const;

/** Small deterministic string hash (FNV-1a) so motifs are stable across SSR and client. */
function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Tiny seeded PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Faint generated motif: horizon waves, a dotted field or a setting sun, seeded by slug. */
function Motif({ slug }: { slug: string }) {
  const seed = hash(slug);
  const rand = rng(seed);
  const variant = seed % 3;
  const W = 320;
  const H = 200;

  if (variant === 0) {
    // Horizon waves: stacked sine lines that flatten toward the bottom.
    const lines = Array.from({ length: 9 }, (_, i) => {
      const y = 70 + i * 15;
      const amp = (9 - i) * 1.1 + rand() * 3;
      const freq = 1.2 + rand() * 1.4;
      const phase = rand() * Math.PI * 2;
      let d = "";
      for (let x = 0; x <= W; x += 8) {
        const yy = y + Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp;
        d += `${x === 0 ? "M" : "L"}${x} ${r1(yy)} `;
      }
      return <path key={i} d={d.trim()} opacity={0.25 + i * 0.07} />;
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="size-full" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth={1}>
          {lines}
        </g>
      </svg>
    );
  }

  if (variant === 1) {
    // Dotted field with a seeded "signal" band of larger dots.
    const dots: React.ReactNode[] = [];
    const band = 3 + Math.floor(rand() * 6);
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 20; col++) {
        const inBand = Math.abs(row - band) <= 1 && rand() > 0.35;
        dots.push(
          <circle
            key={`${row}-${col}`}
            cx={8 + col * 16}
            cy={8 + row * 16}
            r={inBand ? 2.1 : 1.1}
            opacity={inBand ? 0.9 : 0.35 + rand() * 0.25}
          />,
        );
      }
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden>
        <g fill="currentColor">{dots}</g>
      </svg>
    );
  }

  // Setting sun: concentric arcs on a horizon line, offset by seed.
  const cx = 190 + rand() * 90;
  const cy = 150;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={1}>
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={cx} cy={cy} r={16 + i * 14} opacity={0.75 - i * 0.09} />
        ))}
        <line x1={0} x2={W} y1={cy} y2={cy} opacity={0.8} />
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1={0} x2={W} y1={cy + 10 + i * 10} y2={cy + 10 + i * 10} opacity={0.5 - i * 0.1} />
        ))}
      </g>
    </svg>
  );
}

/** Generated cover art for a project tile (no screenshots exist). */
export function ProjectCover({ project, index }: { project: Project; index: number }) {
  const tint = TINTS[index % TINTS.length];
  const Icon = ICONS[project.slug] ?? FolderGit2;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-[14px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[14px] after:shadow-[inset_0_0_0_1px_var(--line)]",
        tint.panel,
      )}
    >
      {/* Inner layer scales on card hover. */}
      <div className="absolute inset-0 transition-transform duration-500 ease-dusk group-hover/card:scale-[1.03] motion-reduce:transform-none">
        <div className={cn("absolute inset-0 opacity-[0.22] [mask-image:linear-gradient(to_bottom,transparent,black_35%)]", tint.ink)}>
          <Motif slug={project.slug} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,color-mix(in_oklab,var(--bg)_55%,transparent),transparent_60%)]" />
      </div>

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
            {project.kind === "Research" && (
              <>
                <span className="size-1.5 rounded-full bg-dusk-3" aria-hidden />
                Research
                <span aria-hidden className="text-faint">
                  ·
                </span>
              </>
            )}
            {project.year}
          </span>
          <span
            className={cn(
              "grid size-11 place-items-center rounded-xl border border-line bg-elevated/70 backdrop-blur-sm transition-transform duration-500 ease-dusk group-hover/card:-rotate-6",
              tint.ink,
            )}
            aria-hidden
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
        </div>

        {project.metric && (
          <div>
            <p className={cn("font-display text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-[3.4rem]", tint.ink)}>
              {project.metric.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{project.metric.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
