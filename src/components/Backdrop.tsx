import heroSmall from "@/assets/hero-servers-1200.webp";
import heroLarge from "@/assets/hero-servers-1920.webp";
import HeroEffects from "./HeroEffects";

// The intro's server-room photo, fixed behind the main page under a deeper tint, with a quieter
// version of the intro's light effects. Purely decorative.
const Backdrop = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bp">
    <img
      src={heroLarge}
      srcSet={`${heroSmall} 1200w, ${heroLarge} 1920w`}
      sizes="100vw"
      alt=""
      className="h-full w-full scale-105 object-cover object-[62%_50%] blur-[2px]"
    />
    <div className="backdrop-tint absolute inset-0" />
    <HeroEffects ambient />
  </div>
);

export default Backdrop;
