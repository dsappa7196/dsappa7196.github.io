import React from 'react';
import profilePic from '../assets/about.jpg';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const container = (delay) => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay },
  },
});

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-transparent pt-32 pb-10 sm:pt-40 sm:pb-12">
      <div className="container mx-auto flex flex-col items-center px-4 text-center">
        {/* Profile Image */}
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          src={profilePic}
          alt="Padmasree Sappa"
          className="rounded-full w-32 h-32 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-cover shadow-lg mb-6 sm:mb-7"
        />

        {/* Name */}
        <motion.h1
          variants={container(0.5)}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-5xl font-semibold text-neutral-200 mb-3 sm:mb-4"
        >
          Padmasree Sappa
        </motion.h1>

        {/* Role Tags with Gradient */}
        <motion.span
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-2xl font-semibold mb-5 sm:mb-6 tracking-wide bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Business Analyst | Data Storyteller | Ex-Amazonian | MSBA @ SFSU
        </motion.span>

        {/* Summary Paragraph */}
        <motion.p
          variants={container(1.5)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl font-light text-neutral-400 leading-relaxed px-2 sm:px-4 text-sm sm:text-lg"
        >
          I’m a Business Analytics professional with over{' '}
          <span className="font-medium text-neutral-100">6.5 years</span> of experience delivering data-driven solutions across Amazon and beyond.
          I specialize in turning complex datasets into clear stories using{' '}
          <span className="font-medium text-neutral-100">SQL</span>,{' '}
          <span className="font-medium text-neutral-100">Excel</span>,{' '}
          <span className="font-medium text-neutral-100">Tableau</span>, and{' '}
          <span className="font-medium text-neutral-100">Python</span>.
          Now pursuing my MS in Business Analytics at SFSU, I bridge the gap between data and strategy to improve operations, optimize insights, and support smarter decisions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={container(2)}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8 mb-12 sm:mb-20 flex gap-3 sm:gap-4 flex-wrap justify-center"
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="border-2 border-neutral-200 text-neutral-200 text-sm sm:text-base py-2 px-5 sm:px-6 rounded-full hover:bg-neutral-200 hover:text-neutral-900 transition duration-200 flex items-center gap-2"
            aria-label="Scroll to contact section"
          >
            Contact Me <FaArrowRight />
          </button>

          <a
            href="https://github.com/dsappa7196/Padmasree-Sappa/blob/main/PadmasreeSappa_BusinessAnalyst.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-200 text-neutral-900 text-sm sm:text-base py-2 px-5 sm:px-6 rounded-full hover:bg-neutral-300 transition duration-200 flex items-center gap-2"
            aria-label="View Resume on GitHub"
          >
            My Resume <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
