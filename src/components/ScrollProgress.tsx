import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["hero", "about", "skills", "projects", "contact"];

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveIndex(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="relative w-[2px] h-48 bg-border/40 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary/50 rounded-full"
          style={{ height: `${progress * 100}%` }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 flex flex-col justify-between">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() =>
              document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })
            }
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-primary scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to ${s}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollProgress;
