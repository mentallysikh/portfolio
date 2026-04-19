import { useReveal, SectionHeader } from "./useReveal";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    name: "IBM Data Science Professional Certificate",
    issuer: "IBM / Coursera",
    year: "2025",
    description: "Comprehensive data science curriculum covering Python, SQL, ML, and data visualization.",
    tags: ["Python", "ML", "SQL", "Data Science"],
    color: "cyan",
  },
  {
    name: "Microsoft Power BI – Be10x",
    issuer: "Be10x",
    year: "2025",
    credentialId: "27",
    description: "Power BI dashboard design, DAX, data modeling, and business intelligence reporting.",
    tags: ["Power BI", "DAX", "Data Viz", "BI"],
    color: "emerald",
  },
];

const colorMap = {
  cyan: { icon: "text-cyan-400", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  emerald: { icon: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/10" },
};

function CertCard({ cert, delay }) {
  const ref = useReveal();
  const c = colorMap[cert.color];

  return (
    <div ref={ref} className="reveal neon-border bg-zinc-900/50 p-6 card-hover" style={{ transitionDelay: `${delay}s` }}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-10 h-10 flex items-center justify-center border ${c.border} ${c.bg} flex-shrink-0`}>
          <Award size={18} className={c.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-zinc-100 font-bold text-sm leading-snug mb-1">{cert.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-500 text-xs font-mono">{cert.issuer}</span>
            <span className="text-zinc-700 text-xs">·</span>
            <span className="text-zinc-600 text-xs font-mono">{cert.year}</span>
            {cert.credentialId && (
              <>
                <span className="text-zinc-700 text-xs">·</span>
                <span className="text-zinc-600 text-xs font-mono">ID: {cert.credentialId}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed mb-4">{cert.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {cert.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 05 — certifications"
        title="Credentials"
        subtitle="Verified learning and professional certifications."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {certs.map((c, i) => (
          <CertCard key={c.name} cert={c} delay={i * 0.15} />
        ))}
      </div>

      {/* Currently learning */}
      <div className="mt-8 border border-dashed border-zinc-700 p-5">
        <div className="section-label mb-4">// currently exploring</div>
        <div className="flex flex-wrap gap-2">
          {[
            "Kubernetes (CKA prep)",
            "Terraform",
            "AWS Solutions Architect",
            "GitHub Actions",
            "Prometheus & Grafana",
            "German Language (B1 goal)",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 border border-zinc-800 px-3 py-1.5 bg-zinc-900/30 hover:border-zinc-600 hover:text-zinc-300 transition-colors">
              <span className="text-cyan-400">→</span> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
