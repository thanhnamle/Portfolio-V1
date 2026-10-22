import { useEffect, useRef, useState, type Ref, type RefObject } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { architecture, flows, projects, type ArchitectureNode } from "@/data/profile";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";
import TechIcon from "../TechIcon";

// Short names of the projects whose stack includes any of the node's items.
const usedIn = (items: string[]) =>
  projects.filter((p) => p.stack.some((tech) => items.includes(tech))).map((p) => p.shortTitle);

type NodeProps = { node: ArchitectureNode; dashed?: boolean; className?: string; innerRef?: Ref<HTMLDivElement> };

const Node = ({ node, dashed = false, className, innerRef }: NodeProps) => {
  const projectsUsing = usedIn(node.items);
  return (
    <div
      ref={innerRef}
      className={cn(
        "relative flex flex-col gap-4 border p-6",
        node.core ? "border-bp-accent bg-bp-raised shadow-[0_0_0_4px_hsl(var(--bp-accent)/0.12)]" : "border-bp-line bg-bp",
        dashed && "border-dashed",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-mono text-xs uppercase tracking-[0.08em]", node.core ? "text-bp-accent" : "text-bp-text")}>
            [{node.id}] {node.label}
            {node.core && " · core"}
          </h3>
          <p className="text-sm text-bp-muted">{node.purpose}</p>
        </div>
        <span className="font-mono text-[11px] text-bp-muted">{String(node.items.length).padStart(2, "0")}</span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {node.items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-2 border border-bp-line bg-bp/70 px-2.5 py-1.5 text-[13px] font-medium"
          >
            <TechIcon name={item} size={15} brandOn={node.core ? "0E2850" : "0B1E3A"} />
            {item}
          </li>
        ))}
      </ul>
      {projectsUsing.length > 0 && (
        <p className="border-t border-bp-line pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-bp-muted">
          Used in → <span className="text-bp-text">{projectsUsing.join(" · ")}</span>
        </p>
      )}
    </div>
  );
};

// Straight vertical link with a protocol label, used below xl where nodes stack.
const StackedConnector = ({ label }: { label: string }) => (
  <div aria-hidden className="flex flex-col items-center gap-1 py-2 xl:hidden">
    <span className="h-5 w-0.5 animate-flow-y bg-flow-y bg-[length:2px_8px] motion-reduce:animate-none" />
    <span className="border border-bp-line bg-bp px-2 py-0.5 font-mono text-[11px] text-bp-accent">{label}</span>
    <span className="h-5 w-0.5 animate-flow-y bg-flow-y bg-[length:2px_8px] motion-reduce:animate-none" />
    <ArrowDown size={14} className="-mt-1.5 text-bp-accent" />
  </div>
);

type Wire = { label: string; d: string; x1: number; y1: number; labelX: number; labelY: number };

// Leaves room at the target for the arrowhead marker.
const ARROW_GAP = 4;

