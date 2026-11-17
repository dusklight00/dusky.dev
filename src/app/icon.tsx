import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: a half-set dusk sun over a horizon line, on warm paper. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f1e1b",
          borderRadius: 8,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26">
          <defs>
            <linearGradient id="g" x1="4" y1="0" x2="22" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f59a62" />
              <stop offset="0.5" stopColor="#f0739a" />
              <stop offset="1" stopColor="#a68cf5" />
            </linearGradient>
          </defs>
          <path d="M5.5 16 A7.5 7.5 0 0 1 20.5 16 Z" fill="url(#g)" />
          <path d="M3 18.5 H23" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 21.5 H17" stroke="url(#g)" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
