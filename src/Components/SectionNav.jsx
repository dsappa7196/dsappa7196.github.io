import React from 'react';

const sections = ['About', 'Experience', 'Projects', 'Contact'];

const SectionNav = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-4 py-2 rounded-full shadow-lg max-w-full overflow-x-auto flex flex-nowrap gap-4 sm:gap-6 items-center">

      {sections.map((section) => (
        <a
          key={section}
          href={`#${section.toLowerCase()}`}
          className="whitespace-nowrap text-neutral-300 text-sm sm:text-base px-3 py-1 rounded-full hover:text-white hover:bg-neutral-800 transition-all duration-200"
        >
          {section}
        </a>
      ))}

    </nav>
  );
};

export default SectionNav;