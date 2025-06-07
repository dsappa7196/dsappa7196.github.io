import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mt-4 mb-6 flex justify-center animate-fade-in">
      <div className="flex gap-6 text-xl sm:text-2xl text-white">
        <a
          href="https://www.linkedin.com/in/padmasree-sappa"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/dsappa7196"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
