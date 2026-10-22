import { cn } from "@/lib/utils";
import { sections } from "@/data/profile";

// Sticky section switcher shown below lg, where the sidebar nav is hidden.
const MobileNav = ({ active }: { active: string }) => (
  <nav
    aria-label="Sections"
    className="sticky top-0 z-30 -mx-4 bg-background/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden"
  >
    <ul className="flex gap-1 overflow-x-auto rounded-full bg-card p-1.5 text-sm [scrollbar-width:none]">
      {sections.map(({ id, label }) => (
        <li key={id} className="shrink-0">
          <a
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={cn(
              "block rounded-full px-4 py-2.5 font-medium transition-colors",
              active === id ? "bg-inverse text-inverse-foreground" : "text-muted-foreground hover:text-foreground",
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
