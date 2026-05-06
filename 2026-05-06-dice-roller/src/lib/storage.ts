export interface RollRecord {
  id: string;
  timestamp: number;
  diceType: string;
  count: number;
  results: number[];
  total: number;
  modifier: number;
}

const KEY = "dice-roller-history";

export function loadHistory(): RollRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRoll(record: Omit<RollRecord, "id" | "timestamp">): RollRecord {
  const full: RollRecord = {
    ...record,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  const history = loadHistory();
  history.unshift(full);
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 200)));
  return full;
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
