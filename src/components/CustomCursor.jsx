import { useEffect, useRef } from "react";

export default function CustomCursor({ theme }) {
  const dot   = useRef(null);
  const ring  = useRef(null);
  const pos   = useRef({ x: 0, y: 0 });
  const ring_ = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);

  useEffect(() => {
    const isDark = theme === "dark";
    const color = isDark ? "#00f5ff" : "#0077b6";

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top  = e.clientY + "px";
      }
    };

    const down  = () => { dot.current?.classList.add("scale-[2]"); ring.current?.classList.add("scale-150"); };
    const up    = () => { dot.current?.classList.remove("scale-[2]"); ring.current?.classList.remove("scale-150"); };
    const enter = () => { ring.current && (ring.current.style.width = "48px", ring.current.style.height = "48px"); };
    const leave = () => { ring.current && (ring.current.style.width = "28px", ring.current.style.height = "28px"); };

    const links = document.querySelectorAll("a, button");
    links.forEach((l) => { l.addEventListener("mouseenter", enter); l.addEventListener("mouseleave", leave); });

    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      ring_.current.x = lerp(ring_.current.x, pos.current.x, 0.12);
      ring_.current.y = lerp(ring_.current.y, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.left = ring_.current.x + "px";
        ring.current.style.top  = ring_.current.y + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      links.forEach((l) => { l.removeEventListener("mouseenter", enter); l.removeEventListener("mouseleave", leave); });
      cancelAnimationFrame(raf.current);
    };
  }, [theme]);

  const isDark = theme === "dark";
  const c = isDark ? "#00f5ff" : "#0077b6";

  return (
    <>
      <div
        ref={dot}
        className="fixed z-[9999] pointer-events-none transition-transform duration-100"
        style={{
          width: 6, height: 6, borderRadius: "50%",
          background: c,
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 8px ${c}`,
        }}
      />
      <div
        ref={ring}
        className="fixed z-[9998] pointer-events-none transition-all duration-200"
        style={{
          width: 28, height: 28, borderRadius: "50%",
          border: `1px solid ${c}`,
          transform: "translate(-50%, -50%)",
          opacity: 0.6,
        }}
      />
    </>
  );
}
