import { useReveal, SectionHeader } from "./useReveal";
import { Briefcase, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "CloudKeeper",
    role: "DevOps Trainee",
    period: "2026 – Present",
    type: "Full-Time",
    current: true,
    bullets: [
      "Working with AWS and GCP services including compute, storage, and identity management",
      "Applying cloud environment setup and deployment concepts in practical scenarios",
      "Gaining hands-on exposure to Docker containerization and Kubernetes orchestration basics",
      "Understanding and working with CI/CD pipelines, version control, and deployment workflows",
      "Assisting in infrastructure configuration and cloud-based application support",
      "Developing familiarity with scalable architecture and cloud best practices",
    ],
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    company: "Amazon.com",
    role: "Virtual Assistant",
    period: "Sep 2024 – May 2025",
    type: "Contract",
    current: false,
    bullets: [
      "Acted as first point of contact for customer queries on orders, payments, and navigation",
      "Provided tailored resolutions using CRM and internal tools with high professionalism",
      "Used internal tools on Linux-based environments and followed documented workflows",
    ],
    tags: ["CRM", "Linux", "Customer Support", "Documentation"],
  },
  {
    company: "Appflix Studios",
    role: "Front-End Developer Intern",
    period: "Aug 2023 – Oct 2023",
    type: "Internship",
    current: false,
    bullets: [
      "Led front-end redesign efforts for a startup portal improving speed and user experience",
      "Redesigned and developed responsive web interfaces using HTML, CSS, and JavaScript",
      "Improved website performance, layout consistency, and mobile responsiveness",
    ],
    tags: ["HTML", "CSS", "JavaScript", "UI/UX", "Responsive Design"],
  },
];

function ExperienceCard({ exp, delay }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className={`neon-border bg-zinc-900/50 p-6 card-hover ${exp.current ? "border-cyan-400/30" : ""}`}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 flex items-center justify-center border ${exp.current ? "border-cyan-400/50 bg-cyan-400/10" : "border-zinc-700 bg-zinc-800"}`}>
              <Briefcase size={14} className={exp.current ? "text-cyan-400" : "text-zinc-500"} />
            </div>
            <div>
              <h3 className="text-zinc-100 font-bold text-base">{exp.role}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-sm font-mono ${exp.current ? "text-cyan-400" : "text-zinc-400"}`}>
                  {exp.company}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {exp.current && (
              <div className="flex items-center gap-1.5 border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-mono">active</span>
              </div>
            )}
            <span className="text-zinc-600 text-xs font-mono border border-zinc-800 px-2 py-0.5">{exp.type}</span>
            <span className="text-zinc-600 text-xs font-mono">{exp.period}</span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
              <ChevronRight size={12} className="text-cyan-400 mt-1 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 03 — experience"
        title="Work History"
        subtitle="From front-end development to cloud infrastructure — my journey so far."
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-zinc-800 to-transparent hidden lg:block ml-4" />

        <div className="space-y-6 lg:pl-12">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
