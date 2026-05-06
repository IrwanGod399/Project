"use client";
import { useState, useCallback } from "react";
import Die from "@/components/Die";
import { saveRoll } from "@/lib/storage";

const DICE_TYPES = [
  { label: "d4",   sides: 4   },
  { label: "d6",   sides: 6   },
  { label: "d8",   sides: 8   },
  { label: "d10",  sides: 10  },
  { label: "d12",  sides: 12  },
  { label: "d20",  sides: 20  },
  { label: "d100", sides: 100 },
];

const PRESETS = [
  { label: "1d6",   count: 1, type: "d6"  },
  { label: "2d6",   count: 2, type: "d6"  },
  { label: "1d20",  count: 1, type: "d20" },
  { label: "4d6",   count: 4, type: "d6"  },
  { label: "2d10",  count: 2, type: "d10" },
  { label: "3d8",   count: 3, type: "d8"  },
];

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

export default function RollerPage() {
  const [diceType, setDiceType]   = useState("d6");
  const [count, setCount]         = useState(2);
  const [modifier, setModifier]   = useState(0);
  const [results, setResults]     = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollKey, setRollKey]     = useState(0);
  const [saved, setSaved]         = useState(false);

  const sides = DICE_TYPES.find((d) => d.label === diceType)?.sides ?? 6;
  const total  = results.reduce((s, r) => s + r, 0) + modifier;

  const roll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setSaved(false);
    setRollKey((k) => k + 1);

    setTimeout(() => {
      const rolled = Array.from({ length: count }, () => rollDie(sides));
      setResults(rolled);
      saveRoll({ diceType, count, results: rolled, total: rolled.reduce((s, r) => s + r, 0) + modifier, modifier });
      setSaved(true);
      setIsRolling(false);
    }, 650);
  }, [isRolling, count, sides, diceType, modifier]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    setDiceType(p.type);
    setCount(p.count);
    setResults([]);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Header */}
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Roll the Dice
        </h1>
        <p className="text-gray-400 mt-1 text-sm">Choose your dice, set modifiers, and roll!</p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 justify-center">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
              diceType === p.type && count === p.count
                ? "border-purple-500 bg-purple-600/30 text-purple-300"
                : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl space-y-5">
        {/* Dice type */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Dice Type
          </label>
          <div className="grid grid-cols-7 gap-1.5">
            {DICE_TYPES.map((d) => (
              <button
                key={d.label}
                onClick={() => { setDiceType(d.label); setResults([]); }}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  diceType === d.label
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count & Modifier */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Number of Dice
            </label>
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
              >
                −
              </button>
              <span className="flex-1 text-center text-xl font-bold">{count}</span>
              <button
                onClick={() => setCount((c) => Math.min(12, c + 1))}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Modifier
            </label>
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setModifier((m) => m - 1)}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
              >
                −
              </button>
              <span className={`flex-1 text-center text-xl font-bold ${modifier > 0 ? "text-green-400" : modifier < 0 ? "text-red-400" : ""}`}>
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
              <button
                onClick={() => setModifier((m) => m + 1)}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Roll button */}
        <button
          onClick={roll}
          disabled={isRolling}
          className={`w-full py-4 rounded-xl text-lg font-extrabold tracking-wide transition-all duration-200 ${
            isRolling
              ? "bg-purple-800 text-purple-300 cursor-not-allowed scale-95"
              : "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-900/50 hover:shadow-purple-900/80 hover:scale-[1.02] active:scale-95 animate-glow"
          }`}
        >
          {isRolling ? "Rolling…" : `🎲 Roll ${count}${diceType}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ""}`}
        </button>
      </div>

      {/* Results */}
      {(results.length > 0 || isRolling) && (
        <div className="w-full max-w-lg text-center space-y-4">
          {/* Dice faces */}
          <div
            key={rollKey}
            className={`flex flex-wrap gap-3 justify-center py-4 ${isRolling ? "animate-shake" : ""}`}
          >
            {(isRolling ? Array.from({ length: count }, (_, i) => i + 1) : results).map((val, i) => (
              <Die
                key={i}
                value={isRolling ? Math.floor(Math.random() * sides) + 1 : val}
                type={diceType}
                isRolling={isRolling}
                delay={isRolling ? 0 : i * 60}
              />
            ))}
          </div>

          {/* Total */}
          {!isRolling && results.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {total}
                </span>
              </div>
              {results.length > 1 && (
                <div className="mt-2 text-sm text-gray-500">
                  Dice: {results.join(" + ")}
                  {modifier !== 0 && (
                    <span className={modifier > 0 ? "text-green-400" : "text-red-400"}>
                      {" "}{modifier > 0 ? `+${modifier}` : modifier}
                    </span>
                  )}
                  {" "}= {total}
                </div>
              )}
              {results.length === 1 && modifier !== 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  {results[0]}
                  <span className={modifier > 0 ? "text-green-400" : "text-red-400"}>
                    {" "}{modifier > 0 ? `+${modifier}` : modifier}
                  </span>
                  {" "}= {total}
                </div>
              )}
              {saved && (
                <p className="mt-2 text-xs text-purple-400">✓ Saved to history</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {results.length === 0 && !isRolling && (
        <p className="text-gray-600 text-sm mt-2">Hit the button to roll your dice!</p>
      )}
    </div>
  );
}
