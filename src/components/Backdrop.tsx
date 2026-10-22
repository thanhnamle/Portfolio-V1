import { cn } from "@/lib/utils";
import { sections } from "@/data/profile";
import { sectionBackdrops } from "@/data/images";
import HeroEffects from "./HeroEffects";

// Fixed scene behind the main page: each section has its own photo, and the backdrop crossfades
// to the one in view. A deep tint keeps long-form content readable, with a quieter version of the
// intro's light effects on top. Purely decorative.
const Backdrop = ({ active }: { active: string }) => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bp">
    {sections.map(({ id }) => {
      const photo = sectionBackdrops[id];
      return (
        <img
          key={id}
          src={photo.src}
          alt=""
          decoding="async"
          style={{ objectPosition: photo.position }}
          className={cn(
            "absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] transition-opacity duration-1000 ease-out motion-reduce:transition-none",
            id === active ? "opacity-100" : "opacity-0",
          )}
        />
      );
    })}
    <div className="backdrop-tint absolute inset-0" />
    <HeroEffects ambient />
  </div>
);

export default Backdrop;
