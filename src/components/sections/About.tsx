import { BookOpen, MapPin } from "lucide-react";
import { about, logos, profile, quickFacts } from "@/data/profile";
import LineCta from "../LineCta";
import OrgLogo from "../OrgLogo";
import Reveal from "../Reveal";

const About = () => (
  <section id="about" aria-labelledby="about-title" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
    <Reveal className="tile flex flex-col justify-between gap-12 p-8 sm:col-span-2 sm:p-12 xl:row-span-2">
      <span className="eyebrow">01 — About</span>
      <h1
        id="about-title"
        className="text-balance font-heading text-[1.75rem] font-semibold uppercase leading-[1.15] tracking-[0.02em] sm:text-4xl 2xl:text-[2.6rem]"
      >
        Hi, I'm Nam.{" "}
        <span className="text-muted-foreground">{profile.tagline}</span>
      </h1>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-1">
        <LineCta href="#projects" className="text-primary hover:text-foreground">
          See projects
        </LineCta>
        <LineCta href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary">
          Email me
        </LineCta>
      </div>
    </Reveal>

    <Reveal delay={0.05} className="tile flex flex-col gap-3 p-7 sm:p-8">
      <OrgLogo logo={logos.swinburne} className="h-12 w-12" />
      <span className="eyebrow">Education</span>
      <p className="text-lg font-semibold leading-snug">{quickFacts.education.school}</p>
      <p className="text-sm text-muted-foreground">
        {quickFacts.education.degree} · {quickFacts.education.graduation}
      </p>
    </Reveal>

    <Reveal delay={0.1} className="tile flex flex-col gap-3 p-7 sm:p-8">
      <MapPin size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Location</span>
      <p className="text-lg font-semibold leading-snug">{profile.location}</p>
      <p className="text-sm text-muted-foreground">Open to on-site, hybrid or remote</p>
    </Reveal>

    <Reveal delay={0.15} className="tile flex flex-col gap-3 p-7 sm:p-8">
      <OrgLogo logo={logos.payoo} className="h-12 w-12" />
      <span className="eyebrow">Experience</span>
      <p className="text-lg font-semibold leading-snug">
        {quickFacts.internship.title} @ {quickFacts.internship.company}
      </p>
      <p className="text-sm text-muted-foreground">{quickFacts.internship.period}</p>
    </Reveal>

    <Reveal delay={0.2} className="tile flex flex-col gap-3 p-7 sm:p-8">
      <BookOpen size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Currently</span>
      <p className="text-lg font-semibold leading-snug">{quickFacts.research}</p>
    </Reveal>

    <Reveal className="tile flex flex-col gap-5 p-8 sm:col-span-2 sm:p-10 xl:col-span-3">
      {about.map((paragraph) => (
        <p key={paragraph} className="text-pretty text-lg leading-relaxed text-muted-foreground first:text-foreground">
          {paragraph}
        </p>
      ))}
    </Reveal>

    <Reveal delay={0.05} className="tile flex flex-col gap-5 bg-primary p-7 text-primary-foreground sm:col-span-2 sm:p-8 xl:col-span-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">Career path</span>
      <ol className="flex flex-col gap-3">
        {quickFacts.path.map((step, i) => (
          <li key={step} className="flex items-center gap-3 font-semibold">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-current font-mono text-xs">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </Reveal>
  </section>
);

export default About;
