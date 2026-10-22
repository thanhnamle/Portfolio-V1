import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Logo } from "@/data/profile";

type OrgLogoProps = {
  logo?: Logo;
  // Rendered instead of the image when there is no logo (e.g. an icon).
  fallback?: ReactNode;
  className?: string;
};

// Square logo tile. Logos with `plate` sit on white so dark marks stay visible in dark mode.
const OrgLogo = ({ logo, fallback, className }: OrgLogoProps) => (
  <span
    className={cn(
      "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
      logo?.plate ? "bg-white p-1" : logo ? "bg-black" : "bg-primary/10 text-primary",
      className,
    )}
  >
    {logo ? (
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        className={cn("h-full w-full", logo.plate ? "object-contain" : "object-cover")}
      />
    ) : (
      fallback
    )}
  </span>
);

export default OrgLogo;
