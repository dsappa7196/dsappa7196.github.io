import { motion } from 'framer-motion';
import { CERTIFICATIONS, skills } from '../constants';

import {
  FaPython,
  FaDatabase,
  FaFileExcel,
  FaChartBar,
  FaRProject,
  FaCloud,
  FaProjectDiagram
} from 'react-icons/fa';

import { TbBrandDatabricks, TbFileTypeSql } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';


const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
});

const Technologies = () => {
  return (
    <section id="technologies" className="bg-transparent py-24 border-t border-neutral-800">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -150 }}
        transition={{ duration: 1.5 }}
        className="mb-16 text-center text-4xl font-semibold text-white"
      >
        Technologies & Certifications
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

      {/* Certifications */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-white">Certifications</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {CERTIFICATIONS.map((cert, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-purple-800 text-white px-4 py-2 text-sm font-medium"
            >
              {cert}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Core Skills */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-white">Core Skills</h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto px-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-neutral-800 text-purple-300 px-4 py-2 text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Technologies;
