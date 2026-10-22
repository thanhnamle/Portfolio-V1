import { ArrowRight, BookOpen, Briefcase, GraduationCap, Mail, MapPin } from "lucide-react";
import { about, profile, quickFacts } from "@/data/profile";
import Reveal from "../Reveal";

const About = () => (
  <section id="about" aria-labelledby="about-title" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Reveal className="tile flex flex-col justify-between gap-10 p-8 sm:col-span-2 sm:p-10 xl:row-span-2">
      <span className="eyebrow">01 — About</span>
      <h1 id="about-title" className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        Hi, I'm Nam.{" "}
        <span className="text-muted-foreground">{profile.tagline}</span>
      </h1>
      <div className="flex flex-wrap gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          See projects
          <ArrowRight size={16} aria-hidden />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-xl bg-muted px-5 py-3 text-sm font-medium transition-colors hover:bg-border"
        >
          <Mail size={16} aria-hidden />
          Email me
        </a>
      </div>
    </Reveal>

    <Reveal delay={0.05} className="tile flex flex-col gap-3 p-6">
      <GraduationCap size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Education</span>
      <p className="text-lg font-semibold leading-snug">{quickFacts.education.school}</p>
      <p className="text-sm text-muted-foreground">
        {quickFacts.education.degree} · {quickFacts.education.graduation}
      </p>
    </Reveal>

    <Reveal delay={0.1} className="tile flex flex-col gap-3 bg-inverse p-6 text-inverse-foreground">
      <MapPin size={20} aria-hidden />
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-inverse-muted">Location</span>
      <p className="text-lg font-semibold leading-snug">{profile.location}</p>
      <p className="text-sm text-inverse-muted">Open to on-site, hybrid or remote</p>
    </Reveal>

    <Reveal delay={0.15} className="tile flex flex-col gap-3 p-6">
      <Briefcase size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Experience</span>
      <p className="text-lg font-semibold leading-snug">
        {quickFacts.internship.title} @ {quickFacts.internship.company}
      </p>
      <p className="text-sm text-muted-foreground">{quickFacts.internship.period}</p>
    </Reveal>

    <Reveal delay={0.2} className="tile flex flex-col gap-3 p-6">
      <BookOpen size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Currently</span>
      <p className="text-lg font-semibold leading-snug">{quickFacts.research}</p>
    </Reveal>

    <Reveal className="tile flex flex-col gap-4 p-8 sm:col-span-2 xl:col-span-3">
      {about.map((paragraph) => (
        <p key={paragraph} className="text-pretty text-lg leading-relaxed text-muted-foreground first:text-foreground">
          {paragraph}
        </p>
      ))}
    </Reveal>

    <Reveal delay={0.05} className="tile flex flex-col gap-5 bg-primary p-6 text-primary-foreground sm:col-span-2 xl:col-span-1">
      <span className="font-mono text-xs uppercase tracking-[0.08em] opacity-80">Career path</span>
      <ol className="flex flex-col gap-3">
        {quickFacts.path.map((step, i) => (
          <li key={step} className="flex items-center gap-3 font-semibold">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs">
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
