import Leaderboard from "@/components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="text-slate-500">
          Top scores from all your sessions, sorted by WPM. Save a score from the test page to appear here.
        </p>
      </div>
      <Leaderboard />
    </div>
  );
}
