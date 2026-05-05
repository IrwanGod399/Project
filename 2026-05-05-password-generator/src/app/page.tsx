"use client";

import { useState, useCallback } from "react";
import { generatePassword, saveToHistory, getStrength, type PasswordOptions } from "@/lib/password";
import StrengthMeter from "@/components/StrengthMeter";

const DEFAULT_OPTS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

export default function GeneratorPage() {
  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTS);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const generate = useCallback(() => {
    const pw = generatePassword(opts);
    setPassword(pw);
    setCopied(false);
    setSaved(false);
  }, [opts]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const save = () => {
    if (!password) return;
    const { level } = getStrength(password);
    saveToHistory({ password, strength: level, length: password.length });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (key: keyof PasswordOptions) => {
    if (key === "length") return;
    const next = { ...opts, [key]: !opts[key] };
    const anyCharSet = next.uppercase || next.lowercase || next.numbers || next.symbols;
    if (!anyCharSet) return;
    setOpts(next);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-indigo-400">PassForge</h1>
        <p className="text-slate-400">Generate strong, unique passwords in one click</p>
      </div>

      {/* Output */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
        <div
          className={`font-mono text-lg break-all min-h-[3rem] rounded-xl px-4 py-3 bg-slate-900 border-2 transition-all duration-300 ${
            password
              ? "border-indigo-500 text-white"
              : "border-slate-700 text-slate-500"
          }`}
        >
          {password || "Click Generate to create a password…"}
        </div>

        <StrengthMeter password={password} />

        <div className="flex gap-2">
          <button
            onClick={generate}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            ⚡ Generate
          </button>
          <button
            onClick={copy}
            disabled={!password}
            className="px-5 py-3 rounded-xl font-medium transition-colors disabled:opacity-40 bg-slate-700 hover:bg-slate-600 text-white"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={save}
            disabled={!password}
            className="px-5 py-3 rounded-xl font-medium transition-colors disabled:opacity-40 bg-slate-700 hover:bg-slate-600 text-white"
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Options</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Length</span>
            <span className="text-indigo-400 font-bold">{opts.length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={opts.length}
            onChange={e => setOpts(o => ({ ...o, length: Number(e.target.value) }))}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(["uppercase", "lowercase", "numbers", "symbols"] as const).map(key => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                opts[key]
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                  : "bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500"
              }`}
            >
              <span className="capitalize">{key}</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                opts[key] ? "bg-indigo-500 border-indigo-500 text-white" : "border-slate-500"
              }`}>
                {opts[key] ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 bg-slate-900 rounded-xl px-4 py-3 font-mono break-all">
          {[
            opts.uppercase && "A–Z",
            opts.lowercase && "a–z",
            opts.numbers   && "0–9",
            opts.symbols   && "!@#…",
          ].filter(Boolean).join(" · ") || "No character sets selected"}
        </div>
      </div>

      {/* Quick presets */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Quick Presets</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "PIN (6)",  opts: { length: 6,  uppercase: false, lowercase: false, numbers: true,  symbols: false } },
            { label: "Medium",   opts: { length: 12, uppercase: true,  lowercase: true,  numbers: true,  symbols: false } },
            { label: "Ultra",    opts: { length: 32, uppercase: true,  lowercase: true,  numbers: true,  symbols: true  } },
          ].map(preset => (
            <button
              key={preset.label}
              onClick={() => { setOpts(preset.opts); setPassword(""); }}
              className="px-4 py-3 bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-xl text-sm font-medium text-slate-300 hover:text-indigo-300 transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
