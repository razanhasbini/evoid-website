import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";

import MysteryGame from "./components/MysteryGame";


const semsemImg = "/semsem.webp";
const padleyeImg = "/padel.jpg";




const MedalIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 64 64" className={className} fill="none">
     
      <path
        d="M20 6 L32 20 L44 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
     
      <circle
        cx="32"
        cy="40"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    
      <path
        d="M32 32 l2.2 4.4 4.8.7-3.5 3.4.8 4.8L32 43l-4.3 2.3.8-4.8-3.5-3.4 4.8-.7z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
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
    {[0,1,2,3,4,5,6].map((d)=>(
      <rect key={d} x={14 + d*6.2} y="30" width="4.5" height="4.5" rx="1.2" fill="currentColor" opacity="0.9" />
    ))}
  </svg>
);

const SpiderIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      {/* Body and head */}
      <ellipse cx="32" cy="34" rx="6" ry="8" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="3" />
      {/* Left legs */}
      <path d="M26 22 L14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 28 L12 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 34 L12 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 40 L14 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Right legs */}
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
  5: <></>, // center void (unused icon)
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


type PVPhase = "playing" | "complete" | "holding" | "draining";

function PatternOfTheVoid() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<PVPhase>("playing");
  const [fillPct, setFillPct] = useState(0); // 0..100
  const [burst, setBurst] = useState(false); // quick “You filled the void.”

  // generate a new 8-step pattern (all non-center tiles)
  const reseed = () => {
    const seq = shuffle(ALL_TILES.filter((i) => i !== CENTER_INDEX)).slice(0, 8);
    setPattern(seq);
    setStep(0);
    setPhase("playing");
    setFillPct(0);
    setBurst(false);
  };

  useEffect(() => {
    reseed();
  }, []);

  const iconSequence = useMemo(() => pattern.map((idx) => gridNumber(idx)), [pattern]);

  const onTilePress = (idx: number) => {
    if (phase !== "playing") return;
    if (idx === CENTER_INDEX) return;

    const expected = pattern[step];
    if (idx === expected) {
      const nextStep = step + 1;
      setStep(nextStep);
      setFillPct((nextStep / 8) * 100); // equal increments

      if (nextStep === 8) {
        // Completed pattern
        setPhase("complete");
        setBurst(true); // show burst text briefly
        // hide burst quickly
        setTimeout(() => setBurst(false), 1200);

        // hold 3 seconds
        setTimeout(() => {
          setPhase("holding");
          // then drain 3 seconds
          setTimeout(() => {
            setPhase("draining");
            setFillPct(0);
            // after 3s, reseed
            setTimeout(() => {
              reseed();
            }, 3000);
          }, 3000); 
        }, 150); 
      }
    } else {
     
      setStep(0);
      setFillPct(0);
    }
  };

  return (
    <div className="mb-20 bg-background/40 p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl mb-2">Pattern of the Void</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Press the tiles in the order shown by the glyphs. Each correct step fills the void. Complete the sequence and watch it become whole
      </p>

     
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-7 select-none text-[hsl(var(--primary))]">
        {iconSequence.map((n, i) => (
          <span
            key={i}
            className={`${i < step ? "opacity-100" : "opacity-70"}`}
            style={{
              filter:
                "grayscale(1) contrast(1.05) sepia(1) hue-rotate(260deg) saturate(2) brightness(1.05)",
              transition: "opacity 200ms ease",
              display: "inline-flex",
            }}
            title={`Step ${i + 1} → grid ${n}`}
          >
            {NUM_SVG[n]}
          </span>
        ))}
      </div>

      {/* 3x3 grid */}
      <div className="flex justify-center">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 104px)" }}>
          {ALL_TILES.map((idx) => {
            const isCenter = idx === CENTER_INDEX;
            const n = gridNumber(idx);

            return (
              <button
                key={idx}
                onClick={() => onTilePress(idx)}
                disabled={isCenter || phase !== "playing"}
                className={`relative w-[104px] h-[104px] rounded-xl overflow-hidden
                  ${
                    isCenter
                      ? "bg-black/60 border border-primary/25"
                      : "bg-[hsl(var(--primary)/0.12)] hover:bg-[hsl(var(--primary)/0.18)] border border-primary/20"
                  }
                  shadow-[0_0_18px_rgba(186,147,216,0.22)] transition-colors duration-200`}
              >
               
                
               
                {isCenter && (
                  <>
                    
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 50%, rgba(186,147,216,0.10) 0%, rgba(186,147,216,0.06) 45%, transparent 70%)",
                      }}
                    />
                 
                    <div
                      className="absolute left-0 bottom-0 w-full"
                      style={{
                        height: `${fillPct}%`,
                        background:
                          "linear-gradient(180deg, rgba(204,174,244,0.95) 0%, rgba(186,147,216,0.95) 60%, rgba(160,120,200,0.95) 100%)",
                        boxShadow:
                          fillPct > 0
                            ? "0 0 20px rgba(186,147,216,0.45), inset 0 0 18px rgba(255,255,255,0.12)"
                            : "none",
                        transition:
                          phase === "draining"
                            ? "height 3000ms ease-in-out"
                            : "height 220ms ease-in-out",
                      }}
                    />
                    {/* When completed, add a quick outward glow bloom + message that bursts away */}
                    {phase === "complete" && (
                      <>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(60% 60% at 50% 50%, rgba(220,190,255,0.5) 0%, rgba(186,147,216,0.25) 45%, rgba(0,0,0,0) 80%)",
                            mixBlendMode: "screen",
                            animation: "pulse-glow-void 900ms ease-out",
                          }}
                        />
                        {burst && (
                          <div
                            className="absolute inset-0 flex items-center justify-center font-medium text-sm"
                            style={{
                              color: "hsl(var(--primary))",
                              textShadow: "0 0 10px rgba(186,147,216,0.7)",
                              animation: "burst-out 3000ms ease-out forwards",
                            }}
                          >
                             You filled the void.
                          </div>
                        )}
                      </>
                    )}
                    
                    {phase === "draining" && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,15,25,0.35) 35%, rgba(0,0,0,0.65) 100%)",
                          mixBlendMode: "multiply",
                          opacity: 0.85,
                          transition: "opacity 3000ms ease-in-out",
                        }}
                      />
                    )}
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


