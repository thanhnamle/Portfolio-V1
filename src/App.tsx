import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Fireflies from "@/components/Fireflies";
import Loading from "@/components/Loading";
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";

type Stage = "loading" | "intro" | "portfolio";

const INTRO_SEEN_KEY = "intro-seen";

// Loading → intro on a fresh visit; straight to the portfolio for deep links
// (e.g. /#projects shared with a CV) or once the visitor has entered during this session.
const initialStage = (): Stage => {
  if (window.location.hash) return "portfolio";
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1" ? "portfolio" : "loading";
  } catch {
    return "loading";
  }
};

const App = () => {
  const [stage, setStage] = useState(initialStage);

  // Loading can report done more than once (timer, key, click); only the first moves on.
  const finishLoading = useCallback(() => setStage((s) => (s === "loading" ? "intro" : s)), []);

  const enter = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Without storage the intro simply shows again on reload.
    }
    setStage("portfolio");
  };

  return (
    <MotionConfig reducedMotion="user">
      <Fireflies />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        {stage === "loading" && <Loading key="loading" onDone={finishLoading} />}
        {stage === "intro" && <Intro key="intro" onEnter={enter} />}
        {stage === "portfolio" && <Portfolio key="portfolio" />}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default App;
