import { useState, useEffect } from 'react';
import Hero from './Components/Hero';
import About from "./Components/About";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Technologies from "./Components/Technologies";
import Contact from "./Components/Contact";
import SectionNav from "./Components/SectionNav";
import SocialIcons from "./Components/SocialIcons"; // NEW import

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

      {/* Main navigation + section nav */}
      <SectionNav toggleTheme={toggleTheme} currentTheme={theme} />
      <SectionNav />

      {/* Social Icons BELOW SectionNav */}
      <SocialIcons />

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
