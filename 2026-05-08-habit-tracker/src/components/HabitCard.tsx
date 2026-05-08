"use client";

import Link from "next/link";
import { Habit } from "@/lib/types";
import { isCompletedToday, getStreak, colorMap, today } from "@/lib/utils";
import { toggleHabitDate } from "@/lib/storage";

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
}

export default function HabitCard({ habit, onUpdate }: HabitCardProps) {
  const completed = isCompletedToday(habit);
  const streak = getStreak(habit.completedDates);
  const colors = colorMap[habit.color];

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleHabitDate(habit.id, today());
    onUpdate();
  };

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <Link href={`/habits/${habit.id}`}>
      <div
        className={`bg-white rounded-2xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer p-5 ${
          completed ? `border-current ${colors.text}` : "border-gray-100 hover:border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${colors.light}`}>
              {habit.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 leading-tight">{habit.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{habit.description}</p>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
              completed
                ? `${colors.bg} border-transparent text-white shadow-sm`
                : "border-gray-200 text-transparent hover:border-gray-300"
            }`}
          >
            ✓
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {last7.map((date) => {
              const done = habit.completedDates.includes(date);
              return (
                <div
                  key={date}
                  className={`w-5 h-5 rounded-md transition-colors ${
                    done ? `${colors.bg} opacity-80` : "bg-gray-100"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-1 text-sm">
            {streak > 0 && (
              <span className={`font-semibold ${colors.text}`}>
                🔥 {streak}d
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
