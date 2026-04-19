import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function SectionHeader({ label, title, subtitle }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal mb-14">
      <div className="section-label mb-3">{label}</div>
      <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight mb-3">{title}</h2>
      {subtitle && <p className="text-zinc-500 text-sm max-w-lg">{subtitle}</p>}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-px w-12 bg-cyan-400" />
        <div className="h-px flex-1 bg-zinc-800" />
      </div>
    </div>
  );
}
