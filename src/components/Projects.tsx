import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import projectTaskflow from "@/assets/project-taskflow.jpg";
import projectDevblog from "@/assets/project-devblog.jpg";
import projectWeather from "@/assets/project-weather.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";

const projects = [
  {
    title: "TaskFlow",
    description:
      "A minimal task management app with drag-and-drop, dark mode, and real-time sync.",
    tech: ["React", "TypeScript", "Tailwind", "Firebase"],
    github: "https://github.com",
    live: "https://example.com",
    image: projectTaskflow,
  },
  {
    title: "DevBlog",
    description:
      "A markdown-powered blog with syntax highlighting, tags, and search functionality.",
    tech: ["Next.js", "MDX", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    image: projectDevblog,
  },
  {
    title: "WeatherNow",
    description:
      "A clean weather dashboard using OpenWeather API with location detection and forecasts.",
    tech: ["React", "REST API", "CSS Modules"],
    github: "https://github.com",
    image: projectWeather,
  },
  {
    title: "Portfolio v1",
    description:
      "Previous iteration of my personal portfolio built with vanilla HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
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
