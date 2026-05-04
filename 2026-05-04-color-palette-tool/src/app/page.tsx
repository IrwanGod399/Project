'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  generatePalette,
  getTextColor,
  formatHsl,
  paletteToCss,
  HARMONY_MODES,
  type Color,
  type HarmonyMode,
  type SavedPalette,
} from '@/lib/colors';

const STORAGE_KEY = 'palettify-saved';

function IconCopy({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconLock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconUnlock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function IconHeart({ size = 16, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconRefresh({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export default function GeneratorPage() {
  const [mode, setMode] = useState<HarmonyMode>('random');
  const [colors, setColors] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [justSaved, setJustSaved] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const generate = useCallback(
    (currentColors?: Color[], currentMode?: HarmonyMode) => {
      const m = currentMode ?? mode;
      setColors((prev) => generatePalette(m, currentColors ?? prev));
      setAnimKey((k) => k + 1);
    },
    [mode]
  );

  useEffect(() => {
    generate([], 'random');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data: SavedPalette[] = raw ? JSON.parse(raw) : [];
      setSavedCount(data.length);
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setColors((prev) => {
          const next = generatePalette(mode, prev);
          setAnimKey((k) => k + 1);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode]);

  const handleModeChange = (m: HarmonyMode) => {
    setMode(m);
    const next = generatePalette(m, []);
    setColors(next);
    setAnimKey((k) => k + 1);
  };

  const handleCopy = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // fallback for older browsers
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const handleSave = () => {
    if (colors.length === 0) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data: SavedPalette[] = raw ? JSON.parse(raw) : [];
      const entry: SavedPalette = {
        id: Date.now().toString(),
        colors: colors.map((c) => c.hex),
        mode,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...data]));
      setSavedCount((n) => n + 1);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1800);
    } catch {}
  };

  const handleCopyCss = async () => {
    const css = paletteToCss(colors.map((c) => c.hex));
    try {
      await navigator.clipboard.writeText(css);
    } catch {}
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Color Palette Generator</h1>
        <p className="text-gray-500 text-lg">
          Press{' '}
          <kbd className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-sm font-mono">
            Space
          </kbd>{' '}
          or click Generate to create a new palette
        </p>
      </div>

      {/* Harmony Mode Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {HARMONY_MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => handleModeChange(m.value)}
            title={m.description}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              mode === m.value
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mb-8">
        {HARMONY_MODES.find((m) => m.value === mode)?.description}
      </p>

      {/* Palette Swatches */}
      {colors.length > 0 && (
        <div
          key={animKey}
          className="flex rounded-2xl overflow-hidden shadow-2xl mb-8 swatch-animate"
          style={{ height: '400px' }}
        >
          {colors.map((color, i) => {
            const textColor = getTextColor(color.hex);
            const isCopied = copiedIndex === i;
            return (
              <div
                key={i}
                className="flex-1 relative flex flex-col justify-end p-5 cursor-pointer group transition-all duration-200 hover:flex-[1.45]"
                style={{ backgroundColor: color.hex }}
                onClick={() => handleCopy(color.hex, i)}
              >
                {/* Lock button — visible on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLock(i);
                  }}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/20 hover:bg-black/35"
                  style={{ color: textColor }}
                  title={color.locked ? 'Unlock color' : 'Lock color'}
                >
                  {color.locked ? <IconLock size={14} /> : <IconUnlock size={14} />}
                </button>

                {/* Locked badge — always visible when locked */}
                {color.locked && (
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-black/25 group-hover:opacity-0 transition-opacity"
                    style={{ color: textColor }}
                  >
                    <IconLock size={12} />
                  </div>
                )}

                {/* Color info on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                  <div
                    className="flex items-center gap-1.5 font-mono text-sm font-semibold"
                    style={{ color: textColor }}
                  >
                    {isCopied ? (
                      <>
                        <IconCheck size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} />
                        <span>{color.hex.toUpperCase()}</span>
                      </>
                    )}
                  </div>
                  <div className="font-mono text-xs opacity-60" style={{ color: textColor }}>
                    {formatHsl(color.hsl)}
                  </div>
                </div>

                {/* Always-visible hex */}
                <div
                  className="font-mono text-xs font-semibold mt-1 group-hover:opacity-0 transition-opacity"
                  style={{ color: textColor, opacity: 0.65 }}
                >
                  {color.hex.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() =>
            setColors((prev) => {
              const next = generatePalette(mode, prev);
              setAnimKey((k) => k + 1);
              return next;
            })
          }
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors shadow-sm"
        >
          <IconRefresh size={16} />
          Generate
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-sm ${
            justSaved
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {justSaved ? <IconCheck size={16} /> : <IconHeart size={16} />}
          {justSaved
            ? 'Saved!'
            : `Save Palette${savedCount > 0 ? ` (${savedCount} saved)` : ''}`}
        </button>
        <button
          onClick={handleCopyCss}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
        >
          <IconCopy size={16} />
          Copy as CSS
        </button>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Tips</h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li>🖱️ Hover over any swatch to see its hex and HSL values</li>
          <li>📋 Click a swatch to copy its hex code to clipboard</li>
          <li>🔒 Click the lock icon on a swatch to keep that color when regenerating</li>
          <li>⌨️ Press <kbd className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">Space</kbd> to generate a new palette quickly</li>
          <li>💾 Save your favorites and view them on the Saved page</li>
        </ul>
      </div>
    </div>
  );
}
