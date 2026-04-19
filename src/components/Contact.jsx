import { useReveal, SectionHeader } from "./useReveal";
import { Mail, Github, Linkedin, MapPin, Send, Globe } from "lucide-react";

const contacts = [
  { icon: Mail,     label: "Email",     val: "singhrandeep623@gmail.com", href: "mailto:singhrandeep623@gmail.com", color: "#00f5ff" },
  { icon: Linkedin, label: "LinkedIn",  val: "randeep-arora-1b336a105",   href: "https://linkedin.com/in/randeep-arora-1b336a105", color: "#00ff88" },
  { icon: Github,   label: "GitHub",    val: "github.com/mentallysikh",   href: "https://github.com/mentallysikh", color: "#b97cff" },
  { icon: Globe,    label: "Portfolio", val: "sikhomode.space",            href: "https://sikhomode.space", color: "#ff6b35" },
];

export default function Contact({ theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";

  const card = isDark
    ? "bg-[rgba(7,13,26,0.75)] border border-[rgba(0,245,255,0.1)] backdrop-blur-md"
    : "bg-[rgba(255,255,255,0.85)] border border-[rgba(0,119,182,0.15)] backdrop-blur-md";

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="// contact"
        title="Get In Touch"
        subtitle="Open to DevOps roles, cloud projects, and collaborations. Let's build something."
        theme={theme}
      />

      <div ref={ref} className="reveal grid md:grid-cols-2 gap-6">
        {/* Left: message */}
        <div className={`${card} p-8`}>
          <div className="sec-label mb-4">$ ./contact --send</div>
          <h3 className="text-2xl font-black mb-3" style={{ color: isDark ? "#e8f4fd" : "#0f2040", letterSpacing: "-0.02em" }}>
            Let's work together
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
            I'm a DevOps trainee actively building cloud skills and looking for opportunities to grow. Whether it's a full-time role, an internship extension, or a side project — I'm interested.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>
            I'm based in <span style={{ color: isDark ? "#00f5ff" : "#0077b6" }} className="font-semibold">New Delhi</span> and open to both on-site and remote opportunities.
          </p>

          <div className="flex items-center gap-2 mb-6 px-4 py-3" style={{ background: isDark ? "rgba(0,255,136,0.06)" : "rgba(45,106,79,0.06)", border: `1px solid ${isDark ? "rgba(0,255,136,0.2)" : "rgba(45,106,79,0.2)"}` }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs mono" style={{ color: isDark ? "#00ff88" : "#2d6a4f" }}>Available for opportunities</span>
          </div>

          <div className="flex items-center gap-2 text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
            <MapPin size={11} style={{ color: isDark ? "#00f5ff" : "#0077b6" }} />
            Dwarka, New Delhi, India
          </div>
        </div>

        {/* Right: contact cards */}
        <div className="grid grid-cols-1 gap-3">
          {contacts.map(({ icon: Icon, label, val, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="flex items-center gap-4 p-4 transition-all duration-200 group"
              style={{
                background: isDark ? "rgba(7,13,26,0.6)" : "rgba(255,255,255,0.7)",
                border: `1px solid ${isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)"}`,
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}35`;
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.background = isDark ? `${color}06` : `${color}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.background = isDark ? "rgba(7,13,26,0.6)" : "rgba(255,255,255,0.7)";
              }}
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] mono mb-0.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{label}</div>
                <div className="text-xs mono font-medium truncate" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>{val}</div>
              </div>
              <Send size={11} className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
