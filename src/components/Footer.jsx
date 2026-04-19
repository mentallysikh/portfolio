export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xs font-bold">
            RA
          </div>
          <span className="text-zinc-600 text-xs font-mono">randeep.arora · sikhomode.space</span>
        </div>
        <div className="text-zinc-700 text-xs font-mono">
          built with React + Vite + Tailwind · {new Date().getFullYear()}
        </div>
        <div className="text-zinc-700 text-xs font-mono">
          <span className="text-cyan-400/60">$</span> deployed on vercel
        </div>
      </div>
    </footer>
  );
}
