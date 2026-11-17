import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomCursor } from "@/components/effects/custom-cursor";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

const description = `${profile.name}: ${profile.role} in ${profile.location}. ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: ["Rahul Raj", "dusklight00", "AI engineer", "full-stack developer", "LangChain", "RAG", "Next.js", "Bangalore"],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · ${profile.role}`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className="min-h-dvh bg-bg text-ink">
        {/* Entrance animations server-render their hidden start state; without JS, show everything. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}</style>`,
          }}
        />
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
            >
              Skip to content
            </a>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CustomCursor />
            <div aria-hidden className="grain" />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
