import { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import HubView_Image from "./assets/projects/HubView_Image.png";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Technologies from "./Components/Technologies";
import Contact from "./Components/Contact";
import SectionNav from "./Components/SectionNav";
import SocialIcons from "./Components/SocialIcons";
import AnalyticsHub from "./pages/AnalyticsHub";

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  // 🔹 NEW STATE (important)
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 🔹 OPEN HUB
  const openHub = () => {
    setShowHub(true);
    window.scrollTo(0, 0);
  };

  // 🔹 CLOSE HUB
  const closeHub = () => {
    setShowHub(false);
  };

  // 🔥 IF HUB IS OPEN → SHOW ONLY HUB
  if (showHub) {
    return <AnalyticsHub onClose={closeHub} />;
  }

  return (
    <div className="overflow-x-hidden font-sans text-neutral-700 dark:text-neutral-200 antialiased selection:bg-cyan-300 selection:text-cyan-900 dark:selection:bg-cyan-600 dark:selection:text-neutral-50">

      {/* Background */}
      <div className="fixed top-0 -z-10 min-h-screen w-full">
        <div className="absolute inset-0 z-[-2] h-[300vh] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      {/* Navigation */}
      <SectionNav toggleTheme={toggleTheme} currentTheme={theme} />

      {/* Hero */}
      <div id="hero" className="flex flex-col items-center">
        <SocialIcons />
        <Hero />
      </div>

      {/* Featured: Operations Analytics Hub */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-cyan-500/30 bg-neutral-900/60 backdrop-blur-sm overflow-hidden shadow-lg shadow-cyan-900/20">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src={HubView_Image}
                alt="Operations Analytics Hub preview"
                className="rounded-xl w-full object-cover border border-neutral-700"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Featured Project</span>
              <h2 className="text-2xl font-bold text-neutral-100">Operations Analytics Hub</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                End-to-end analytics system built from scratch — MySQL star schema, Power BI semantic model with DAX
                measures, and a SharePoint-style access hub with 6 decision-support dashboards. Integrates operations,
                maintenance, asset, finance, and customer data across 12 sites.
              </p>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "Power BI", "DAX", "SQL", "HTML/JS", "Chart.js", "Star Schema"].map((tech) => (
                  <span key={tech} className="rounded-full border border-cyan-700/50 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300">
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={openHub}
                className="mt-2 self-start rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                Open Analytics Hub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <About />
      <Technologies />
      <Experience />

      {/* 🔥 PASS openHub FUNCTION */}
      <Projects openHub={openHub} />

      <Contact />
    </div>
  );
};

export default App;