import { timeline } from "@/data/profile";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

const Experience = () => (
  <section id="experience" aria-labelledby="experience-title">
    <SectionHeader id="experience-title" index="03" title="Experience & education" />
    <Reveal className="tile p-3 sm:p-4">
      <ol className="flex flex-col">
        {timeline.map((entry) => (
          <li
            key={`${entry.org}-${entry.title}`}
            className="grid gap-x-8 gap-y-2 rounded-2xl p-5 transition-colors hover:bg-muted sm:grid-cols-[150px_minmax(0,1fr)]"
          >
            <span className="flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:items-start">
              {entry.current && <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-success" aria-label="Ongoing" />}
              {entry.period}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold leading-snug">
                {entry.title} <span className="font-normal text-muted-foreground">· {entry.org}</span>
              </h3>
              <p className="text-muted-foreground">{entry.description}</p>
              {entry.tags && entry.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  </section>
);

export default Experience;
