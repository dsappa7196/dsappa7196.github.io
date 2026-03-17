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
    <section id="experience" className="bg-transparent py-20 text-center">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-4xl font-semibold text-white mb-12"
      >
        Experience & Impact
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-12 px-6">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.7 }}
            className="text-left border-b border-neutral-700 pb-6"
          >
            {/* Role + Company */}
            <h2 className="text-lg sm:text-2xl font-bold text-purple-400 mb-1">
              {exp.role}{' '}
              <span className="text-white font-medium">@ {exp.company}</span>
            </h2>

            {/* Year */}
            <p className="text-xs sm:text-sm text-purple-500 mb-3">
              {exp.year}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 mb-3 leading-relaxed">
              {exp.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-3">
              {exp.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Expandable Details */}
            {exp.details && (
              <div>
                <button
                  onClick={() => toggleDetails(idx)}
                  className="text-xs sm:text-sm text-purple-400 hover:underline flex items-center gap-2"
                >
                  {expandedIndex === idx ? 'Show Less' : 'View Key Contributions'}
                  {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedIndex === idx && (
                  <ul className="mt-4 list-disc list-inside space-y-2 text-neutral-400 bg-neutral-900/30 p-4 rounded-md text-sm sm:text-base leading-relaxed">
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