import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { profile, sections } from "@/data/profile";
import LineCta from "./LineCta";
import SocialLinks from "./SocialLinks";
import ThemeSwitcher from "./ThemeSwitcher";

const ResumeButton = () =>
  profile.resumeUrl ? (
    <LineCta href={profile.resumeUrl} download className="text-primary hover:text-foreground">
      Résumé
    </LineCta>
  ) : null;

// Desktop: a sticky left column. Mobile: the profile card at the top of the page
// (section navigation moves to MobileNav).
const Sidebar = ({ active }: { active: string }) => (
  <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[300px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-12">
    <div className="tile flex flex-col gap-7 p-7 sidebar-card lg:bg-transparent lg:p-0">
      <div className="flex items-start justify-between gap-4">
        <img
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          width={96}
          height={96}
          className="h-24 w-24 object-cover ring-1 ring-primary/70 ring-offset-4 ring-offset-background"
        />
        <ThemeSwitcher className="lg:hidden" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-heading text-2xl font-semibold uppercase tracking-[0.04em]">{profile.name}</p>
        <p className="font-medium text-primary">{profile.role}</p>
      </div>

      <p className="inline-flex items-center gap-2 self-start border bg-card/60 px-3 py-1.5 text-sm font-medium backdrop-blur">
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
        <ul className="flex flex-col gap-1 pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-4 py-3 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative h-px w-12">
                    <span className="absolute inset-y-0 left-0 w-6 bg-muted-foreground/50 transition-all group-hover:w-12" />
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-indicator"
                        className="absolute inset-y-0 left-0 w-12 bg-primary"
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
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">Theme</span>
        <ThemeSwitcher />
      </div>
      <SocialLinks />
    </div>
  </aside>
);

export default Sidebar;
