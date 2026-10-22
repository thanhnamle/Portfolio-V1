import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";
import heroSmall from "@/assets/hero-servers-1200.webp";
import heroLarge from "@/assets/hero-servers-1920.webp";
import LineCta from "../LineCta";
import Reveal from "../Reveal";

// Closing call to action, styled as a small reprise of the intro hero.
const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-20 sm:pt-24">
      <Reveal className="tile relative isolate overflow-hidden p-8 text-bp-text sm:p-14 lg:p-16">
        <img
          src={heroLarge}
          srcSet={`${heroSmall} 1200w, ${heroLarge} 1920w`}
          sizes="(min-width: 1024px) 70vw, 100vw"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_50%]"
        />
        <div aria-hidden className="hero-tint absolute inset-0 -z-10" />

        <span className="eyebrow">05 — Contact</span>
        <h2
          id="contact-title"
          className="mt-6 max-w-4xl text-balance font-heading text-[clamp(1.9rem,4vw,3.5rem)] font-semibold uppercase leading-[1.08] tracking-[0.02em] [text-shadow:0_4px_30px_hsl(256_40%_4%/0.6)]"
        >
          Hiring a backend or full-stack intern? <span className="text-primary">Let's talk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-bp-text/75">
          Email is the fastest way to reach me. I'm happy to walk through any project or share code samples.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-1">
          <LineCta href={`mailto:${profile.email}`} className="text-primary hover:text-bp-text">
            Email me
          </LineCta>
          <LineCta href={profile.linkedin} className="text-bp-text/80 hover:text-primary">
            LinkedIn
          </LineCta>
          <LineCta href={profile.github} className="text-bp-text/80 hover:text-primary">
            GitHub
          </LineCta>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-bp-text/20 pt-6 font-mono text-xs">
          <a href={`mailto:${profile.email}`} className="text-bp-text/70 transition-colors hover:text-primary">
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-bp-text/70 transition-colors hover:text-primary"
          >
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
      </Reveal>

      <footer className="flex flex-wrap justify-between gap-2 px-1 py-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, Vite &amp; Tailwind CSS</span>
      </footer>
    </section>
  );
};

export default Contact;
