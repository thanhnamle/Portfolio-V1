import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { architecture, type ArchitectureNode } from "@/data/profile";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

const Node = ({ node, dashed = false, className }: { node: ArchitectureNode; dashed?: boolean; className?: string }) => (
  <div
    className={cn(
      "flex flex-col gap-3 border p-5",
      node.core ? "border-bp-accent bg-bp-raised" : "border-bp-line bg-bp",
      dashed && "border-dashed",
      className,
    )}
  >
    <span className={cn("font-mono text-xs uppercase tracking-[0.08em]", node.core ? "text-bp-accent" : "text-bp-muted")}>
      [{node.id}] {node.label}
      {node.core && " · core"}
    </span>
    <ul className="flex flex-wrap gap-1.5">
      {node.items.map((item) => (
        <li key={item} className="border border-bp-line px-2 py-1 text-sm font-medium">
          {item}
        </li>
      ))}
    </ul>
    {node.note && <span className="text-sm text-bp-muted">{node.note}</span>}
  </div>
);

const Flow = () => (
  <div aria-hidden className="flex items-center justify-center py-1 text-bp-accent xl:px-1">
    <ArrowDown size={18} className="xl:hidden" />
    <ArrowRight size={18} className="hidden xl:block" />
  </div>
);

// Skills drawn as a request flow, blueprint-style: client → API → services + data.
const Architecture = () => (
  <section id="stack" aria-labelledby="stack-title">
    <SectionHeader id="stack-title" index="02" title="My stack, as a system" aside="FIG. 1 · request flow" />
    <Reveal className="overflow-hidden rounded-tile bg-bp bg-blueprint p-6 text-bp-text sm:p-10">
      <figure className="flex flex-col gap-8">
        <div className="flex flex-col xl:flex-row xl:items-stretch">
          <Node node={architecture.client} dashed className="xl:flex-1" />
          <Flow />
          <Node node={architecture.api} className="xl:flex-[1.3]" />
          <Flow />
          <div className="flex flex-col gap-4 xl:flex-1">
            <Node node={architecture.services} />
            <Node node={architecture.data} />
          </div>
        </div>
        <div className="grid gap-4 border-t border-bp-line pt-6 sm:grid-cols-2">
          <Node node={architecture.infra} dashed />
          <Node node={architecture.tooling} dashed />
        </div>
        <figcaption className="font-mono text-xs text-bp-muted">
          Requests enter through the client, are handled by the API layer, then fan out to services and storage.
        </figcaption>
      </figure>
    </Reveal>
  </section>
);

export default Architecture;
