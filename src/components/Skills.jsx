import { useReveal, SectionHeader } from "./useReveal";
import { Cloud, Container, GitBranch, Terminal, Brain, Globe } from "lucide-react";

const skillGroups = [
  {
    icon: Cloud,
    category: "Cloud & Infrastructure",
    color: "cyan",
    skills: [
      { name: "AWS (EC2, S3, IAM)", level: 65 },
      { name: "Google Cloud Platform", level: 60 },
      { name: "Cloud Architecture Basics", level: 55 },
      { name: "Identity & Access Management", level: 65 },
    ],
  },
  {
    icon: Container,
    category: "Containers & Orchestration",
    color: "emerald",
    skills: [
      { name: "Docker", level: 70 },
      { name: "Kubernetes (Basics)", level: 50 },
      { name: "Container Networking", level: 55 },
      { name: "Image Management", level: 65 },
    ],
  },
  {
    icon: GitBranch,
    category: "CI/CD & DevOps",
    color: "cyan",
    skills: [
      { name: "CI/CD Pipelines", level: 65 },
      { name: "Git & GitHub", level: 80 },
      { name: "Deployment Workflows", level: 60 },
      { name: "Version Control", level: 85 },
    ],
  },
  {
    icon: Terminal,
    category: "Systems & Programming",
    color: "emerald",
    skills: [
      { name: "Linux / Shell Scripting", level: 75 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 70 },
      { name: "HTML/CSS/JavaScript", level: 70 },
    ],
  },
  {
    icon: Brain,
    category: "AI & Data",
    color: "cyan",
    skills: [
      { name: "Machine Learning (Scikit-Learn)", level: 65 },
      { name: "Pandas / NumPy", level: 70 },
      { name: "Power BI", level: 65 },
      { name: "IBM Data Science", level: 60 },
    ],
  },
  {
    icon: Globe,
    category: "Languages",
    color: "emerald",
    skills: [
      { name: "English", level: 95 },
      { name: "Hindi", level: 100 },
      { name: "German 🇩🇪", level: 30 },
    ],
  },
];

const colorMap = {
  cyan: { bar: "bg-cyan-400", text: "text-cyan-400", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  emerald: { bar: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/10" },
};

function SkillGroup({ group, delay }) {
  const ref = useReveal();
  const c = colorMap[group.color];
  const Icon = group.icon;

  return (
    <div ref={ref} className="reveal neon-border bg-zinc-900/50 p-5 card-hover" style={{ transitionDelay: `${delay}s` }}>
      <div className="flex items-center gap-2 mb-5">
        <div className={`w-7 h-7 ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon size={13} className={c.text} />
        </div>
        <h3 className="text-sm font-bold text-zinc-200">{group.category}</h3>
      </div>
      <div className="space-y-3">
        {group.skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-400 text-xs font-mono">{s.name}</span>
              <span className={`text-xs font-mono ${c.text} opacity-70`}>{s.level}%</span>
            </div>
            <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${c.bar} skill-bar`}
                style={{ width: `${s.level}%`, animationDelay: `${delay + 0.3}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 02 — skills"
        title="Tech Stack"
        subtitle="Tools and technologies I work with daily — from cloud platforms to containers to code."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((g, i) => (
          <SkillGroup key={g.category} group={g} delay={i * 0.1} />
        ))}
      </div>

      {/* Tools row */}
      <div className="mt-8 border border-zinc-800 bg-zinc-900/30 p-5">
        <div className="text-zinc-600 text-xs font-mono mb-3">// tools & platforms</div>
        <div className="flex flex-wrap gap-2">
          {["VS Code", "GitHub", "Linux CLI", "Docker Desktop", "AWS Console", "GCP Console", "Power BI", "MS Office"].map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
