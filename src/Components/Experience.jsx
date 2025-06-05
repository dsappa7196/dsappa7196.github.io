import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { EXPERIENCES } from '../constants';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="bg-transparent py-24 text-center">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="text-4xl font-semibold text-white mb-16"
      >
        Experience & Work History
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-14 px-6">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-left border-b border-neutral-700 pb-8"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-1">
              {exp.role}{' '}
              <span className="text-white font-medium">@ {exp.company}</span>
            </h2>
            <p className="text-sm text-purple-500 mb-4">{exp.year}</p>
            <p className="text-neutral-300 mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {exp.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {exp.details && (
              <div>
                <button
                  onClick={() => toggleDetails(idx)}
                  className="text-purple-400 hover:underline text-sm flex items-center gap-2"
                >
                  {expandedIndex === idx ? 'Hide Details' : 'View More Details'}
                  {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedIndex === idx && (
                  <ul className="mt-4 list-disc list-inside space-y-2 text-neutral-400 bg-neutral-900/30 p-4 rounded-md">
                    {exp.details.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
