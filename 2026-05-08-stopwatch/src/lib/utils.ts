export function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

export function formatDuration(ms: number): string {
  if (ms < 60000) {
    const seconds = (ms / 1000).toFixed(2);
    return `${seconds}s`;
  }
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0).padStart(2, "0");
  return `${minutes}m ${seconds}s`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const SAMPLE_SESSIONS = [
  {
    id: "abc123",
    name: "Morning Sprint Intervals",
    date: "2026-05-07T08:15:00Z",
    duration: 125430,
    laps: [
      { number: 1, lapTime: 30120, totalTime: 30120 },
      { number: 2, lapTime: 28540, totalTime: 58660 },
      { number: 3, lapTime: 31890, totalTime: 90550 },
      { number: 4, lapTime: 34880, totalTime: 125430 },
    ],
  },
  {
    id: "def456",
    name: "Track Practice",
    date: "2026-05-06T17:30:00Z",
    duration: 241800,
    laps: [
      { number: 1, lapTime: 58200, totalTime: 58200 },
      { number: 2, lapTime: 61400, totalTime: 119600 },
      { number: 3, lapTime: 59900, totalTime: 179500 },
      { number: 4, lapTime: 62300, totalTime: 241800 },
    ],
  },
  {
    id: "ghi789",
    name: "Coding Challenge Timer",
    date: "2026-05-05T14:00:00Z",
    duration: 3600000,
    laps: [
      { number: 1, lapTime: 900000, totalTime: 900000 },
      { number: 2, lapTime: 1200000, totalTime: 2100000 },
      { number: 3, lapTime: 1500000, totalTime: 3600000 },
    ],
  },
];
