// src/Components/Technologies.jsx
import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS, skillsByGroup } from "../constants";

import {
  FaPython,
  FaDatabase,
  FaFileExcel,
  FaChartBar,
  FaCloud,
  FaProjectDiagram,
} from "react-icons/fa";
import { TbBrandDatabricks, TbFileTypeSql } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";

const iconVariants = (duration) => ({
  initial: { y: -6 },
  animate: {
    y: [6, -6],
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  const certs = Array.isArray(CERTIFICATIONS) ? CERTIFICATIONS : [];
  const groups = Object.entries(skillsByGroup || {});

  return (
    <section
      id="skills"
      className="bg-transparent py-16 border-t border-neutral-800" // 👈 reduced from py-20
    >
      {/* Title */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -60 }}
        transition={{ duration: 0.8 }}
        className="mb-4 text-center text-3xl sm:text-[34px] font-semibold text-white"
      >
        Skills & Tools
      </motion.h2>

      <p className="text-center text-neutral-400 max-w-2xl mx-auto mb-10 text-sm sm:text-[15px]">
        Tools and technologies I use to build reliable data pipelines, dashboards,
        and decision-support analytics.
      </p>

      {/* Icons */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {[
          { icon: <TbFileTypeSql className="text-blue-500 text-5xl" />, duration: 2.6 },
          { icon: <FaPython className="text-yellow-300 text-5xl" />, duration: 2.5 },
          { icon: <FaChartBar className="text-yellow-400 text-5xl" />, duration: 2.8 },
          { icon: <FaProjectDiagram className="text-orange-400 text-5xl" />, duration: 3 },
          { icon: <DiMsqlServer className="text-blue-600 text-5xl" />, duration: 2.7 },
          { icon: <TbBrandDatabricks className="text-red-500 text-5xl" />, duration: 2.9 },
          { icon: <FaCloud className="text-blue-400 text-5xl" />, duration: 3.1 },
          { icon: <FaFileExcel className="text-green-500 text-5xl" />, duration: 2.6 },
          { icon: <FaDatabase className="text-purple-400 text-5xl" />, duration: 2.5 },
        ].map((tech, idx) => (
          <motion.div
            key={idx}
            variants={iconVariants(tech.duration)}
            initial="initial"
            animate="animate"
            className="rounded-xl border border-neutral-700 p-3 hover:border-purple-500 transition-colors"
          >
            {tech.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Core Skills */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="mt-14 text-center" // 👈 reduced spacing
      >
        <h3 className="text-[18px] sm:text-[20px] font-semibold mb-5 text-white">
          Core Competencies
        </h3>

        <div className="space-y-7 max-w-4xl mx-auto px-4 text-sm sm:text-[15px] text-neutral-300">
          {groups.map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-purple-400 mb-2">
                {category}
              </h4>

              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(skills) ? skills : []).map((skill) => (
                  <span
                    key={skill}
                    className="bg-neutral-800 text-neutral-200 px-3 py-1 text-[13px] sm:text-[14px] rounded-full border border-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="mt-14 text-center"
      >
        <h3 className="text-[18px] sm:text-[20px] font-semibold mb-4 text-white">
          Certifications
        </h3>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
          {certs.map((c, index) => {
            if (typeof c === "string") {
              return (
                <span
                  key={`${c}-${index}`}
                  className="rounded-full bg-neutral-800 text-neutral-200 px-4 py-2 text-[13px] sm:text-[14px] border border-neutral-700 hover:border-purple-500 transition"
                >
                  {c}
                </span>
              );
            }

            const { name, link } = c || {};
            const label = name || link || `Certification ${index + 1}`;

            return link ? (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-neutral-800 text-neutral-200 px-4 py-2 text-[13px] sm:text-[14px] border border-neutral-700 hover:border-purple-500 hover:text-white transition"
              >
                {label}
              </a>
            ) : (
              <span
                key={label}
                className="rounded-full bg-neutral-800 text-neutral-200 px-4 py-2 text-[13px] sm:text-[14px] border border-neutral-700"
              >
                {label}
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Technologies;