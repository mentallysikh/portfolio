import { useState, useEffect } from "react";
import { Sun, Moon, Download, Menu, X, FileText } from "lucide-react";

const links = [
  { id: "home",           label: "home" },
  { id: "about",          label: "about" },
  { id: "skills",         label: "skills" },
  { id: "experience",     label: "experience" },
  { id: "projects",       label: "projects" },
  { id: "certifications", label: "certs" },
  
  { id: "contact",        label: "contact" },
];

export default function Navbar({ active, scrollY, theme, toggleTheme, onBlogOpen }) {
  const scrolled = scrollY > 60;
  const isDark = theme === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // Resume download handler — reads from /public/resume.pdf
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Randeep_Arora_Resume.pdf";
    // Test if file exists
    fetch("/resume.pdf", { method: "HEAD" })
      .then((r) => {
        if (r.ok) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Fallback to LinkedIn if PDF not uploaded yet
          window.open("https://linkedin.com/in/randeep-arora-1b336a105", "_blank");
          alert("Resume PDF not found. Redirecting to LinkedIn.\n\nTo enable: upload your resume as 'resume.pdf' to the /public folder.");
        }
      })
      .catch(() => {
        window.open("https://linkedin.com/in/randeep-arora-1b336a105", "_blank");
      });
  };

  const navBg = scrolled
    ? isDark
      ? "backdrop-blur-xl bg-[rgba(2,4,9,0.85)] border-b border-[rgba(0,245,255,0.08)] shadow-lg shadow-black/20"
      : "backdrop-blur-xl bg-[rgba(240,244,248,0.9)] border-b border-[rgba(0,119,182,0.15)] shadow-sm"
    : "bg-transparent";

  const textMuted  = isDark ? "text-[#8ba9c0]" : "text-[#2d5074]";
  const textActive = isDark ? "text-[#00f5ff]" : "text-[#0077b6]";
  const textHover  = isDark ? "hover:text-[#e8f4fd]" : "hover:text-[#0f2040]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 flex items-center justify-center text-xs font-bold font-mono transition-all duration-300"
            style={{
              border: "1px solid rgba(0,245,255,0.4)",
              color: isDark ? "#00f5ff" : "#0077b6",
              background: isDark ? "rgba(0,245,255,0.06)" : "rgba(0,119,182,0.06)",
              boxShadow: isDark ? "0 0 12px rgba(0,245,255,0.15), inset 0 0 12px rgba(0,245,255,0.05)" : "none",
            }}
          >
            RA
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className={`text-xs font-bold ${isDark ? "text-[#e8f4fd]" : "text-[#0f2040]"}`}>randeep arora</span>
            <span className={`text-[10px] mono ${isDark ? "text-[#4a6580]" : "text-[#5a7a99]"}`}>devops trainee</span>
          </div>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`px-3 py-1.5 text-[11px] font-medium mono transition-all duration-200 relative ${
                active === l.id
                  ? textActive
                  : `${textMuted} ${textHover}`
              }`}
            >
              {active === l.id && (
                <span
                  className="absolute inset-x-2 bottom-0 h-px rounded-full"
                  style={{ background: isDark ? "#00f5ff" : "#0077b6", boxShadow: isDark ? "0 0 6px #00f5ff" : "none" }}
                />
              )}
              {active === l.id ? `> ${l.label}` : l.label}
            </button>
          ))}
          {/* Blog opens as drawer */}
          <button
            onClick={onBlogOpen}
            className={`px-3 py-1.5 text-[11px] font-medium mono transition-all duration-200 ${textMuted} ${textHover}`}
          >
            blog
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 transition-all duration-200 border ${
              isDark
                ? "border-[rgba(0,245,255,0.15)] text-[#8ba9c0] hover:border-[rgba(0,245,255,0.4)] hover:text-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.2)]"
                : "border-[rgba(0,119,182,0.2)] text-[#2d5074] hover:border-[rgba(0,119,182,0.5)] hover:text-[#0077b6]"
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Resume download */}
          <button
            onClick={handleResumeDownload}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 text-[11px] mono font-medium border transition-all duration-200 ${
              isDark
                ? "border-[rgba(0,245,255,0.3)] text-[#00f5ff] hover:bg-[rgba(0,245,255,0.08)] hover:shadow-[0_0_16px_rgba(0,245,255,0.15)]"
                : "border-[rgba(0,119,182,0.3)] text-[#0077b6] hover:bg-[rgba(0,119,182,0.06)]"
            }`}
          >
            <Download size={11} />
            resume.pdf
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2 ${textMuted}`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t px-6 py-4 space-y-1 ${
            isDark ? "bg-[rgba(2,4,9,0.97)] border-[rgba(0,245,255,0.08)]" : "bg-[rgba(240,244,248,0.97)] border-gray-200"
          }`}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`block w-full text-left px-3 py-2.5 text-sm mono transition-colors rounded-sm ${
                active === l.id
                  ? isDark ? "text-[#00f5ff] bg-[rgba(0,245,255,0.05)]" : "text-[#0077b6] bg-[rgba(0,119,182,0.05)]"
                  : `${textMuted} ${textHover}`
              }`}
            >
              {active === l.id ? `> ${l.label}` : `  ${l.label}`}
            </button>
          ))}
          <button
            onClick={() => { onBlogOpen(); setMobileOpen(false); }}
            className={`block w-full text-left px-3 py-2.5 text-sm mono transition-colors rounded-sm ${textMuted} ${textHover}`}
          >
            {"  "}blog
          </button>
          <div className="pt-3 border-t mt-2" style={{ borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.12)" }}>
            <button
              onClick={handleResumeDownload}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm mono w-full border transition-all ${
                isDark
                  ? "border-[rgba(0,245,255,0.3)] text-[#00f5ff]"
                  : "border-[rgba(0,119,182,0.3)] text-[#0077b6]"
              }`}
            >
              <FileText size={14} />
              Download Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
