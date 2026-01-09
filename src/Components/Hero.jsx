import React from "react";
import profilePic from "../assets/about.jpg";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

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
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-transparent pt-40 pb-12">
      <div className="container mx-auto flex flex-col items-center px-8 text-center">
        {/* Profile Image */}
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src={profilePic}
          alt="Padmasree Sappa"
          className="rounded-full w-28 h-36 sm:w-56 sm:h-72 lg:w-64 lg:h-80 object-cover shadow-lg mb-7"
        />

        {/* Name */}
        <motion.h1
          variants={container(0.4)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold text-neutral-200 mb-3"
        >
          Padmasree Sappa
        </motion.h1>

        {/* Role Tags */}
        <motion.span
          variants={container(0.8)}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl font-semibold mb-6 tracking-wide bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Business Intelligence Engineer | Analytics Leader | Ex‑Amazon | MSBA @
          SFSU
        </motion.span>

        {/* Value Proposition */}
        <motion.p
          variants={container(1.2)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl font-light text-neutral-400 leading-[1.9rem] px-4 text-lg sm:text-xl"
        >
          I help organizations turn complex data into{" "}
          <span className="font-medium text-neutral-100">
            actionable business decisions
          </span>
          . With{" "}
          <span className="font-medium text-neutral-100">6.5+ years</span> of
          experience across Amazon and enterprise analytics, I design scalable
          dashboards, automate reporting pipelines, and build trusted data
          models using{" "}
          <span className="font-medium text-neutral-100">SQL</span>,{" "}
          <span className="font-medium text-neutral-100">Python</span>,{" "}
          <span className="font-medium text-neutral-100">Power BI</span>,{" "}
          <span className="font-medium text-neutral-100">Tableau</span>, and cloud
          platforms. Currently completing my MS in Business Analytics, I bridge
          analytics, operations, and strategy to deliver measurable impact.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={container(1.6)}
          initial="hidden"
          animate="visible"
          className="mt-10 mb-20 flex gap-4 flex-wrap justify-center"
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="border-2 border-neutral-200 text-neutral-200 py-2 px-7 rounded-full hover:bg-neutral-200 hover:text-neutral-900 transition duration-200 flex items-center gap-2"
            aria-label="Scroll to contact section"
          >
            Let’s Connect <FaArrowRight />
          </button>

          <a
            href="https://github.com/dsappa7196/Padmasree_Resume/blob/main/PadmasreeSappa_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-200 text-neutral-900 py-2 px-7 rounded-full hover:bg-neutral-300 transition duration-200 flex items-center gap-2"
            aria-label="View Resume"
          >
            View Resume <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
