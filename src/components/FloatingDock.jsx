import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

// ── Social links (mirrors Socials.jsx) ─────────────────────────────────────
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/dusklight00",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="17" height="17">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dusk.light00/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="17" height="17">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/DuskLight16",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="17" height="17">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dusklight00/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="17" height="17">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "CodePen",
    href: "https://codepen.io/Ranon",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="17" height="17">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
        <polyline points="2 15.5 12 8.5 22 15.5" />
        <line x1="12" y1="2" x2="12" y2="8.5" />
      </svg>
    ),
  },
];

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      width="17" height="17">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      width="17" height="17">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      width="17" height="17">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ── Tooltip ─────────────────────────────────────────────────────────────────
function DockTooltip({ label }) {
  const tooltipBg    = useColorModeValue("rgba(26,32,44,0.9)", "rgba(236,238,243,0.9)");
  const tooltipColor = useColorModeValue("#ECEEF3", "#1A202C");
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.12 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: tooltipBg,
        color: tooltipColor,
        fontSize: "11px",
        fontFamily: "monospace",
        padding: "3px 9px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {label}
    </motion.div>
  );
}

// ── Single dock item ────────────────────────────────────────────────────────
function DockItem({ label, href, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  const hoverBg = useColorModeValue("rgba(0,0,0,0.07)", "rgba(255,255,255,0.1)");

  const inner = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5, scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ position: "relative" }}
    >
      <div style={{
        width: 38, height: 38,
        borderRadius: 9,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: hovered ? hoverBg : "transparent",
        transition: "background-color 0.15s",
        cursor: "pointer",
      }}>
        {children}
      </div>
      <AnimatePresence>
        {hovered && <DockTooltip label={label} />}
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex" }}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", padding: 0, display: "flex" }}>
      {inner}
    </button>
  );
}

function DockSeparator() {
  const color = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)");
  return <div style={{ width: 1, height: 22, backgroundColor: color, margin: "0 2px", flexShrink: 0 }} />;
}

// ── Floating Dock ───────────────────────────────────────────────────────────
function FloatingDock() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [visible, setVisible] = useState(false);
  const iconColor = useColorModeValue("#4A5568", "#ACB2C9");

  const dockBg     = useColorModeValue("rgba(255,255,255,0.78)", "rgba(18,22,34,0.78)");
  const dockBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.08)");
  const dockShadow = useColorModeValue(
    "0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.05)",
    "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 -20px 80px -20px rgba(255,255,255,0.04)"
  );

  // Show once user scrolls past the Hero (roughly one viewport height)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onResume = () => {
    const link = document.createElement("a");
    link.href = "Rahul___Resume.pdf";
    link.download = "Rahul_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating-dock"
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0,  x: "-50%" }}
          exit={{ opacity: 0, y: 12,    x: "-50%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "5px 8px",
              borderRadius: 14,
              backgroundColor: dockBg,
              border: `1px solid ${dockBorder}`,
              boxShadow: dockShadow,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              color: iconColor,
              pointerEvents: "auto",
            }}
          >
            {/* Resume */}
            <DockItem label="Download Resume" onClick={onResume}>
              <DownloadIcon />
            </DockItem>

            <DockSeparator />

            {/* Section links */}
            {[
              { label: "About",          id: "about-me-section" },
              { label: "Experience",     id: "jobs" },
              { label: "Projects",       id: "projects-section" },
              { label: "Other Projects", id: "other-projects-section" },
              { label: "Contact",        id: "contact-section" },
            ].map(({ label, id }) => (
              <DockItem
                key={id}
                label={label}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  lineHeight: 1,
                }}>
                  {label.slice(0, 2).toUpperCase()}
                </span>
              </DockItem>
            ))}

            <DockSeparator />

            {/* Social icons — small screens only */}
            <div className="flex lg:hidden items-center">
              {SOCIALS.map(({ label, href, icon }) => (
                <DockItem key={label} label={label} href={href}>
                  {icon}
                </DockItem>
              ))}
              <DockSeparator />
            </div>

            {/* Theme toggle */}
            <DockItem
              label={colorMode === "light" ? "Switch to Dark" : "Switch to Light"}
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </DockItem>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingDock;
