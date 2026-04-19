import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer({ theme }) {
  const isDark = theme === "dark";
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10 px-6"
      style={{
        borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)",
        background: isDark ? "rgba(2,4,9,0.8)" : "rgba(240,244,248,0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center text-xs font-bold mono"
            style={{ border: "1px solid rgba(0,245,255,0.3)", color: isDark ? "#00f5ff" : "#0077b6", background: isDark ? "rgba(0,245,255,0.06)" : "rgba(0,119,182,0.05)" }}
          >
            RA
          </div>
          <span className="text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
            © {year} Randeep Arora · sikhomode.space
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
          Built with <Heart size={11} className="mx-1" style={{ color: "#00f5ff" }} /> React + Vite + Tailwind
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github,   href: "https://github.com/mentallysikh" },
            { icon: Linkedin, href: "https://linkedin.com/in/randeep-arora-1b336a105" },
            { icon: Mail,     href: "mailto:singhrandeep623@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="p-2 border transition-all duration-200"
              style={{
                borderColor: isDark ? "rgba(0,245,255,0.12)" : "rgba(0,119,182,0.15)",
                color: isDark ? "#4a6580" : "#5a7a99",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = isDark ? "#00f5ff" : "#0077b6"; e.currentTarget.style.borderColor = isDark ? "rgba(0,245,255,0.4)" : "rgba(0,119,182,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? "#4a6580" : "#5a7a99"; e.currentTarget.style.borderColor = isDark ? "rgba(0,245,255,0.12)" : "rgba(0,119,182,0.15)"; }}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
