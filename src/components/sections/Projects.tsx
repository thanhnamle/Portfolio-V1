import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/profile";
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

const ProjectLinks = ({ project }: { project: Project }) => {
  if (!project.github && !project.live) return null;
  return (
    <div className="flex flex-wrap gap-2">
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

const ProjectCard = ({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) => (
  <Reveal
    as="article"
    delay={index * 0.05}
    className={cn("tile flex flex-col overflow-hidden", featured && "md:col-span-2 lg:flex-row")}
  >
    <div className={cn("relative", featured && "lg:w-[55%] lg:shrink-0")}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        width={1200}
        height={675}
        className={cn("aspect-[16/8] w-full object-cover", featured && "lg:aspect-auto lg:h-full")}
      />
      <span className="absolute left-3 top-3 rounded-md bg-card/90 px-2 py-1 font-mono text-[11px] font-medium backdrop-blur">
        FIG. 2.{index + 1}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
      {featured && <span className="eyebrow text-primary">Featured project</span>}
      <h3 className={cn("font-semibold tracking-tight", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{project.title}</h3>
      <p className="text-muted-foreground">{project.summary}</p>
      <div className="mt-auto flex flex-col gap-4">
        <SpecSheet project={project} />
        <ProjectLinks project={project} />
      </div>
    </div>
  </Reveal>
);

const Projects = () => {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" aria-labelledby="projects-title">
      <SectionHeader id="projects-title" index="04" title="Selected projects" aside={`${projects.length} projects`} />
      <div className="grid gap-4 md:grid-cols-2">
        {featured && <ProjectCard project={featured} index={0} featured />}
        {rest.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i + 1} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
