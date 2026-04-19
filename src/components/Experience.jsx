import { useReveal, SectionHeader } from "./useReveal";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "DevOps Trainee",
    company: "CloudKeeper",
    period: "2026 – Present",
    location: "New Delhi, India",
    type: "Full-time",
    current: true,
    color: "#00f5ff",
    bullets: [
      "Working with AWS and GCP services including compute (EC2), storage (S3), and identity management (IAM)",
      "Applying cloud environment setup and deployment concepts in practical production scenarios",
      "Gaining hands-on exposure to Docker containerization and Kubernetes orchestration basics",
      "Understanding and operating CI/CD pipelines, version control workflows, and deployment automation",
      "Assisting in infrastructure configuration and cloud-based application support",
      "Developing familiarity with scalable architecture and cloud best practices",
    ],
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "IAM"],
  },
  {
    role: "Virtual Assistant",
    company: "Amazon.com",
    period: "Sep 2024 – May 2025",
    location: "Remote",
    type: "Contract",
    current: false,
    color: "#00ff88",
    bullets: [
      "Provided customer support using CRM tools and Linux-based internal systems",
      "Managed high-volume query resolution with focus on accuracy and speed",
      "Worked with internal tooling to track and resolve escalations efficiently",
    ],
    tags: ["CRM", "Linux", "Customer Support", "Ticketing"],
  },
  {
    role: "Front-End Developer Intern",
    company: "Appflix Studios",
    period: "Aug 2023 – Oct 2023",
    location: "New Delhi, India",
    type: "Internship",
    current: false,
    color: "#b97cff",
    bullets: [
      "Built and optimized responsive web pages using HTML5, CSS3, and JavaScript",
      "Led a full UI/UX redesign of the studio's main website, improving mobile experience",
      "Collaborated with the design team to translate Figma mockups into pixel-perfect code",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
  },
];

function ExpCard({ exp, delay, theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";

  return (
    <div
      ref={ref}
      className="reveal relative pl-12"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-4 top-5 w-3 h-3 rounded-full border-2 flex-shrink-0"
        style={{
          borderColor: exp.color,
          background: exp.current ? exp.color : "transparent",
          boxShadow: exp.current ? `0 0 12px ${exp.color}` : "none",
        }}
      />

      <div
        className="p-6 mb-4 transition-all duration-300"
        style={{
          background: isDark ? "rgba(7,13,26,0.7)" : "rgba(255,255,255,0.85)",
          border: `1px solid ${exp.current
            ? isDark ? `${exp.color}30` : `${exp.color}40`
            : isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.12)"
          }`,
          backdropFilter: "blur(12px)",
          boxShadow: exp.current && isDark ? `0 0 40px ${exp.color}08` : "none",
        }}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {exp.current && (
                <span
                  className="text-[9px] mono px-2 py-0.5 font-semibold"
                  style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                >
                  CURRENT
                </span>
              )}
              <span
                className="text-[9px] mono px-2 py-0.5"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: isDark ? "#8ba9c0" : "#2d5074",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                }}
              >
                {exp.type}
              </span>
            </div>
            <h3 className="text-lg font-bold" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>{exp.role}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Briefcase size={11} style={{ color: exp.color }} />
              <span className="text-sm font-semibold" style={{ color: exp.color }}>{exp.company}</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 justify-end mb-1">
              <Calendar size={10} style={{ color: isDark ? "#4a6580" : "#5a7a99" }} />
              <span className="text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <MapPin size={10} style={{ color: isDark ? "#4a6580" : "#5a7a99" }} />
              <span className="text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
              <ChevronRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] mono px-2 py-0.5"
              style={{
                background: `${exp.color}08`,
                color: isDark ? exp.color : exp.color,
                border: `1px solid ${exp.color}20`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience({ theme }) {
  const isDark = theme === "dark";

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="// work_history"
        title="Experience"
        subtitle="My professional journey — from front-end internships to DevOps and cloud."
        theme={theme}
      />

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-[18px] top-6 bottom-6 w-px"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)"
              : "linear-gradient(to bottom, rgba(0,119,182,0.3), transparent)",
          }}
        />

        {experiences.map((exp, i) => (
          <ExpCard key={exp.company} exp={exp} delay={i * 100} theme={theme} />
        ))}
      </div>
    </section>
  );
}
