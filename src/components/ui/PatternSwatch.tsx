type PatternVariant = "slats-horizontal" | "slats-vertical" | "pleated" | "mesh" | "roller";

const bg = "#efe8db";
const line = "#c9bda3";
const accent = "#9c3d28";

function SlatsHorizontal() {
  const rows = 14;
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <rect key={i} x="0" y={i * (100 / rows)} width="100" height={100 / rows - 1.1} fill={i % 5 === 0 ? accent : line} opacity={i % 5 === 0 ? 0.9 : 0.55} />
      ))}
    </>
  );
}

function SlatsVertical() {
  const cols = 12;
  return (
    <>
      {Array.from({ length: cols }).map((_, i) => (
        <rect key={i} x={i * (100 / cols)} y="0" width={100 / cols - 1.3} height="100" fill={i % 4 === 0 ? accent : line} opacity={i % 4 === 0 ? 0.9 : 0.5} />
      ))}
    </>
  );
}

function Pleated() {
  const points = [];
  const segments = 16;
  const w = 100 / segments;
  let path = `M 0 20`;
  for (let i = 0; i < segments; i++) {
    const x1 = i * w + w / 2;
    const x2 = (i + 1) * w;
    path += ` L ${x1} 80 L ${x2} 20`;
  }
  points.push(path);
  return <path d={points[0]} fill="none" stroke={line} strokeWidth="1.6" />;
}

function Mesh() {
  const gap = 6.5;
  const linesEls = [];
  for (let x = -100; x <= 100; x += gap) {
    linesEls.push(<line key={`d${x}`} x1={x} y1="0" x2={x + 100} y2="100" stroke={line} strokeWidth="0.6" />);
  }
  for (let x = -100; x <= 100; x += gap) {
    linesEls.push(<line key={`u${x}`} x1={x} y1="100" x2={x + 100} y2="0" stroke={line} strokeWidth="0.6" />);
  }
  return <>{linesEls}</>;
}

function Roller() {
  const rows = 8;
  return (
    <>
      <rect x="0" y="0" width="100" height="10" fill={accent} opacity="0.85" />
      {Array.from({ length: rows }).map((_, i) => (
        <rect key={i} x="4" y={14 + i * 10.5} width="92" height="7" fill={line} opacity={0.4 + (i % 2) * 0.15} />
      ))}
    </>
  );
}

export function PatternSwatch({
  variant,
  className = "",
  label,
}: {
  variant: PatternVariant;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: bg }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        {variant === "slats-horizontal" && <SlatsHorizontal />}
        {variant === "slats-vertical" && <SlatsVertical />}
        {variant === "pleated" && <Pleated />}
        {variant === "mesh" && <Mesh />}
        {variant === "roller" && <Roller />}
      </svg>
      {label && (
        <span className="absolute bottom-4 left-4 font-display text-lg text-ink sm:text-xl">{label}</span>
      )}
    </div>
  );
}
