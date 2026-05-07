"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { categories, Unit, convert, formatResult } from "@/lib/conversions";

type HistoryEntry = {
  id: string;
  category: string;
  categoryIcon: string;
  from: string;
  to: string;
  fromValue: string;
  toValue: string;
  timestamp: number;
};

export default function ConverterClient({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId)!;

  const [fromUnit, setFromUnit] = useState<Unit>(category.units[0]);
  const [toUnit, setToUnit] = useState<Unit>(category.units[1]);
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<"from" | "to">("from");

  const doConvert = useCallback(
    (value: string, from: Unit, to: Unit, dir: "from" | "to") => {
      const num = parseFloat(value);
      if (isNaN(num) || value === "" || value === "-") {
        if (dir === "from") setToValue("");
        else setFromValue("");
        return;
      }
      const result = convert(num, from, to);
      if (dir === "from") setToValue(formatResult(result));
      else setFromValue(formatResult(result));
    },
    []
  );

  useEffect(() => {
    if (direction === "from") {
      doConvert(fromValue, fromUnit, toUnit, "from");
    } else {
      doConvert(toValue, toUnit, fromUnit, "to");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromUnit, toUnit]);

  useEffect(() => {
    const cat = categories.find((c) => c.id === categoryId)!;
    setFromUnit(cat.units[0]);
    setToUnit(cat.units[1]);
    setFromValue("1");
    setDirection("from");
    doConvert("1", cat.units[0], cat.units[1], "from");
  }, [categoryId, doConvert]);

  const handleFromChange = (val: string) => {
    setFromValue(val);
    setDirection("from");
    doConvert(val, fromUnit, toUnit, "from");
  };

  const handleToChange = (val: string) => {
    setToValue(val);
    setDirection("to");
    doConvert(val, toUnit, fromUnit, "to");
  };

  const handleSwap = () => {
    const prevFrom = fromUnit;
    const prevTo = toUnit;
    const prevFromVal = fromValue;
    const prevToVal = toValue;
    setFromUnit(prevTo);
    setToUnit(prevFrom);
    setFromValue(prevToVal || "");
    setToValue(prevFromVal || "");
  };

  const handleCopy = async () => {
    if (!toValue) return;
    await navigator.clipboard.writeText(`${toValue} ${toUnit.symbol}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!fromValue || !toValue) return;
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      category: category.name,
      categoryIcon: category.icon,
      from: `${fromUnit.name} (${fromUnit.symbol})`,
      to: `${toUnit.name} (${toUnit.symbol})`,
      fromValue,
      toValue,
      timestamp: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem("unitflow-history") || "[]");
    const updated = [entry, ...existing].slice(0, 50);
    localStorage.setItem("unitflow-history", JSON.stringify(updated));
  }, [category, fromUnit, toUnit, fromValue, toValue]);

  const allUnits = category.units;
  const fromNum = parseFloat(fromValue);
  const isValidInput = !isNaN(fromNum) && fromValue !== "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-300">{category.name} Converter</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} text-3xl shadow-xl`}>
          {category.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{category.name} Converter</h1>
          <p className="text-gray-400 mt-1">{category.description}</p>
        </div>
      </div>

      {/* Main Converter Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* From */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">From</label>
            <select
              value={fromUnit.symbol}
              onChange={(e) => {
                const u = allUnits.find((u) => u.symbol === e.target.value) || allUnits[0];
                setFromUnit(u);
                setDirection("from");
                doConvert(fromValue, u, toUnit, "from");
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 mb-3 cursor-pointer"
            >
              {allUnits.map((u) => (
                <option key={u.symbol} value={u.symbol} className="bg-[#1a1a2e]">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromChange(e.target.value)}
                placeholder="Enter value..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-2xl font-light focus:outline-none focus:border-indigo-500/60 placeholder-gray-600 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                {fromUnit.symbol}
              </span>
            </div>
          </div>

          {/* Swap */}
          <div className="flex sm:flex-col items-center justify-center gap-2 my-2 sm:my-0">
            <button
              onClick={handleSwap}
              className="swap-btn w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200 text-gray-400 hover:text-white border border-white/10"
              title="Swap units"
            >
              <span className="swap-icon text-xl">⇄</span>
            </button>
          </div>

          {/* To */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">To</label>
            <select
              value={toUnit.symbol}
              onChange={(e) => {
                const u = allUnits.find((u) => u.symbol === e.target.value) || allUnits[1];
                setToUnit(u);
                setDirection("from");
                doConvert(fromValue, fromUnit, u, "from");
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 mb-3 cursor-pointer"
            >
              {allUnits.map((u) => (
                <option key={u.symbol} value={u.symbol} className="bg-[#1a1a2e]">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                type="number"
                value={toValue}
                onChange={(e) => handleToChange(e.target.value)}
                placeholder="Result..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-2xl font-light focus:outline-none focus:border-purple-500/60 placeholder-gray-600 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                {toUnit.symbol}
              </span>
            </div>
          </div>
        </div>

        {/* Result bar */}
        {isValidInput && toValue && (
          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <p className="text-indigo-300 text-sm flex-1 min-w-0">
              <span className="font-semibold text-white">{fromValue} {fromUnit.symbol}</span>
              {" = "}
              <span className="font-semibold text-purple-300">{toValue} {toUnit.symbol}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 glass rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              <button
                onClick={handleSaveToHistory}
                className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-xs font-medium text-indigo-300 hover:bg-indigo-500/30 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* All Conversions Table */}
      {isValidInput && (
        <div className="glass rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            All conversions for{" "}
            <span className="gradient-text">{fromValue} {fromUnit.symbol}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allUnits.filter((u) => u.symbol !== fromUnit.symbol).map((u) => {
              const result = formatResult(convert(fromNum, fromUnit, u));
              return (
                <div
                  key={u.symbol}
                  className="flex items-center justify-between px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl transition-colors duration-150 cursor-pointer"
                  onClick={() => {
                    setToUnit(u);
                    setToValue(result);
                  }}
                >
                  <span className="text-gray-400 text-sm">{u.name}</span>
                  <span className="text-white font-medium text-sm">
                    {result}{" "}
                    <span className="text-gray-500 text-xs">{u.symbol}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Categories */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.id !== category.id)
            .map((c) => (
              <Link
                key={c.id}
                href={`/convert/${c.id}`}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm text-gray-300 hover:text-white"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
