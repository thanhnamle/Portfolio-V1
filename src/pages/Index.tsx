import { useState, useCallback } from "react";
import Splash from "@/components/Splash";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AmbientBackground from "@/components/AmbientBackground";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <div className="grain-overlay">
      {!splashDone && <Splash onComplete={handleSplashComplete} />}
      {splashDone && (
        <>
          <AmbientBackground />
          <Navbar />
          <ScrollProgress />
          <BackToTop />
          <main className="relative z-10">
            <Hero />
            <AboutMe />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
