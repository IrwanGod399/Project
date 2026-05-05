"use client";
import { useState, useEffect } from "react";
import { Settings, DEFAULT_SETTINGS } from "@/lib/types";
import { getSettings, saveSettings } from "@/lib/storage";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  accent?: string;
}

function Slider({ label, value, min, max, unit, onChange, accent = "#ef4444" }: SliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/70 text-sm font-medium">{label}</span>
        <span className="text-white font-bold text-sm">
          {value} {unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accent} 0%, ${accent} ${
              ((value - min) / (max - min)) * 100
            }%, rgba(255,255,255,0.1) ${
              ((value - min) / (max - min)) * 100
            }%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, description, value, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <div>
        <div className="text-white/70 text-sm font-medium">{label}</div>
        <div className="text-white/30 text-xs mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          value ? "bg-red-500" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto fade-in">
        <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

        {/* Timer durations */}
        <section className="bg-white/5 rounded-2xl p-6 mb-4">
          <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-5">
            Timer Durations
          </h2>
          <Slider
            label="Focus"
            value={settings.focusDuration}
            min={5}
            max={60}
            unit="min"
            onChange={(v) => update("focusDuration", v)}
            accent="#ef4444"
          />
          <Slider
            label="Short Break"
            value={settings.shortBreak}
            min={1}
            max={30}
            unit="min"
            onChange={(v) => update("shortBreak", v)}
            accent="#22c55e"
          />
          <Slider
            label="Long Break"
            value={settings.longBreak}
            min={5}
            max={60}
            unit="min"
            onChange={(v) => update("longBreak", v)}
            accent="#3b82f6"
          />
          <Slider
            label="Long Break Interval"
            value={settings.longBreakInterval}
            min={2}
            max={8}
            unit="pomodoros"
            onChange={(v) => update("longBreakInterval", v)}
            accent="#a855f7"
          />
        </section>

        {/* Auto-start */}
        <section className="bg-white/5 rounded-2xl px-6 py-2 mb-4">
          <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider pt-4 pb-2">
            Auto-start
          </h2>
          <Toggle
            label="Auto-start Breaks"
            description="Start breaks automatically after focus sessions"
            value={settings.autoStartBreaks}
            onChange={(v) => update("autoStartBreaks", v)}
          />
          <Toggle
            label="Auto-start Focus"
            description="Start focus sessions automatically after breaks"
            value={settings.autoStartFocus}
            onChange={(v) => update("autoStartFocus", v)}
          />
          <div className="pb-2" />
        </section>

        {/* Save buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm font-medium transition-all"
          >
            Reset to defaults
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              saved
                ? "bg-green-500 text-white"
                : "bg-red-500 hover:bg-red-400 text-white"
            }`}
          >
            {saved ? "Saved!" : "Save changes"}
          </button>
        </div>

        {/* Preset quick picks */}
        <section className="mt-8">
          <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
            Presets
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "Classic", focus: 25, short: 5, long: 15 },
              { name: "Extended", focus: 50, short: 10, long: 30 },
              { name: "Short", focus: 15, short: 3, long: 10 },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setSettings((prev) => ({
                    ...prev,
                    focusDuration: preset.focus,
                    shortBreak: preset.short,
                    longBreak: preset.long,
                  }));
                  setSaved(false);
                }}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-3 text-center transition-all"
              >
                <div className="text-white text-sm font-semibold">{preset.name}</div>
                <div className="text-white/30 text-xs mt-1">
                  {preset.focus}/{preset.short}/{preset.long}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
