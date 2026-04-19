import { useEffect, useState } from "react";

export default function ScrollProgress({ theme }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]" style={{ background: "transparent" }}>
      <div
        className="h-full transition-none"
        style={{
          width: `${pct}%`,
          background: theme === "dark"
            ? "linear-gradient(90deg, #22d3ee, #34d399)"
            : "linear-gradient(90deg, #0891b2, #059669)",
          boxShadow: theme === "dark" ? "0 0 8px #22d3ee88" : "0 0 8px #0891b288",
        }}
      />
    </div>
  );
}
