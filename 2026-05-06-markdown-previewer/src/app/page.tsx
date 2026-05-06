import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "Real-time Preview",
    desc: "See your formatted Markdown instantly as you type — zero lag, zero compile step.",
  },
  {
    icon: "🎨",
    title: "Beautiful Rendering",
    desc: "Tables, code blocks, blockquotes, and more rendered with stunning dark-theme styling.",
  },
  {
    icon: "📋",
    title: "Template Library",
    desc: "Jump-start any document with curated templates: README, blog post, notes, API docs, and more.",
  },
  {
    icon: "📤",
    title: "One-click Export",
    desc: "Copy raw Markdown or the rendered HTML to your clipboard instantly.",
  },
  {
    icon: "🔢",
    title: "Word Counter",
    desc: "Live word, character, and line count so you always know the size of your document.",
  },
  {
    icon: "🗂️",
    title: "Split or Focus",
    desc: "Switch between split-pane, editor-only, or preview-only view at any time.",
  },
];

const DEMO_MD = `# Hello, **MarkdownFlow**!

Write on the left, see magic on the right.

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("world"));
\`\`\`

> "The best way to predict the future is to *invent* it." — Alan Kay

| Feature     | Status |
|-------------|--------|
| Live Preview | ✅ |
| Templates   | ✅ |
| Export      | ✅ |
`;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950 border border-indigo-700 rounded-full text-indigo-300 text-sm mb-6">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            Live Markdown Editor — No sign-up needed
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Write Markdown,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              see it shine.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            MarkdownFlow is a fast, beautiful, in-browser Markdown previewer with templates, export, and live word count. No setup. No accounts. Just write.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/editor"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-900/50 text-base"
            >
              Open Editor →
            </Link>
            <Link
              href="/templates"
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-all border border-slate-700 text-base"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Preview Card */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-slate-800 bg-[#161b27] overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-[#0f1117]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-slate-500 font-mono">markdownflow — editor</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-800">
            <div className="p-5">
              <p className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-wider">Markdown</p>
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">{DEMO_MD}</pre>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-wider">Preview</p>
              <div className="prose-dark space-y-2">
                <h1 className="text-xl font-bold text-white border-b border-slate-700 pb-2">
                  Hello, <strong>MarkdownFlow</strong>!
                </h1>
                <p className="text-slate-300 text-sm">Write on the left, see magic on the right.</p>
                <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300">
                  <code>{`const greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("world"));`}</code>
                </pre>
                <blockquote className="border-l-4 border-indigo-500 pl-3 text-slate-400 text-sm italic">
                  "The best way to predict the future is to <em>invent</em> it." — Alan Kay
                </blockquote>
                <table className="text-sm w-full">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left px-3 py-1.5 text-slate-200 border border-slate-700">Feature</th>
                      <th className="text-left px-3 py-1.5 text-slate-200 border border-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[["Live Preview", "✅"], ["Templates", "✅"], ["Export", "✅"]].map(([f, s]) => (
                      <tr key={f}>
                        <td className="px-3 py-1 border border-slate-700 text-slate-300">{f}</td>
                        <td className="px-3 py-1 border border-slate-700 text-slate-300">{s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Everything you need to write great Markdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-[#161b27] border border-slate-800 rounded-xl p-5 hover:border-indigo-700/60 transition-all">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 text-center px-4">
        <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-900/50 to-purple-900/30 border border-indigo-800/50 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to write?</h2>
          <p className="text-slate-400 mb-6">No account. No installs. Just open the editor and start writing.</p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-900/50"
          >
            Launch Editor →
          </Link>
        </div>
      </section>
    </div>
  );
}
