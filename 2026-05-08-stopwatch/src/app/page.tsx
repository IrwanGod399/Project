import StopwatchApp from "@/components/StopwatchApp";

export default function Home() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Precision Stopwatch</h1>
        <p className="text-slate-500 mt-1 text-sm">Track laps, save sessions, review history</p>
      </div>
      <StopwatchApp />
    </div>
  );
}
