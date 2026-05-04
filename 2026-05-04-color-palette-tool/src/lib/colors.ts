export interface Color {
  hex: string;
  hsl: { h: number; s: number; l: number };
  locked: boolean;
}

export interface SavedPalette {
  id: string;
  colors: string[];
  mode: HarmonyMode;
  savedAt: string;
}

export type HarmonyMode =
  | 'random'
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'tetradic'
  | 'monochromatic'
  | 'split-complementary';

export const HARMONY_MODES: { value: HarmonyMode; label: string; description: string }[] = [
  { value: 'random', label: 'Random', description: 'Completely random colors for unexpected combinations' },
  { value: 'complementary', label: 'Complementary', description: 'Colors opposite on the color wheel for high contrast' },
  { value: 'analogous', label: 'Analogous', description: 'Adjacent colors for a harmonious, serene feel' },
  { value: 'triadic', label: 'Triadic', description: 'Three evenly spaced hues for vibrant balance' },
  { value: 'tetradic', label: 'Tetradic', description: 'Four hues in rectangular arrangement for richness' },
  { value: 'monochromatic', label: 'Monochromatic', description: 'One hue with varying lightness for elegance' },
  { value: 'split-complementary', label: 'Split-Comp', description: 'Base color plus two adjacent complements' },
];

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeColor(h: number, s: number, l: number): Color {
  const hex = hslToHex(h, s, l);
  return { hex, hsl: { h, s, l }, locked: false };
}

export function generatePalette(mode: HarmonyMode, existing?: Color[]): Color[] {
  const baseH = rand(0, 359);
  const baseS = rand(60, 85);
  const baseL = rand(40, 58);

  if (mode === 'monochromatic') {
    return [20, 35, 50, 65, 80].map((l, i) => {
      if (existing?.[i]?.locked) return existing[i];
      return makeColor(baseH, baseS, l);
    });
  }

  if (mode === 'random') {
    return Array.from({ length: 5 }, (_, i) => {
      if (existing?.[i]?.locked) return existing[i];
      const h = rand(0, 359);
      const s = rand(55, 90);
      const l = rand(35, 65);
      return makeColor(h, s, l);
    });
  }

  const hueOffsets: Record<Exclude<HarmonyMode, 'random' | 'monochromatic'>, number[]> = {
    complementary: [0, 25, 155, 180, 205],
    analogous: [-40, -20, 0, 20, 40],
    triadic: [0, 110, 120, 240, 250],
    tetradic: [0, 90, 180, 270, 45],
    'split-complementary': [0, 55, 150, 180, 210],
  };

  const offsets = hueOffsets[mode as keyof typeof hueOffsets];
  return offsets.map((offset, i) => {
    if (existing?.[i]?.locked) return existing[i];
    const h = ((baseH + offset) % 360 + 360) % 360;
    const s = rand(62, 84);
    const l = rand(38, 62);
    return makeColor(h, s, l);
  });
}

export function formatHsl(hsl: { h: number; s: number; l: number }): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function paletteToCss(hexCodes: string[]): string {
  const vars = hexCodes
    .map((hex, i) => `  --color-${i + 1}: ${hex};`)
    .join('\n');
  return `:root {\n${vars}\n}`;
}
