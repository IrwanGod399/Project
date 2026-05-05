"use client";

interface TimerRingProps {
  progress: number; // 0 to 1
  color: string;
  size?: number;
}

export default function TimerRing({ progress, color, size = 280 }: TimerRingProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="progress-ring"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </svg>
  );
}
