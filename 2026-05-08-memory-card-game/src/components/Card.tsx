"use client";

import { CardData } from "@/lib/gameData";
import { useEffect, useState } from "react";

interface CardProps {
  card: CardData;
  onClick: (id: number) => void;
  disabled: boolean;
  isMismatch: boolean;
  size: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: { card: "h-14 w-14", emoji: "text-2xl" },
  md: { card: "h-20 w-20", emoji: "text-3xl" },
  lg: { card: "h-24 w-24", emoji: "text-4xl" },
};

export default function Card({ card, onClick, disabled, isMismatch, size }: CardProps) {
  const [shake, setShake] = useState(false);
  const classes = SIZE_CLASSES[size];

  useEffect(() => {
    if (isMismatch && card.isFlipped && !card.isMatched) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [isMismatch, card.isFlipped, card.isMatched]);

  const isActive = card.isFlipped || card.isMatched;

  return (
    <div
      className={`perspective ${classes.card} cursor-pointer select-none`}
      onClick={() => !disabled && !isActive && onClick(card.id)}
    >
      <div
        className={`card-inner ${isActive ? (card.isMatched ? "matched" : "flipped") : ""} ${shake ? "shake" : ""}`}
      >
        {/* Front face (hidden) */}
        <div className="card-face card-front glass rounded-xl border border-white/20 hover:border-indigo-400/50 hover:bg-white/10 transition-all duration-200 group">
          <div className="text-2xl opacity-30 group-hover:opacity-50 transition-opacity">
            ✦
          </div>
        </div>

        {/* Back face (emoji) */}
        <div
          className={`card-face card-back rounded-xl border ${
            card.isMatched
              ? "bg-emerald-900/50 border-emerald-400/60 shadow-lg shadow-emerald-500/20"
              : "bg-indigo-900/50 border-indigo-400/60"
          }`}
        >
          <span className={`${classes.emoji} drop-shadow-lg`}>{card.emoji}</span>
        </div>
      </div>
    </div>
  );
}
