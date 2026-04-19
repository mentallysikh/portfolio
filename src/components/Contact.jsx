import { useReveal, SectionHeader } from "./useReveal";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "singhrandeep623@gmail.com", href: "mailto:singhrandeep623@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "randeep-arora-1b336a105", href: "https://linkedin.com/in/randeep-arora-1b336a105" },
  { icon: Github, label: "GitHub", value: "mentallysikh", href: "https://github.com/mentallysikh" },
  { icon: MapPin, label: "Location", value: "Dwarka, New Delhi, India", href: null },
];

export default function Contact() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 06 — contact"
        title="Get In Touch"
        subtitle="Open to DevOps roles, cloud collaborations, and interesting projects."
      />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left */}
        <div ref={r1} className="reveal space-y-5">
          <div className="neon-border bg-zinc-900/50 p-6">
            <div className="text-zinc-600 text-xs font-mono mb-4">// reach out</div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Whether you have a DevOps role, a cloud project, or just want to talk tech —
              my inbox is always open. I'll get back to you as quickly as I can.
            </p>
            <div className="space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-zinc-700 bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-zinc-600 text-xs font-mono">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-zinc-300 text-sm hover:text-cyan-400 transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-zinc-300 text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status block */}
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">STATUS: OPEN TO OPPORTUNITIES</span>
            </div>
            <p className="text-zinc-500 text-xs font-mono">
              Currently employed as DevOps Trainee @ CloudKeeper.
              Open to learning-focused opportunities and collaborations.
            </p>
          </div>
        </div>

        {/* Right: quick CTA */}
        <div ref={r2} className="reveal space-y-4" style={{ transitionDelay: "0.2s" }}>
          <div className="neon-border bg-zinc-900/50 p-6 h-full flex flex-col justify-between">
            <div>
              <div className="text-zinc-600 text-xs font-mono mb-6">// quick links</div>
              <div className="space-y-3">
                {[
                  { label: "→ View LinkedIn Profile", href: "https://linkedin.com/in/randeep-arora-1b336a105", primary: true },
                  { label: "→ Browse GitHub Repos", href: "https://github.com/mentallysikh", primary: false },
                  { label: "→ Send Email", href: "mailto:singhrandeep623@gmail.com", primary: false },
                ].map(({ label, href, primary }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`flex items-center justify-between w-full px-4 py-3 font-mono text-sm transition-all duration-200 ${
                      primary
                        ? "bg-cyan-400 text-zinc-950 font-bold hover:bg-cyan-300"
                        : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    {label}
                    <Send size={13} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="text-zinc-700 text-xs font-mono">
                <span className="text-cyan-400">$</span> randeep --location "New Delhi" --available true --open-to "devops, cloud, infra"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
