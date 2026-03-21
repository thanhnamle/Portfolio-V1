import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section id="about" className="py-28 sm:py-36 bg-section-alt px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="h-1 w-12 bg-primary rounded-full mx-auto mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.div
          className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-[var(--card-shadow)] space-y-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-muted-foreground leading-relaxed text-base">
            Hi there! I'm <span className="text-foreground font-semibold">Le Thanh Nam</span>, 
            a passionate Computer Science student with a deep love for building beautiful, 
            functional web experiences. I enjoy turning complex problems into simple, 
            intuitive designs.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
            My journey in web development started with curiosity and has grown into a 
            genuine passion for creating impactful digital products. I'm constantly learning 
            new technologies and improving my craft, with a particular interest in frontend 
            development and UI/UX design.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
            When I'm not coding, you can find me exploring new design trends, reading tech blogs, 
            or working on personal projects to sharpen my skills. I'm currently seeking 
            internship opportunities where I can contribute, learn, and grow as a developer.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {[
              { label: "Location", value: "Vietnam" },
              { label: "Focus", value: "Frontend Dev" },
              { label: "Status", value: "Open to Work" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-muted/50 p-4 text-center"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
