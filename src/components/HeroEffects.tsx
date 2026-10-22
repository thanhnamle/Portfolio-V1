import type { CSSProperties } from "react";

// Deterministic pseudo-random values so every load looks the same.
const seeded = (i: number, n: number, mod: number) => ((i + 5) * n) % mod;

// Light streaks racing across the frame, like motion blur on a fast lap: packets on the wire.
const streaks = Array.from({ length: 9 }, (_, i) => ({
  top: `${28 + seeded(i, 37, 60)}%`,
  width: `${10 + seeded(i, 13, 14)}vw`,
  duration: `${2.6 + seeded(i, 7, 5) * 0.45}s`,
  delay: `${-seeded(i, 11, 9) * 0.55}s`,
  gold: i % 3 !== 1,
}));

// Small sparks drifting upward through the scene.
const sparks = Array.from({ length: 22 }, (_, i) => ({
  left: `${seeded(i, 41, 100)}%`,
  top: `${40 + seeded(i, 29, 58)}%`,
  size: 1.5 + (seeded(i, 17, 3) * 0.75),
  dx: `${seeded(i, 19, 40) - 20}px`,
  dy: `${-80 - seeded(i, 23, 140)}px`,
  duration: `${7 + seeded(i, 31, 8)}s`,
  delay: `${-seeded(i, 43, 10)}s`,
}));

// A small service topology drawn over the racks: client → api → (db, cache, queue).
const nodes = [
  { id: "client", x: 40, y: 150 },
  { id: "api", x: 170, y: 90 },
  { id: "db", x: 330, y: 50 },
  { id: "cache", x: 320, y: 160 },
  { id: "queue", x: 220, y: 220 },
];
const links: [string, string][] = [
  ["client", "api"],
  ["api", "db"],
  ["api", "cache"],
  ["api", "queue"],
  ["queue", "cache"],
];
const at = (id: string) => nodes.find((n) => n.id === id)!;

const Topology = () => (
  <svg viewBox="0 0 380 260" className="h-full w-full overflow-visible">
    {links.map(([a, b]) => {
      const p = at(a);
      const q = at(b);
      // Gentle curve between nodes rather than straight wires.
      const mx = (p.x + q.x) / 2;
      const d = `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`;
      return (
        <g key={`${a}-${b}`}>
          <path d={d} fill="none" strokeWidth={1} className="stroke-bp-accent/25" />
          <path
            d={d}
            fill="none"
            strokeWidth={1.25}
            strokeDasharray="3 9"
            className="animate-dash stroke-bp-accent/80 motion-reduce:animate-none"
          />
        </g>
      );
    })}
    {nodes.map((n) => (
      <g key={n.id}>
        <circle
          cx={n.x}
          cy={n.y}
          r={5}
          className="animate-ring fill-bp-accent/40 [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none"
        />
        <circle cx={n.x} cy={n.y} r={3.5} className="fill-bp-accent" />
        <text x={n.x + 9} y={n.y - 8} className="fill-bp-text/70 font-mono text-[9px] uppercase tracking-[0.12em]">
          {n.id}
        </text>
      </g>
    ))}
  </svg>
);

// Animated layer over the static hero photo. Purely decorative.
// `ambient` is the quieter version behind the main page: fewer, fainter streaks and no topology.
const HeroEffects = ({ ambient = false }: { ambient?: boolean }) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${ambient ? "opacity-50" : ""}`}>
    {/* Slow diagonal light sweep. */}
    <div className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-[linear-gradient(100deg,transparent,hsl(42_80%_70%/0.10),transparent)] mix-blend-screen motion-reduce:hidden" />

    {/* Streaks, tilted to follow the racks' perspective. */}
    <div className="absolute inset-0 -rotate-[7deg] scale-110 motion-reduce:hidden">
      {(ambient ? streaks.slice(0, 5) : streaks).map((s, i) => (
        <span
          key={i}
          className="absolute left-0 h-px animate-streak rounded-full"
          style={
            {
              top: s.top,
              width: s.width,
              animationDelay: s.delay,
              "--duration": s.duration,
              background: s.gold
                ? "linear-gradient(90deg, transparent, hsl(42 85% 65% / 0.9), hsl(45 100% 92%))"
                : "linear-gradient(90deg, transparent, hsl(176 70% 55% / 0.85), hsl(176 100% 90%))",
              boxShadow: s.gold ? "0 0 12px 1px hsl(42 85% 60% / 0.6)" : "0 0 12px 1px hsl(176 70% 50% / 0.55)",
            } as CSSProperties
          }
        />
      ))}
    </div>

    {/* Rising sparks. */}
    <div className="absolute inset-0 motion-reduce:hidden">
      {sparks.map((p, i) => (
        <span
          key={i}
          className="absolute animate-drift rounded-full bg-[hsl(42_90%_75%)]"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px 2px hsl(42 90% 65% / 0.6)",
              animationDelay: p.delay,
              "--dx": p.dx,
              "--dy": p.dy,
              "--duration": p.duration,
            } as CSSProperties
          }
        />
      ))}
    </div>

    {/* Service topology in the upper right. */}
    {!ambient && (
      <div className="absolute right-[6vw] top-[16%] hidden h-[34vh] w-[30vw] max-w-[520px] opacity-80 md:block">
        <Topology />
      </div>
    )}
  </div>
);

export default HeroEffects;
