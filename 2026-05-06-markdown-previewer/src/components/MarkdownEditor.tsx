"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DEFAULT_MARKDOWN = `# Welcome to MarkdownFlow ✨

A **live Markdown editor** with instant preview. Start typing to see changes in real time.

---

## Features

- ✅ **Bold** and *italic* text
- ✅ \`Inline code\` and fenced code blocks
- ✅ Tables, blockquotes, and horizontal rules
- ✅ [Links](https://github.com) and ~~strikethrough~~
- ✅ Ordered and unordered lists

---

## Code Example

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
\`\`\`

## Blockquote

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

## Table

| Language   | Type       | Created |
|------------|------------|---------|
| TypeScript | Typed JS   | 2012    |
| Rust       | Systems    | 2010    |
| Go         | Concurrent | 2009    |

---

## Task List

- [x] Create the markdown editor
- [x] Add live preview
- [ ] Write more awesome content
- [ ] Share with the world

Happy writing! 🚀
`;

type ViewMode = "split" | "editor" | "preview";

function countStats(text: string) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const lines = text.split("\n").length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, lines, readingTime };
}

export default function MarkdownEditor({ initialValue }: { initialValue?: string }) {
  const [markdown, setMarkdown] = useState(initialValue ?? DEFAULT_MARKDOWN);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [copied, setCopied] = useState<"md" | "html" | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const stats = countStats(markdown);

  const handleCopy = useCallback(async (type: "md" | "html") => {
    let text = markdown;
    if (type === "html") {
      text = previewRef.current?.innerHTML ?? markdown;
    }
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1800);
  }, [markdown]);

  const handleClear = useCallback(() => {
    if (confirm("Clear all content?")) setMarkdown("");
  }, []);

  const insertSnippet = useCallback((snippet: string) => {
    setMarkdown((prev) => prev + "\n" + snippet);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-[#0f1117] flex-wrap">
        {/* View toggles */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 gap-0.5">
          {(["split", "editor", "preview"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${
                viewMode === mode
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {mode === "split" ? "⟺ Split" : mode === "editor" ? "✏️ Edit" : "👁 Preview"}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-slate-700" />

        {/* Quick insert */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500">Insert:</span>
          {[
            { label: "B", snippet: "**bold text**", title: "Bold" },
            { label: "I", snippet: "*italic text*", title: "Italic" },
            { label: "`", snippet: "`code`", title: "Inline Code" },
            { label: "```", snippet: "```js\n// code here\n```", title: "Code Block" },
            { label: "—", snippet: "\n---\n", title: "Divider" },
            { label: "[]", snippet: "[link text](https://example.com)", title: "Link" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => insertSnippet(btn.snippet)}
              title={btn.title}
              className="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 transition-all"
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy("md")}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all"
          >
            {copied === "md" ? "✅ Copied!" : "📋 Copy MD"}
          </button>
          <button
            onClick={() => handleCopy("html")}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all"
          >
            {copied === "html" ? "✅ Copied!" : "🌐 Copy HTML"}
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs bg-red-950 hover:bg-red-900 text-red-400 hover:text-red-300 rounded-lg border border-red-900 transition-all"
          >
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor pane */}
        {(viewMode === "split" || viewMode === "editor") && (
          <div className={`flex flex-col ${viewMode === "split" ? "w-1/2" : "w-full"} border-r border-slate-800`}>
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b27] border-b border-slate-800">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Markdown</span>
              <span className="text-xs text-slate-600">{stats.lines} lines</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 w-full bg-[#0f1117] text-slate-300 font-mono text-sm p-4 resize-none outline-none leading-relaxed"
              placeholder="Start writing Markdown here..."
              spellCheck={false}
            />
          </div>
        )}

        {/* Preview pane */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className={`flex flex-col ${viewMode === "split" ? "w-1/2" : "w-full"} overflow-auto`}>
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b27] border-b border-slate-800 sticky top-0 z-10">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Preview</span>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{stats.words} words</span>
                <span>{stats.chars} chars</span>
                <span>~{stats.readingTime} min read</span>
              </div>
            </div>
            <div ref={previewRef} className="flex-1 prose-dark p-6 text-sm overflow-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
