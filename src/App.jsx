import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";
import Contact from "./components/Contact";
import SectionNav from "./components/SectionNav";

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="overflow-x-hidden font-sans text-neutral-700 dark:text-neutral-200 antialiased selection:bg-cyan-300 selection:text-cyan-900 dark:selection:bg-cyan-600 dark:selection:text-neutral-50">
      {/* Radial background layer */}
      <div className="fixed top-0 -z-10 min-h-screen w-full">
        <div className="absolute inset-0 z-[-2] h-[300vh] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <SectionNav />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Technologies />
      </section>


      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default App;
