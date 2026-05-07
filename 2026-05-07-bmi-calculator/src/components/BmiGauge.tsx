"use client";

interface Props {
  bmi: number;
}

export default function BmiGauge({ bmi }: Props) {
  // Map BMI 10–45 to 0–180 degrees on a half-circle gauge
  const MIN = 10;
  const MAX = 45;
  const clamped = Math.min(Math.max(bmi, MIN), MAX);
  const angle = ((clamped - MIN) / (MAX - MIN)) * 180;

  const r = 80;
  const cx = 100;
  const cy = 100;

  function polarToXY(deg: number) {
    const rad = ((deg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const needle = polarToXY(angle);

  const segments = [
    { from: 0, to: 45, color: "#60a5fa" },   // underweight
    { from: 45, to: 90, color: "#34d399" },   // normal
    { from: 90, to: 135, color: "#fbbf24" },  // overweight
    { from: 135, to: 180, color: "#f87171" }, // obese
  ];

  function arcPath(startDeg: number, endDeg: number) {
    const s = polarToXY(startDeg);
    const e = polarToXY(endDeg);
    const large = endDeg - startDeg > 90 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  return (
    <svg viewBox="0 0 200 110" className="w-full max-w-xs mx-auto">
      {/* Background track */}
      <path d={arcPath(0, 180)} fill="none" stroke="#1e293b" strokeWidth="16" />
      {segments.map((seg) => (
        <path
          key={seg.from}
          d={arcPath(seg.from, seg.to)}
          fill="none"
          stroke={seg.color}
          strokeWidth="14"
          strokeLinecap="butt"
          opacity="0.85"
        />
      ))}
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={needle.x}
        y2={needle.y}
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="6" fill="white" />
      {/* Labels */}
      <text x="10" y="108" fill="#60a5fa" fontSize="9" fontWeight="600">Under</text>
      <text x="62" y="30" fill="#34d399" fontSize="9" fontWeight="600">Normal</text>
      <text x="122" y="30" fill="#fbbf24" fontSize="9" fontWeight="600">Over</text>
      <text x="162" y="108" fill="#f87171" fontSize="9" fontWeight="600">Obese</text>
      {/* BMI value */}
      <text x={cx} y="95" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
        {bmi.toFixed(1)}
      </text>
    </svg>
  );
}
