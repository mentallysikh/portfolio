import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import About           from "./components/About";
import Skills          from "./components/Skills";
import Experience      from "./components/Experience";
import Projects        from "./components/Projects";
import Certifications  from "./components/Certifications";
import Blog            from "./components/Blog";
import Contact         from "./components/Contact";
import Footer          from "./components/Footer";
import ParticleField   from "./components/ParticleField";
import CustomCursor    from "./components/CustomCursor";
import ScrollProgress  from "./components/ScrollProgress";
import AIChatbot       from "./components/AIChatbot";
import "./index.css";
import { MessageCircle } from "lucide-react";

export default function App() {
  const [theme,         setTheme]         = useState("dark");
  const [scrollY,       setScrollY]       = useState(0);
  const [chatOpen,      setChatOpen]      = useState(false);
  const [entered,       setEntered]       = useState(false);
  
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState(new Set([location.pathname]));

  const isDark = theme === "dark";

  useEffect(() => { const t = setTimeout(() => setEntered(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { const saved = localStorage.getItem("ra-theme") || "dark"; setTheme(saved); }, []);
  useEffect(() => { document.documentElement.classList.toggle("light-mode", theme === "light"); }, [theme]);
  
  useEffect(() => {
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(location.pathname);
      return newSet;
    });
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("ra-theme", next);
  };

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Map pathname to active nav item
  const activePathMap = {
    "/": "home",
    "/skills": "skills",
    "/experience": "experience",
    "/projects": "projects",
    "/certifications": "certifications",
    "/contact": "contact",
    "/blog": "blog"
  };
  const activeSection = activePathMap[location.pathname] || "home";

  return (
    <div className="min-h-screen overflow-x-hidden noise-bg transition-colors duration-500 flex flex-col"
      style={{ background: "var(--bg-0)", color: "var(--text-1)" }}>

      <CustomCursor theme={theme} />
      <ScrollProgress visitedCount={visitedPages.size} totalPages={7} />
      <ParticleField theme={theme} />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="orb orb-1 z-0" />
      <div className="orb orb-2 z-0" />
      <div className="orb orb-3 z-0" />

      <Navbar
        active={activeSection} scrollY={scrollY}
        theme={theme} toggleTheme={toggleTheme}
      />

      <main className={`relative z-10 flex-grow pt-10 ${entered ? "page-enter" : "opacity-0"}`}>
        <Routes>
          <Route path="/" element={<><Hero theme={theme} /><About theme={theme} /></>} />
          <Route path="/skills" element={<Skills theme={theme} />} />
          <Route path="/experience" element={<Experience theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/certifications" element={<Certifications theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/blog" element={<Blog theme={theme} />} />
        </Routes>
      </main>

      <Footer theme={theme} />

      {/* AI chat */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-[199] flex items-center gap-2 px-4 py-3 text-sm font-bold mono transition-all duration-200 chat-pulse"
          style={{ background: "var(--cyan)", color: "var(--bg-0)", border: "1px solid var(--cyan)", boxShadow: "0 0 20px rgba(0,245,255,0.25)" }}
        >
          <MessageCircle size={15} /> Ask AI
        </button>
      )}
      {chatOpen && <AIChatbot theme={theme} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
