"use client";

interface DieProps {
  value: number;
  type: string;
  isRolling?: boolean;
  delay?: number;
}

const D6_DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

function D6Face({ value }: { value: number }) {
  const dots = D6_DOTS[value] ?? [];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="2" y="2" width="96" height="96" rx="18" ry="18" fill="#f8f8ff" />
      <rect x="2" y="2" width="96" height="96" rx="18" ry="18" fill="none" stroke="#d1c4e9" strokeWidth="2" />
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={9} fill="#4c1d95" />
      ))}
    </svg>
  );
}

function PolygonDie({ type, value }: { type: string; value: number }) {
  const shapes: Record<string, { points: string; color: string; textY: number; fontSize: number }> = {
    d4:  { points: "50,6 94,88 6,88",                                    color: "#7c3aed", textY: 80, fontSize: 26 },
    d8:  { points: "50,4 96,50 50,96 4,50",                               color: "#6d28d9", textY: 58, fontSize: 30 },
    d10: { points: "50,4 96,32 96,68 50,96 4,68 4,32",                    color: "#5b21b6", textY: 58, fontSize: 30 },
    d12: { points: "50,4 90,22 97,65 70,96 30,96 3,65 10,22",             color: "#4c1d95", textY: 58, fontSize: 28 },
    d20: { points: "50,3 95,26 95,74 50,97 5,74 5,26",                    color: "#3b0764", textY: 58, fontSize: 28 },
    d100:{ points: "50,4 96,32 96,68 50,96 4,68 4,32",                    color: "#1e1b4b", textY: 58, fontSize: 22 },
  };
  const s = shapes[type] ?? shapes.d6;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor={s.color} />
        </linearGradient>
      </defs>
      <polygon points={s.points} fill={`url(#grad-${type})`} stroke="#c4b5fd" strokeWidth="2.5" />
      <text
        x="50"
        y={s.textY}
        textAnchor="middle"
        fill="white"
        fontSize={s.fontSize}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
      >
        {value}
      </text>
    </svg>
  );
}

export default function Die({ value, type, isRolling = false, delay = 0 }: DieProps) {
  const animClass = isRolling
    ? "animate-roll"
    : "animate-bounce-in";

  return (
    <div
      className={`w-16 h-16 md:w-20 md:h-20 ${animClass} drop-shadow-xl`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {type === "d6" ? <D6Face value={value} /> : <PolygonDie type={type} value={value} />}
    </div>
  );
}
