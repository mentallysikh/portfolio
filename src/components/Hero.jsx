import { useState, useEffect } from "react";
import { Terminal, MapPin, Mail, Github, Linkedin } from "lucide-react";

const roles = [
  "DevOps Trainee @ CloudKeeper",
  "Cloud Infrastructure Enthusiast",
  "Docker & Kubernetes Explorer",
  "CI/CD Pipeline Builder",
  "AWS & GCP Practitioner",
  "Linux Power User",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto">
      {/* Terminal header line */}
      <div className="flex items-center gap-2 mb-8 fade-up" style={{ animationDelay: "0.1s" }}>
        <Terminal size={14} className="text-cyan-400" />
        <span className="text-xs font-mono text-zinc-500">randeep@cloudkeeper:~$</span>
        <span className="text-xs font-mono text-cyan-400">whoami</span>
      </div>

      {/* Name */}
      <div className="mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="section-label mb-3">// hello, world</div>
        <h1
          className="glitch text-5xl sm:text-7xl lg:text-8xl font-bold text-zinc-100 leading-none tracking-tight"
          data-text="Randeep Arora"
        >
          Randeep Arora
        </h1>
      </div>

      {/* Animated role */}
      <div className="h-8 mb-6 fade-up" style={{ animationDelay: "0.35s" }}>
        <span className="text-lg sm:text-xl text-cyan-400 font-mono">
          {displayed}
          <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
        </span>
      </div>

      {/* Tagline */}
      <p className="max-w-xl text-zinc-400 text-sm leading-relaxed mb-8 fade-up" style={{ animationDelay: "0.45s" }}>
        MCA graduate turning theory into practice — working hands-on with{" "}
        <span className="text-emerald-400">AWS & GCP</span>, containers, orchestration, and CI/CD at CloudKeeper.
        Also speaks <span className="text-cyan-400">German 🇩🇪</span>.
      </p>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 mb-10 fade-up text-xs font-mono text-zinc-500" style={{ animationDelay: "0.55s" }}>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-cyan-400" />
          Dwarka, New Delhi, India
        </span>
        <span className="flex items-center gap-1.5">
          <Mail size={12} className="text-cyan-400" />
          singhrandeep623@gmail.com
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </span>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3 mb-16 fade-up" style={{ animationDelay: "0.65s" }}>
        <a
          href="mailto:singhrandeep623@gmail.com"
          className="px-6 py-2.5 bg-cyan-400 text-zinc-950 text-sm font-bold font-mono hover:bg-cyan-300 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20"
        >
          $ get_in_touch()
        </a>
        <a
          href="https://github.com/mentallysikh"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 border border-zinc-700 text-zinc-300 text-sm font-mono hover:border-zinc-500 hover:text-white transition-all duration-200 flex items-center gap-2"
        >
          <Github size={14} />
          github ↗
        </a>
        <a
          href="https://linkedin.com/in/randeep-arora-1b336a105"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 border border-zinc-700 text-zinc-300 text-sm font-mono hover:border-zinc-500 hover:text-white transition-all duration-200 flex items-center gap-2"
        >
          <Linkedin size={14} />
          linkedin ↗
        </a>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-px fade-up" style={{ animationDelay: "0.75s" }}>
        {[
          { val: "2026", label: "MCA Batch" },
          { val: "AWS+GCP", label: "Cloud Focus" },
          { val: "Docker", label: "Containers" },
          { val: "CI/CD", label: "Pipelines" },
          { val: "DE/EN/HI", label: "Languages" },
        ].map(({ val, label }) => (
          <div key={label} className="flex-1 min-w-[100px] border border-zinc-800 px-4 py-3 bg-zinc-900/40">
            <div className="text-cyan-400 font-bold text-sm font-mono">{val}</div>
            <div className="text-zinc-600 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="mt-16 flex items-center gap-3 text-zinc-600 text-xs font-mono fade-up" style={{ animationDelay: "0.85s" }}>
        <div className="flex flex-col gap-1">
          <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400/60 to-transparent mx-auto" />
        </div>
        scroll to explore
      </div>
    </section>
  );
}
