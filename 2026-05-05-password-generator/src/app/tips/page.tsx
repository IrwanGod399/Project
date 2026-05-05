export default function TipsPage() {
  const tips = [
    {
      icon: "🔑",
      title: "Use a unique password for every account",
      desc: "Reusing passwords means one breach can compromise all your accounts. A password manager makes this manageable.",
    },
    {
      icon: "📏",
      title: "Longer is stronger",
      desc: "A 20-character password is exponentially harder to crack than a 10-character one. Aim for at least 16 characters for critical accounts.",
    },
    {
      icon: "🎲",
      title: "Randomness beats cleverness",
      desc: 'Replacing "a" with "@" or adding "123" to the end are well-known tricks. True randomness from a generator is far more secure.',
    },
    {
      icon: "🏦",
      title: "Use a password manager",
      desc: "Tools like Bitwarden, 1Password, or KeePassXC generate and store strong, unique passwords so you only need to remember one master password.",
    },
    {
      icon: "📱",
      title: "Enable Two-Factor Authentication (2FA)",
      desc: "Even a stolen password is useless without the second factor. Use an authenticator app (not SMS) for important accounts.",
    },
    {
      icon: "🚫",
      title: "Never share passwords",
      desc: "Legitimate services never ask for your password. Don't share via email, chat, or text — use a password manager's secure sharing instead.",
    },
    {
      icon: "🔄",
      title: "Rotate passwords after a breach",
      desc: "Monitor haveibeenpwned.com. If an account appears in a breach, change that password immediately and update any accounts that shared it.",
    },
    {
      icon: "🧠",
      title: "Passphrase as an alternative",
      desc: 'A passphrase of 4-5 random words (e.g., "correct-horse-battery-staple") is long, memorable, and strong — great for master passwords.',
    },
  ];

  const dos = [
    "Use 16+ character passwords for all important accounts",
    "Enable multi-factor authentication everywhere available",
    "Store passwords in a reputable password manager",
    "Check haveibeenpwned.com to see if your email was breached",
    "Use different passwords for email, banking, and social media",
  ];

  const donts = [
    "Use personal info (names, birthdays, pet names)",
    "Reuse passwords across sites",
    "Write passwords on sticky notes or plain text files",
    "Share passwords via email or messaging apps",
    'Use common patterns like "Password1!" or "qwerty123"',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Security Tips</h1>
        <p className="text-slate-400">What you need to know to stay secure online</p>
      </div>

      {/* Tips grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tips.map(tip => (
          <div
            key={tip.title}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-2 hover:border-indigo-500/50 transition-colors"
          >
            <div className="text-3xl">{tip.icon}</div>
            <h3 className="font-semibold text-white">{tip.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Do / Don't */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-green-400 text-lg">✅ Do</h2>
          <ul className="space-y-3">
            {dos.map(d => (
              <li key={d} className="flex gap-2 text-sm text-slate-300">
                <span className="text-green-400 shrink-0">•</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-red-400 text-lg">❌ Don&apos;t</h2>
          <ul className="space-y-3">
            {donts.map(d => (
              <li key={d} className="flex gap-2 text-sm text-slate-300">
                <span className="text-red-400 shrink-0">•</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Password entropy callout */}
      <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-indigo-300 text-lg">🔬 How Password Entropy Works</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Password strength is measured in bits of <strong>entropy</strong>. Each bit doubles the number of possibilities.
          A 16-character password using uppercase, lowercase, numbers, and symbols draws from a pool of ~95 characters,
          giving roughly <strong>105 bits of entropy</strong> — that&apos;s over 40 septillion possible combinations.
          Even the fastest cracking hardware would take billions of years.
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { chars: "95", length: "8",  entropy: "52 bits", time: "hours" },
            { chars: "95", length: "12", entropy: "79 bits", time: "centuries" },
            { chars: "95", length: "16", entropy: "105 bits", time: "billions of years" },
          ].map(row => (
            <div key={row.length} className="bg-slate-800 rounded-xl p-3 space-y-1">
              <div className="text-2xl font-bold text-indigo-400">{row.length}</div>
              <div className="text-xs text-slate-400">chars</div>
              <div className="text-xs font-mono text-slate-300">{row.entropy}</div>
              <div className="text-xs text-slate-500">~{row.time} to crack</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
