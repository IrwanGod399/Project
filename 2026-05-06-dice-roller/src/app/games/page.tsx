import Link from "next/link";

interface Game {
  name: string;
  emoji: string;
  players: string;
  dice: string;
  difficulty: "Easy" | "Medium" | "Hard";
  summary: string;
  objective: string;
  howToPlay: string[];
  tip: string;
}

const GAMES: Game[] = [
  {
    name: "Yahtzee",
    emoji: "🎯",
    players: "2–6",
    dice: "5 × d6",
    difficulty: "Easy",
    summary: "Roll five dice up to three times per turn to complete scoring combinations.",
    objective: "Score the most points by filling 13 combinations on your scorecard.",
    howToPlay: [
      "Roll all 5 dice. You may set aside any you want to keep.",
      "Roll the remaining dice up to 2 more times.",
      "After your final roll, choose which scoring box to fill in.",
      "Once a box is filled it cannot be changed — pick wisely!",
      "After 13 rounds each, tally scores. Highest wins.",
    ],
    tip: "Aim for the Yahtzee (five of a kind) bonus early — it's worth 50 points!",
  },
  {
    name: "Craps",
    emoji: "🎰",
    players: "2+",
    dice: "2 × d6",
    difficulty: "Medium",
    summary: "A classic casino game where players bet on the outcome of two-dice rolls.",
    objective: "On a 'Pass' bet, roll 7 or 11 on the come-out roll to win instantly.",
    howToPlay: [
      "Come-out roll: 7 or 11 wins the Pass bet; 2, 3, or 12 (craps) loses it.",
      "Any other number becomes the 'point' — a marker is placed on that number.",
      "Keep rolling until you hit the point again (win) or roll a 7 (lose).",
      "Side bets like 'Come', 'Don't Pass', and 'Place' bets add variety.",
    ],
    tip: "Stick to Pass/Don't Pass bets — they have the lowest house edge (~1.4%).",
  },
  {
    name: "Farkle",
    emoji: "🌀",
    players: "2–8",
    dice: "6 × d6",
    difficulty: "Easy",
    summary: "A push-your-luck game where you keep rolling for more points — or risk losing them all.",
    objective: "First player to reach 10,000 points wins.",
    howToPlay: [
      "Roll all 6 dice. Any 1s (100 pts) and 5s (50 pts) score, as do three-of-a-kinds.",
      "Set aside at least one scoring die, then choose to roll remaining dice or bank your points.",
      "If no dice score on a roll, you 'Farkle' and lose all points for that turn.",
      "Once you've banked 10,000 points, other players get one final turn to beat your score.",
    ],
    tip: "Always bank points when you're sitting on 300+. Greed is dangerous in Farkle!",
  },
  {
    name: "Dungeons & Dragons",
    emoji: "⚔️",
    players: "2–6",
    dice: "d4, d6, d8, d10, d12, d20",
    difficulty: "Hard",
    summary: "The world's greatest role-playing game using a full polyhedral dice set.",
    objective: "Work together as a party to complete quests, slay monsters, and tell an epic story.",
    howToPlay: [
      "The d20 is your main attack and skill-check die — add your proficiency bonus.",
      "Damage dice vary by weapon: daggers use d4, swords use d8, greatswords use 2d6.",
      "Roll a 20 for a critical hit and double your damage dice!",
      "The Dungeon Master sets the Difficulty Class (DC) you must meet or beat.",
      "Advantage means rolling 2d20 and taking the higher; Disadvantage takes the lower.",
    ],
    tip: "Use the d100 (two d10s) to determine random loot tables and wild-magic surges.",
  },
  {
    name: "Liar's Dice",
    emoji: "🤫",
    players: "2–6",
    dice: "5 × d6 per player",
    difficulty: "Medium",
    summary: "A bluffing game where players bid on dice hidden under cups.",
    objective: "Be the last player with dice remaining after catching everyone else's bluffs.",
    howToPlay: [
      "Each player secretly rolls their dice under a cup and peeks at their own.",
      "Starting player bids: e.g. 'Three 4s' (at least three 4s exist across all players).",
      "The next player either raises the bid (more dice or higher face) or calls 'Liar!'.",
      "If called, everyone reveals. If bid is true, the caller loses a die; if false, the bidder loses a die.",
      "A player with no dice left is out. Last player standing wins.",
    ],
    tip: "1s (Aces) are often wild — use them to your advantage when bidding!",
  },
  {
    name: "Zombie Dice",
    emoji: "🧟",
    players: "2–8",
    dice: "13 special d6",
    difficulty: "Easy",
    summary: "A fun push-your-luck horror game where you're the zombie hunting brains.",
    objective: "Collect 13 brains before the other zombies do.",
    howToPlay: [
      "Draw 3 dice randomly from the cup and roll them.",
      "Brains are points — set them aside. Shotguns are damage — set them aside too.",
      "Runners can be re-rolled (keep those dice for your next roll).",
      "After 3 shotguns, your turn ends and you score nothing — you've been stopped!",
      "Choose to stop and bank your brains, or keep drawing and rolling for more.",
    ],
    tip: "Green dice have more brains, red more shotguns. Draw more reds? Maybe stop.",
  },
];

const DIFFICULTY_COLOR: Record<Game["difficulty"], string> = {
  Easy:   "text-green-400 bg-green-900/30 border-green-800",
  Medium: "text-yellow-400 bg-yellow-900/30 border-yellow-800",
  Hard:   "text-red-400 bg-red-900/30 border-red-800",
};

function GameCard({ game }: { game: Game }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-purple-800 transition-colors flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{game.emoji}</span>
          <div>
            <h2 className="text-lg font-bold text-white">{game.name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{game.summary}</p>
          </div>
        </div>
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOR[game.difficulty]}`}
        >
          {game.difficulty}
        </span>
      </div>

      <div className="flex gap-4 text-xs">
        <div>
          <span className="text-gray-500">Players: </span>
          <span className="text-gray-300 font-medium">{game.players}</span>
        </div>
        <div>
          <span className="text-gray-500">Dice: </span>
          <span className="text-gray-300 font-medium">{game.dice}</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Objective</p>
        <p className="text-sm text-gray-300">{game.objective}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">How to Play</p>
        <ol className="space-y-1">
          {game.howToPlay.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-300">
              <span className="text-purple-500 font-bold shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-purple-900/20 border border-purple-900/40 rounded-xl p-3">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-0.5">Pro Tip</p>
        <p className="text-sm text-gray-300">{game.tip}</p>
      </div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Games Guide
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Learn 6 classic dice games — rules, tips, and more
        </p>
      </div>

      {/* Quick stats bar */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {(["Easy", "Medium", "Hard"] as Game["difficulty"][]).map((d) => {
          const count = GAMES.filter((g) => g.difficulty === d).length;
          return (
            <div key={d} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${DIFFICULTY_COLOR[d]}`}>
              <span className="font-semibold">{d}</span>
              <span className="opacity-70">×{count}</span>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {GAMES.map((game) => (
          <GameCard key={game.name} game={game} />
        ))}
      </div>

      <div className="text-center py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors shadow-lg shadow-purple-900/40"
        >
          🎲 Go Roll Some Dice
        </Link>
      </div>
    </div>
  );
}
