export type Unit = "metric" | "imperial";

export interface BmiRecord {
  id: string;
  date: string;
  bmi: number;
  category: string;
  weight: number;
  height: number;
  unit: Unit;
}

export interface BmiCategory {
  label: string;
  range: string;
  color: string;
  bg: string;
  description: string;
  tips: string[];
}

export const CATEGORIES: BmiCategory[] = [
  {
    label: "Underweight",
    range: "< 18.5",
    color: "text-blue-400",
    bg: "bg-blue-500/20 border-blue-500/40",
    description: "You may be underweight. This can indicate nutritional deficiencies or other health issues.",
    tips: [
      "Increase caloric intake with nutrient-dense foods",
      "Add strength training to build muscle mass",
      "Consult a dietitian for a personalised meal plan",
      "Include healthy fats: avocados, nuts, olive oil",
    ],
  },
  {
    label: "Normal weight",
    range: "18.5 – 24.9",
    color: "text-emerald-400",
    bg: "bg-emerald-500/20 border-emerald-500/40",
    description: "Great! You are in a healthy weight range. Maintain it with balanced nutrition and regular activity.",
    tips: [
      "Eat a balanced diet rich in vegetables and whole grains",
      "Aim for 150 minutes of moderate exercise per week",
      "Stay hydrated – 8 glasses of water daily",
      "Get regular health check-ups",
    ],
  },
  {
    label: "Overweight",
    range: "25 – 29.9",
    color: "text-amber-400",
    bg: "bg-amber-500/20 border-amber-500/40",
    description: "You are slightly above the healthy range. Small lifestyle changes can make a big difference.",
    tips: [
      "Reduce portion sizes and limit processed foods",
      "Add 30 minutes of brisk walking daily",
      "Track your meals to stay mindful of intake",
      "Focus on sustainable habits, not crash diets",
    ],
  },
  {
    label: "Obese",
    range: "≥ 30",
    color: "text-red-400",
    bg: "bg-red-500/20 border-red-500/40",
    description: "Obesity is associated with increased health risks. Professional guidance is recommended.",
    tips: [
      "Seek advice from a healthcare professional",
      "Start with low-impact exercise like swimming or cycling",
      "Focus on whole foods and reduce sugar intake",
      "Set small, achievable weekly goals",
    ],
  },
];

export function calcBmi(weight: number, height: number, unit: Unit): number {
  if (unit === "metric") {
    // weight kg, height cm
    const h = height / 100;
    return weight / (h * h);
  } else {
    // weight lbs, height inches
    return (703 * weight) / (height * height);
  }
}

export function getCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return CATEGORIES[0];
  if (bmi < 25) return CATEGORIES[1];
  if (bmi < 30) return CATEGORIES[2];
  return CATEGORIES[3];
}

export function idealWeightRange(height: number, unit: Unit): [number, number] {
  if (unit === "metric") {
    const h = height / 100;
    return [18.5 * h * h, 24.9 * h * h];
  } else {
    return [(18.5 * height * height) / 703, (24.9 * height * height) / 703];
  }
}

const STORAGE_KEY = "bmi_history";

export function saveRecord(record: BmiRecord): void {
  if (typeof window === "undefined") return;
  const existing = loadHistory();
  const updated = [record, ...existing].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function loadHistory(): BmiRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
