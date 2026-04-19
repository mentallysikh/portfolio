import { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Github, Linkedin, Cloud, Server, GitBranch, Cpu, Globe, Download, Copy, Check, Terminal } from "lucide-react";

const roles = [
  "DevOps Trainee @ CloudKeeper",
  "Cloud Infrastructure Builder",
  "Docker & Kubernetes Explorer",
  "CI/CD Pipeline Engineer",
  "AWS & GCP Practitioner",
  "Linux Power User 🐧",
  "German Learner 🇩🇪",
];

const techBadges = [
  { icon: Cloud,     label: "AWS + GCP",  color: "#00f5ff" },
  { icon: Server,    label: "Docker",     color: "#00ff88" },
  { icon: GitBranch, label: "CI/CD",      color: "#b97cff" },
  { icon: Terminal,  label: "Linux",      color: "#ff6b35" },
  { icon: Cpu,       label: "Kubernetes", color: "#00f5ff" },
  { icon: Globe,     label: "German 🇩🇪", color: "#00ff88" },
];

const TERM_LINES = [
  { delay: 300,  text: "$ whoami",                      color: "#00f5ff" },
  { delay: 900,  text: "randeep-arora",                 color: "#e8f4fd" },
  { delay: 1400, text: "$ cat current_role.txt",        color: "#00f5ff" },
  { delay: 2000, text: "DevOps Trainee @ CloudKeeper",  color: "#00ff88" },
  { delay: 2500, text: "$ echo $STATUS",                color: "#00f5ff" },
  { delay: 3100, text: "open_to_opportunities=true ✓",  color: "#b97cff" },
];