// Horizontal-tangent cubic Bézier from (x1, y1) to (x2, y2); its midpoint is the average of both ends.
// On a curved wire the label sits on the midpoint like a tag; on a near-flat one it is lifted
// above the line so it doesn't hide the wire.
const curve = (label: string, x1: number, y1: number, x2: number, y2: number): Wire => {
  const end = x2 - ARROW_GAP;
  const bend = Math.max(36, (end - x1) / 2);
  const nearlyFlat = Math.abs(y2 - y1) < 24;
  return {
    label,
    d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${end - bend} ${y2}, ${end} ${y2}`,
    x1,
    y1,
    labelX: (x1 + end) / 2,
    labelY: (y1 + y2) / 2 - (nearlyFlat ? 18 : 0),
  };
};

// Measures the nodes inside `container` and routes curved wires between their edges (xl layout only).
const useWires = (
  container: RefObject<HTMLDivElement>,
  client: RefObject<HTMLDivElement>,
  api: RefObject<HTMLDivElement>,
  services: RefObject<HTMLDivElement>,
  data: RefObject<HTMLDivElement>,
) => {
  const [wires, setWires] = useState<Wire[]>([]);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const edges = (el: HTMLElement | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left - box.left, right: r.right - box.left, midY: r.top - box.top + r.height / 2 };
      };
      const [c, a, s, d] = [client, api, services, data].map((ref) => edges(ref.current));
      if (!c || !a || !s || !d) return;
      setWires([
        curve(flows.clientToApi, c.right, c.midY, a.left, a.midY),
        // Fan out from just above and below the API's midline so the two wires don't overlap at the start.
        curve(flows.apiToServices, a.right, a.midY - 12, s.left, s.midY),
        curve(flows.apiToData, a.right, a.midY + 12, d.left, d.midY),
      ]);
    };

    measure();
    const observer = new ResizeObserver(measure);
    [root, client.current, api.current, services.current, data.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [container, client, api, services, data]);

  return wires;
};

const Legend = () => (
  <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-bp-muted">
    <li className="flex items-center gap-2">
      <span aria-hidden className="h-0.5 w-6 bg-flow-x bg-[length:8px_2px]" />
      Request flow
    </li>
    <li className="flex items-center gap-2">
      <span aria-hidden className="h-3 w-4 border border-bp-accent bg-bp-raised" />
      Core layer
    </li>
    <li className="flex items-center gap-2">
      <span aria-hidden className="h-3 w-4 border border-dashed border-bp-line" />
      Edge / delivery
    </li>
  </ul>
);

// Skills drawn as a system: client → API → services + data, with the delivery layer underneath.
const Architecture = () => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const wires = useWires(diagramRef, clientRef, apiRef, servicesRef, dataRef);

  return (
    <section id="stack" aria-labelledby="stack-title">
      <SectionHeader id="stack-title" index="02" title="My stack, as a system" aside="FIG. 1 · request flow" />
      <Reveal className="overflow-hidden rounded-tile bg-bp/85 bg-blueprint p-6 text-bp-text shadow-[inset_0_0_0_1px_hsl(var(--tile-edge))] backdrop-blur-md sm:p-10 xl:p-12">
        <figure className="flex flex-col gap-10">
          <Legend />

          <div
            ref={diagramRef}
            className="relative flex flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] xl:items-center xl:gap-x-32"
          >
            <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block">
              <defs>
                <marker
                  id="stack-wire-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-bp-accent" />
                </marker>
              </defs>
              {wires.map((wire) => (
                <g key={wire.label}>
                  {/* Soft glow under the dashed wire. */}
                  <path d={wire.d} fill="none" strokeWidth={6} className="stroke-bp-accent opacity-15" />
                  <path
                    d={wire.d}
                    fill="none"
                    strokeWidth={1.75}
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    markerEnd="url(#stack-wire-arrow)"
                    className="animate-dash stroke-bp-accent motion-reduce:animate-none"
                  />
                  <circle cx={wire.x1} cy={wire.y1} r={3.5} className="fill-bp-accent" />
                </g>
              ))}
            </svg>
            {wires.map((wire) => (
              <span
                key={wire.label}
                aria-hidden
                className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-bp-line bg-bp px-2 py-0.5 font-mono text-[11px] text-bp-accent xl:block"
                style={{ left: wire.labelX, top: wire.labelY }}
              >
                {wire.label}
              </span>
            ))}

            <Node node={architecture.client} dashed innerRef={clientRef} />
            <StackedConnector label={flows.clientToApi} />
            <Node node={architecture.api} innerRef={apiRef} />
            <StackedConnector label={`${flows.apiToServices} / ${flows.apiToData}`} />
            <div className="flex flex-col gap-5 xl:gap-10">
              <Node node={architecture.services} innerRef={servicesRef} />
              <Node node={architecture.data} innerRef={dataRef} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div aria-hidden className="flex items-center gap-3">
              <span className="h-px flex-1 border-t border-dashed border-bp-line" />
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-bp-muted">Delivery · {flows.delivery}</span>
              <span className="h-px flex-1 border-t border-dashed border-bp-line" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Node node={architecture.infra} dashed />
              <Node node={architecture.tooling} dashed />
            </div>
          </div>

          <figcaption className="font-mono text-xs text-bp-muted">
            Requests enter through the client, are handled by the API layer, then fan out to services and storage.
            “Used in” is derived from the projects below.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
};

export default Architecture;
