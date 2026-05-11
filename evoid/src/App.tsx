import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Assets ────────────────────────────────────────────────────────────────
const semsemImg = "/semsem.webp";
const padleyeImg = "/padel.jpg";

// ─── Team Data ──────────────────────────────────────────────────────────────
const team = [
  {
    name: "Rami Kronbi",
    role: "Mechatronics Engineer",
    img: "/ramy.jpg",
    desc: "Heart of Operations Management & Computer Vision",
  },
  {
    name: "Razan Hasbini",
    role: "Software Engineer",
    img: "/razan.jpg",
    desc: "The newer perspective of every project",
  },
  {
    name: "Tayseer Laz",
    role: "Computer Engineer",
    img: "/tayseer.jpg",
    desc: "The guarantee that every decision is guided by data and purpose.",
  },
  {
    name: "Abou Baker Khatib",
    role: "Computer Engineer",
    img: "/abu baker.jpg",
    desc: "The passion drive after every milestone",
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What does the 'void' stand for?",
    answer:
      "A void is an unclear issue, or the lack of a feature lying below an idea, business, country or company — something that is stopping it from flourishing.",
  },
  {
    question: "How did Evoid start?",
    answer:
      "Evoid was born from the idea that every system has a 'void' — a missing piece that, when filled with innovation, transforms potential into excellence.",
  },
  {
    question: "What industries does Evoid work with?",
    answer:
      "From AI-driven analytics to computer vision and digital experience design, Evoid collaborates with businesses across tech, logistics, sports, food sectors, governments, med, agriculture, civil engineering, architecture, arts, and anything that comes to mind.",
  },
  {
    question: "Does Evoid help with finding what's missing?",
    answer:
      "Absolutely! Evoid would also come to you with an innovative offer regarding upscaling your business.",
  },
  {
    question: "How can I get started with Evoid?",
    answer:
      "Reach out through our contact section below. We'll schedule a discovery call to understand your void and propose the best way to fill it.",
  },
];

// ─── SVG Icons (Game) ───────────────────────────────────────────────────────
const MedalIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <path d="M20 6 L32 20 L44 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="40" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M32 32 l2.2 4.4 4.8.7-3.5 3.4.8 4.8L32 43l-4.3 2.3.8-4.8-3.5-3.4 4.8-.7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
  </svg>
);
const CoupleIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <circle cx="22" cy="20" r="6" stroke="currentColor" strokeWidth="3" />
    <circle cx="42" cy="20" r="6" stroke="currentColor" strokeWidth="3" />
    <path d="M16 36c4-6 12-6 16 0v12H16V36z" stroke="currentColor" strokeWidth="3" />
    <path d="M32 36c4-6 12-6 16 0v12H32V36z" stroke="currentColor" strokeWidth="3" />
  </svg>
);
const TriangleIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <polygon points="32,10 54,54 10,54" stroke="currentColor" strokeWidth="3" fill="none" />
  </svg>
);
const KeyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <circle cx="24" cy="28" r="9" stroke="currentColor" strokeWidth="3" />
    <path d="M32 28h22l-4 5 4 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const DiceIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="10" y="10" width="44" height="44" rx="6" stroke="currentColor" strokeWidth="3" />
    <circle cx="24" cy="24" r="2.5" fill="currentColor" opacity="0.7" />
    <circle cx="40" cy="32" r="2.5" fill="currentColor" opacity="0.7" />
    <circle cx="32" cy="44" r="2.5" fill="currentColor" opacity="0.7" />
  </svg>
);
const CalendarIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="10" y="16" width="44" height="38" rx="4" stroke="currentColor" strokeWidth="3" />
    <path d="M10 26h44" stroke="currentColor" strokeWidth="3" />
    {[0, 1, 2, 3, 4, 5, 6].map((d) => (
      <rect key={d} x={14 + d * 6.2} y="30" width="4.5" height="4.5" rx="1.2" fill="currentColor" opacity="0.9" />
    ))}
  </svg>
);
const SpiderIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <ellipse cx="32" cy="34" rx="6" ry="8" stroke="currentColor" strokeWidth="3" />
    <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="3" />
    <path d="M26 22 L14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M26 28 L12 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M26 34 L12 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M26 40 L14 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 22 L50 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 28 L52 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 34 L52 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 40 L50 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const ClockIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="3" />
    <path d="M32 18v14l-10 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="14" cy="32" r="2.2" fill="currentColor" />
  </svg>
);