export default function Hero({ theme }) {
  const [roleIdx,     setRoleIdx]   = useState(0);
  const [displayed,   setDisplayed] = useState("");
  const [isDeleting,  setIsDeleting]= useState(false);
  const [termLines,   setTermLines] = useState([]);
  const [copied,      setCopied]    = useState(false);
  const isDark = theme === "dark";

  // Typewriter
  useEffect(() => {
  const current = roles[roleIdx];
  let t;

  if (!isDeleting && displayed.length < current.length) {
    t = setTimeout(() => {
      setDisplayed(current.slice(0, displayed.length + 1));
    }, 55);
  } 
  else if (!isDeleting && displayed.length === current.length) {
    t = setTimeout(() => {
      setIsDeleting(true);
    }, 2000);
  } 
  else if (isDeleting && displayed.length > 0) {
    t = setTimeout(() => {
      setDisplayed(displayed.slice(0, -1));
    }, 28);
  } 
  else {
    // ✅ FIX: wrap in timeout (no synchronous setState)
    t = setTimeout(() => {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 200);
  }

  return () => clearTimeout(t);
}, [displayed, isDeleting, roleIdx]);

  // Terminal reveal — run ONCE only (StrictMode safe)
useEffect(() => {
  let isMounted = true;

  // reset first (important)
  setTermLines([]);

  const timers = TERM_LINES.map(({ delay, text, color }) =>
    setTimeout(() => {
      if (isMounted) {
        setTermLines((prev) => [...prev, { text, color }]);
      }
    }, delay)
  );

  return () => {
    isMounted = false;
    timers.forEach(clearTimeout);
  };
}, []);

  const handleResumeDownload = () => {
    fetch("/resume.pdf", { method: "HEAD" }).then((r) => {
      if (r.ok) {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Randeep_Arora_Resume.pdf";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      } else {
        window.open("https://linkedin.com/in/randeep-arora-1b336a105", "_blank");
      }
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("singhrandeep623@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card = isDark
    ? "bg-[rgba(7,13,26,0.7)] border border-[rgba(0,245,255,0.1)] backdrop-blur-md"
    : "bg-[rgba(255,255,255,0.8)] border border-[rgba(0,119,182,0.15)] backdrop-blur-md";

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-28 pb-16 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

        {/* LEFT */}
        <div>
          <div className="sec-label mb-5 fade-up" style={{ animationDelay: "0.05s" }}>// hello, world — I'm</div>

          <div className="mb-5 fade-up" style={{ animationDelay: "0.1s", letterSpacing: "-0.02em" }}>
            <div className="glitch text-6xl sm:text-8xl xl:text-9xl font-black leading-none" data-text="Randeep" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>
              Randeep
            </div>
            <div className="text-6xl sm:text-8xl xl:text-9xl font-black leading-none" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>
              Arora
            </div>
          </div>

          <div className="h-8 mb-6 fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-lg sm:text-xl font-medium mono" style={{ color: isDark ? "#00f5ff" : "#0077b6" }}>
              {displayed}
              <span className="inline-block w-0.5 h-5 ml-0.5 align-middle blink" style={{ background: isDark ? "#00f5ff" : "#0077b6" }} />
            </span>
          </div>

          <p className="max-w-lg text-sm leading-relaxed mb-8 fade-up" style={{ animationDelay: "0.3s", color: isDark ? "#8ba9c0" : "#2d5074" }}>
            MCA graduate turning cloud theory into hands-on practice at{" "}
            <span style={{ color: isDark ? "#00ff88" : "#2d6a4f" }} className="font-semibold">CloudKeeper</span>.
            Working with <span style={{ color: isDark ? "#00f5ff" : "#0077b6" }} className="font-semibold">AWS & GCP</span>,
            Docker, CI/CD, and Linux daily. Also learning{" "}
            <span style={{ color: isDark ? "#b97cff" : "#6a0dad" }} className="font-semibold">German 🇩🇪</span> on the side.
          </p>

          <div className="flex flex-wrap gap-4 mb-8 fade-up" style={{ animationDelay: "0.38s" }}>
            <span className="flex items-center gap-1.5 text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
              <MapPin size={11} style={{ color: isDark ? "#00f5ff" : "#0077b6" }} />
              Dwarka, New Delhi
            </span>
            <button onClick={handleCopyEmail} className="flex items-center gap-1.5 text-xs mono group transition-colors" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
              <Mail size={11} style={{ color: isDark ? "#00f5ff" : "#0077b6" }} />
              singhrandeep623@gmail.com
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
              </span>
            </button>
            <span className="flex items-center gap-1.5 text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 fade-up" style={{ animationDelay: "0.45s" }}>
            <a href="mailto:singhrandeep623@gmail.com" className="btn-solid px-6 py-2.5 text-sm font-bold mono inline-flex items-center gap-2">
              <Mail size={14} /> get_in_touch()
            </a>
            <button onClick={handleResumeDownload} className="btn-neon px-6 py-2.5 text-sm mono inline-flex items-center gap-2">
              <span className="flex items-center gap-2"><Download size={13} /> resume.pdf</span>
            </button>
            <a href="https://github.com/mentallysikh" target="_blank" rel="noreferrer"
              className={`px-5 py-2.5 text-sm mono inline-flex items-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 ${isDark ? "border-[rgba(255,255,255,0.1)] text-[#8ba9c0] hover:border-[rgba(255,255,255,0.3)] hover:text-[#e8f4fd]" : "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"}`}>
              <Github size={13} /> GitHub ↗
            </a>
            <a href="https://linkedin.com/in/randeep-arora-1b336a105" target="_blank" rel="noreferrer"
              className={`px-5 py-2.5 text-sm mono inline-flex items-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 ${isDark ? "border-[rgba(255,255,255,0.1)] text-[#8ba9c0] hover:border-[rgba(255,255,255,0.3)] hover:text-[#e8f4fd]" : "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"}`}>
              <Linkedin size={13} /> LinkedIn ↗
            </a>
          </div>

          <div className="flex flex-wrap gap-2 fade-up" style={{ animationDelay: "0.55s" }}>
            {techBadges.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-xs mono border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{ borderColor: `${color}22`, background: `${color}08`, color }}>
                <Icon size={11} style={{ color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 fade-up" style={{ animationDelay: "0.4s" }}>

          {/* Live terminal */}
          <div className={`${card} p-4 rounded-sm`}>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[9px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>bash — randeep@cloudkeeper</span>
            </div>
            <div className="space-y-1 min-h-[120px] max-h-[140px] overflow-hidden">
              {termLines.map((l, i) => (
                <div key={i} className="text-[10px] mono leading-relaxed" style={{ color: l.color }}>
                  {l.text}
                  {i === termLines.length - 1 && (
                    <span className="inline-block w-1.5 h-3 ml-1 align-middle blink" style={{ background: isDark ? "#00f5ff" : "#0077b6" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status card */}
          <div className={`${card} p-4 rounded-sm`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="mono text-[10px]" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>// current_status</span>
            </div>
            <div className="font-bold text-sm mb-1" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>DevOps Trainee @ CloudKeeper</div>
            <div className="text-xs mono mb-3" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>New Delhi · 2026–Present</div>
            <div className="flex flex-wrap gap-1">
              {["AWS", "GCP", "Docker", "K8s", "CI/CD"].map((t) => (
                <span key={t} className="text-[9px] mono px-1.5 py-0.5"
                  style={{ background: isDark ? "rgba(0,245,255,0.07)" : "rgba(0,119,182,0.07)", color: isDark ? "#00f5ff" : "#0077b6", border: `1px solid ${isDark ? "rgba(0,245,255,0.15)" : "rgba(0,119,182,0.15)"}` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Education",  val: "MCA",  sub: "2024–2026",   color: "#00f5ff" },
              { label: "CGPA (BCA)", val: "9.0",  sub: "MSIT Delhi",  color: "#00ff88" },
              { label: "Projects",   val: "4+",   sub: "Built",       color: "#b97cff" },
              { label: "Languages",  val: "3",    sub: "EN·HI·DE 🇩🇪", color: "#ff6b35" },
            ].map(({ label, val, sub, color }) => (
              <div key={label} className={`${card} p-4 rounded-sm`}>
                <div className="text-[9px] mono mb-1" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{label}</div>
                <div className="text-2xl font-black stat-number" style={{ color }}>{val}</div>
                <div className="text-[10px] mono mt-0.5" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Skill bars */}
          <div className={`${card} p-3 rounded-sm`}>
            <div className="mono text-[10px] mb-2" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>$ skills --list --top</div>
            <div className="space-y-1.5">
              {[{ name: "AWS / GCP", pct: 65 }, { name: "Docker", pct: 70 }, { name: "Git / CI", pct: 82 }, { name: "Linux", pct: 75 }].map(({ name, pct }) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="w-16 text-[9px] mono flex-shrink-0" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{name}</span>
                  <div className="flex-1 h-1 rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                    <div className="h-full rounded-full skill-bar" style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--cyan), var(--green))" }} />
                  </div>
                  <span className="text-[9px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-3 text-xs mono fade-up" style={{ animationDelay: "0.7s", color: isDark ? "#4a6580" : "#5a7a99" }}>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, var(--cyan))" }} />
        scroll to explore
      </div>
    </section>
  );
}
