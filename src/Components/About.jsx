import { motion } from "framer-motion";
import { ABOUT_TEXT } from "../constants";
import Timeline from "./Timeline";

const About = () => {
  return (
    <section
      id="about"
      className="bg-transparent py-16 border-b border-neutral-800"
    >
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-2xl sm:text-4xl font-bold text-neutral-100 leading-tight tracking-tight mb-10"
      >
        Turning data into clarity. <br className="hidden sm:inline" />
        Driving better decisions through analytics.
      </motion.h2>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="max-w-4xl mx-auto px-6 space-y-8 text-sm sm:text-base leading-relaxed text-neutral-300"
      >
        {ABOUT_TEXT.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
            className="border-l-4 border-purple-500 pl-5 font-light"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Pull Quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-14 max-w-3xl mx-auto px-6 py-6 border-l-4 border-cyan-500 italic text-base sm:text-lg text-neutral-400"
      >
        “Strong analytics doesn’t just explain the past — it helps teams make confident decisions about what comes next.”
      </motion.blockquote>

      {/* Timeline */}
      <div className="mt-16">
        <Timeline />
      </div>
    </section>
  );
};

export default About;