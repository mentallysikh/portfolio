import { useState } from "react";
import { useReveal, SectionHeader } from "./useReveal";
import { Cloud, Server, GitBranch, Terminal, Brain, Code } from "lucide-react";

const skillGroups = [
  {
    icon: Cloud, category: "Cloud & Infrastructure", color: "#00f5ff", id: "cloud",
    skills: [
      { name: "AWS (EC2, S3, IAM)", level: 65 },
      { name: "Google Cloud Platform", level: 60 },
      { name: "Cloud Architecture", level: 55 },
      { name: "Identity & Access Mgmt", level: 65 },
    ],
  },
  {
    icon: Server, category: "Containers & Orchestration", color: "#00ff88", id: "containers",
    skills: [
      { name: "Docker", level: 70 },
      { name: "Kubernetes (Basics)", level: 50 },
      { name: "Container Networking", level: 55 },
      { name: "Image Management", level: 65 },
    ],
  },
  {
    icon: GitBranch, category: "CI/CD & DevOps", color: "#b97cff", id: "cicd",
    skills: [
      { name: "CI/CD Pipelines", level: 65 },
      { name: "Git & GitHub", level: 82 },
      { name: "Deployment Workflows", level: 60 },
      { name: "Version Control", level: 85 },
    ],
  },
  {
    icon: Terminal, category: "Systems & Languages", color: "#ff6b35", id: "systems",
    skills: [
      { name: "Linux / Shell Scripting", level: 75 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Java / C++", level: 60 },
    ],
  },
  {
    icon: Brain, category: "AI & Data", color: "#00f5ff", id: "ai",
    skills: [
      { name: "Scikit-Learn / ML", level: 65 },
      { name: "Pandas / NumPy", level: 70 },
      { name: "OpenCV / MediaPipe", level: 65 },
      { name: "Power BI", level: 65 },
    ],
  },
  {
    icon: Code, category: "Web & Tools", color: "#00ff88", id: "web",
    skills: [
      { name: "HTML5 / CSS3 / JS", level: 72 },
      { name: "REST APIs", level: 65 },
      { name: "VS Code", level: 88 },
      { name: "GitHub Actions", level: 50 },
    ],
  },
];

export default function Skills({ theme }) {
  const ref = useReveal();
  const [activeTab, setActiveTab] = useState("cloud");
  const isDark = theme === "dark";

  const active = skillGroups.find((g) => g.id === activeTab);

  const cardBase = isDark
    ? "bg-[rgba(7,13,26,0.75)] border border-[rgba(0,245,255,0.09)] backdrop-blur-md"
    : "bg-[rgba(255,255,255,0.85)] border border-[rgba(0,119,182,0.12)] backdrop-blur-md";

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={ref} className="reveal">
        <SectionHeader label="// skill_set" title="What I work with" theme={theme} />

        <div className="mt-12 grid lg:grid-cols-[220px_1fr] gap-6">

          {/* ── Tab sidebar ── */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {skillGroups.map((g) => {
              const Icon = g.icon;
              const isActive = activeTab === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveTab(g.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-left text-xs mono whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
                    isActive
                      ? isDark
                        ? "border-[rgba(0,245,255,0.3)] text-[#e8f4fd] bg-[rgba(0,245,255,0.06)]"
                        : "border-[rgba(0,119,182,0.4)] text-[#0f2040] bg-[rgba(0,119,182,0.08)]"
                      : isDark
                        ? "border-[rgba(0,245,255,0.07)] text-[#4a6580] hover:border-[rgba(0,245,255,0.2)] hover:text-[#8ba9c0]"
                        : "border-[rgba(0,119,182,0.08)] text-[#5a7a99] hover:border-[rgba(0,119,182,0.25)] hover:text-[#2d5074]"
                  }`}
                  style={isActive ? { boxShadow: `inset 3px 0 0 ${g.color}` } : {}}
                >
                  <Icon size={13} style={{ color: isActive ? g.color : undefined, flexShrink: 0 }} />
                  <span>{g.category}</span>
                </button>
              );
            })}
          </div>

          {/* ── Active skill panel ── */}
          {active && (
            <div key={active.id} className={`${cardBase} p-6`} style={{ animation: "fadeUp 0.3s ease forwards" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-sm"
                  style={{ background: `${active.color}12`, border: `1px solid ${active.color}25` }}>
                  <active.icon size={18} style={{ color: active.color }} />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>{active.category}</div>
                  <div className="text-[10px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
                    {active.skills.length} skills · avg {Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length)}%
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {active.skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium" style={{ color: isDark ? "#c8dce8" : "#1a3a55" }}>{name}</span>
                      <span className="text-[10px] mono font-bold" style={{ color: active.color }}>{level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                      <div
                        className="h-full rounded-full skill-bar"
                        style={{
                          width: `${level}%`,
                          background: `linear-gradient(90deg, ${active.color}, ${active.color}99)`,
                          boxShadow: `0 0 8px ${active.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tool tags */}
              <div className="mt-6 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: isDark ? "rgba(0,245,255,0.07)" : "rgba(0,119,182,0.1)" }}>
                {active.skills.map(({ name }) => (
                  <span key={name} className="text-[9px] mono px-2 py-1 rounded-sm"
                    style={{ background: `${active.color}08`, border: `1px solid ${active.color}20`, color: active.color }}>
                    {name.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* All-skills radar row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className={`p-3 text-center transition-all duration-200 border ${
                activeTab === g.id
                  ? isDark ? "border-[rgba(0,245,255,0.25)] bg-[rgba(0,245,255,0.05)]" : "border-[rgba(0,119,182,0.3)] bg-[rgba(0,119,182,0.06)]"
                  : isDark ? "border-[rgba(0,245,255,0.07)] hover:border-[rgba(0,245,255,0.15)]" : "border-[rgba(0,119,182,0.08)] hover:border-[rgba(0,119,182,0.2)]"
              }`}
            >
              <g.icon size={18} style={{ color: g.color, margin: "0 auto 4px" }} />
              <div className="text-[9px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
                {g.skills.length} skills
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
