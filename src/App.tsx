import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Fireflies from "@/components/Fireflies";
import Loading from "@/components/Loading";
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";

type Stage = "loading" | "intro" | "portfolio";

// Every page load — first visit, F5, or a link to a section such as /#projects — plays
// loading → intro → portfolio. A section hash is honoured once the portfolio opens (see Portfolio).
// The browser must not restore the old scroll position itself, since the page starts as a short
// loading screen.
if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

const App = () => {
  const [stage, setStage] = useState<Stage>("loading");

  // Loading can report done more than once (timer, key, click); only the first moves on.
  const finishLoading = useCallback(() => setStage((s) => (s === "loading" ? "intro" : s)), []);
  const enter = useCallback(() => setStage("portfolio"), []);

  return (
    <MotionConfig reducedMotion="user">
      <Fireflies />
      <AnimatePresence mode="wait">
        {stage === "loading" && <Loading key="loading" onDone={finishLoading} />}
        {stage === "intro" && <Intro key="intro" onEnter={enter} />}
        {stage === "portfolio" && <Portfolio key="portfolio" />}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default App;
