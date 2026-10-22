import { cn } from "@/lib/utils";
import { sections } from "@/data/profile";

// Sticky section switcher shown below lg, where the sidebar nav is hidden.
const MobileNav = ({ active }: { active: string }) => (
  <nav
    aria-label="Sections"
    className="sticky top-0 z-30 -mx-4 mt-2 bg-background/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden"
  >
    <ul className="flex gap-1 overflow-x-auto rounded-md border bg-card/70 p-1.5 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur-md [scrollbar-width:none]">
      {sections.map(({ id, label }) => (
        <li key={id} className="shrink-0">
          <a
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={cn(
              "block rounded-sm px-4 py-2.5 font-medium transition-colors",
              active === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default MobileNav;
