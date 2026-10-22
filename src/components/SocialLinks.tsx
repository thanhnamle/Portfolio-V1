import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const links = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
].filter((link) => link.href);

const SocialLinks = ({ className }: { className?: string }) => (
  <ul className={cn("flex gap-2", className)}>
    {links.map(({ label, href, icon: Icon }) => (
      <li key={label}>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-xl border bg-card/60 text-foreground backdrop-blur transition-colors hover:bg-muted hover:text-primary"
        >
          <Icon size={18} aria-hidden />
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
