import { useState, useEffect } from "react";
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

const SECTIONS = ["home","about","skills","experience","projects","certifications","contact"];

export default function App() {
  const [theme,         setTheme]         = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY,       setScrollY]       = useState(0);
  const [chatOpen,      setChatOpen]      = useState(false);
  const [blogOpen,      setBlogOpen]      = useState(false);
  const [entered,       setEntered]       = useState(false);
  const isDark = theme === "dark";

  useEffect(() => { const t = setTimeout(() => setEntered(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { const saved = localStorage.getItem("ra-theme") || "dark"; setTheme(saved); }, []);
  useEffect(() => { document.documentElement.classList.toggle("light-mode", theme === "light"); }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("ra-theme", next);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 130 && rect.bottom >= 130) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden noise-bg transition-colors duration-500"
      style={{ background: "var(--bg-0)", color: "var(--text-1)" }}>

      <CustomCursor theme={theme} />
      <ScrollProgress />
      <ParticleField theme={theme} />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="orb orb-1 z-0" />
      <div className="orb orb-2 z-0" />
      <div className="orb orb-3 z-0" />

      <Navbar
        active={activeSection} scrollY={scrollY}
        theme={theme} toggleTheme={toggleTheme}
        onBlogOpen={() => setBlogOpen(true)}
      />

      <main className={`relative z-10 ${entered ? "page-enter" : "opacity-0"}`}>
        <Hero         theme={theme} />
        <About        theme={theme} />
        <Skills       theme={theme} />
        <Experience   theme={theme} />
        <Projects     theme={theme} />
        <Certifications theme={theme} />
        <Contact      theme={theme} />
      </main>

      <Footer theme={theme} />

      {/* Blog drawer */}
      <Blog theme={theme} open={blogOpen} onClose={() => setBlogOpen(false)} />

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
