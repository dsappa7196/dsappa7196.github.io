// src/Components/Technologies.jsx
import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS, skillsByGroup } from "../constants";

import {
  FaPython,
  FaDatabase,
  FaFileExcel,
  FaChartBar,
  FaRProject,
  FaCloud,
  FaProjectDiagram,
} from "react-icons/fa";
import { TbBrandDatabricks, TbFileTypeSql } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
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
    <section id="skills" className="bg-transparent py-24 border-t border-neutral-800">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -150 }}
        transition={{ duration: 1.5 }}
        className="mb-16 text-center text-4xl font-semibold text-white"
      >
        Technologies
      </motion.h2>

      {/* Icon-based Technologies */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -150 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {[
          { icon: <FaPython className="text-yellow-300 text-6xl" title="Python" />, duration: 2.5 },
          { icon: <TbFileTypeSql className="text-blue-500 text-6xl" title="SQL" />, duration: 3 },
          { icon: <DiMsqlServer className="text-blue-600 text-6xl" title="MS SQL Server" />, duration: 2.8 },
          { icon: <TbBrandDatabricks className="text-red-500 text-6xl" title="Databricks" />, duration: 3.2 },
          { icon: <FaCloud className="text-blue-400 text-6xl" title="Azure Cloud" />, duration: 3.5 },
          { icon: <FaChartBar className="text-yellow-400 text-6xl" title="Power BI" />, duration: 3 },
          { icon: <FaProjectDiagram className="text-orange-400 text-6xl" title="Tableau" />, duration: 3.2 },
          { icon: <FaRProject className="text-blue-800 text-6xl" title="R Language" />, duration: 2.9 },
          { icon: <FaFileExcel className="text-green-500 text-6xl" title="Excel" />, duration: 2.7 },
          { icon: <FaDatabase className="text-purple-400 text-6xl" title="Databases" />, duration: 2.6 },
        ].map((tech, idx) => (
          <motion.div
            key={idx}
            variants={iconVariants(tech.duration)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-700 p-4"
          >
            {tech.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications (safe rendering for strings OR {name, link} objects) */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-white">Certifications</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {certs.map((c, index) => {
            if (typeof c === "string") {
              return (
                <span
                  key={`${c}-${index}`}
                  className="inline-block rounded-full bg-purple-800 text-white px-4 py-2 text-sm font-medium"
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
                className="inline-block rounded-full bg-purple-800 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 underline decoration-transparent hover:decoration-inherit"
              >
                {label}
              </a>
            ) : (
              <span
                key={label}
                className="inline-block rounded-full bg-purple-800 text-white px-4 py-2 text-sm font-medium"
              >
                {label}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Core Skills (Grouped) */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-semibold mb-10 text-white">Core Skills</h3>
        <div className="space-y-10 max-w-5xl mx-auto px-4 text-sm sm:text-base text-neutral-300">
          {groups.map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">{category}</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(skills) ? skills : []).map((skill) => (
                  <span
                    key={skill}
                    className="bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Technologies;
