import React from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const items = Array.isArray(PROJECTS) ? PROJECTS : [];

  return (
    <div id="projects" className="bg-transparent py-20">
      <div className="container mx-auto px-6 sm:px-8">

        {/* Heading */}
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center text-2xl sm:text-4xl font-semibold text-white"
        >
          Projects & Analytics Work
        </motion.h1>

        {items.map((project, index) => {
          const title = project?.title ?? `Project ${index + 1}`;
          const imgSrc = project?.image || "";
          const desc = project?.description || "";
          const tech = Array.isArray(project?.technologies) ? project.technologies : [];
          const gh = typeof project?.github === "string" ? project.github : "";

          return (
            <div key={title} className="mb-14 flex flex-wrap lg:justify-center">

              {/* Image */}
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.7 }}
                className="w-full lg:w-1/4 flex justify-center lg:justify-start mb-4 lg:mb-0"
              >
                {imgSrc && (
                  <a
                    href={gh || "#"}
                    target={gh ? "_blank" : undefined}
                    rel={gh ? "noopener noreferrer" : undefined}
                  >
                    <img
                      className="w-44 h-44 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                      src={imgSrc}
                      alt={title}
                    />
                  </a>
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.7 }}
                className="w-full lg:w-3/4 max-w-xl"
              >
                <h6 className="mb-2 text-base sm:text-xl font-semibold text-white">
                  {title}
                </h6>

                {desc && (
                  <p className="mb-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {desc}
                  </p>
                )}

                {/* Tech */}
                {tech.length > 0 && (
                  <div className="mb-3">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="mr-2 mb-2 inline-block rounded bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* GitHub */}
                {gh && (
                  <a
                    href={gh}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center gap-1 text-sm sm:text-base"
                  >
                    View Project <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </motion.div>
            </div>
          );
        })}

        {/* Footer CTA */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/dsappa7196"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center gap-1 text-sm sm:text-lg font-medium"
          >
            Explore More Work <FaExternalLinkAlt className="text-sm" />
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;