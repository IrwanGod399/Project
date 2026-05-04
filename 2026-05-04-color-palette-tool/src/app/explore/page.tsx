'use client';
import { useState, useCallback } from 'react';
import { generatePalette, getTextColor, HARMONY_MODES, type HarmonyMode, type Color } from '@/lib/colors';

function IconRefresh({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

const HARMONY_DETAILS: Record<HarmonyMode, { emoji: string; longDesc: string; bestFor: string[] }> = {
  random: {
    emoji: '🎲',
    longDesc: 'Random palettes have no predetermined relationship between colors. They can produce unexpected and unique combinations that spark creativity.',
    bestFor: ['Inspiration', 'Exploration', 'Unexpected combinations'],
  },
  complementary: {
    emoji: '⚡',
    longDesc: 'Complementary colors sit opposite each other on the color wheel (180°). They create maximum contrast and visual tension, making each color pop.',
    bestFor: ['High-contrast UI', 'Sports branding', 'Call-to-action buttons'],
  },
  analogous: {
    emoji: '🌊',
    longDesc: 'Analogous colors are adjacent on the color wheel (within 30–60°). They create a harmonious, cohesive look that feels natural and pleasing.',
    bestFor: ['Nature themes', 'Calm interfaces', 'Backgrounds and gradients'],
  },
  triadic: {
    emoji: '🔺',
    longDesc: 'Triadic palettes use three colors equally spaced (120° apart) around the color wheel. They are vibrant and balanced while offering variety.',
    bestFor: ['Children\'s products', 'Energetic branding', 'Infographics'],
  },
  tetradic: {
    emoji: '🔷',
    longDesc: 'Tetradic (rectangular) harmonies use four colors at 90° intervals. They offer rich variety but require careful balance to avoid overwhelm.',
    bestFor: ['Complex illustrations', 'Data visualization', 'Rich editorial design'],
  },
  monochromatic: {
    emoji: '🎞️',
    longDesc: 'Monochromatic palettes use a single hue at different saturations and lightnesses. They are elegant, sophisticated, and easy to work with.',
    bestFor: ['Minimalist design', 'Luxury branding', 'Dark mode UIs'],
  },
  'split-complementary': {
    emoji: '🎯',
    longDesc: 'Split-complementary uses a base color plus the two colors adjacent to its complement (150° and 210°). Lower contrast than complementary but more nuanced.',
    bestFor: ['Softer contrast', 'Fashion', 'Interior design palettes'],
  },
};

function MiniPalette({ colors }: { colors: Color[] }) {
  return (
    <div className="flex rounded-xl overflow-hidden h-16 shadow-sm">
      {colors.map((color, i) => (
        <div
          key={i}
          className="flex-1 flex items-end justify-center pb-1 group cursor-pointer"
          style={{ backgroundColor: color.hex }}
          title={color.hex}
          onClick={() => navigator.clipboard.writeText(color.hex).catch(() => {})}
        >
          <span
            className="font-mono text-[8px] font-semibold opacity-0 group-hover:opacity-80 transition-opacity"
            style={{ color: getTextColor(color.hex) }}
          >
            {color.hex.slice(1).toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}

function HarmonyCard({ mode }: { mode: HarmonyMode }) {
  const info = HARMONY_MODES.find((m) => m.value === mode)!;
  const details = HARMONY_DETAILS[mode];
  const [palettes, setPalettes] = useState<Color[][]>(() =>
    Array.from({ length: 3 }, () => generatePalette(mode))
  );

  const refresh = useCallback(() => {
    setPalettes(Array.from({ length: 3 }, () => generatePalette(mode)));
  }, [mode]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{details.emoji}</span>
            <h2 className="text-lg font-bold text-gray-900">{info.label}</h2>
          </div>
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-all"
          >
            <IconRefresh size={12} />
            Refresh
          </button>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{details.longDesc}</p>
      </div>

      <div className="p-5 space-y-3">
        {palettes.map((pal, i) => (
          <MiniPalette key={i} colors={pal} />
        ))}
      </div>

      <div className="px-5 pb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Best for</p>
        <div className="flex flex-wrap gap-1.5">
          {details.bestFor.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Explore Color Harmonies</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Learn about the science behind beautiful color combinations. Each harmony mode follows
          color theory principles to create visually pleasing palettes.
        </p>
      </div>

      {/* Color wheel info banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center gap-6">
        <div className="text-6xl">🎨</div>
        <div>
          <h2 className="text-lg font-bold text-indigo-900 mb-1">The Color Wheel</h2>
          <p className="text-sm text-indigo-700 leading-relaxed">
            Color harmony is rooted in the relationships between hues on the color wheel. By
            understanding these angular relationships — complementary (180°), analogous (30°),
            triadic (120°), and more — designers create palettes with intentional emotional impact.
            Hover over any swatch below to copy its hex code.
          </p>
        </div>
      </div>

      {/* Harmony grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {HARMONY_MODES.map((m) => (
          <HarmonyCard key={m.value} mode={m.value} />
        ))}
      </div>

      {/* Quick reference table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Quick Reference</h2>
          <p className="text-sm text-gray-500 mt-1">Summary of all harmony types at a glance</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Mode</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Angle(s)</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Feel</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { mode: 'random', angle: 'N/A', feel: 'Unpredictable', complexity: '⭐' },
                { mode: 'monochromatic', angle: '0°', feel: 'Elegant, minimal', complexity: '⭐⭐' },
                { mode: 'analogous', angle: '30–60°', feel: 'Calm, natural', complexity: '⭐⭐' },
                { mode: 'complementary', angle: '180°', feel: 'Bold, high-contrast', complexity: '⭐⭐⭐' },
                { mode: 'split-complementary', angle: '150° / 210°', feel: 'Balanced, nuanced', complexity: '⭐⭐⭐' },
                { mode: 'triadic', angle: '120° / 240°', feel: 'Vibrant, lively', complexity: '⭐⭐⭐⭐' },
                { mode: 'tetradic', angle: '90° intervals', feel: 'Rich, complex', complexity: '⭐⭐⭐⭐⭐' },
              ].map((row) => (
                <tr key={row.mode} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-800 capitalize">
                    {HARMONY_MODES.find((m) => m.value === row.mode)?.label ?? row.mode}
                  </td>
                  <td className="px-6 py-3 font-mono text-gray-500">{row.angle}</td>
                  <td className="px-6 py-3 text-gray-600">{row.feel}</td>
                  <td className="px-6 py-3 text-gray-500">{row.complexity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
