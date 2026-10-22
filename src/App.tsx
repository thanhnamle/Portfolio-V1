import { MotionConfig } from "framer-motion";
import { sections } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import About from "@/components/sections/About";
import Architecture from "@/components/sections/Architecture";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

const sectionIds = sections.map((s) => s.id);

const App = () => {
  const active = useActiveSection(sectionIds);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-card focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1360px] px-4 pt-4 sm:px-6 lg:flex lg:gap-10 lg:pt-0">
        <Sidebar active={active} />
        <MobileNav active={active} />
        <main className="min-w-0 flex-1 lg:py-8">
          <About />
          <Architecture />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
