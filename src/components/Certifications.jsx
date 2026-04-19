import { useReveal, SectionHeader } from "./useReveal";
import { Award, ExternalLink, BookOpen } from "lucide-react";

const certs = [
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM / Coursera",
    year: "2025",
    color: "#00f5ff",
    desc: "Comprehensive 10-course program covering data science methodology, Python, SQL, machine learning, and applied capstone projects.",
    link: "#",
    tags: ["Python", "ML", "Data Science", "IBM"],
  },
  {
    title: "Microsoft Power BI — Data Analytics",
    issuer: "Be10x",
    year: "2025",
    credentialId: "27",
    color: "#00ff88",
    desc: "Advanced Power BI training covering DAX, data modeling, dashboard design, and real-world reporting scenarios.",
    link: "#",
    tags: ["Power BI", "DAX", "Data Viz", "Microsoft"],
  },
];

const learning = [
  { label: "Kubernetes CKA", color: "#00f5ff" },
  { label: "Terraform",      color: "#b97cff" },
  { label: "AWS Solutions Architect", color: "#ff6b35" },
  { label: "GitHub Actions", color: "#00ff88" },
  { label: "Prometheus & Grafana", color: "#00f5ff" },
  { label: "German B1 🇩🇪",   color: "#b97cff" },
];

export default function Certifications({ theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";

  return (
    <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="// certifications"
        title="Credentials"
        subtitle="Official certifications and what's coming next on my learning roadmap."
        theme={theme}
      />

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {certs.map((cert) => (
          <div
            key={cert.title}
            ref={useReveal()}
            className="reveal p-6 transition-all duration-300"
            style={{
              background: isDark ? "rgba(7,13,26,0.75)" : "rgba(255,255,255,0.85)",
              border: `1px solid ${isDark ? `${cert.color}20` : `${cert.color}30`}`,
              backdropFilter: "blur(12px)",
              boxShadow: isDark ? `0 0 40px ${cert.color}06` : "none",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0"
                style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
              >
                <Award size={18} style={{ color: cert.color }} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs mono" style={{ color: cert.color }}>{cert.issuer}</span>
                  <span className="text-[10px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>· {cert.year}</span>
                  {cert.credentialId && (
                    <span className="text-[10px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>· ID: {cert.credentialId}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-4" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{cert.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.tags.map((t) => (
                <span
                  key={t}
                  className="text-[9px] mono px-2 py-0.5"
                  style={{ background: `${cert.color}08`, color: cert.color, border: `1px solid ${cert.color}20` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Currently learning */}
      <div
        ref={ref}
        className="reveal p-6"
        style={{
          background: isDark ? "rgba(7,13,26,0.5)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)"}`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} style={{ color: isDark ? "#00f5ff" : "#0077b6" }} />
          <span className="sec-label">// currently_learning</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {learning.map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs mono border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: `${color}22`,
                background: `${color}07`,
                color: isDark ? color : color,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: color }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
