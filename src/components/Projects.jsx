import { useReveal, SectionHeader } from "./useReveal";
import { ExternalLink, Github, Code2 } from "lucide-react";

const projects = [
  {
    name: "Containerized Python Application",
    description:
      "Executed a Python application on Linux systems with performance optimization and modular execution. Containerized using Docker for portable, reproducible deployment environments.",
    tags: ["Python", "Docker", "Linux", "OpenCV"],
    category: "DevOps",
    github: "https://github.com/mentallysikh",
  },
  {
    name: "Gesture Control Engine",
    description:
      "Built a real-time gesture recognition system using OpenCV and MediaPipe. Features modular design and real-time video processing pipeline with hand tracking capabilities.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    category: "AI/ML",
    github: "https://github.com/mentallysikh",
  },
  {
    name: "Sales Prediction & Analytics Dashboard",
    description:
      "Designed data pipelines using Python and SQL. Deployed interactive dashboards in Power BI with predictive ML models (Scikit-Learn) for business intelligence use cases.",
    tags: ["Python", "SQL", "Power BI", "Scikit-Learn", "Pandas"],
    category: "Data Science",
    github: "https://github.com/mentallysikh",
  },
  {
    name: "Website UX/UI Revamp – Appflix Studio",
    description:
      "Led front-end redesign for a startup portal. Improved page performance, layout responsiveness, and user experience across devices using modern HTML, CSS, and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UX"],
    category: "Web Dev",
    github: "https://github.com/mentallysikh",
  },
];

const categoryColors = {
  "DevOps": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  "AI/ML": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Data Science": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Web Dev": "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

function ProjectCard({ project, delay }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal neon-border bg-zinc-900/50 p-5 card-hover flex flex-col" style={{ transitionDelay: `${delay}s` }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-cyan-400 flex-shrink-0" />
          <h3 className="text-zinc-100 font-bold text-sm leading-snug">{project.name}</h3>
        </div>
        <span className={`text-xs font-mono border px-2 py-0.5 flex-shrink-0 ${categoryColors[project.category]}`}>
          {project.category}
        </span>
      </div>

      <p className="text-zinc-500 text-xs leading-relaxed mb-4 flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono hover:text-cyan-400 transition-colors"
        >
          <Github size={12} />
          source
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 04 — projects"
        title="What I've Built"
        subtitle="A selection of projects spanning cloud, AI/ML, data science, and web development."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} delay={i * 0.1} />
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://github.com/mentallysikh"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-zinc-700 text-zinc-400 text-sm font-mono hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
        >
          <Github size={14} />
          view all on github ↗
        </a>
      </div>
    </section>
  );
}
