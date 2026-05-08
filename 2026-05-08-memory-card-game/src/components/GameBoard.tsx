"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { CardData, Difficulty, DIFFICULTY_CONFIG, generateCards, formatTime, saveScore } from "@/lib/gameData";
import Card from "@/components/Card";

interface GameBoardProps {
  difficulty: Difficulty;
}

export default function GameBoard({ difficulty }: GameBoardProps) {
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mismatchIds, setMismatchIds] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { pairs, cols } = DIFFICULTY_CONFIG[difficulty];

  const initGame = useCallback(() => {
    setCards(generateCards(difficulty));
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setGameStarted(false);
    setGameWon(false);
    setMismatchIds([]);
    setIsChecking(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, [difficulty]);

  useEffect(() => {
    initGame();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [initGame]);

  useEffect(() => {
    if (gameStarted && !gameWon) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (matches === pairs && pairs > 0) {
      setGameWon(true);
      if (timerRef.current) clearInterval(timerRef.current);
      saveScore({ difficulty, moves, time });
    }
  }, [matches, pairs, difficulty, moves, time]);

  const handleCardClick = useCallback((id: number) => {
    if (isChecking) return;

    if (!gameStarted) setGameStarted(true);

    setFlipped((prev) => {
      const newFlipped = [...prev, id];

      if (newFlipped.length === 2) {
        setIsChecking(true);
        setMoves((m) => m + 1);

        const [first, second] = newFlipped;
        const card1 = cards.find((c) => c.id === first)!;
        const card2 = cards.find((c) => c.id === second)!;

        if (card1.emoji === card2.emoji) {
          // Match
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first || c.id === second ? { ...c, isMatched: true } : c
              )
            );
            setMatches((m) => m + 1);
            setFlipped([]);
            setIsChecking(false);
          }, 300);
        } else {
          // Mismatch
          setMismatchIds([first, second]);
          setTimeout(() => {
            setFlipped([]);
            setMismatchIds([]);
            setIsChecking(false);
          }, 900);
        }

        return newFlipped;
      }

      return newFlipped;
    });
  }, [cards, isChecking, gameStarted]);

  const cardSize = difficulty === "easy" ? "lg" : difficulty === "medium" ? "md" : "sm";

  const gridCols: Record<number, string> = {
    4: "grid-cols-4",
    6: "grid-cols-6",
    8: "grid-cols-8",
  };

  const progress = (matches / pairs) * 100;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Stats Bar */}
      <div className="glass rounded-2xl px-6 py-4 flex items-center gap-8 w-full max-w-2xl">
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Time</p>
          <p className="text-2xl font-mono font-bold text-indigo-400">{formatTime(time)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Moves</p>
          <p className="text-2xl font-mono font-bold text-purple-400">{moves}</p>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Progress</span>
            <span>{matches}/{pairs} pairs</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={initGame}
          className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium text-slate-300 transition-all duration-200 flex items-center gap-2"
        >
          <span>↺</span> Restart
        </button>
      </div>

      {/* Game Board */}
      <div className={`grid ${gridCols[cols]} gap-2 md:gap-3`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isChecking || gameWon}
            isMismatch={mismatchIds.includes(card.id)}
            size={cardSize}
          />
        ))}
      </div>

      {/* Win Modal */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass rounded-3xl p-10 max-w-md w-full mx-4 text-center animate-bounce-in border border-white/20">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold gradient-text mb-2">You Won!</h2>
            <p className="text-slate-400 mb-6">Amazing memory!</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-indigo-900/50 rounded-2xl p-4 border border-indigo-400/30">
                <p className="text-xs text-indigo-300 uppercase tracking-wider mb-1">Time</p>
                <p className="text-2xl font-mono font-bold text-white">{formatTime(time)}</p>
              </div>
              <div className="bg-purple-900/50 rounded-2xl p-4 border border-purple-400/30">
                <p className="text-xs text-purple-300 uppercase tracking-wider mb-1">Moves</p>
                <p className="text-2xl font-mono font-bold text-white">{moves}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={initGame}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                Play Again
              </button>
              <button
                onClick={() => router.push("/scores")}
                className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-semibold text-slate-200 transition-all duration-200"
              >
                View Scores
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
