import { useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SIGNATURE_VIEWBOX, signaturePath } from "@/data/signature";

const DRAW_SECONDS = 1.6;
const TOTAL_MS = 2600;
const REDUCED_MOTION_MS = 900;

// Opening screen: the signature is written in glowing gold, then inked in, before the intro.
// Any key press or click skips it.
const Loading = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(onDone, reduced ? REDUCED_MOTION_MS : TOTAL_MS);
    window.addEventListener("keydown", onDone);
    window.addEventListener("pointerdown", onDone);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onDone);
      window.removeEventListener("pointerdown", onDone);
    };
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-label={`Loading ${profile.name}'s portfolio`}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-8 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <svg
        aria-hidden
        viewBox={SIGNATURE_VIEWBOX}
        className="w-[min(440px,78vw)] overflow-visible drop-shadow-[0_0_14px_hsl(var(--primary)/0.55)]"
      >
        {/* Outline written first, then the ink fills in behind it. */}
        <motion.path
          d={signaturePath}
          className="fill-primary"
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: 1 }}
          transition={{ duration: 0.5, delay: DRAW_SECONDS * 0.7 }}
        />
        <motion.path
          d={signaturePath}
          fill="none"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: [1, 1, 0] }}
          transition={{
            pathLength: { duration: DRAW_SECONDS, ease: [0.45, 0, 0.25, 1] },
            opacity: { duration: DRAW_SECONDS + 0.5, times: [0, 0.8, 1] },
          }}
        />
      </svg>

      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="font-heading text-lg tracking-[0.35em] text-foreground/90 sm:text-xl">{profile.name}</p>
        <div className="h-px w-48 overflow-hidden rounded-full bg-primary/20">
          <motion.div
            className="h-full origin-left bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: (TOTAL_MS - 300) / 1000, ease: "easeInOut" }}
          />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Click or press any key to skip
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
