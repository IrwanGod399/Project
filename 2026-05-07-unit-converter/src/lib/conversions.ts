export type Unit = {
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  units: Unit[];
};

export const categories: Category[] = [
  {
    id: "length",
    name: "Length",
    icon: "📏",
    description: "Convert between meters, feet, miles and more",
    color: "from-blue-500 to-cyan-500",
    units: [
      { name: "Kilometer", symbol: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: "Meter", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
      { name: "Centimeter", symbol: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { name: "Millimeter", symbol: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: "Mile", symbol: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { name: "Yard", symbol: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { name: "Foot", symbol: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { name: "Inch", symbol: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { name: "Nautical Mile", symbol: "nmi", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  {
    id: "weight",
    name: "Weight",
    icon: "⚖️",
    description: "Convert between kilograms, pounds, ounces and more",
    color: "from-purple-500 to-pink-500",
    units: [
      { name: "Metric Ton", symbol: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: "Kilogram", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
      { name: "Gram", symbol: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: "Milligram", symbol: "mg", toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { name: "Pound", symbol: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { name: "Ounce", symbol: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { name: "Stone", symbol: "st", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "🌡️",
    description: "Convert between Celsius, Fahrenheit, Kelvin",
    color: "from-orange-500 to-red-500",
    units: [
      {
        name: "Celsius",
        symbol: "°C",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: "Fahrenheit",
        symbol: "°F",
        toBase: (v) => (v - 32) * (5 / 9),
        fromBase: (v) => v * (9 / 5) + 32,
      },
      {
        name: "Kelvin",
        symbol: "K",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
      {
        name: "Rankine",
        symbol: "°R",
        toBase: (v) => (v - 491.67) * (5 / 9),
        fromBase: (v) => (v + 273.15) * (9 / 5),
      },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "🧪",
    description: "Convert between liters, gallons, cups and more",
    color: "from-teal-500 to-green-500",
    units: [
      { name: "Cubic Meter", symbol: "m³", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: "Liter", symbol: "L", toBase: (v) => v, fromBase: (v) => v },
      { name: "Milliliter", symbol: "mL", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: "US Gallon", symbol: "gal", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { name: "US Quart", symbol: "qt", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { name: "US Pint", symbol: "pt", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      { name: "US Cup", symbol: "cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { name: "Fluid Ounce", symbol: "fl oz", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      { name: "Tablespoon", symbol: "tbsp", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "🚀",
    description: "Convert between km/h, mph, knots and more",
    color: "from-yellow-500 to-orange-500",
    units: [
      { name: "Meter/Second", symbol: "m/s", toBase: (v) => v, fromBase: (v) => v },
      { name: "Kilometer/Hour", symbol: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { name: "Mile/Hour", symbol: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { name: "Knot", symbol: "kn", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { name: "Foot/Second", symbol: "ft/s", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { name: "Mach", symbol: "Ma", toBase: (v) => v * 340.29, fromBase: (v) => v / 340.29 },
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "🗺️",
    description: "Convert between square meters, acres, hectares and more",
    color: "from-indigo-500 to-blue-500",
    units: [
      { name: "Square Kilometer", symbol: "km²", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { name: "Square Meter", symbol: "m²", toBase: (v) => v, fromBase: (v) => v },
      { name: "Square Centimeter", symbol: "cm²", toBase: (v) => v / 10_000, fromBase: (v) => v * 10_000 },
      { name: "Hectare", symbol: "ha", toBase: (v) => v * 10_000, fromBase: (v) => v / 10_000 },
      { name: "Acre", symbol: "ac", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { name: "Square Mile", symbol: "mi²", toBase: (v) => v * 2_589_988, fromBase: (v) => v / 2_589_988 },
      { name: "Square Foot", symbol: "ft²", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { name: "Square Inch", symbol: "in²", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
    ],
  },
  {
    id: "data",
    name: "Data",
    icon: "💾",
    description: "Convert between bytes, kilobytes, megabytes and more",
    color: "from-gray-600 to-gray-800",
    units: [
      { name: "Bit", symbol: "bit", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { name: "Byte", symbol: "B", toBase: (v) => v, fromBase: (v) => v },
      { name: "Kilobyte", symbol: "KB", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { name: "Megabyte", symbol: "MB", toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      { name: "Gigabyte", symbol: "GB", toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      { name: "Terabyte", symbol: "TB", toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
      { name: "Petabyte", symbol: "PB", toBase: (v) => v * 1024 ** 5, fromBase: (v) => v / 1024 ** 5 },
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    icon: "🌬️",
    description: "Convert between Pascal, Bar, PSI, atmosphere and more",
    color: "from-rose-500 to-pink-500",
    units: [
      { name: "Pascal", symbol: "Pa", toBase: (v) => v, fromBase: (v) => v },
      { name: "Kilopascal", symbol: "kPa", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: "Megapascal", symbol: "MPa", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { name: "Bar", symbol: "bar", toBase: (v) => v * 100_000, fromBase: (v) => v / 100_000 },
      { name: "Atmosphere", symbol: "atm", toBase: (v) => v * 101_325, fromBase: (v) => v / 101_325 },
      { name: "PSI", symbol: "psi", toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
      { name: "Torr", symbol: "Torr", toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    ],
  },
];

export function convert(value: number, from: Unit, to: Unit): number {
  const base = from.toBase(value);
  return to.fromBase(base);
}

export function formatResult(value: number): string {
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }
  if (Number.isInteger(value)) return value.toString();
  return parseFloat(value.toPrecision(10)).toString();
}
