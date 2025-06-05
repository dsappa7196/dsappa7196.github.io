import { useState, useEffect } from 'react';
import Hero from "./components/Hero";
import Navbar from './components/Navbar';
import About from "./components/About";
import Timeline from "./components/Timeline"; 
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";
import Contact from "./components/Contact";
import SectionNav from "./components/SectionNav";

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      {/* Radial background layer */}
      <div className="fixed top-0 -z-10 min-h-screen w-full">
        <div className="absolute inset-0 z-[-2] h-[300vh] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      {/* Navigation section */}
      <SectionNav />

      {/* Main content layout */}
      <div className="container mx-auto px-4 sm:px-8">
        <Navbar />
        <main>
          <Hero />
          <About />
          <section id="skills">
            <Technologies />
          </section>
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
