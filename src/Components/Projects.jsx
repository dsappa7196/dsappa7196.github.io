import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Import project images
import Project1 from '../assets/projects/project-1.jpg';
import Project2 from '../assets/projects/project-2.jpg';
import Project3 from '../assets/projects/project-3.png';
import Project4 from '../assets/projects/project-4.jpg';
import Project5 from '../assets/projects/project-5.png';

// Map image file names to actual imports
const projectImages = {
  "project-1.jpg": Project1,
  "project-2.jpg": Project2,
  "project-3.png": Project3,
  "project-4.jpg": Project4,
  "project-5.png": Project5,
};

const Projects = () => {
  return (
    <div id="projects" className="bg-transparent py-24">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="mb-20 text-center text-2xl sm:text-4xl font-semibold text-white"
        >
          Projects
        </motion.h1>

        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-16 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4 flex justify-center lg:justify-start mb-4 lg:mb-0"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <img
                  className="w-48 h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                  src={projectImages[project.image]}
                  alt={project.title}
                />
              </a>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-3/4 max-w-xl"
            >
              <h6 className="mb-3 text-base sm:text-xl font-semibold text-white">
                {project.title}
              </h6>
              <p className="mb-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-3">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="mr-2 mb-2 inline-block rounded bg-neutral-800 text-purple-300 px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center gap-1 text-sm sm:text-base"
              >
                View on GitHub <FaExternalLinkAlt className="text-xs" />
              </a>
            </motion.div>
          </div>
        ))}

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/dsappa7196"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center gap-1 text-sm sm:text-lg font-medium"
          >
            View More Projects <FaExternalLinkAlt className="text-sm" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
