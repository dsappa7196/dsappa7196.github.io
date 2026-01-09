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
    <section
      id="skills"
      className="bg-transparent py-24 border-t border-neutral-800"
    >
      {/* Section Title */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -150 }}
        transition={{ duration: 1.2 }}
        className="mb-6 text-center text-4xl font-semibold text-white"
      >
        Technologies & Core Skills
      </motion.h2>

      <p className="text-center text-neutral-400 max-w-3xl mx-auto mb-16">
        A modern Business Intelligence and Analytics stack focused on scalable
        data pipelines, reliable reporting, and decision-ready insights.
      </p>

      {/* Icon-based Technologies */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -150 }}
        transition={{ duration: 1.2 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {[
          {
            icon: (
              <TbFileTypeSql
                className="text-blue-500 text-6xl"
                title="SQL"
              />
            ),
            duration: 2.8,
          },
          {
            icon: (
              <FaPython
                className="text-yellow-300 text-6xl"
                title="Python"
              />
            ),
            duration: 2.6,
          },
          {
            icon: (
              <FaChartBar
                className="text-yellow-400 text-6xl"
                title="Power BI"
              />
            ),
            duration: 3,
          },
          {
            icon: (
              <FaProjectDiagram
                className="text-orange-400 text-6xl"
                title="Tableau"
              />
            ),
            duration: 3.2,
          },
          {
            icon: (
              <DiMsqlServer
                className="text-blue-600 text-6xl"
                title="MS SQL Server"
              />
            ),
            duration: 2.9,
          },
          {
            icon: (
              <TbBrandDatabricks
                className="text-red-500 text-6xl"
                title="Databricks"
              />
            ),
            duration: 3.1,
          },
          {
            icon: (
              <FaCloud
                className="text-blue-400 text-6xl"
                title="Cloud Platforms"
              />
            ),
            duration: 3.4,
          },
          {
            icon: (
              <FaFileExcel
                className="text-green-500 text-6xl"
                title="Excel / VBA"
              />
            ),
            duration: 2.7,
          },
          {
            icon: (
              <FaDatabase
                className="text-purple-400 text-6xl"
                title="Data Modeling & Warehousing"
              />
            ),
            duration: 2.6,
          },
        ].map((tech, idx) => (
          <motion.div
            key={idx}
            variants={iconVariants(tech.duration)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-700 p-4 hover:border-purple-600 transition-colors"
          >
            {tech.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-white">
          Certifications
        </h3>

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
                className="inline-block rounded-full bg-purple-800 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 underline decoration-transparent hover:decoration-inherit transition"
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
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-semibold mb-10 text-white">
          Core Competencies
        </h3>

        <div className="space-y-10 max-w-5xl mx-auto px-4 text-sm sm:text-base text-neutral-300">
          {groups.map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">
                {category}
              </h4>

              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(skills) ? skills : []).map((skill) => (
                  <span
                    key={skill}
                    className="bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium rounded-full hover:bg-neutral-700 transition"
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
