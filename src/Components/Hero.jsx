// src/Components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import profilePic from "../assets/about.jpg";

const Hero = ({ scrollToContact }) => {
  return (
    <div className="bg-transparent pt-24 pb-10">
      <div className="container mx-auto flex flex-col items-center px-6 text-center">

        {/* Profile Image */}
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src={profilePic}
          alt="Padmasree Sappa"
          className="rounded-2xl w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-lg mb-6"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold text-white mb-3"
        >
          Padmasree Sappa
        </motion.h1>

        {/* Role Line */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg sm:text-xl font-semibold mb-5 tracking-wide bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Business Intelligence Engineer | Analytics Leader | Ex-Amazon | MSBA @ SFSU
        </motion.span>

        {/* Description (UPDATED — single paragraph, MS completed) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-neutral-300 leading-relaxed px-3 text-[15px] sm:text-base"
        >
          I help organizations turn complex data into{" "}
          <span className="text-white font-medium">
            actionable business decisions
          </span>
          . With{" "}
          <span className="text-white font-medium">6.5+ years</span> of experience across Amazon and enterprise analytics, I design scalable dashboards, automate reporting pipelines, and build trusted data models using{" "}
          <span className="text-white font-medium">
            SQL, Python, Power BI, Tableau
          </span>
          , and cloud platforms. I completed my MS in Business Analytics and bridge analytics, operations, and strategy to deliver measurable impact.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <button
            onClick={scrollToContact}
            className="border-2 border-neutral-200 text-neutral-200 py-2 px-6 rounded-full hover:bg-neutral-200 hover:text-neutral-900 transition flex items-center gap-2"
          >
            Let’s Connect <FaArrowRight />
          </button>

          <a
            href="https://github.com/dsappa7196/Padmasree_Resume/blob/main/PadmasreeSappa_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-200 text-neutral-900 py-2 px-6 rounded-full hover:bg-neutral-300 transition flex items-center gap-2"
          >
            View Resume <FaArrowRight />
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;