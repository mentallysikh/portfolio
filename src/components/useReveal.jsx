import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

export function SectionHeader({ label, title, subtitle, theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";
  return (
    <div ref={ref} className="reveal mb-12">
      <div className="sec-label mb-3">{label}</div>
      <h2
        className="text-4xl sm:text-5xl font-black leading-tight mb-3"
        style={{ color: isDark ? "#e8f4fd" : "#0f2040", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm max-w-lg" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{subtitle}</p>
      )}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-px w-12" style={{ background: "var(--cyan)" }} />
        <div className="h-px flex-1" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }} />
      </div>
    </div>
  );
}
