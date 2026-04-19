export default function Footer({ theme }) {
  const isDark = theme === "dark";
  return (
    <footer className={`border-t py-8 px-6 ${isDark ? "border-zinc-800/60" : "border-zinc-200"}`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 border flex items-center justify-center text-xs font-bold ${isDark ? "border-cyan-400/40 text-cyan-400" : "border-cyan-600/40 text-cyan-600"}`}>
            RA
          </div>
          <span className={`text-xs font-mono ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>randeep.arora · sikhomode.space</span>
        </div>
        <div className={`text-xs font-mono ${isDark ? "text-zinc-700" : "text-zinc-400"}`}>
          built with React + Vite + Tailwind · {new Date().getFullYear()}
        </div>
        <div className={`text-xs font-mono ${isDark ? "text-zinc-700" : "text-zinc-400"}`}>
          <span className={isDark ? "text-cyan-400/60" : "text-cyan-600/60"}>$</span> deployed on vercel
        </div>
      </div>
    </footer>
  );
}
