import React, { useEffect, useRef } from "react";
import { useColorModeValue } from "@chakra-ui/react";

const EQUATIONS = [
  "E = mc²",
  "∇²ψ = 0",
  "F = ma",
  "∑∞ₙ₌₁ 1/n²",
  "∂f/∂x",
  "∫₀^∞ e⁻ˣ dx",
  "a² + b² = c²",
  "lim x→∞",
  "i² = −1",
  "eiπ + 1 = 0",
  "det(A) ≠ 0",
  "∀ε>0 ∃δ",
  "P(A|B)",
  "∇ × B = μ₀J",
  "ds² = −c²dt²",
  "O(n log n)",
  "Σ xᵢ / n",
  "∂u/∂t + u·∇u",
  "λ ∈ ℝ",
  "⟨ψ|H|ψ⟩",
  "∮ E·dA = Q/ε₀",
  "f'(x) = lim h→0",
  "rank(A) + nullity(A)",
  "Tr(ρ) = 1",
];

const REPULSION_RADIUS   = 160;
 const REPULSION_STRENGTH = 3.5;
 const DAMPING_DRIFT      = 0.92;   // impulse decay while hovering
const DAMPING_ORBIT      = 0.97;   // softer decay while clicking → allows orbiting

// Gravity constant for click-attraction (force = GRAVITY / dist)
const GRAVITY            = 280;    // tweak higher = stronger pull across screen
const MIN_ATTRACT_DIST   = 25;     // prevent singularity when very close

// Glow radius — larger than repulsion so equations light up before being pushed
const GLOW_RADIUS        = 280;

// Lifespan range in frames (~60fps)
const LIFE_MIN    = 180;   // ~3 s
const LIFE_MAX    = 420;   // ~7 s
const FADE_FRAMES = 60;    // 1 s fade-in AND fade-out

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(width, height, color, offsetLife = 0) {
  // Spawn at a random position anywhere on screen (not just edges)
  // so particles feel like they materialise in place
  const x = randomBetween(0, width);
  const y = randomBetween(0, height);

  const angle = Math.random() * Math.PI * 2;
  const speed = randomBetween(0.3, 1.0);
  const maxLife = randomBetween(LIFE_MIN, LIFE_MAX);

  return {
    text: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
    x,
    y,
    bvx: Math.cos(angle) * speed,
    bvy: Math.sin(angle) * speed,
    vx:  Math.cos(angle) * speed,
    vy:  Math.sin(angle) * speed,
    ex: 0,
    ey: 0,
    size:          randomBetween(11, 20),
    peakOpacity:   randomBetween(0.08, 0.22),
    rotation:      randomBetween(-30, 30),
    rotationSpeed: randomBetween(-0.15, 0.15),
    color,
    life:    offsetLife,   // current frame count
    maxLife,               // total frames before it fades out and respawns
  };
}

export default function FlyingEquations() {
  const canvasRef     = useRef(null);
  const particlesRef  = useRef([]);
  const rafRef        = useRef(null);
  const mouseRef      = useRef({ x: -9999, y: -9999 });
  const isClickingRef = useRef(false);   // true while mouse button held
  const colorMode     = useColorModeValue("light", "dark");
  const equationColor = colorMode === "dark" ? "#ACB2C9" : "#4A5568";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = ()  => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onMouseDown  = ()  => { isClickingRef.current = true; };
    const onMouseUp    = ()  => { isClickingRef.current = false; };
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);

    // Stagger initial lifetimes so they don't all fade at once
    const COUNT = 32;
    particlesRef.current = Array.from({ length: COUNT }, (_, i) =>
      createParticle(
        canvas.width,
        canvas.height,
        equationColor,
        (i / COUNT) * randomBetween(LIFE_MIN, LIFE_MAX) // spread across lifecycle
      )
    );

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const isClicking = isClickingRef.current;

      particlesRef.current.forEach((p, i) => {
        // ── Lifecycle ────────────────────────────────────────────────────
        p.life += 1;

        // Respawn when lifetime ends (fade-out will have completed by then)
        if (p.life >= p.maxLife) {
          particlesRef.current[i] = createParticle(canvas.width, canvas.height, equationColor, 0);
          return;
        }

        // Opacity envelope: fade in → hold → fade out
        let lifeFactor;
        if (p.life < FADE_FRAMES) {
          lifeFactor = p.life / FADE_FRAMES;                              // fade in
        } else if (p.life > p.maxLife - FADE_FRAMES) {
          lifeFactor = (p.maxLife - p.life) / FADE_FRAMES;               // fade out
        } else {
          lifeFactor = 1;                                                  // fully visible
        }

        // ── Cursor repulsion (hover) / gravity attraction (click) ───────
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isClicking) {
          // Inverse-distance gravity: F = GRAVITY / dist, infinite range
          // Soft min distance to avoid singularity / particle sticking
          const safeDist = Math.max(dist, MIN_ATTRACT_DIST);
          const force    = GRAVITY / safeDist;
          // Pull toward cursor (negate direction vector)
          p.ex -= (dx / safeDist) * force;
          p.ey -= (dy / safeDist) * force;
          // Soft damping → preserves tangential velocity → enables orbiting
          p.ex *= DAMPING_ORBIT;
          p.ey *= DAMPING_ORBIT;
        } else {
          // Hover: radial repulsion within fixed radius
          if (dist < REPULSION_RADIUS && dist > 0) {
            const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
            p.ex += (dx / dist) * force;
            p.ey += (dy / dist) * force;
          }
          p.ex *= DAMPING_DRIFT;
          p.ey *= DAMPING_DRIFT;
        }

        p.vx = p.bvx + p.ex;
        p.vy = p.bvy + p.ey;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed + (Math.abs(p.ex) + Math.abs(p.ey)) * 0.4;

        // ── Draw ─────────────────────────────────────────────────────────
        // Quadratic proximity glow: much stronger up close, fades over GLOW_RADIUS
        const glowFactor   = (!isClicking && dist < GLOW_RADIUS && dist > 0)
          ? Math.pow(1 - dist / GLOW_RADIUS, 2)   // 0 at edge → 1 at cursor
          : 0;
        const attractBoost = isClicking ? 0.12 : 0;

        // Opacity: base × lifecycle + proximity boost (up to +0.55 at cursor)
        const drawAlpha = Math.min(1, p.peakOpacity * lifeFactor + glowFactor * 0.55 + attractBoost);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = drawAlpha;
        ctx.fillStyle   = p.color;
        ctx.font        = `${p.size}px 'Courier New', monospace`;

        // Canvas shadow glow — scales with proximity (max blur 18px)
        if (glowFactor > 0) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur  = glowFactor * 18;
        } else {
          ctx.shadowBlur  = 0;
        }

        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
    };
  }, [equationColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
