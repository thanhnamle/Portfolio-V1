import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Python", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Docker", "Vercel"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Skills = () => {
  return (
    <section id="skills" className="py-28 sm:py-36 bg-background px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.div
          className="h-1 w-12 bg-primary rounded-full mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.p
          className="text-muted-foreground text-center mb-16 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies and tools I work with
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-1"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
