import { useReveal, SectionHeader } from "./useReveal";
import { GraduationCap, Briefcase, Languages, Zap, MapPin, Mail } from "lucide-react";

export default function About({ theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";

  const card = isDark
    ? "bg-[rgba(7,13,26,0.75)] border border-[rgba(0,245,255,0.1)] backdrop-blur-md"
    : "bg-[rgba(255,255,255,0.85)] border border-[rgba(0,119,182,0.15)] backdrop-blur-md shadow-sm";

  const facts = [
    { icon: GraduationCap, color: "#00f5ff", title: "Education",  text: "MCA @ VIPS (2024–26)  ·  BCA @ MSIT — 9.0 CGPA (2021–24)" },
    { icon: Briefcase,     color: "#00ff88", title: "Experience", text: "DevOps Trainee @ CloudKeeper  ·  Ex-VA @ Amazon  ·  Ex-FE Intern @ Appflix" },
    { icon: Languages,     color: "#b97cff", title: "Languages",  text: "English & Hindi (Fluent)  ·  German 🇩🇪 (Beginner — actively learning)" },
    { icon: Zap,           color: "#ff6b35", title: "Currently",  text: "Kubernetes CKA · Terraform · AWS SA · GitHub Actions · Prometheus & Grafana" },
  ];

  const badges = ["Cloud Native", "DevOps Mindset", "Fast Learner", "Team Player", "Open Source", "German Learner 🇩🇪"];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={ref} className="reveal">
        <SectionHeader label="// about_me" title="Who am I?" theme={theme} />

        <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-6">

          {/* ── Bio card ── */}
          <div className={`${card} p-7`}>
            <div className="sec-label mb-5">$ cat bio.txt</div>

            <p className="text-sm leading-loose mb-4" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
              I'm <span style={{ color: isDark ? "#e8f4fd" : "#0f2040" }} className="font-semibold">Randeep</span> — a DevOps trainee based in{" "}
              <span style={{ color: isDark ? "#00f5ff" : "#0077b6" }} className="font-semibold">New Delhi</span>, currently building real-world cloud skills at{" "}
              <span style={{ color: isDark ? "#00ff88" : "#2d6a4f" }} className="font-semibold">CloudKeeper</span>.
            </p>
            <p className="text-sm leading-loose mb-4" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
              My day-to-day involves{" "}
              <span style={{ color: isDark ? "#00f5ff" : "#0077b6" }} className="font-semibold">AWS & GCP</span> services — provisioning compute, managing storage,
              configuring IAM — alongside Docker containerization and CI/CD pipeline workflows.
            </p>
            <p className="text-sm leading-loose mb-6" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
              I'm equally comfortable dropping into a Linux terminal, writing Python scripts, or analyzing data with Power BI.
              Outside tech, I'm working toward{" "}
              <span style={{ color: isDark ? "#b97cff" : "#6a0dad" }} className="font-semibold">German B1</span> — proof that I enjoy challenges beyond the command line.
            </p>

            <div className="flex flex-wrap gap-2">
              {badges.map((b) => <span key={b} className="tag">{b}</span>)}
            </div>
          </div>

          {/* ── Fact cards ── */}
          <div className="flex flex-col gap-4">
            {facts.map(({ icon: Icon, color, title, text }) => (
              <div key={title} className={`${card} p-4 flex items-start gap-4`}>
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-sm mt-0.5"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div>
                  <div className="font-bold text-xs mb-1" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>{title}</div>
                  <p className="text-[11px] leading-relaxed mono" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