const NUM_SVG: Record<number, React.ReactNode> = {
  1: <MedalIcon className="w-6 h-6 md:w-7 md:h-7" />,
  2: <CoupleIcon className="w-6 h-6 md:w-7 md:h-7" />,
  3: <TriangleIcon className="w-6 h-6 md:w-7 md:h-7" />,
  4: <KeyIcon className="w-6 h-6 md:w-7 md:h-7" />,
  5: <></>,
  6: <DiceIcon className="w-6 h-6 md:w-7 md:h-7" />,
  7: <CalendarIcon className="w-6 h-6 md:w-7 md:h-7" />,
  8: <SpiderIcon className="w-6 h-6 md:w-7 md:h-7" />,
  9: <ClockIcon className="w-6 h-6 md:w-7 md:h-7" />,
};

const CENTER_INDEX = 4;
const ALL_TILES = Array.from({ length: 9 }, (_, i) => i);
const gridNumber = (idx: number) => idx + 1;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Animated Section Wrapper ────────────────────────────────────────────────
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Confetti Particle ───────────────────────────────────────────────────────
type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: "rect" | "circle" | "star";
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
};

const CONFETTI_COLORS = [
  "#ba93d8", "#d1b3ff", "#ffffff", "#e040fb", "#7c3aed",
  "#f472b6", "#38bdf8", "#fbbf24", "#34d399", "#fb923c",
];

function useConfetti(trigger: boolean, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const launch = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const count = 120;
    const initial: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 4 + Math.random() * 8;
      return {
        id: i,
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 1,
      };
    });
    setParticles(initial);
    startTime.current = null;

    const animate = (ts: number) => {
      if (!startTime.current) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const totalDuration = 3500;

      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.25,
            vx: p.vx * 0.98,
            rotation: p.rotation + p.rotationSpeed,
            life: Math.max(0, 1 - elapsed / totalDuration),
            opacity: Math.max(0, 1 - elapsed / totalDuration),
          }))
          .filter((p) => p.life > 0)
      );

      if (elapsed < totalDuration) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setParticles([]);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [containerRef]);

  useEffect(() => {
    if (trigger) launch();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, launch]);

  return particles;
}

// ─── Pattern of the Void Game ────────────────────────────────────────────────
type PVPhase = "playing" | "complete" | "holding" | "draining";

