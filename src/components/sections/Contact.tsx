import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "../Reveal";

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
    <section id="contact" aria-labelledby="contact-title" className="pt-10">
      <Reveal className="tile flex flex-col gap-8 bg-inverse p-8 text-inverse-foreground sm:p-12">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-inverse-muted">05 — Contact</span>
        <h2 id="contact-title" className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Hiring a backend or full-stack intern?{" "}
          <span className="text-inverse-muted">Let's talk.</span>
        </h2>
        <p className="max-w-xl text-lg text-inverse-muted">
          Email is the fastest way to reach me. I'm happy to walk through any project or share code samples.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-inverse-foreground px-5 py-3.5 text-sm font-medium text-inverse transition-opacity hover:opacity-90"
          >
            <Mail size={16} aria-hidden />
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-inverse-muted/40 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-inverse-foreground/10"
          >
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-inverse-muted/40 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-inverse-foreground/10"
          >
            <Linkedin size={16} aria-hidden />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-inverse-muted/40 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-inverse-foreground/10"
          >
            <Github size={16} aria-hidden />
            GitHub
          </a>
        </div>
      </Reveal>

      <footer className="flex flex-wrap justify-between gap-2 px-1 py-8 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, Vite &amp; Tailwind CSS</span>
      </footer>
    </section>
  );
};

export default Contact;
