import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-end py-6 px-4 animate-fade-in">
      <div className="flex items-center justify-center gap-4 text-2xl text-white">
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
