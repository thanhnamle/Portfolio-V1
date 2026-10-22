import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LineCtaProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  className?: string;
};

const classes =
  "group inline-flex items-center gap-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.24em] transition-colors";

// The intro's call to action: spaced mono caps followed by a hairline arrow that stretches on hover.
// Renders a link when given `href`, otherwise a button.
const LineCta = ({ children, href, onClick, download, className }: LineCtaProps) => {
  const arrow = (
    <span
      aria-hidden
      className="relative flex h-px w-16 items-center bg-current opacity-60 transition-all duration-300 group-hover:w-24 group-hover:opacity-100"
    >
      <span className="absolute -right-px h-2 w-2 rotate-45 border-r border-t border-current" />
    </span>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(classes, className)}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(classes, className)}>
      {children}
      {arrow}
    </button>
  );
};

export default LineCta;
