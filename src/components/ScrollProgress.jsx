export default function ScrollProgress({ visitedCount = 0, totalPages = 1 }) {
  const pct = totalPages > 0 ? (visitedCount / totalPages) * 100 : 0;

  return (
    <div
      className="progress-bar"
      style={{ width: `${pct}%`, transition: "width 0.5s ease-out" }}
    />
  );
}
