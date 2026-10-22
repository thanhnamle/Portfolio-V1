import { useEffect } from "react";
import { motion } from "framer-motion";
import { intro, profile } from "@/data/profile";
import { SIGNATURE_VIEWBOX, signaturePath } from "@/data/signature";
import heroSmall from "@/assets/hero-servers-1200.webp";
import heroLarge from "@/assets/hero-servers-1920.webp";
import HeroEffects from "./HeroEffects";
import LineCta from "./LineCta";
import ThemeSwitcher from "./ThemeSwitcher";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const topLinks = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

// Cinematic landing: a static data-centre photo with animated light around it, a big question
// headline bottom-left and "Enter portfolio" bottom-right. Scrolling, swiping up, ArrowDown or
// Enter also enters. Exits by zooming through, like stepping into a portal.
// Photo: Taylor Vick on Unsplash (https://unsplash.com/photos/cable-network-M5tzZtFCOfs).
const Intro = ({ onEnter }: { onEnter: () => void }) => {
  // "Scroll to explore": a downward wheel, an upward swipe, ArrowDown/PageDown, or Enter while
  // nothing else has focus (so Enter on a link or the theme switch keeps its own meaning).
  useEffect(() => {
    let touchStartY: number | null = null;
    const onWheel = (e: WheelEvent) => e.deltaY > 30 && onEnter();
    const onKey = (e: KeyboardEvent) => {
      const idle = document.activeElement === document.body || document.activeElement === null;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === "Enter" && idle)) onEnter();
    };
    const onTouchStart = (e: TouchEvent) => (touchStartY = e.touches[0].clientY);
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY !== null && touchStartY - e.changedTouches[0].clientY > 60) onEnter();
      touchStartY = null;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onEnter]);

  return (
    <motion.main
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-bp text-bp-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Static background photo; settles in once on load. */}
      <motion.img
        src={heroLarge}
        srcSet={`${heroSmall} 1200w, ${heroLarge} 1920w`}
        sizes="100vw"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_50%]"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <div aria-hidden className="hero-tint absolute inset-0 -z-10" />
      <HeroEffects />

      <motion.header
        className="relative flex items-center justify-between gap-6 px-6 pt-6 sm:px-12 sm:pt-10 lg:px-[8vw]"
        {...fadeIn(0.2)}
      >
        <svg role="img" aria-label={profile.name} viewBox={SIGNATURE_VIEWBOX} className="h-11 w-auto drop-shadow-[0_0_10px_hsl(42_80%_60%/0.45)] sm:h-14">
          <path d={signaturePath} strokeWidth={1.4} strokeLinejoin="round" className="fill-bp-text stroke-bp-text" />
        </svg>
        <nav aria-label="Contact" className="flex items-center gap-6 sm:gap-10">
          <ul className="hidden items-center gap-8 font-mono text-[11px] font-medium uppercase tracking-[0.18em] md:flex">
            {topLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-bp-text/80 transition-colors hover:text-bp-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </nav>
      </motion.header>

      <div className="relative mt-auto flex flex-col gap-10 px-6 pb-10 pt-24 sm:px-12 sm:pb-14 lg:px-[8vw] lg:pb-[7vh]">
        <h1 className="font-heading text-[clamp(2.1rem,5.4vw,5.25rem)] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-[hsl(40_45%_96%)] [text-shadow:0_4px_30px_hsl(256_40%_4%/0.6)]">
          {intro.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="grid items-end gap-8 lg:grid-cols-[auto_minmax(0,34rem)_1fr] lg:gap-14">
          {/* Identity badge, in the spirit of a partner plate. */}
          <motion.div className="w-fit border border-bp-text/35 bg-bp/40 backdrop-blur-sm" {...fadeIn(0.75)}>
            <div className="flex items-center gap-4 px-4 py-3">
              <img src={profile.avatar} alt="" width={44} height={44} className="h-11 w-11 object-cover" />
              <div className="flex items-center gap-3">
                <span className="whitespace-nowrap font-heading text-base font-semibold">{profile.name}</span>
                <span aria-hidden className="hidden h-6 w-px rotate-[20deg] bg-bp-accent sm:block" />
                <span className="hidden whitespace-nowrap text-sm text-bp-text/80 sm:inline">Backend · Full-Stack</span>
              </div>
            </div>
            <p className="border-t border-bp-text/25 px-4 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.42em] text-bp-text/70">
              Portfolio · {new Date().getFullYear()}
            </p>
          </motion.div>

          <motion.p className="max-w-[34rem] text-pretty text-base leading-relaxed text-bp-text/75 sm:text-lg" {...fadeIn(0.85)}>
            {intro.blurb}
          </motion.p>

          <motion.div className="flex flex-col gap-3 lg:items-end" {...fadeIn(1)}>
            <LineCta onClick={onEnter} className="self-start text-bp-text hover:text-bp-accent lg:self-end">
              Enter portfolio
            </LineCta>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bp-text/50">or scroll to explore</span>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default Intro;
