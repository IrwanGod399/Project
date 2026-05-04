"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { generateWordList, WordSet, Duration } from "@/lib/words";

interface TypingTestProps {
  wordSet: WordSet;
  duration: Duration;
}

type WordStatus = "pending" | "correct" | "incorrect" | "current";

export default function TypingTest({ wordSet, duration }: TypingTestProps) {
  const router = useRouter();
  const [words, setWords] = useState<string[]>([]);
  const [wordStatuses, setWordStatuses] = useState<WordStatus[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordListRef = useRef<HTMLDivElement>(null);

  const initTest = useCallback(() => {
    const wordCount = wordSet === "quotes" ? 50 : 80;
    const newWords = generateWordList(wordSet, wordCount);
    setWords(newWords);
    setWordStatuses(new Array(newWords.length).fill("pending"));
    setCurrentWordIndex(0);
    setCurrentInput("");
    setTimeLeft(duration);
    setIsStarted(false);
    setIsFinished(false);
    setCorrectWords(0);
    setIncorrectWords(0);
    setTotalChars(0);
  }, [wordSet, duration]);

  useEffect(() => {
    initTest();
  }, [initTest]);

  useEffect(() => {
    if (!isStarted || isFinished) return;
    if (timeLeft <= 0) {
      setIsFinished(true);
      const wpm = Math.round((correctWords / duration) * 60);
      const accuracy = totalChars > 0
        ? Math.round(((correctWords / (correctWords + incorrectWords)) || 0) * 100 * 10) / 10
        : 0;
      const params = new URLSearchParams({
        wpm: String(wpm),
        accuracy: String(accuracy),
        correct: String(correctWords),
        incorrect: String(incorrectWords),
        chars: String(totalChars),
        duration: String(duration),
        wordSet,
      });
      router.push(`/results?${params.toString()}`);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isStarted, isFinished, timeLeft, correctWords, incorrectWords, totalChars, duration, wordSet, router]);

  useEffect(() => {
    if (wordListRef.current && currentWordIndex > 0) {
      const currentWordEl = wordListRef.current.querySelector(`[data-word-index="${currentWordIndex}"]`);
      currentWordEl?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [currentWordIndex]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isStarted && value.length > 0) {
      setIsStarted(true);
    }

    if (value.endsWith(" ")) {
      const typedWord = value.trim();
      if (!typedWord) return;

      const isCorrect = typedWord === words[currentWordIndex];
      const newStatuses = [...wordStatuses];
      newStatuses[currentWordIndex] = isCorrect ? "correct" : "incorrect";
      if (currentWordIndex + 1 < words.length) {
        newStatuses[currentWordIndex + 1] = "current";
      }
      setWordStatuses(newStatuses);

      if (isCorrect) {
        setCorrectWords((c) => c + 1);
        setTotalChars((c) => c + typedWord.length);
      } else {
        setIncorrectWords((i) => i + 1);
      }

      setCurrentWordIndex((i) => i + 1);
      setCurrentInput("");
    } else {
      setCurrentInput(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      initTest();
      inputRef.current?.focus();
    }
  };

  const timerPercentage = (timeLeft / duration) * 100;
  const timerColor =
    timeLeft > duration * 0.5
      ? "#4ade80"
      : timeLeft > duration * 0.25
      ? "#f59e0b"
      : "#f87171";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="text-4xl font-bold tabular-nums"
            style={{ color: timerColor }}
          >
            {timeLeft}
          </div>
          <span className="text-slate-500 text-sm">seconds</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <span>
            <span className="text-green-400 font-bold">{correctWords}</span> correct
          </span>
          <span>
            <span className="text-red-400 font-bold">{incorrectWords}</span> incorrect
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1">
        <div
          className="h-1 rounded-full transition-all duration-1000"
          style={{ width: `${timerPercentage}%`, background: timerColor }}
        />
      </div>

      <div
        ref={wordListRef}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-44 overflow-hidden relative cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-xl z-10 text-slate-400 text-sm tracking-widest">
            START TYPING TO BEGIN
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xl leading-relaxed">
          {words.map((word, i) => {
            const status = i < currentWordIndex ? wordStatuses[i] : i === currentWordIndex ? "current" : "pending";
            return (
              <span
                key={`${word}-${i}`}
                data-word-index={i}
                className={`transition-colors ${
                  status === "correct"
                    ? "word-correct"
                    : status === "incorrect"
                    ? "word-incorrect"
                    : status === "current"
                    ? "word-current px-1"
                    : "word-pending"
                }`}
              >
                {i === currentWordIndex ? (
                  <>
                    <span className="relative">
                      {word.split("").map((char, ci) => (
                        <span
                          key={ci}
                          className={
                            ci < currentInput.length
                              ? currentInput[ci] === char
                                ? "text-green-400"
                                : "text-red-400"
                              : ""
                          }
                        >
                          {char}
                        </span>
                      ))}
                      <span className="caret" />
                    </span>
                  </>
                ) : (
                  word
                )}
              </span>
            );
          })}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={isFinished}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-lg text-slate-100 outline-none focus:border-amber-400/50 transition-colors placeholder-slate-600"
        placeholder="Type here..."
      />

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Press <kbd className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-slate-400">Tab</kbd> to restart</span>
        <span className="text-slate-600">word {currentWordIndex + 1} / {words.length}</span>
      </div>
    </div>
  );
}
