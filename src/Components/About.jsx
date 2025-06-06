import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../constants';
import Timeline from './Timeline';

const About = () => {
  return (
    <section
      id="about"
      className="bg-transparent py-28 border-b border-neutral-800"
    >
      {/* Hero Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-2xl sm:text-5xl font-bold text-neutral-100 leading-tight tracking-tight mb-20"
      >
        Curious by nature. <br className="hidden sm:inline" />
        Driven by data. Focused on impact.
      </motion.h2>

      {/* Content Block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
        className="max-w-5xl mx-auto px-6 space-y-14 text-sm sm:text-[1.175rem] leading-relaxed sm:leading-9 text-neutral-300"
      >
        {ABOUT_TEXT.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="border-l-4 border-purple-500 pl-6 font-light"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Pull Quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-24 max-w-4xl mx-auto px-6 py-10 border-l-4 border-cyan-500 italic text-base sm:text-xl text-neutral-400"
      >
        “It’s never just about data — it’s about the stories the data tells and the impact it creates.”
      </motion.blockquote>

      {/* Optional: Timeline */}
      <div className="mt-32">
        <Timeline />
      </div>
    </section>
  );
};

export default About;
