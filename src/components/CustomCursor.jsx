import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ theme }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let raf;
    const followRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf = requestAnimationFrame(followRing);
    };
    followRing();

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnterLink = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setHovering(true);
    };
    const onLeaveLink = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onEnterLink);
    window.addEventListener("mouseout", onLeaveLink);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnterLink);
      window.removeEventListener("mouseout", onLeaveLink);
    };
  }, []);

  const isDark = theme === "dark";
  const accent = isDark ? "#22d3ee" : "#0891b2";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          marginLeft: clicking ? -3 : -4,
          marginTop: clicking ? -3 : -4,
          borderRadius: "50%",
          backgroundColor: accent,
          transition: "width 0.15s, height 0.15s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: hovering ? 44 : clicking ? 24 : 32,
          height: hovering ? 44 : clicking ? 24 : 32,
          marginLeft: hovering ? -22 : clicking ? -12 : -16,
          marginTop: hovering ? -22 : clicking ? -12 : -16,
          borderRadius: "50%",
          border: `1px solid ${accent}`,
          opacity: hovering ? 0.8 : 0.4,
          transition: "width 0.25s, height 0.25s, opacity 0.25s, margin 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