function Codebreaker() {
  const LETTERS = useMemo(() => ["E", "V", "O", "I", "D"], []);
  const [secret, setSecret] = useState(() => shuffle(LETTERS).join(""));
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState<{ guess: string; matches: boolean[] }[]>([]);
  const [state, setState] = useState<"playing" | "win" | "lose">("playing");
  const maxAttempts = 7;

  const submit = () => {
    if (state !== "playing") return;
    const g = guess.toUpperCase().replace(/[^EVOID]/g, "").slice(0, 5);
    if (g.length !== 5) return;
    const matches = Array.from({ length: 5 }, (_, i) => g[i] === secret[i]);
    const next = [{ guess: g, matches }, ...attempts];
    setAttempts(next);
    setGuess("");
    if (matches.every(Boolean)) setState("win");
    else if (next.length >= maxAttempts) setState("lose");
  };

  const reset = () => {
    setSecret(shuffle(LETTERS).join(""));
    setAttempts([]);
    setGuess("");
    setState("playing");
  };

  return (
    <div className="mb-6 bg-background/40 p-6 md:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto">
      <h3 className="text-2xl md:text-3xl mb-4">Codebreaker</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Guess the 5-letter code using only E, V, O, I, D. You’ll only be told which letters are in the correct position.
      </p>

      <div className="flex items-center justify-center gap-3">
        <input
          type="text"
          maxLength={5}
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          className="px-4 py-3 rounded-lg bg-background/70 border border-border w-44 text-center tracking-widest"
          placeholder="_____"
        />
        <button
          onClick={submit}
          disabled={state !== "playing"}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:scale-105 transition"
        >
          Try
        </button>
        <button onClick={reset} className="px-4 py-3 rounded-lg bg-secondary text-secondary-foreground">
          Try Again
        </button>
      </div>

      <div className="mt-5 space-y-2">
        {attempts.map((a, idx) => (
          <div key={idx} className="flex justify-center gap-2">
            {a.guess.split("").map((ch, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold tracking-widest
                  ${
                    a.matches[i]
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 border border-border text-foreground"
                  }`}
                title={a.matches[i] ? "Correct position" : "Incorrect position"}
              >
                {ch}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-center">
        {state === "win" && <p className="text-green-400">You’ve uncovered the code within the void.</p>}
        {state === "lose" && <p className="text-red-400">You failed. The void keeps its secret.</p>}
      </div>
    </div>
  );
}


const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative min-h-screen bg-background overflow-hidden text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-background/20">
        <div className="text-2xl font-light tracking-[0.3em] uppercase">evoid</div>
        <nav className="flex gap-8">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>
  

     
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-charcoal" />
        {/* Lavender nebulas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.25),transparent_50%),radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(186,147,216,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(186,147,216,0.1),transparent_60%)] animate-pulse-glow opacity-70" />
        {/* Stars */}
        <div className="absolute inset-0 animate-drift">
          <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,hsl(var(--silver)),transparent),radial-gradient(2px_2px_at_60%_70%,hsl(var(--silver)/0.95),transparent),radial-gradient(1px_1px_at_50%_50%,hsl(var(--silver)/0.9),transparent),radial-gradient(1px_1px_at_80%_10%,hsl(var(--silver)/0.85),transparent),radial-gradient(2px_2px_at_90%_60%,hsl(var(--silver)/0.9),transparent)] bg-[length:300px_300px] opacity-90 blur-[0.4px]" />
        </div>

      
        <main className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div
            className={`mb-16 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-muted-foreground uppercase">evoid</h2>
          </div>

          <div className="relative">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight animate-shimmer"
              style={{
                background: `linear-gradient(90deg,
                  rgba(255,255,255,0.3) 0%,
                  rgba(192,192,192,0.7) 25%,
                  rgba(255,255,255,1) 50%,
                  rgba(192,192,192,0.7) 75%,
                  rgba(255,255,255,0.3) 100%)`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              fill the void
            </h1>
            <span className="absolute inset-0 blur-3xl text-silver opacity-60 animate-pulse" aria-hidden="true">
              fill the void
            </span>
          </div>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Where emptiness meets possibility
          </p>

          <div className="mt-16">
            <button
              onClick={() => scrollTo("solutions-section")}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(186,147,216,0.5)]"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-lavender-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </main>
      </div>

      {/* SOLUTIONS (with animated star-network background restored) */}
      <section id="solutions-section" className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        {/* star network bg */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dotLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ba93d8" />
                <stop offset="100%" stopColor="#d1b3ff" />
              </linearGradient>
            </defs>
            <g stroke="url(#dotLine)" strokeWidth="1">
              <circle cx="10%" cy="20%" r="3" fill="#ba93d8" />
              <circle cx="25%" cy="50%" r="2" fill="#ba93d8" />
              <circle cx="40%" cy="25%" r="2.5" fill="#d1b3ff" />
              <circle cx="60%" cy="60%" r="3" fill="#ba93d8" />
              <circle cx="75%" cy="35%" r="2.5" fill="#d1b3ff" />
              <circle cx="85%" cy="55%" r="3" fill="#ba93d8" />
              <line x1="10%" y1="20%" x2="25%" y2="50%" />
              <line x1="25%" y1="50%" x2="60%" y2="60%" />
              <line x1="40%" y1="25%" x2="75%" y2="35%" />
              <line x1="75%" y1="35%" x2="85%" y2="55%" />
              <line x1="25%" y1="50%" x2="75%" y2="35%" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-semibold text-primary mb-6">A new era of solutions</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Blending creativity, technology, and intelligence to fill every void with purpose.
          </p>
          <button
            onClick={() => scrollTo("projects-section")}
            className="mt-12 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:scale-105 transition-all hover:shadow-[0_0_25px_rgba(186,147,216,0.4)]"
          >
            View Projects
          </button>
        </div>
      </section>

      
      <section id="projects-section" className="relative flex flex-col gap-32 py-28 px-6 bg-background">
        <h2 className="text-4xl md:text-6xl font-semibold text-primary mb-16 text-center">Upcoming Projects</h2>

        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2">
            <img
              src={semsemImg}
              alt="Semsem project preview"
              className="w-full h-auto rounded-2xl object-cover shadow-[0_0_40px_rgba(186,147,216,0.25)] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-foreground mb-4">Semsem</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              <strong>Semsem</strong> is the first-ever food delivery application designed to operate within Syria —
              a bold leap that brings modern logistics, accessibility, and reliability to an underserved market.
            </p>
          </div>
        </div>

       
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2">
            <img
              src={padleyeImg}
              alt="Padleye project preview"
              className="w-full h-auto rounded-2xl object-cover shadow-[0_0_40px_rgba(186,147,216,0.25)] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-foreground mb-4">Padleye</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              <strong>Padleye</strong> transforms padel with real-time, vision-powered scoring. Cameras analyze each
              shot with precision to produce live scores and performance insights — automation and elegance for the
              fastest-growing sport.
            </p>
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section className="py-32 px-6 lg:px-8 bg-background/60 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-semibold text-primary mb-10">
          Can <span className="text-silver inline-block animate-bounce">YOU</span> fill the void?
        </h2>

        
        <PatternOfTheVoid />

        <div className="mt-20" />

        
        <Codebreaker />

        
      </section>
      <MysteryGame />

<footer className="bg-background/50 border-t border-border py-10 px-6 text-center text-sm text-muted-foreground mt-20">
  <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
    {/* Left side */}
    <p className="text-muted-foreground">
      © {new Date().getFullYear()} evoid. All rights reserved.
    </p>

    
    <div className="flex gap-6 justify-center md:justify-end text-muted-foreground">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
        title="Twitter"
      >
        <i className="fab fa-twitter text-lg"></i>
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
        title="Instagram"
      >
        <i className="fab fa-instagram text-lg"></i>
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
        title="LinkedIn"
      >
        <i className="fab fa-linkedin text-lg"></i>
      </a>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
        title="GitHub"
      >
        <i className="fab fa-github text-lg"></i>
      </a>
    </div>
  </div>
</footer>


     
      
      <style>{`
        @keyframes pulse-glow-void {
          0%   { opacity: 0; transform: scale(0.9); }
          50%  { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.06); }
        }
        @keyframes burst-out {
          0%   { opacity: 1; transform: scale(1); }
          60%  { opacity: 1; transform: scale(1.15); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.3); filter: blur(2px); }
        }
      `}</style>
    </div>
  );
};



export default App;
