import { useState } from "react";
import { useReveal, SectionHeader } from "./useReveal";
import { Github, Container, Eye, BarChart2, Monitor, ArrowUpRight, Tag } from "lucide-react";

const projects = [
  {
    icon: Container,
    title: "Containerized Python App",
    color: "#00f5ff",
    year: "2025",
    desc: "End-to-end containerized Python application with OpenCV integration. Built and published Docker images, configured networking, and managed multi-container deployment with Docker Compose.",
    tags: ["Docker", "Python", "Linux", "OpenCV", "DevOps"],
    github: "https://github.com/mentallysikh",
    featured: true,
    stat: { label: "Containers", val: "3" },
  },
  {
    icon: Eye,
    title: "Gesture Control Engine",
    color: "#00ff88",
    year: "2025",
    desc: "Real-time hand gesture recognition using MediaPipe and OpenCV. Tracks 21 hand landmarks at 30fps to control system interfaces without a keyboard.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "AI"],
    github: "https://github.com/mentallysikh",
    featured: true,
    stat: { label: "Landmarks", val: "21" },
  },
  {
    icon: BarChart2,
    title: "Sales Prediction Dashboard",
    color: "#b97cff",
    year: "2024",
    desc: "Full analytics pipeline: data ingestion via SQL, feature engineering with Pandas, ML regression with Scikit-Learn, and an interactive Power BI dashboard.",
    tags: ["Python", "SQL", "Power BI", "Scikit-Learn", "Pandas", "ML"],
    github: "https://github.com/mentallysikh",
    featured: false,
    stat: { label: "Accuracy", val: "87%" },
  },
  {
    icon: Monitor,
    title: "Website UX/UI Revamp",
    color: "#ff6b35",
    year: "2023",
    desc: "Complete responsive redesign of Appflix Studio's web presence. Improved Lighthouse score and mobile UX, translating Figma designs to semantic HTML/CSS/JS.",
    tags: ["HTML5", "CSS3", "JavaScript", "Figma", "Responsive", "UX"],
    github: "https://github.com/mentallysikh",
    featured: false,
    stat: { label: "Lighthouse", val: "95" },
  },
];

function ProjectCard({ proj, delay, theme }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const isDark = theme === "dark";
  const Icon = proj.icon;

  return (
    <div
      ref={ref}
      className="reveal proj-card flex flex-col gap-0 group transition-all duration-300 overflow-hidden"
      style={{
        background: isDark ? "rgba(7,13,26,0.75)" : "rgba(255,255,255,0.85)",
        border: `1px solid ${hovered ? proj.color + "40" : isDark ? "rgba(0,245,255,0.09)" : "rgba(0,119,182,0.12)"}`,
        backdropFilter: "blur(12px)",
        transitionDelay: `${delay}ms`,
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px ${proj.color}20` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color accent bar on hover */}
      <div className="h-0.5 transition-all duration-300" style={{ background: hovered ? `linear-gradient(90deg, ${proj.color}, transparent)` : "transparent" }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
              style={{ background: `${proj.color}12`, border: `1px solid ${proj.color}25` }}>
              <Icon size={18} style={{ color: proj.color }} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>
                {proj.title}
              </h3>
              <div className="text-[10px] mono mt-0.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{proj.year}</div>
            </div>
          </div>
          {/* Stat badge */}
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-black" style={{ color: proj.color }}>{proj.stat.val}</div>
            <div className="text-[9px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{proj.stat.label}</div>
          </div>
        </div>

        {/* Desc */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
          {proj.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {proj.tags.map((t) => (
            <span key={t} className="text-[9px] mono px-2 py-0.5 rounded-sm"
              style={{ background: `${proj.color}08`, border: `1px solid ${proj.color}20`, color: proj.color }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: isDark ? "rgba(0,245,255,0.07)" : "rgba(0,119,182,0.1)" }}>
          <a
            href={proj.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[10px] mono transition-colors"
            style={{ color: isDark ? "#4a6580" : "#5a7a99" }}
            onMouseEnter={(e) => e.currentTarget.style.color = proj.color}
            onMouseLeave={(e) => e.currentTarget.style.color = isDark ? "#4a6580" : "#5a7a99"}
          >
            <Github size={11} /> View on GitHub <ArrowUpRight size={10} />
          </a>
          {proj.featured && (
            <span className="text-[9px] mono px-2 py-0.5" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
              featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ theme }) {
  const ref = useReveal();
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={ref} className="reveal">
        <SectionHeader label="// projects" title="Things I've built" theme={theme} />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} proj={p} delay={i * 80} theme={theme} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://github.com/mentallysikh"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm mono border transition-all duration-200 hover:-translate-y-0.5 ${
              theme === "dark"
                ? "border-[rgba(0,245,255,0.2)] text-[#8ba9c0] hover:border-[rgba(0,245,255,0.4)] hover:text-[#00f5ff]"
                : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            <Github size={14} /> View all on GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
