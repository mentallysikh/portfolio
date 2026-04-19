import { useReveal, SectionHeader } from "./useReveal";
import { GraduationCap, Building2, Globe } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Vivekananda Institute of Professional Studies",
    year: "2024 – 2026",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Maharaja Surajmal Institute of Technology",
    year: "2021 – 2024",
    note: "CGPA: 9.0",
  },
];

export default function About() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 01 — about"
        title="Who I Am"
        subtitle="A detail-oriented cloud & DevOps trainee with a passion for infrastructure and automation."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div ref={r1} className="reveal space-y-5">
          <div className="neon-border bg-zinc-900/60 p-6 space-y-4 text-sm text-zinc-400 leading-relaxed">
            <p>
              I'm <span className="text-zinc-100 font-semibold">Randeep Singh Arora</span>, a DevOps Trainee at{" "}
              <span className="text-cyan-400">CloudKeeper</span> based in New Delhi. I hold an MCA (Batch 2026) 
              and work daily with AWS, GCP, Docker, Kubernetes, and CI/CD workflows.
            </p>
            <p>
              My background spans software development, cloud infrastructure, and AI/ML — having worked 
              on everything from gesture-control engines and predictive analytics to front-end redesigns 
              and scalable containerized deployments.
            </p>
            <p>
              Beyond tech, I'm a beginner in <span className="text-emerald-400">German 🇩🇪</span>, 
              an occasional open-source contributor, and an advocate for clean, documented infrastructure.
            </p>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Building2, label: "Current Role", val: "DevOps Trainee" },
              { icon: Building2, label: "Company", val: "CloudKeeper" },
              { icon: GraduationCap, label: "Degree", val: "MCA (2026)" },
              { icon: Globe, label: "Languages", val: "EN / HI / DE" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="border border-zinc-800 bg-zinc-900/30 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={12} className="text-cyan-400" />
                  <span className="text-zinc-600 text-xs font-mono">{label}</span>
                </div>
                <div className="text-zinc-200 text-sm font-semibold">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={r2} className="reveal space-y-4" style={{ transitionDelay: "0.2s" }}>
          <div className="section-label mb-5">// education</div>
          {education.map((e, i) => (
            <div key={i} className="neon-border bg-zinc-900/40 p-5 card-hover">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <h4 className="text-sm font-semibold text-zinc-100">{e.degree}</h4>
                </div>
                {e.note && (
                  <span className="tag flex-shrink-0">{e.note}</span>
                )}
              </div>
              <p className="text-zinc-500 text-xs ml-5">{e.institution}</p>
              <p className="text-zinc-600 text-xs ml-5 mt-1 font-mono">{e.year}</p>
            </div>
          ))}

          {/* Current status */}
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-5 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono font-bold">CURRENTLY ACTIVE</span>
            </div>
            <p className="text-zinc-300 text-sm font-semibold">DevOps Trainee @ CloudKeeper</p>
            <p className="text-zinc-500 text-xs mt-1 font-mono">2026 – Present · New Delhi, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
