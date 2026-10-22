import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/profile";
import { originFromRect, type DialogOrigin } from "@/lib/dialogOrigin";
import ProjectDialog from "../ProjectDialog";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

const SpecSheet = ({ project }: { project: Project }) => (
  <dl className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 gap-y-2 border-t pt-4 text-sm">
    <dt className="eyebrow pt-0.5">Problem</dt>
    <dd>{project.problem}</dd>
    <dt className="eyebrow pt-0.5">Approach</dt>
    <dd>{project.approach}</dd>
    <dt className="eyebrow pt-0.5">Stack</dt>
    <dd className="text-muted-foreground">{project.stack.join(" · ")}</dd>
  </dl>
);

// Sits above the card-wide "open" button (z-[2] vs z-[1]) so these links stay clickable.
const ProjectLinks = ({ project }: { project: Project }) => {
  if (!project.github && !project.live) return null;
  return (
    <div className="relative z-[2] flex flex-wrap gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium transition-colors hover:bg-border"
        >
          <Github size={16} aria-hidden />
          Source
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ExternalLink size={16} aria-hidden />
          Live demo
        </a>
      )}
    </div>
  );
};

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (project: Project, rect: DOMRect) => void;
};

const ProjectCard = ({ project, index, featured = false, onOpen }: ProjectCardProps) => (
  <Reveal
    as="article"
    delay={index * 0.05}
    className={cn(
      "tile group relative flex cursor-pointer flex-col overflow-hidden transition-shadow hover:shadow-xl",
      featured && "md:col-span-2 lg:flex-row",
    )}
  >
    <div className={cn("relative overflow-hidden", featured && "lg:w-[55%] lg:shrink-0")}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        width={1200}
        height={675}
        className={cn(
          "aspect-[16/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none",
          featured && "lg:aspect-auto lg:h-full",
        )}
      />
      <span className="absolute left-3 top-3 rounded-md bg-card/90 px-2 py-1 font-mono text-[11px] font-medium backdrop-blur">
        FIG. 2.{index + 1}
      </span>
      <span
        aria-hidden
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-medium opacity-0 backdrop-blur transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <Maximize2 size={12} />
        View details
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-7 sm:p-9">
      {featured && <span className="eyebrow text-primary">Featured project</span>}
      <h3 className={cn("font-heading font-semibold tracking-tight", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{project.title}</h3>
      <p className="text-muted-foreground">{project.summary}</p>
      <div className="mt-auto flex flex-col gap-4">
        <SpecSheet project={project} />
        <ProjectLinks project={project} />
      </div>
    </div>
    {/* Whole-card hit area; a real button so it is keyboard and screen-reader friendly. */}
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`View details: ${project.title}`}
      onClick={(event) => onOpen(project, event.currentTarget.parentElement!.getBoundingClientRect())}
      className="absolute inset-0 z-[1] rounded-tile"
    />
  </Reveal>
);

const Projects = () => {
  const [open, setOpen] = useState<{ project: Project; origin: DialogOrigin } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const handleOpen = (project: Project, rect: DOMRect) => setOpen({ project, origin: originFromRect(rect) });

  const [featured, ...rest] = projects;
  return (
    <section id="projects" aria-labelledby="projects-title">
      <SectionHeader id="projects-title" index="04" title="Selected projects" aside={`${projects.length} projects · click to expand`} />
      <div className="grid gap-5 md:grid-cols-2 xl:gap-6">
        {featured && <ProjectCard project={featured} index={0} featured onOpen={handleOpen} />}
        {rest.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i + 1} onOpen={handleOpen} />
        ))}
      </div>
      {createPortal(
        <AnimatePresence>
          {open && <ProjectDialog key={open.project.slug} project={open.project} origin={open.origin} onClose={close} />}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
};

export default Projects;
