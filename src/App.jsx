import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticleField from "./components/ParticleField";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import AIChatbot from "./components/AIChatbot";
import "./index.css";

import { MessageCircle, X } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  const isDark = theme === "dark";

  // Page enter animation
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem("ra-theme") || "dark";
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("ra-theme", next);
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["home", "about", "skills", "experience", "projects", "certifications", "blog", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgClass = isDark
    ? "bg-zinc-950 text-zinc-100"
    : "bg-slate-100 text-zinc-900";

  return (
    <div className={`${bgClass} ${isDark ? "dark" : "light"} min-h-screen font-mono overflow-x-hidden transition-colors duration-500`}>
      {/* Custom cursor */}
      <CustomCursor theme={theme} />

      {/* Scroll progress */}
      <ScrollProgress theme={theme} />

      {/* Particle field */}
      <ParticleField theme={theme} />

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-30" />

      {/* Glow orbs */}
      {isDark && (
        <>
          <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-500/6 blur-[100px] pointer-events-none z-0" />
        </>
      )}

      <Navbar active={activeSection} scrollY={scrollY} theme={theme} toggleTheme={toggleTheme} />

      <main className={`relative z-10 ${entered ? "page-enter" : "opacity-0"}`}>
        <Hero theme={theme} />
        <About theme={theme} />
        <Skills theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Certifications theme={theme} />
        <Blog theme={theme} />
        <Contact theme={theme} />
      </main>

      <Footer theme={theme} />

      {/* AI Chat button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className={`fixed bottom-6 right-6 z-[199] flex items-center gap-2 px-4 py-3 font-mono text-sm font-bold transition-all duration-200 chat-pulse ${
            isDark
              ? "bg-cyan-400 text-zinc-950 hover:bg-cyan-300"
              : "bg-cyan-600 text-white hover:bg-cyan-700"
          }`}
        >
          <MessageCircle size={16} />
          Ask AI
        </button>
      )}

      {/* AI Chatbot */}
      {chatOpen && <AIChatbot theme={theme} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
