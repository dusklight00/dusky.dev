import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori cannot read CSS variables, so these copy the light-theme values from globals.css
// (MUTED/FAINT are slightly lighter OG-only greys).
const PAPER = "#fbfaf7";
const INK = "#1f1e1b";
const MUTED = "#6f6c65";
const FAINT = "#a19e96";
const LINE = "#e7e4dc";
const DUSK_1 = "#e8743b";
const DUSK_2 = "#d94f70";
const DUSK_3 = "#7c5cd6";

/** Fetch a Google font subset as TTF (Satori can't read woff2). Falls back to the default font. */
async function loadGoogleFont(family: string, axes: string, text: string): Promise<ArrayBuffer | null> {
  "use cache";
  cacheLife("max");
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url, { signal: AbortSignal.timeout(5000) })).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src, { signal: AbortSignal.timeout(5000) });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const role = profile.role;
  const [display, sans] = await Promise.all([
    loadGoogleFont("Bricolage+Grotesque", "wght@600", `${profile.name}${profile.handle}`),
    loadGoogleFont("Geist", "wght@500", `${role}${profile.location}·`),
  ]);

  const fonts = [
    ...(display ? [{ name: "Display", data: display, weight: 600 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Sans", data: sans, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* soft dusk glow behind the sun */}
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 60,
            width: 620,
            height: 360,
            display: "flex",
            borderRadius: 9999,
            background: `radial-gradient(rgba(232,116,59,0.22) 0%, rgba(217,79,112,0.12) 40%, rgba(251,250,247,0) 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: display ? "Display" : undefined,
              fontSize: 30,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.handle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: FAINT,
            }}
          >
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: display ? "Display" : undefined,
              fontWeight: 600,
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              color: INK,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontFamily: sans ? "Sans" : undefined,
              fontWeight: 500,
              fontSize: 42,
              letterSpacing: "-0.02em",
              color: MUTED,
            }}
          >
            {role}
          </div>
        </div>

        {/* horizon with a half-set sun */}
        <svg width="1040" height="120" viewBox="0 0 1040 120" style={{ display: "flex" }}>
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1040" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={DUSK_1} stopOpacity="0" />
              <stop offset="0.35" stopColor={DUSK_1} />
              <stop offset="0.7" stopColor={DUSK_2} />
              <stop offset="0.92" stopColor={DUSK_3} />
              <stop offset="1" stopColor={DUSK_3} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sun" x1="760" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={DUSK_1} />
              <stop offset="0.5" stopColor={DUSK_2} />
              <stop offset="1" stopColor={DUSK_3} />
            </linearGradient>
          </defs>
          <path d="M760 84 A70 70 0 0 1 900 84 Z" fill="url(#sun)" fillOpacity="0.14" />
          <path d="M760 84 A70 70 0 0 1 900 84" stroke="url(#sun)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M0 84 H1040" stroke="url(#line)" strokeWidth="2" />
          <path d="M786 98 H874" stroke="url(#sun)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
          <path d="M808 110 H852" stroke="url(#sun)" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, display: "flex", background: `linear-gradient(90deg, ${DUSK_1}, ${DUSK_2} 50%, ${DUSK_3})` }} />
        <div style={{ position: "absolute", left: 80, right: 80, bottom: 40, height: 1, display: "flex", background: LINE }} />
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
