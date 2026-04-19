const links = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "certifications", label: "certs" },
  { id: "contact", label: "contact" },
];

export default function Navbar({ active, scrollY }) {
  const scrolled = scrollY > 60;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 border border-cyan-400/60 flex items-center justify-center text-cyan-400 text-xs font-bold group-hover:bg-cyan-400/10 transition-colors">
            RA
          </div>
          <span className="text-sm text-zinc-400 font-mono group-hover:text-cyan-400 transition-colors hidden sm:block">
            randeep.arora
          </span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 hidden md:block ${
                active === l.id
                  ? "text-cyan-400 border-b border-cyan-400"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {active === l.id ? `> ${l.label}` : l.label}
            </button>
          ))}

          {/* Resume CTA */}
          <a
            href="https://linkedin.com/in/randeep-arora-1b336a105"
            target="_blank"
            rel="noreferrer"
            className="ml-4 px-4 py-1.5 text-xs border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 font-mono"
          >
            linkedin ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
