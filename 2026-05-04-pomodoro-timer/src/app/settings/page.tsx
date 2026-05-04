"use client";

import { useState, useEffect } from "react";
import { getSettings, saveSettings, Settings, DEFAULT_SETTINGS } from "@/lib/storage";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        value ? "bg-rose-500" : "bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
          value ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}
function Slider({ label, value, min, max, unit = "min", onChange }: SliderProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-slate-300">{label}</label>
        <span className="text-sm font-semibold text-white tabular-nums">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-slate-700 accent-rose-500 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-700 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-slate-500 text-sm mb-8">Customize your Pomodoro experience.</p>

      <div className="space-y-5">
        {/* Durations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">Timer Durations</h2>
          <div className="space-y-7">
            <Slider
              label="Focus"
              value={settings.focusDuration}
              min={5}
              max={60}
              onChange={(v) => set("focusDuration", v)}
            />
            <Slider
              label="Short Break"
              value={settings.shortBreakDuration}
              min={1}
              max={30}
              onChange={(v) => set("shortBreakDuration", v)}
            />
            <Slider
              label="Long Break"
              value={settings.longBreakDuration}
              min={5}
              max={60}
              onChange={(v) => set("longBreakDuration", v)}
            />
          </div>
        </div>

        {/* Sessions config */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">Session Config</h2>
          <div className="space-y-7">
            <Slider
              label="Sessions until long break"
              value={settings.sessionsUntilLongBreak}
              min={2}
              max={8}
              unit=""
              onChange={(v) => set("sessionsUntilLongBreak", v)}
            />
            <div className="space-y-4 pt-1">
              {(
                [
                  { key: "autoStartBreaks" as const, label: "Auto-start breaks" },
                  { key: "autoStartFocus" as const, label: "Auto-start focus sessions" },
                ] as const
              ).map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{label}</span>
                  <Toggle value={settings[key]} onChange={(v) => set(key, v)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-3">About Pomodoro</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            The Pomodoro Technique was developed by Francesco Cirillo. Work for {settings.focusDuration} minutes,
            then take a {settings.shortBreakDuration}-minute break. After{" "}
            {settings.sessionsUntilLongBreak} sessions, enjoy a longer{" "}
            {settings.longBreakDuration}-minute break.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium text-sm"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg ${
              saved ? "bg-emerald-500 shadow-emerald-500/20" : "bg-rose-500 hover:bg-rose-400 shadow-rose-500/20"
            }`}
          >
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
