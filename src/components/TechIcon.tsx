import { Code2 } from "lucide-react";
import { readableBrandColor, techIcons } from "@/lib/techIcons";

type TechIconProps = {
  name: string;
  size?: number;
  // Hex (no #) of the surface behind the icon; when set, the brand colour is used if it has enough contrast.
  brandOn?: string;
  className?: string;
};

const TechIcon = ({ name, size = 18, brandOn, className }: TechIconProps) => {
  const icon = techIcons[name];
  if (!icon) return <Code2 size={size} className={className} aria-hidden />;

  const color = brandOn ? readableBrandColor(icon.hex, brandOn) : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color ?? "currentColor"}
      className={className}
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
};

export default TechIcon;
