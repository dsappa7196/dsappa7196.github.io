import { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import HubViewImage from "./assets/projects/HubView_Image.png";
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

  // 🔥 IF DIRECT URL → SHOW HUB
  if (window.location.pathname === '/analytics-hub') {
    return <AnalyticsHub onClose={() => window.location.href = '/'} />;
  }

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
      <div className="flex justify-center px-6 pb-10 -mt-2">
        <div className="w-full max-w-4xl bg-gradient-to-r from-purple-900/40 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 backdrop-blur-sm">
          <img src={HubViewImage} alt="Operations Analytics Hub" className="w-24 h-24 rounded-xl object-cover shadow-lg flex-shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">★ Featured Project</div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Operations Analytics Hub</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-3">End-to-end analytics system — MySQL star schema, Power BI semantic model, DAX measures, and 6 decision-support dashboards integrating operations, maintenance, asset, finance, and customer data across 12 sites.</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
              {["MySQL", "Power BI", "DAX", "SQL", "Star Schema"].map(t => (
                <span key={t} className="bg-neutral-800 text-purple-300 px-3 py-1 rounded text-xs font-medium">{t}</span>
              ))}
            </div>
            <a href="/analytics-hub" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
              Open Analytics Hub →
            </a>
          </div>
        </div>
      </div>

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