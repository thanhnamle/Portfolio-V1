import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:thanhnam0810.tnl@gmail.com",
    icon: Mail,
    detail: "thanhnam0810.tnl@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/thanhnamle",
    icon: Github,
    detail: "github.com/thanhnamle",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    detail: "linkedin.com/in/namle123",
    external: true,
  },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:thanhnam0810.tnl@gmail.com?subject=${subject}&body=${body}`;
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-28 sm:py-36 bg-background px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's Build Something Together
        </motion.h2>

        <motion.div
          className="h-1 w-12 bg-primary rounded-full mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I'm always open to new opportunities and collaborations.
          Feel free to reach out — I'd love to hear from you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact links */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--card-shadow)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
              Get in Touch
            </h3>
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    <link.icon size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-semibold text-foreground block leading-tight">
                      {link.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {link.detail}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Message form */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--card-shadow)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-200"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        <motion.p
          className="mt-20 text-xs text-muted-foreground/60 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          © {new Date().getFullYear()} Le Thanh Nam. Built with care.
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
