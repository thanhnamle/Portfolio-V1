import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, sections } from "@/data/profile";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

const ResumeButton = () =>
  profile.resumeUrl ? (
    <a
      href={profile.resumeUrl}
      download
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-inverse px-5 py-3 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90"
    >
      <Download size={16} aria-hidden />
      Download résumé
    </a>
  ) : null;

// Desktop: a sticky left column. Mobile: the profile card at the top of the page
// (section navigation moves to MobileNav).
const Sidebar = ({ active }: { active: string }) => (
  <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[280px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-8">
    <div className="tile flex flex-col gap-6 p-6 lg:bg-transparent lg:p-0">
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-inverse text-lg font-semibold text-inverse-foreground"
        >
          {profile.initials}
        </div>
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-3xl font-bold tracking-tight">{profile.name}</p>
        <p className="font-medium text-primary">{profile.role}</p>
      </div>

      <p className="inline-flex items-center gap-2 self-start rounded-full border bg-card px-3 py-1.5 text-sm font-medium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {profile.status}
      </p>

      <div className="flex flex-wrap items-center gap-3 lg:hidden">
        <SocialLinks />
        <ResumeButton />
      </div>

      <nav aria-label="Sections" className="hidden lg:block">
        <ul className="flex flex-col gap-1 pt-4 font-mono text-xs uppercase tracking-[0.08em]">
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-4 py-2.5 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative h-px w-12">
                    <span className="absolute inset-y-0 left-0 w-6 bg-muted-foreground/50 transition-all group-hover:w-12" />
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-indicator"
                        className="absolute inset-y-0 left-0 w-12 bg-foreground"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>

    <div className="hidden flex-col gap-4 lg:flex">
      <ResumeButton />
      <div className="flex items-center justify-between">
        <SocialLinks />
        <ThemeToggle />
      </div>
    </div>
  </aside>
);

export default Sidebar;
