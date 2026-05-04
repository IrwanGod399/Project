'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { paletteToCss, getTextColor, type SavedPalette, HARMONY_MODES } from '@/lib/colors';

const STORAGE_KEY = 'palettify-saved';

function IconTrash({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

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

function IconArrowLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getModeLabel(mode: string): string {
  return HARMONY_MODES.find((m) => m.value === mode)?.label ?? mode;
}

export default function SavedPage() {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setPalettes(raw ? JSON.parse(raw) : []);
    } catch {
      setPalettes([]);
    }
  }, []);

  const deletePalette = (id: string) => {
    setPalettes((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearAll = () => {
    if (!confirm('Delete all saved palettes?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setPalettes([]);
  };

  const copyCss = async (palette: SavedPalette) => {
    const css = paletteToCss(palette.colors);
    try {
      await navigator.clipboard.writeText(css);
    } catch {}
    setCopiedId(palette.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-3"
          >
            <IconArrowLeft size={14} />
            Back to Generator
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Saved Palettes</h1>
          <p className="text-gray-500 mt-1">
            {palettes.length === 0
              ? 'No saved palettes yet'
              : `${palettes.length} palette${palettes.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        {palettes.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <IconTrash size={14} />
            Clear All
          </button>
        )}
      </div>

      {palettes.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No saved palettes yet</h2>
          <p className="text-gray-400 mb-6">Generate a palette and click &ldquo;Save Palette&rdquo; to keep it here.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Generator
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Color strip */}
              <div className="flex h-28">
                {palette.colors.map((hex, i) => (
                  <div
                    key={i}
                    className="flex-1 flex items-end justify-center pb-1.5 group cursor-pointer transition-all hover:flex-[1.3]"
                    style={{ backgroundColor: hex }}
                    onClick={() => {
                      navigator.clipboard.writeText(hex).catch(() => {});
                    }}
                    title={`Copy ${hex}`}
                  >
                    <span
                      className="font-mono text-[9px] font-semibold opacity-0 group-hover:opacity-80 transition-opacity"
                      style={{ color: getTextColor(hex) }}
                    >
                      {hex.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                    {getModeLabel(palette.mode)}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(palette.savedAt)}</span>
                </div>

                {/* Hex list */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {palette.colors.map((hex, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                    >
                      {hex.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyCss(palette)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border transition-all ${
                      copiedId === palette.id
                        ? 'border-green-200 bg-green-50 text-green-600'
                        : 'border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'
                    }`}
                  >
                    {copiedId === palette.id ? (
                      <>
                        <IconCheck size={12} />
                        Copied CSS!
                      </>
                    ) : (
                      <>
                        <IconCopy size={12} />
                        Copy as CSS
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deletePalette(palette.id)}
                    className="flex items-center justify-center p-2 text-gray-400 border border-gray-200 rounded-lg hover:border-red-200 hover:text-red-500 transition-all"
                    title="Delete palette"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
