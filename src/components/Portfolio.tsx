import { motion } from "framer-motion";
import { sections } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import Backdrop from "./Backdrop";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import About from "./sections/About";
import Architecture from "./sections/Architecture";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const sectionIds = sections.map((s) => s.id);

// The main one-page portfolio, shown after the intro, over the same server-room backdrop.
const Portfolio = () => {
  const active = useActiveSection(sectionIds);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Backdrop />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-card focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 lg:flex lg:gap-14 lg:px-10 lg:pt-0 xl:gap-20 2xl:px-12">
        <Sidebar active={active} />
        <MobileNav active={active} />
        <main className="min-w-0 flex-1 lg:py-12">
          <About />
          <Architecture />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </motion.div>
  );
};

export default Portfolio;