function PatternOfTheVoid() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<PVPhase>("playing");
  const [fillPct, setFillPct] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useConfetti(showExplosion, containerRef);

  const reseed = () => {
    const seq = shuffle(ALL_TILES.filter((i) => i !== CENTER_INDEX)).slice(0, 8);
    setPattern(seq);
    setStep(0);
    setPhase("playing");
    setFillPct(0);
    setShowExplosion(false);
  };

  useEffect(() => { reseed(); }, []);

  const iconSequence = useMemo(() => pattern.map((idx) => gridNumber(idx)), [pattern]);

  const onTilePress = (idx: number) => {
    if (phase !== "playing") return;
    if (idx === CENTER_INDEX) return;
    const expected = pattern[step];
    if (idx === expected) {
      const nextStep = step + 1;
      setStep(nextStep);
      setFillPct((nextStep / 8) * 100);
      if (nextStep === 8) {
        setPhase("complete");
        setTimeout(() => setShowExplosion(true), 50);
        setTimeout(() => {
          setPhase("holding");
          setTimeout(() => {
            setPhase("draining");
            setFillPct(0);
            setTimeout(() => reseed(), 3000);
          }, 4000);
        }, 200);
      }
    } else {
      setStep(0);
      setFillPct(0);
    }
  };

  return (
    <div ref={containerRef} className="relative mb-20 bg-background/40 border border-primary/10 p-6 md:p-10 rounded-3xl shadow-xl max-w-4xl mx-auto overflow-hidden">

      {/* ── Confetti Canvas ── */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {particles.map((p) => {
            const transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
            if (p.shape === "circle") return (
              <div key={p.id} className="absolute top-0 left-0"
                style={{ transform, opacity: p.opacity, width: p.size, height: p.size,
                  borderRadius: "50%", backgroundColor: p.color }} />
            );
            if (p.shape === "star") return (
              <div key={p.id} className="absolute top-0 left-0"
                style={{ transform, opacity: p.opacity, color: p.color, fontSize: p.size + 4,
                  lineHeight: 1, userSelect: "none" }}>★</div>
            );
            return (
              <div key={p.id} className="absolute top-0 left-0"
                style={{ transform, opacity: p.opacity, width: p.size, height: p.size * 0.5,
                  backgroundColor: p.color, borderRadius: 2 }} />
            );
          })}
        </div>
      )}

      {/* ── Win overlay ── */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.div
            key="win-overlay"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Radial bloom */}
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, rgba(186,147,216,0.55) 0%, rgba(160,80,220,0.25) 40%, transparent 70%)",
                animation: "void-bloom 1.2s ease-out forwards" }} />

            {/* Shockwave ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{ width: 80, height: 80, borderRadius: "50%",
                border: "3px solid rgba(186,147,216,0.9)",
                animation: "shockwave 0.9s ease-out forwards" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{ width: 80, height: 80, borderRadius: "50%",
                border: "2px solid rgba(209,179,255,0.7)",
                animation: "shockwave 0.9s 0.2s ease-out forwards" }} />
            </div>

            {/* Big text */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
              className="relative z-10 text-center px-6"
            >
              <div className="text-5xl mb-3">✨</div>
              <h3
                className="text-3xl md:text-4xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #d1b3ff 40%, #ba93d8 70%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                  filter: "drop-shadow(0 0 18px rgba(186,147,216,0.9))",
                }}
              >
                You Filled the Void.
              </h3>
              <p className="text-primary/80 text-sm mt-2 tracking-wider">The pattern is complete.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Pattern of the Void</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Press the tiles in the order shown by the glyphs. Each correct step fills the void.
      </p>
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-7 select-none text-[hsl(var(--primary))]">
        {iconSequence.map((n, i) => (
          <span key={i} className={i < step ? "opacity-100" : "opacity-40"}
            style={{ filter: "grayscale(1) contrast(1.05) sepia(1) hue-rotate(260deg) saturate(2) brightness(1.05)",
              transition: "opacity 200ms ease", display: "inline-flex" }}>
            {NUM_SVG[n]}
          </span>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 104px)" }}>
          {ALL_TILES.map((idx) => {
            const isCenter = idx === CENTER_INDEX;
            return (
              <button key={idx} onClick={() => onTilePress(idx)}
                disabled={isCenter || phase !== "playing"}
                className={`relative w-[104px] h-[104px] rounded-xl overflow-hidden
                  ${isCenter
                    ? "bg-black/60 border border-primary/25"
                    : "bg-[hsl(var(--primary)/0.12)] hover:bg-[hsl(var(--primary)/0.22)] border border-primary/20"}
                  shadow-[0_0_18px_rgba(186,147,216,0.22)] transition-colors duration-200`}
              >
                {isCenter && (
                  <>
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(186,147,216,0.10) 0%, rgba(186,147,216,0.06) 45%, transparent 70%)" }} />
                    <div className="absolute left-0 bottom-0 w-full"
                      style={{
                        height: `${fillPct}%`,
                        background: "linear-gradient(180deg, rgba(204,174,244,0.95) 0%, rgba(186,147,216,0.95) 60%, rgba(160,120,200,0.95) 100%)",
                        boxShadow: fillPct > 0 ? "0 0 20px rgba(186,147,216,0.45), inset 0 0 18px rgba(255,255,255,0.12)" : "none",
                        transition: phase === "draining" ? "height 3000ms ease-in-out" : "height 220ms ease-in-out",
                      }} />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Services Data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    title: "AI & Machine Learning",
    desc: "We build intelligent systems that learn, adapt, and predict — turning raw data into decisive competitive advantage.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 38h16M24 34v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 22l4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Computer Vision",
    desc: "Real-time image and video analysis for automation, quality control, sports analytics, and beyond.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <polyline points="8,32 16,20 24,26 32,14 40,18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="18" r="3" fill="currentColor" />
      </svg>
    ),
    title: "Product Development",
    desc: "From zero to launch — we craft full-stack digital products that are fast, scalable, and beautifully designed.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <circle cx="12" cy="24" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="12" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="36" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M17 21l14-7M17 27l14 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Systems Integration",
    desc: "We connect hardware, software and data pipelines into unified ecosystems that operate without friction.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Strategy & Innovation",
    desc: "We identify what's holding your business back and map a clear path to the next level of growth.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 6L6 18v24h36V18L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="18" y="28" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
    title: "Smart Infrastructure",
    desc: "IoT, embedded systems, and mechatronics solutions that bring intelligence to physical environments.",
  },
];

// ─── Nav Links ───────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Team", id: "team" },
  { label: "Games", id: "games" },
  { label: "Contact", id: "contact" },
];

// ─── Main App ────────────────────────────────────────────────────────────────
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden text-foreground">

      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-background/30 border-b border-white/5">
        <button
          onClick={() => scrollTo("hero")}
          className="text-2xl font-light tracking-[0.35em] uppercase text-foreground hover:text-primary transition-colors"
        >
          evoid
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm transition-colors ${
                activeSection === id ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 border-b border-white/10 flex flex-col py-4 px-6 gap-4"
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm text-left transition-colors ${
                  activeSection === id ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.25),transparent_50%),radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_60%)] animate-pulse-glow opacity-70" />
        <div className="absolute inset-0 animate-drift">
          <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,hsl(var(--silver)),transparent),radial-gradient(2px_2px_at_60%_70%,hsl(var(--silver)/0.95),transparent),radial-gradient(1px_1px_at_50%_50%,hsl(var(--silver)/0.9),transparent),radial-gradient(1px_1px_at_80%_10%,hsl(var(--silver)/0.85),transparent),radial-gradient(2px_2px_at_90%_60%,hsl(var(--silver)/0.9),transparent)] bg-[length:300px_300px] opacity-90 blur-[0.4px]" />
        </div>

        <main className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-10"
          >
            <h2 className="text-xl md:text-2xl font-light tracking-[0.5em] text-muted-foreground uppercase">evoid</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mb-6"
          >
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight animate-shimmer"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(192,192,192,0.7) 25%, rgba(255,255,255,1) 50%, rgba(192,192,192,0.7) 75%, rgba(255,255,255,0.3) 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              fill the void
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            We identify what's missing — and build what comes next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo("services")}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(186,147,216,0.5)]"
            >
              <span className="relative z-10">Explore Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 rounded-xl font-medium text-lg border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
          </motion.div>
        </main>
      </section>

      {/* ─── STAR NETWORK / SOLUTIONS ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        {/* Animated star network */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="starLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ba93d8" />
                <stop offset="100%" stopColor="#d1b3ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g stroke="url(#starLine)" strokeWidth="1" filter="url(#glow)">
              {/* Nodes */}
              <circle cx="10%" cy="20%" r="4" fill="#ba93d8" />
              <circle cx="25%" cy="50%" r="3" fill="#ba93d8" />
              <circle cx="40%" cy="25%" r="3.5" fill="#d1b3ff" />
              <circle cx="60%" cy="60%" r="4" fill="#ba93d8" />
              <circle cx="75%" cy="35%" r="3.5" fill="#d1b3ff" />
              <circle cx="85%" cy="55%" r="4" fill="#ba93d8" />
              <circle cx="50%" cy="15%" r="2.5" fill="#e0c8ff" />
              <circle cx="20%" cy="75%" r="3" fill="#c9a8f0" />
              <circle cx="90%" cy="20%" r="3" fill="#d1b3ff" />
              {/* Connections */}
              <line x1="10%" y1="20%" x2="25%" y2="50%" />
              <line x1="25%" y1="50%" x2="60%" y2="60%" />
              <line x1="40%" y1="25%" x2="75%" y2="35%" />
              <line x1="75%" y1="35%" x2="85%" y2="55%" />
              <line x1="25%" y1="50%" x2="75%" y2="35%" />
              <line x1="10%" y1="20%" x2="40%" y2="25%" />
              <line x1="40%" y1="25%" x2="60%" y2="60%" />
              <line x1="50%" y1="15%" x2="40%" y2="25%" />
              <line x1="50%" y1="15%" x2="75%" y2="35%" />
              <line x1="85%" y1="55%" x2="60%" y2="60%" />
              <line x1="20%" y1="75%" x2="25%" y2="50%" />
              <line x1="20%" y1="75%" x2="60%" y2="60%" />
              <line x1="90%" y1="20%" x2="75%" y2="35%" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-block text-xs tracking-[0.4em] text-primary uppercase font-semibold mb-6 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5">
              What we build
            </span>
            <h2
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #d1b3ff 45%, #ba93d8 80%, #e0c8ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A new era<br />of solutions
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed mb-12 font-light">
              Creativity, technology, and intelligence — converging to fill every void with precision and purpose.
            </p>
            <button
              onClick={() => scrollTo("projects")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium text-base overflow-hidden border border-primary/40 text-primary hover:text-primary-foreground transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(186,147,216,0.5)]"
            >
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-2xl" />
              <span className="relative z-10">View Projects</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-40 px-6 overflow-hidden">
        {/* Ambient background orbs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(186,147,216,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(155,111,212,0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(186,147,216,0.04) 0%, transparent 65%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero text block */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mb-28">
            <FadeIn className="lg:max-w-2xl">
              <span className="inline-block text-xs tracking-[0.4em] text-primary uppercase font-semibold mb-8 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5">
                Our mission
              </span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground">
                What is<br />
                the{" "}
                <span
                  className="relative inline-block"
                  style={{
                    background: "linear-gradient(135deg, #e8d5ff 0%, #ba93d8 40%, #7c4dbe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Void?
                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #ba93d8, #7c4dbe)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:max-w-sm lg:pb-4">
              <p className="text-lg text-muted-foreground leading-relaxed font-light border-l-2 border-primary/30 pl-6">
                A void is the gap between where you are and where you could be. The missing feature, the
                unasked question, the untapped potential lying dormant inside every business, every system,
                every idea. We exist to find it and fill it.
              </p>
            </FadeIn>
          </div>

          {/* Pillar cards — staggered organic layout */}
          <div className="flex flex-col gap-6">
            {[
              {
                number: "01",
                title: "Adaptive Innovation",
                desc: "Our solutions evolve alongside the world, absorbing new challenges and shifting needs to remain relevant through every cycle of change.",
                align: "left",
                accent: "from-violet-500/20 via-purple-500/10 to-transparent",
              },
              {
                number: "02",
                title: "Human-Centered Design",
                desc: "Every product we craft starts with the person using it. Intuitive, purposeful, and built to endure because great design feels invisible.",
                align: "center",
                accent: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
              },
              {
                number: "03",
                title: "Vision Beyond Code",
                desc: "We build ecosystems, not just systems. Logic and imagination merge here, turning raw ideas into technology that leaves a lasting mark.",
                align: "right",
                accent: "from-purple-500/20 via-indigo-500/10 to-transparent",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: item.align === "left" ? -60 : item.align === "right" ? 60 : 0, y: item.align === "center" ? 40 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`flex ${item.align === "right" ? "justify-end" : item.align === "center" ? "justify-center" : "justify-start"}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative w-full md:w-[75%] lg:w-[60%] overflow-hidden"
                  style={{ borderRadius: "28px" }}
                >
                  {/* Glowing border via pseudo-gradient */}
                  <div className="absolute inset-0 rounded-[28px] p-px"
                    style={{ background: "linear-gradient(135deg, rgba(186,147,216,0.3), rgba(186,147,216,0.05), rgba(186,147,216,0.2))", borderRadius: "28px" }}
                  >
                    <div className="w-full h-full rounded-[27px] bg-[hsl(222,47%,5%)]" />
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 p-10 md:p-12">
                    {/* Ambient glow behind number */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.accent} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />

                    <div className="flex items-start gap-8">
                      <motion.span
                        className="text-7xl font-black tabular-nums leading-none shrink-0 select-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(186,147,216,0.5) 0%, rgba(124,77,190,0.15) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.number}
                      </motion.span>
                      <div className="pt-2">
                        <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Animated bottom line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="relative py-32 px-6 bg-background/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dotLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ba93d8" />
                <stop offset="100%" stopColor="#d1b3ff" />
              </linearGradient>
            </defs>
            <g stroke="url(#dotLine)" strokeWidth="1">
              <circle cx="10%" cy="20%" r="3" fill="#ba93d8" />
              <circle cx="25%" cy="55%" r="2" fill="#ba93d8" />
              <circle cx="45%" cy="20%" r="2.5" fill="#d1b3ff" />
              <circle cx="65%" cy="65%" r="3" fill="#ba93d8" />
              <circle cx="80%" cy="30%" r="2.5" fill="#d1b3ff" />
              <circle cx="90%" cy="60%" r="3" fill="#ba93d8" />
              <line x1="10%" y1="20%" x2="25%" y2="55%" />
              <line x1="25%" y1="55%" x2="65%" y2="65%" />
              <line x1="45%" y1="20%" x2="80%" y2="30%" />
              <line x1="80%" y1="30%" x2="90%" y2="60%" />
              <line x1="25%" y1="55%" x2="80%" y2="30%" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">What we do</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-4">A new era of solutions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Blending creativity, technology, and intelligence to fill every void with purpose.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.1}>
                <div className="group relative bg-background/40 border border-primary/10 backdrop-blur-md rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(186,147,216,0.2)] h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 text-primary mb-5">{svc.icon}</div>
                  <h3 className="relative z-10 text-xl font-semibold text-foreground mb-3">{svc.title}</h3>
                  <p className="relative z-10 text-muted-foreground leading-relaxed text-sm">{svc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-24">
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">Our work</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mt-4">Upcoming Projects</h2>
          </FadeIn>

          {/* Semsem */}
          <FadeIn className="flex flex-col md:flex-row items-center gap-12 mb-32">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(186,147,216,0.2)]">
                <img
                  src={semsemImg}
                  alt="Semsem"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <span className="text-xs tracking-widest text-primary uppercase font-medium">Food & Logistics</span>
              <h3 className="text-3xl md:text-4xl font-semibold text-foreground">Semsem</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong className="text-foreground">Semsem</strong> is the first-ever food delivery application designed
                to operate within Lebanon — a bold leap that brings modern logistics, accessibility, and reliability to an
                underserved market.
              </p>
              <div className="flex gap-3 flex-wrap pt-2">
                {["React Native", "AI Routing", "Real-time Tracking"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-primary/30 text-primary bg-primary/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Padleye */}
          <FadeIn className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(186,147,216,0.2)]">
                <img
                  src={padleyeImg}
                  alt="Padleye"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <span className="text-xs tracking-widest text-primary uppercase font-medium">Sports Tech</span>
              <h3 className="text-3xl md:text-4xl font-semibold text-foreground">Padleye</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong className="text-foreground">Padleye</strong> transforms padel with real-time, vision-powered
                scoring. Cameras analyze each shot with precision to produce live scores and performance insights —
                automation and elegance for the fastest-growing sport.
              </p>
              <div className="flex gap-3 flex-wrap pt-2">
                {["Computer Vision", "Live Scoring", "Sports Analytics"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-primary/30 text-primary bg-primary/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────────────── */}
      <section id="team" className="relative py-32 px-6 bg-background/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">The people</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-4">Meet the Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A diverse group of engineers, designers, and thinkers united by one mission: fill the void.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.12}>
                <div className="group relative bg-background/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 text-center hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(186,147,216,0.25)] h-full">
                  <div className="relative w-28 h-28 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg group-hover:blur-xl transition-all duration-500" />
                    <img
                      src={member.img}
                      alt={member.name}
                      className="relative w-28 h-28 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 border-y border-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5" />
        <FadeIn className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "4+", label: "Industries Served" },
            { value: "2", label: "Live Projects" },
            { value: "100%", label: "Built from Scratch" },
            { value: "∞", label: "Voids to Fill" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* ─── GAMES ───────────────────────────────────────────────────────── */}
      <section id="games" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.07),transparent_70%)]" />
        <div className="relative z-10 text-center">
          <FadeIn>
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">Interactive</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-4">
              Can <span className="text-primary animate-pulse">YOU</span> fill the void?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-16">
              We believe the best way to understand a void is to feel it. Try our mini challenges below.
            </p>
          </FadeIn>

          <PatternOfTheVoid />
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 bg-background/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.07),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">Questions</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mt-4">Frequently Asked</h2>
          </FadeIn>

          <div className="divide-y divide-primary/15 border border-primary/10 rounded-2xl backdrop-blur-sm overflow-hidden">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 cursor-pointer transition-all duration-300 hover:bg-primary/5"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-base md:text-lg font-medium text-foreground text-left">{faq.question}</h3>
                  <span
                    className={`text-primary text-2xl shrink-0 transition-transform duration-300 ${
                      openFAQ === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFAQ === i ? "max-h-48 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_65%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] text-primary uppercase font-medium">Let's talk</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mt-4 mb-4">Get in Touch</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Tell us your void. We'll tell you how to fill it.</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <FadeIn className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: "📧", label: "Email", value: "hello@evoid.io" },
                  { icon: "💬", label: "Response Time", value: "Within 24 hours" },
                  { icon: "🌍", label: "Operating From", value: "Lebanon & Beyond" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground tracking-wider uppercase">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">Follow our journey</p>
                <div className="flex gap-4">
                  {[
                    { label: "X", href: "https://twitter.com", icon: "𝕏" },
                    { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15}>
              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-background/40 border border-primary/20 rounded-2xl p-10 text-center"
                >
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">Message Received</h3>
                  <p className="text-muted-foreground">
                    We'll reach out within 24 hours. The void will be addressed.
                  </p>
                  <button onClick={() => setFormSent(false)} className="mt-6 text-sm text-primary hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-background/40 border border-primary/10 backdrop-blur-md rounded-2xl p-8 space-y-5"
                >
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 tracking-wider uppercase">Your Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/70 border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 tracking-wider uppercase">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/70 border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 tracking-wider uppercase">Your Void / Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background/70 border border-border text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(186,147,216,0.5)] transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-primary/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <button
              onClick={() => scrollTo("hero")}
              className="text-2xl font-light tracking-[0.35em] uppercase text-primary hover:opacity-80 transition-opacity"
            >
              evoid
            </button>
            <nav className="flex flex-wrap gap-6 justify-center">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex gap-4">
              {[
                { label: "X", href: "https://twitter.com", icon: "𝕏" },
                { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Evoid. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Built to fill every void.</p>
          </div>
        </div>
      </footer>

      {/* ─── Keyframes ───────────────────────────────────────────────────── */}
      <style>{`
        @keyframes void-bloom {
          0%   { opacity: 0; transform: scale(0.5); }
          40%  { opacity: 1; transform: scale(1.1); }
          70%  { opacity: 0.85; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes shockwave {
          0%   { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(4.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
