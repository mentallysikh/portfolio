import { useState } from "react";
import { Sun, Moon, Download, Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "certifications", label: "certs" },
  { id: "blog", label: "blog" },
  { id: "contact", label: "contact" },
];

export default function Navbar({ active, scrollY, theme, toggleTheme }) {
  const scrolled = scrollY > 60;
  const isDark = theme === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navBg = isDark
    ? scrolled ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60" : "bg-transparent"
    : scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200" : "bg-transparent";

  const textColor = isDark ? "text-zinc-400" : "text-zinc-600";
  const activeColor = isDark ? "text-cyan-400 border-cyan-400" : "text-cyan-600 border-cyan-600";
  const logoColor = isDark ? "border-cyan-400/60 text-cyan-400" : "border-cyan-600/60 text-cyan-600";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
          <div className={`w-7 h-7 border flex items-center justify-center text-xs font-bold group-hover:bg-cyan-400/10 transition-colors ${logoColor}`}>
            RA
          </div>
          <span className={`text-sm font-mono group-hover:text-cyan-400 transition-colors hidden sm:block ${textColor}`}>
            randeep.arora
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 ${
                active === l.id ? `border-b ${activeColor}` : `${textColor} hover:text-zinc-200`
              }`}
            >
              {active === l.id ? `> ${l.label}` : l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 border transition-all duration-200 ${
              isDark
                ? "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                : "border-zinc-300 text-zinc-500 hover:border-zinc-500 hover:text-zinc-800"
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="https://linkedin.com/in/randeep-arora-1b336a105"
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border transition-all duration-200 ${
              isDark
                ? "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                : "border-cyan-600/50 text-cyan-600 hover:bg-cyan-50"
            }`}
          >
            <Download size={11} />
            resume
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 ${textColor}`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-t px-6 py-4 space-y-1 ${isDark ? "bg-zinc-950/95 border-zinc-800" : "bg-white/95 border-zinc-200"}`}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-mono transition-colors ${
                active === l.id
                  ? isDark ? "text-cyan-400 bg-cyan-400/5" : "text-cyan-600 bg-cyan-50"
                  : textColor
              }`}
            >
              {active === l.id ? `> ${l.label}` : `  ${l.label}`}
            </button>
          ))}
          <div className="pt-2">
            <a
              href="https://linkedin.com/in/randeep-arora-1b336a105"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-3 py-2 text-sm font-mono border ${
                isDark ? "border-cyan-400/40 text-cyan-400" : "border-cyan-600/40 text-cyan-600"
              }`}
            >
              <Download size={13} />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
