import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/profile";
import { DIALOG_MAX_WIDTH, type DialogOrigin } from "@/lib/dialogOrigin";
import TechIcon from "./TechIcon";

type ProjectDialogProps = {
  project: Project;
  origin: DialogOrigin;
  // Must be stable (useCallback): it is an effect dependency.
  onClose: () => void;
};

const ProjectDialog = ({ project, origin, onClose }: ProjectDialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `${project.slug}-dialog-title`;

  // Scroll lock, initial focus, Escape to close, Tab kept inside, focus restored on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const hasHighlights = project.highlights && project.highlights.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-tile bg-card text-card-foreground shadow-2xl"
        style={{ maxWidth: DIALOG_MAX_WIDTH }}
        initial={{ opacity: 0, ...origin }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, ...origin }}
        transition={{ type: "spring", stiffness: 320, damping: 34, opacity: { duration: 0.2 } }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-foreground shadow backdrop-blur transition-colors hover:bg-muted"
        >
          <X size={18} aria-hidden />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <img src={project.image} alt={project.imageAlt} width={1200} height={675} className="aspect-[16/9] w-full object-cover" />

          <motion.div
            className="flex flex-col gap-7 p-6 sm:p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-primary">Project</span>
              <h2 id={titleId} className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {project.title}
              </h2>
              <p className="text-lg text-muted-foreground">{project.summary}</p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-2xl bg-muted p-4">
                <dt className="eyebrow">Problem</dt>
                <dd className="font-medium">{project.problem}</dd>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl bg-muted p-4">
                <dt className="eyebrow">Approach</dt>
                <dd className="font-medium">{project.approach}</dd>
              </div>
            </dl>

            {hasHighlights && (
              <div className="flex flex-col gap-3">
                <h3 className="eyebrow">Highlights</h3>
                <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">
                  {project.highlights!.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h3 className="eyebrow">Built with</h3>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium">
                    <TechIcon name={tech} size={16} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {(project.github || project.live) && (
              <div className="flex flex-wrap gap-3 border-t pt-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-inverse px-5 py-3 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90"
                  >
                    <Github size={16} aria-hidden />
                    View source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={16} aria-hidden />
                    Live demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDialog;
