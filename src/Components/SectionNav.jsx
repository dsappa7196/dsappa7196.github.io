import React from 'react';

const sections = ['About', 'Skills', 'Experience', 'Projects'];

const SectionNav = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-neutral-400 px-6 py-3 rounded-full shadow-md flex gap-6 items-center">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section.toLowerCase()}`}
          className="text-white text-lg px-3 py-1 rounded-xl border border-transparent hover:border-white transition-all duration-300"
        >
          {section}
        </a>
      ))}
    </nav>
  );
};

export default SectionNav;
