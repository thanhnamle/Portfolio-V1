import type { ReactNode } from "react";
import { BookOpen, MapPin } from "lucide-react";
import { about, logos, profile, quickFacts } from "@/data/profile";
import { tilePhotos, type Photo } from "@/data/images";
import LineCta from "../LineCta";
import OrgLogo from "../OrgLogo";
import Reveal from "../Reveal";

const Caption = ({ text }: { text?: string }) =>
  text ? (
    <span className="absolute right-3 top-3 whitespace-nowrap bg-background/50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/75 backdrop-blur">
      {text}
    </span>
  ) : null;

// Photo filling a tile behind its text, darkened towards the bottom where the copy sits.
// Used for atmospheric photos, where the text may cover part of the scene.
const TilePhoto = ({ photo }: { photo: Photo }) => (
  <>
    <Caption text={photo.caption} />
    <img
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
    />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,hsl(var(--card))_15%,hsl(var(--card)/0.7)_55%,hsl(var(--card)/0.25))]"
    />
  </>
);

// Real photo of a place (campus, office) shown as a banner above the text, so signs and logos in it
// stay visible. The organisation's logo overlaps the banner's lower edge.
const PhotoBannerTile = ({
  photo,
  logo,
  delay,
  children,
}: {
  photo: Photo;
  logo: ReactNode;
  delay: number;
  children: ReactNode;
}) => (
  <Reveal delay={delay} className="tile group flex flex-col overflow-hidden">
    <div className="relative h-36 overflow-hidden">
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: photo.position }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--card)/0.9),transparent_55%)]" />
      <Caption text={photo.caption} />
    </div>
    <div className="flex flex-1 flex-col gap-3 px-7 pb-7 sm:px-8 sm:pb-8">
      <div className="relative -mt-6">{logo}</div>
      {children}
    </div>
  </Reveal>
);

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

    <PhotoBannerTile delay={0.05} photo={tilePhotos.education} logo={<OrgLogo logo={logos.swinburne} className="h-12 w-12" />}>
      <span className="eyebrow">Education</span>
      <p className="text-lg font-semibold leading-snug">{quickFacts.education.school}</p>
      <p className="text-sm text-muted-foreground">
        {quickFacts.education.degree} · {quickFacts.education.graduation}
      </p>
    </PhotoBannerTile>

    <Reveal delay={0.1} className="tile group relative isolate flex min-h-[15rem] flex-col justify-end gap-3 overflow-hidden px-7 pb-7 pt-14 sm:px-8 sm:pb-8">
      <TilePhoto photo={tilePhotos.location} />
      <MapPin size={20} className="text-primary" aria-hidden />
      <span className="eyebrow">Location</span>
      <p className="text-lg font-semibold leading-snug">{profile.location}</p>
      <p className="text-sm text-muted-foreground">Open to on-site, hybrid or remote</p>
    </Reveal>

    <PhotoBannerTile delay={0.15} photo={tilePhotos.experience} logo={<OrgLogo logo={logos.payoo} className="h-12 w-12" />}>
      <span className="eyebrow">Experience</span>
      <p className="text-lg font-semibold leading-snug">
        {quickFacts.internship.title} @ {quickFacts.internship.company}
      </p>
      <p className="text-sm text-muted-foreground">{quickFacts.internship.period}</p>
    </PhotoBannerTile>

    <Reveal delay={0.2} className="tile group relative isolate flex min-h-[15rem] flex-col justify-end gap-3 overflow-hidden px-7 pb-7 pt-14 sm:px-8 sm:pb-8">
      <TilePhoto photo={tilePhotos.research} />
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
