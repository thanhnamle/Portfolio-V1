import { ArrowUpRight, BookOpen } from "lucide-react";
import { timeline } from "@/data/profile";
import OrgLogo from "../OrgLogo";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

const Experience = () => (
  <section id="experience" aria-labelledby="experience-title">
    <SectionHeader id="experience-title" index="03" title="Experience & education" />
    <Reveal className="tile p-3 sm:p-5">
      <ol className="relative flex flex-col">
        {/* Rail through the logo centres: li padding (24px) + half the 56px logo. */}
        <span aria-hidden className="absolute bottom-[52px] left-[51.5px] top-[52px] w-px bg-primary/40" />
        {timeline.map((entry) => (
          <li
            key={`${entry.org}-${entry.title}`}
            className="relative flex gap-5 rounded-2xl p-6 transition-colors hover:bg-muted sm:gap-7"
          >
            <OrgLogo logo={entry.logo} fallback={<BookOpen size={22} aria-hidden />} className="relative" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold leading-snug">
                  {entry.title}{" "}
                  <span className="font-normal text-muted-foreground">
                    ·{" "}
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 underline-offset-4 hover:text-primary hover:underline"
                      >
                        {entry.org}
                        <ArrowUpRight size={14} aria-hidden />
                      </a>
                    ) : (
                      entry.org
                    )}
                  </span>
                </h3>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {entry.current && <span className="h-2 w-2 rounded-full bg-success" aria-label="Ongoing" />}
                  {entry.period}
                </span>
              </div>
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
