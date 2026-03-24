import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import projectAirbnb from "@/assets/project-airbnb.jpg";
import projectTBRGS from "@/assets/project-tbrgs.png";
import projectPortfolio from "@/assets/project-portfolio.jpg";

const projects = [
  {
    title: "Full Stack Airbnb Clone",
    description:
      "A comprehensive property rental platform modeled after Airbnb, featuring secure user authentication, dynamic property listings, an interactive booking system, and seamless payment integration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    github: "https://github.com",
    live: "https://example.com",
    image: projectAirbnb,
  },
  {
    title: "Cybersecurity threat detection in banking",
    description:
      "A machine learning pipeline designed to identify transaction anomalies and potential security threats in banking operations using advanced data analytics and visualization techniques.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com",
    live: "https://example.com",
    image: "",
  },
  {
    title: "Traffic-Based Route Guidance System (TBRGS)",
    description:
      "An intelligent navigation system that calculates optimal travel routes based on real-time traffic data, factoring in intersection delays and speed limits for efficient guidance.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API", "Algorithms"],
    github: "https://github.com",
    image: projectTBRGS,
  },
  {
    title: "Portfolio v1",
    description:
      "The first iteration of my professional portfolio, highlighting my early web development projects and interactive UI skills through modern frontend technologies.",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript"],
    github: "https://github.com",
    live: "https://example.com",
    image: projectPortfolio,
  },
];

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-28 sm:py-36 bg-section-alt px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="h-1 w-12 bg-primary rounded-full mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A selection of things I've built
        </motion.p>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Horizontal carousel */}
        <motion.div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="group flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-1 snap-start"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Project image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={15} />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
