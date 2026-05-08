export interface Lap {
  number: number;
  lapTime: number;
  totalTime: number;
}

export interface Session {
  id: string;
  name: string;
  date: string;
  duration: number;
  laps: Lap[];
}
