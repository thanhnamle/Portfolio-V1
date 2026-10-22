import type { CSSProperties } from "react";

// Fixed, deterministic positions so the layer renders the same on every load.
const fireflies = Array.from({ length: 16 }, (_, i) => {
  const seed = (n: number) => ((i + 1) * n) % 97;
  return {
    left: `${(seed(37) / 97) * 100}%`,
    top: `${(seed(53) / 97) * 100}%`,
    size: 3 + (seed(11) % 3),
    dx: `${(seed(19) % 60) - 30}px`,
    dy: `${-40 - (seed(23) % 80)}px`,
    duration: `${9 + (seed(29) % 9)}s`,
    delay: `${-(seed(31) % 12)}s`,
  };
});

// Floating golden motes (fireflies at night, dust in daylight); hidden for reduced motion.
const Fireflies = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden motion-reduce:hidden">
    {fireflies.map((f, i) => (
      <span
        key={i}
        className="absolute animate-drift rounded-full bg-[hsl(var(--mote))]"
        style={
          {
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            boxShadow: "0 0 10px 3px hsl(var(--mote) / 0.55)",
            animationDelay: f.delay,
            "--dx": f.dx,
            "--dy": f.dy,
            "--duration": f.duration,
          } as CSSProperties
        }
      />
    ))}
  </div>
);

export default Fireflies;
